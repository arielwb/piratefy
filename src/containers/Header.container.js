import React, { Component } from 'react';
import { connect } from 'react-redux'
import { spotifyLogin } from '../actions'
import { HeaderComponent } from '../components';

const mapStateToProps = state => {
    return ({
        playlists: state.rootReducer.playlists,
        currentPlaylist: state.rootReducer.currentPlaylist,
        playStatus: state.rootReducer.playStatus,
        currentSong: state.rootReducer.currentSong,
        user: state.rootReducer.user
    })
}

const mapDispatchToProps = dispatch => ({
    login: id => dispatch(login()),
    spotifyLogin: obj => dispatch(spotifyLogin(obj)),
})

// class HeaderContainer extends React.Component {
//     render() {
//         return (
//             <div className="content-wrapper ">
//                 <div className="row content-wrapper">
//                     <div className="col-md-4">
//                         <PlaylistComponent {...this.props} />
//                     </div>
//                     <div className="col-md-8">
//                         <SonglistComponent {...this.props} />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderComponent)
