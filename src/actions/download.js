import { DOWNLOAD } from './const';

function action(track) {
  return { type: DOWNLOAD, track };
}

module.exports = action;
