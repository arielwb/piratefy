import React, { Component } from 'react';
import { connect } from 'react-redux'
import { PlayerComponent } from '../components'
import actions from '../actions'

const mapStateToProps = state => {
    return ({
        playStatus: state.playerReducer.playStatus,
        currentSong: state.playerReducer.currentSong,
        downloadStack: state.downloadReducer.downloadStack,
        currentDownload: state.downloadReducer.currentDownload,
        localFiles: state.downloadReducer.localFiles,
        currentPlaylist: state.listsReducer.currentPlaylist,
    })
}

const mapDispatchToProps = dispatch => ({
    play: song => dispatch(actions.play(song)),
    next: tracks => dispatch(actions.next({ tracks })),
    prev: tracks => dispatch(actions.prev({ tracks })),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerComponent)
