import { PLAY } from './const';

function action(playStatus) {
  return { type: PLAY, playStatus };
}

module.exports = action;
