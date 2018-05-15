import { CHANGE_SONG } from './const';

function action(newSong) {
  return { type: CHANGE_SONG, newSong };
}

module.exports = action;
