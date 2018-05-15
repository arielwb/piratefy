/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  LIST_PLAYLISTS,
  LIST_SONGS,
  PLAY,
  CHANGE_SONG,
  NEXT,
  PREV,
  DOWNLOAD,
  DOWNLOAD_STACK_ADD,
  DOWNLOAD_BEGIN,
  REMOVE_FILE
} from '../actions/const';

const initialState = {
  currentPlaylist: {},
  currentSong: {},
  playlists: [],
  downloadStack: [],
  currentDownload: {},
  localFiles: [],
  playStatus: false
};


//TODO:split reducers by logical application
function reducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);
  console.log('reducer action', action)
  console.log('reducer state', state)

  const getCurrentSongIndex = () => {
    return state.currentPlaylist.tracks.items.findIndex(song => song.track.id === state.currentSong.track.id);
  }

  const getNewState = (changes) => {
    return Object.assign({}, state, changes);
  }
  let currentSongIndex = -1;
  if (state.currentPlaylist.tracks && state.currentSong.track) {
    currentSongIndex = getCurrentSongIndex()
  }

  switch (action.type) {
    case LIST_PLAYLISTS:
      return getNewState({ playlists: action.playlists })

    case LIST_SONGS:
      return getNewState({ currentPlaylist: action.currentPlaylist });

    case PLAY:
      return getNewState({ playStatus: action.playStatus });

    case CHANGE_SONG:
      return getNewState({
        currentSong: action.newSong,
        playStatus: true
      })

    case DOWNLOAD_STACK_ADD:
      let isDownloaded = state.localFiles.some(track => track.id === action.track.id)

      return isDownloaded ? state : getNewState({
        downloadStack: state.downloadStack.concat(action.track)
      })

    case DOWNLOAD:
      return getNewState({
        currentDownload: {},
        downloadStack: state.downloadStack.filter(track => track.id !== action.track.id),
        localFiles: state.localFiles.concat(action.track)
      })

    case DOWNLOAD_BEGIN:
      return getNewState({
        currentDownload: action.track
      })
    
      case REMOVE_FILE:
      return getNewState({
        localFiles: state.localFiles.filter(item => item.id === action.track.id)
      })

    case NEXT:
      let nextChanges = {};

      if (currentSongIndex > -1) {
        let newIndex = (currentSongIndex < state.currentPlaylist.tracks.items.length - 1) ? currentSongIndex + 1 : 0;

        nextChanges.currentSong = state.currentPlaylist.tracks.items[newIndex];
        nextChanges.playStatus = true;
      }
      return getNewState(nextChanges)

    case PREV:
      let prevChanges = {};

      if (currentSongIndex > -1) {
        let newIndex = (currentSongIndex > 0) ? currentSongIndex - 1 : state.currentPlaylist.tracks.items.length - 1;

        prevChanges.currentSong = state.currentPlaylist.tracks.items[newIndex];
        prevChanges.playStatus = true;
      }
      return getNewState(prevChanges)

    default:
      return state;
  }
}

module.exports = reducer;
