
const spotifyAuth = require('./SpotifyAuth');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
console.log(spotifyAuth)
app.use(express.static(__dirname + '/public'))
  .use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/login', spotifyAuth.getLogin);
app.get('/callback', spotifyAuth.getCallback);
app.get('/refresh_token', spotifyAuth.getRefreshToken);
app.get('/getPlaylists', spotifyAuth.getPlaylists);
app.get('/getSongs', spotifyAuth.getSongsFromPlaylist);
app.get('/success', spotifyAuth.getSuccess);

console.log('Listening on 8888');
app.listen(8888);