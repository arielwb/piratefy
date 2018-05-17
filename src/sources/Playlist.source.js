import listPlaylists from '../actions/listPlaylists';
import listSongs from '../actions/listSongs';


export default class PlaylistSource {

    static getPlaylists(userId) {

        return dispatch => {
            return fetch('http://localhost:5000/getPlaylists?userId=' + userId)
                .then(response => response.json())
                .then(playlists => {
                    dispatch(listPlaylists(playlists.body.items))
                    return playlists;
                })
                .catch(err => console.log(err))
        }
    }

    static getSongs(userId, playlistId) {
        return dispatch => {
            return fetch(`http://localhost:5000/getSongs?playlist=${playlistId}&userId=${userId}`)
                .then(response => response.json())
                .then(songs => {
                    dispatch(listSongs(songs.body))
                    return songs;
                })
                .catch(err => console.log(err))
        }
    }
}