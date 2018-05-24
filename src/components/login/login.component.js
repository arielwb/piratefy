

import React from 'react';

class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.spotifyPlayer = null;
    this.initSpotify();
  }

  initSpotify() {
    let interval = setInterval(() => {
      if (window.SpotifyPlayer && !this.spotifyPlayer ) {
        this.spotifyPlayer = new SpotifyPlayer({
          exchangeHost: 'http://localhost:5000'
        });
        this.initEvents();
        clearInterval(interval);
      }
    }, 500)

  }

  initEvents(){
    // this.spotifyPlayer.on('update', response => {
    //   console.log(response)
    // });

    this.spotifyPlayer.on('login', user => {
      this.props.spotifyLogin({user, accessToken: this.spotifyPlayer.accessToken})
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', this.spotifyPlayer.accessToken);
    });

    this.spotifyPlayer.init();
  }

  openLoginWindow() {
    this.spotifyPlayer.login();
  }

  render() {
    let content = (<button type="button" onClick={this.openLoginWindow.bind(this)} className="btn btn-outline-success float-right">Spotify login</button>);
    if(!!this.props.user && Object.keys(this.props.user).length > 0){
      content = (
        <div>
          
            <img className="user-avatar" src={this.props.user.images[0].url} alt=""/>
          
          <span>{this.props.user.display_name}</span>
        </div>
      )
    }
    return (
      content
    );
  }
}

export default LoginComponent;
