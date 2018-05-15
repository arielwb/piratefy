

import React from 'react';

class LoginComponent extends React.Component {

  constructor() {
    super();
    this.spotifyPlayer = null;
    // this.initSpotify();
  }

  initSpotify() {
    let interval = setInterval(() => {
      console.log(window)
      console.log(window.SpotifyPlayer)
      if (window.SpotifyPlayer && !this.spotifyPlayer ) {
        this.spotifyPlayer = new SpotifyPlayer({
          exchangeHost: 'http://localhost:5000'
        });
        this.spotifyPlayer.on('update', response => {
          console.log(reponse)
        });
  
        this.spotifyPlayer.on('login', user => {
          console.log(user)
        });
  
        this.spotifyPlayer.init();

        clearInterval(interval);
      }
    }, 500)

  }

  openLoginWindow() {

    // let width = 450,
    //   height = 730,
    //   left = (screen.width / 2) - (width / 2),
    //   top = (screen.height / 2) - (height / 2);

    // window.open('http://localhost:8888/login',
    //   'Spotify',
    //   'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
    // );
    this.spotifyPlayer.login();
  }

  render() {

    console.log(this.spotifyPlayer)
    return (
      <button type="button" onClick={this.openLoginWindow.bind(this)} className="btn btn-outline-success float-right">Spotify login</button>
    );
  }
}

export default LoginComponent;
