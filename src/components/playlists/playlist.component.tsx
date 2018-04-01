

import * as React from 'react';
import { SpotifyService } from '../../services/spotify.service';
import { ListComponent } from '../list/list.component';

export class PlaylistComponent extends React.Component<{}, {}> {

    constructor() {
        super();
        this.state = { data: [] };
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    getPlaylists() {
        SpotifyService.getPlaylists()
            .then((playlists) => {
                console.log(playlists);
                this.setState({ data: playlists.body.items });
            });
    }

    render() {
        let data = this.state.data || [];
        let names = data.map(playlist => playlist.name);
        let hasPlaylist = data.length > 0;
        return (
            <div>
                <button hidden={hasPlaylist} onClick={this.getPlaylists.bind(this)}>GetPlaylists</button>
                <h5 hidden={!hasPlaylist}>User playlists:</h5>
                <ListComponent data={names} />
            </div>
        );
    }
}
