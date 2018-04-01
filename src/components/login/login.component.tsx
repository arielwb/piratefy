

import * as React from 'react';

export class LoginComponent extends React.Component<{}, {}> {

  constructor() {
    super();
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  openLoginWindow() {

    let width = 450,
      height = 730,
      left = (screen.width / 2) - (width / 2),
      top = (screen.height / 2) - (height / 2);

    window.open('http://localhost:8888/login',
      'Spotify',
      'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
    );
  }

  render() {

    return (
      <div>
        <h2>Click to login on spotify</h2>
        <button onClick={this.openLoginWindow}>Login</button>
      </div>
    );
  }
}
