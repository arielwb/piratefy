import { createReducers } from 'redux-arc';
import playerActions from '../actions/playerActions';

const INITIAL_STATE = {
    currentSong: {},
    playStatus: false,
}

const getCurrentSongIndex = (tracks, state) => {
    return tracks.items.findIndex(song => song.track.id === state.currentSong.track.id);
}

const getNextPrevState = (state, condition, tracks) => {
    let changes = {};
    if (tracks && state.currentSong.track) {
        let currentSongIndex = getCurrentSongIndex(tracks, state);
        let newIndex = condition(currentSongIndex);

        changes.currentSong = tracks.items[newIndex];
        changes.playStatus = true;
    }
    return changes
}





const onPlay = (state, action) => ({ ...state, ...action.payload });

const onChange = (state, action) => ({ ...state, ...action.payload, playStatus: true });

const onNext = (state, action) => {
    let nextChanges = getNextPrevState(
        state,
        currentSongIndex =>
            currentSongIndex < action.payload.tracks.items.length - 1 ?
                currentSongIndex + 1 : 0,
        action.payload.tracks
    )
    return { ...state, ...nextChanges }
}

const onPrev = (state, action) => {
    let prevChanges = getNextPrevState(
        state,
        currentSongIndex =>
            currentSongIndex > 0 ?
                currentSongIndex - 1 : action.payload.tracks.items.length - 1,
        action.payload.tracks
    )

    return { ...state, ...prevChanges }
}

const HANDLERS = {
    [playerActions.types.PLAY]: onPlay,
    [playerActions.types.NEXT]: onNext,
    [playerActions.types.PREV]: onPrev,
    [playerActions.types.CHANGE]: onChange,
}

export default createReducers(INITIAL_STATE, HANDLERS);
