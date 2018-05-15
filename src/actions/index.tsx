import { LIST_PLAYLISTS, VIEW_PLAYLIST } from '../constants/actionTypes';
import { SpotifyService } from '../services/spotify.service';

export const listPlaylists = playlists => {
    return dispatch => {
        SpotifyService.getPlaylists()
            .then(
            dispatch({ type: LIST_PLAYLISTS, payload: playlists }));
    };
};

export const viewPlaylist = playlist => ({ type: VIEW_PLAYLIST, payload: playlist });