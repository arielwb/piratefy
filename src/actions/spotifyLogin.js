import { SPOTIFY_LOGIN } from './const';

function action(payload) {
  return { type: SPOTIFY_LOGIN, user: payload.user, accessToken: payload.accessToken };
}

module.exports = action;
