

import * as React from 'react';

import { LoginComponent } from '../components/login/login.component';
import { PlaylistComponent } from '../components/playlists/playlist.component';

export class Root extends React.Component<{}, {}> {

    constructor() {
        super();
    }

    componentDidMount() {
        console.log('componentDidMount: Root');
    }

    render() {
        return (
            <div>
                <LoginComponent />
                <PlaylistComponent />
            </div>
        );
    }
}
