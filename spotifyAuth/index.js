var express = require('express');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');

var SpotifyWebApi = require('spotify-web-api-node');

var app = express();
app.use(cookieParser());
app.use(bodyParser.json());

var DEV = process.env.DEV ? true : true;
var stateKey = 'spotify_auth_state';

var client_id = '0d19ab0e22d3445b96e1c5c65d16b227' || process.env.CLIENT_ID;
var client_secret = 'b659dd6db6554dfc814536c0a03787e9' || process.env.CLIENT_SECRET;
var redirect_uri = DEV ? 'http://localhost:5000/callback' : process.env.REDIRECT_URI;

var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
  next();
});

app.get('/login', function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email playlist-read-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function (req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter



  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    console.log('state mismatch', 'state: ' + state, 'storedState ' + storedState, 'cookies ', req.cookies);
    res.render('pages/callback', {
      access_token: null,
      expires_in: null
    });
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
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
      console.log('error', error)
      console.log('body', body)
      console.log('response.statusCode', response)
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
          refresh_token = body.refresh_token,
          expires_in = body.expires_in;

        spotifyApi.setAccessToken(access_token);

        console.log('everything is fine', body);
        res.cookie('refresh_token', refresh_token, { maxAge: 30 * 24 * 3600 * 1000, domain: 'localhost' });

        res.render('pages/callback', {
          access_token: access_token,
          expires_in: expires_in,
          refresh_token: refresh_token
        });
      } else {
        console.log('wrong token');

        res.render('pages/callback', {
          access_token: null,
          expires_in: null
        });
      }
    });
  }
});

app.post('/token', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var refreshToken = req.body ? req.body.refresh_token : null;
  if (refreshToken) {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
          expires_in = body.expires_in;

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ access_token: access_token, expires_in: expires_in }));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ access_token: '', expires_in: '' }));
      }
    });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ access_token: '', expires_in: '' }));
  }
});

app.get('/getPlaylists', (req, res) => {
  let userId = req.query.userId;
  console.log("Attempt to get playlist from user: ", userId);
  if (userId) {
    spotifyApi.getUserPlaylists(userId, { limit: 50 })
      .then((playlists) => {
        console.log(playlists);
        res.send(JSON.stringify(playlists));
      });
  }
  else {
    getMock('playlists', null, data => {
      res.send(data);
    })
  }

});

app.get('/getSongs', (req, res) => {
  let playlist = req.query.playlist;
  let userId = req.query.userId;
  console.log("Attempt to get songs from playlist: ", playlist);
  if (userId) {
    spotifyApi.getPlaylist(userId, playlist)
      .then((playlists) => {
        console.log(playlists);
        res.send(JSON.stringify(playlists));
      });
  }
  else {
    getMock('songs', null, data => {
      let songs = JSON.parse(data);
      res.send(JSON.stringify(songs[playlist]));
    })
  }
});

const getMock = (file, id, cb) => {

  fs.readFile(`${__dirname}/${file}.json`, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
    cb(data);
  });
}

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});