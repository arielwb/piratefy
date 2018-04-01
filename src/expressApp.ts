// const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const querystring = require('querystring');
const SpotifyWebApi = require('spotify-web-api-node');
const { ipcRenderer } = require('electron');
// const cookieParser = require('cookie-parser');

const client_id = '0d19ab0e22d3445b96e1c5c65d16b227'; // Your client id
const client_secret = 'b659dd6db6554dfc814536c0a03787e9'; // Your secret
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

import { Response, Request, NextFunction } from "express";

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function (length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const stateKey = 'spotify_auth_state';

const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri
});

let user = {};


export let getLogin = (req: Request, res: Response) => {

    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    const scope = 'user-read-private user-read-email playlist-read-private';
    let url = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        });

    console.log("attempt to authorize: ", url);
    res.redirect(url);
};

export let getSuccess = (req: Request, res: Response) => {

    res.send(`
    <html><body><script>
        window.close();
    </script></body></html>
    `);
};

export let getCallback = (req: Request, res: Response) => {

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                const access_token = body.access_token,
                    refresh_token = body.refresh_token;

                spotifyApi.setAccessToken(access_token);

                spotifyApi.getMe()
                    .then(function (data) {
                        user = data.body;
                        res.redirect('/success');
                    }, function (err) {
                        console.log('Something went wrong!', err);
                    });
            } else {
                res.redirect('/#' + 
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
};

export let getPlaylists = (req: Request, res: Response) => {
    console.log("Attempt to get playlist from user: ", user);
    spotifyApi.getUserPlaylists(user.id, {limit: 50})
        .then((playlists) => {
            console.log(playlists);
            res.send(JSON.stringify(playlists));
            //send playlist to main window
            //ipcRenderer.send('pasted', '========>>');
        });
};

export let getSongsFromPlaylist = (req: Request, res: Response) => {
    let playlist =  req.query.plylist;
    console.log("Attempt to get songs from playlist: ", playlist);
    spotifyApi.getPlaylist(user.id, playlist)
        .then((playlists) => {
            console.log(playlists);
            res.send(JSON.stringify(playlists));
        });
};

export let getRefreshToken = (req: Request, res: Response) => {

    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
};