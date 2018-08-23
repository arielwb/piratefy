import { createReducers } from 'redux-arc';
import listsActions from '../actions/listsActions';

const INITIAL_STATE = {
    currentPlaylist: {},
    playlists: [],
}

const onListPlaylists = (state, action) => ({ ...state, playlists: action.payload.body.items })
const onListSongs = (state, action) => ({ ...state, currentPlaylist: action.payload.body })

const HANDLERS = {
    [listsActions.types.LIST_PLAYLISTS.RESPONSE]: onListPlaylists,
    [listsActions.types.LIST_SONGS.RESPONSE]: onListSongs,
}

export default createReducers(INITIAL_STATE, HANDLERS);
