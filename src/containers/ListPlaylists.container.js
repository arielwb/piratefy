import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { PlaylistComponent, SonglistComponent, LoginComponent } from '../components';
import actions from '../actions';

const mapStateToProps = state => {
    return ({
        playlists: state.listsReducer.playlists,
        currentPlaylist: state.listsReducer.currentPlaylist,
        downloadStack: state.downloadReducer.downloadStack,
        currentDownload: state.downloadReducer.currentDownload,
        localFiles: state.downloadReducer.localFiles,
        user: state.loginReducer.user
    })
}

const mapDispatchToProps = dispatch => ({
    listSongs: (userId, playlist) => dispatch(actions.listSongs({ userId, playlist })),
    listPlaylists: userId => dispatch(actions.listPlaylists({ userId })),
    changeSong: song => dispatch(actions.change({ currentSong: song })),
    downloadStackAdd: track => dispatch(actions.downloadStackAdd({ track })),
    removeLocalFile: track => dispatch(actions.remove({ track })),
    loginSuccess: user => dispatch(actions.loginSuccess({ user })),
})

class ListPlaylistsContainer extends PureComponent {
    render() {
        return (
            <div className="content-wrapper ">
                {
                    Object.keys(this.props.user).length > 0 ?
                        <div className="row content-wrapper no-gutters bg-light" >
                            <div className="col-md-4">
                                <PlaylistComponent {...this.props} />
                            </div>
                            <div className="col-md-8">
                                <SonglistComponent {...this.props} />
                            </div>
                        </div>
                        :
                        <div className="d-flex justify-content-center flex-column h-100">
                            <div className="row no-gutters align-items-center justify-content-center">
                                <div className="col-12 text-center mb-2 text-success">
                                    Login to view your playlists!
                                </div>
                                <div className="col-12 text-center">
                                    <LoginComponent loginSuccess={this.props.loginSuccess} />
                                </div>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPlaylistsContainer)
