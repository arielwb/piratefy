import { createActions } from 'redux-arc';

const { types, creators } = createActions('lists', {
    listPlaylists: { url: 'http://localhost:8888/getPlaylists', method: 'get' } ,
    listSongs: { url: 'http://localhost:8888/getSongs', method: 'get' },
})

export default {
    types,
    creators
}
