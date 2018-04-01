

import * as React from 'react';
import { SpotifyService } from '../../services/spotify.service';

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

    return (
      <div>
        <button onClick={this.getPlaylists.bind(this)}>GetPlaylists</button>
        <ul>
          {
            data.map(
              (playlist, key) => <li key={key}>{playlist.name}</li>)
          }
        </ul>
      </div>
    );
  }
}
