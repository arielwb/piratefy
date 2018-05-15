

import * as React from 'react';
import { SpotifyService } from '../../services/spotify.service';
import { ListComponent } from '../list/list.component';
import { listPlaylists } from '../../actions/index';
import { connect } from 'react-redux';

export class PlaylistComponent extends React.Component<{}, {}> {

    constructor() {
        super();
        this.state = { playlists: [] };
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    getPlaylists() {
        SpotifyService.getPlaylists()
            .then((playlists) => {
                console.log(playlists);
                this.setState({ playlists: playlists.body.items });
            });
    }

    render() {
        let playlists = this.state.playlists || [];
        let names = playlists.map(playlist => playlist.name);
        let hasPlaylist = playlists.length > 0;
        return (
            <div>
                <button hidden={hasPlaylist} onClick={this.props.loadPlaylist.bind(this)}>GetPlaylists</button>
                <h5 hidden={!hasPlaylist}>User playlists:</h5>
                <ListComponent data={names} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        playlists: state.playlists,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadPlaylist() {
            dispatch(listPlaylists);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistComponent);