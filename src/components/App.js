import React from 'react';

import HeaderContainer from '../containers/Header.container';
import ListPlaylistsContainer from '../containers/ListPlaylists.container';
import PlayerContainer from '../containers/Player.container';
import DownloadContainer from '../containers/Download.container';

// import './app.css';

class AppComponent extends React.Component {

  render() {
    return (
      <div className="container-fluid">
        <HeaderContainer />
        <DownloadContainer />
        <ListPlaylistsContainer />
        <PlayerContainer />
      </div>
    );
  }
}

export default AppComponent;
