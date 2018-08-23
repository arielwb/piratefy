import React, { PureComponent } from 'react';
import { remote, ipcRenderer } from 'electron';

export default class LoginComponent extends PureComponent {

  openLoginWindow() {

    let width = 450,
      height = 730,
      left = (screen.width / 2) - (width / 2),
      top = (screen.height / 2) - (height / 2);

    let win = new remote.BrowserWindow({ width, height })
    win.loadURL('http://localhost:8888/login')

    win.webContents.on('did-finish-load', () => {
      win.webContents.send('message', 'Hello second window!');
    });

    win.on('closed', () => {
      win = null
    })

    ipcRenderer.on('logininfo', (event, message) => {
      console.log('ipcRenderer', message)
      let obj = message.substring(1)
      this.props.loginSuccess(obj)
    });

    // window.open(
    //   'http://localhost:8888/login',
    //   'Spotify',
    //   `menubar=no,
    //   location=no,
    //   resizable=no,
    //   scrollbars=no,
    //   status=no, 
    //   width='${width}', 
    //   height='${height}', 
    //   top='${top}', 
    //   left='${left}`
    // );

  }

  render() {

    return (
      <button
        type="button"
        onClick={() => this.openLoginWindow()}
        className="btn btn-outline-success">
        Spotify login
      </button>
    );
  }
}