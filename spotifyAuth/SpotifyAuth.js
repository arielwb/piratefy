// const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const querystring = require('querystring');
const SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');

const client_id = '0d19ab0e22d3445b96e1c5c65d16b227'; // Your client id
const client_secret = 'b659dd6db6554dfc814536c0a03787e9'; // Your secret
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

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


const getLogin = (req, res) => {

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

const getSuccess = (req, res) => {
    console.log(req)
    res.send(`
    <html><body><script>
        window.close();
    </script></body></html>
    `);
};

const getCallback = (req, res) => {

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

const getPlaylists = (req, res) => {
    console.log("Attempt to get playlist from user: ", user);

    if (Object.keys(user).length > 0 ) {
        spotifyApi.getUserPlaylists(user.id, { limit: 50 })
            .then((playlists) => {
                console.log(playlists);
                res.send(JSON.stringify(playlists));
            });
    }
    else{
        getMock('playlists', null, data => {
            res.send(data);
        })
    }


};

const getSongsFromPlaylist = (req, res) => {
    let playlist = req.query.playlist;
    let userId = req.query.userId;
    console.log("Attempt to get songs from playlist: ", playlist);
    if (Object.keys(user).length > 0 ) {
        spotifyApi.getPlaylist(userId, playlist)
            .then((playlists) => {
                console.log(playlists);
                res.send(JSON.stringify(playlists));
            });
    }
    else{
        getMock('songs', null, data => {
            let songs = JSON.parse(data);
            res.send(JSON.stringify(songs[playlist]));
        })
    }
};

const getRefreshToken = (req, res) => {

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

const getMock = (file, id, cb) => {

    fs.readFile(`${__dirname}/${file}.json`, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
        cb(data);
    });
}

module.exports = {
    getLogin,
    getCallback,
    getRefreshToken,
    getSongsFromPlaylist,
    getPlaylists,
    getSuccess
}