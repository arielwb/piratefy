import { LIST_PLAYLISTS } from './const';

function action(playlists) {
  return { type: LIST_PLAYLISTS, playlists };
}

module.exports = action;
