import React, { Component } from 'react';
import { connect } from 'react-redux'
import actions from '../actions';
import { HeaderComponent } from '../components';

const mapStateToProps = state => {
    return ({
        playlists: state.listsReducer.playlists,
        currentPlaylist: state.listsReducer.currentPlaylist,
        playStatus: state.playerReducer.playStatus,
        currentSong: state.playerReducer.currentSong,
    })
}

const mapDispatchToProps = dispatch => ({
    loginSuccess: user => dispatch(actions.loginSuccess({ user }))
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
