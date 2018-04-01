export class SpotifyService {

    login() {
        return fetch('')
            .then((response) => (response.json()));
    }
}