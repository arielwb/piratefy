import { DOWNLOAD_STACK_ADD } from './const';

function action(track) {
  return { type: DOWNLOAD_STACK_ADD, track };
}

module.exports = action;
