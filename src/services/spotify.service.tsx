export class SpotifyService {

    login() {
        return fetch('')
            .then((response) => (response.json()));
    }

    static getPlaylists() {
        return fetch('http://localhost:8888/getPlaylists')
            .then(response => response.json());
    }
}