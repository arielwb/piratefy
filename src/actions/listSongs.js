import { LIST_SONGS } from './const';

function action(currentPlaylist) {
  return { type: LIST_SONGS, currentPlaylist };
}

module.exports = action;
