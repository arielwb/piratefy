

import * as React from 'react';
import { SpotifyService } from '../../services/spotify.service';

export class ListComponent extends React.Component<{}, {}> {

  constructor() {
    super();  
  }

  render() {
    let data = this.props.data || [];

    return (
        <ul>
          {
            data.map(
              (item, key) => <li key={key}>{item}</li>)
          }
        </ul>
    );
  }
}
