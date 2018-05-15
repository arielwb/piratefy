import { LIST_PLAYLISTS, VIEW_PLAYLIST } from '../constants/actionTypes';
const initialState = {
    playlists: [],
    playlist: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_PLAYLISTS:
            return {
                ...state,
                playlists: action.payload
            };
        case VIEW_PLAYLIST:
            return {
                ...state,
                playlist: action.payload
            };
        default:
            return state;
    }
};


export default rootReducer;