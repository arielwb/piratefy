import { REMOVE_FILE } from './const';

function action(track) {
  return { type: REMOVE_FILE, track };
}

module.exports = action;
