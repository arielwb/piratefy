import React, { Component } from 'react';
import { connect } from 'react-redux'
import { PlaylistComponent, SonglistComponent } from '../components';
import PlaylistSource from '../sources/Playlist.source';
import PlayerSource from '../sources/Player.source';

const mapStateToProps = state => {
    return ({
        playlists: state.rootReducer.playlists,
        currentPlaylist: state.rootReducer.currentPlaylist,
        downloadStack: state.rootReducer.downloadStack,
        currentDownload: state.rootReducer.currentDownload,
        localFiles: state.rootReducer.localFiles,
        user: state.rootReducer.user,
        accessToken: state.rootReducer.accessToken
    })
}

const mapDispatchToProps = dispatch => ({
    listSongs: (userId, playlistId) => dispatch(PlaylistSource.getSongs(userId, playlistId)),
    listPlaylists: (user) => dispatch(PlaylistSource.getPlaylists(user)),
    changeSong: song => dispatch(PlayerSource.changeSong(song)),
    downloadStackAdd: track => dispatch(PlayerSource.downloadStackAdd(track)),
    removeLocalFile: track => dispatch(PlayerSource.removeLocalFile(track)),
})

class ListPlaylistsContainer extends React.Component {
    render() {
        return (
            <div className="content-wrapper ">
                <div className="row content-wrapper no-gutters bg-light" >
                    <div className="col-md-4">
                        <PlaylistComponent {...this.props} />
                    </div>
                    <div className="col-md-8">
                        <SonglistComponent {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPlaylistsContainer)
