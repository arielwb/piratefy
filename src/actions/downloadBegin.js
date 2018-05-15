import { DOWNLOAD_BEGIN } from './const';

function action(track) {
  return { type: DOWNLOAD_BEGIN, track };
}

module.exports = action;
