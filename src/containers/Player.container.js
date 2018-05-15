import React, { Component } from 'react';
import { connect } from 'react-redux'
import PlayerSource from '../sources/Player.source';
import { PlayerComponent } from '../components'

const mapStateToProps = state => {
    return ({
        playStatus: state.rootReducer.playStatus,
        currentSong: state.rootReducer.currentSong,
        downloadStack: state.rootReducer.downloadStack,
        currentDownload: state.rootReducer.currentDownload,
        localFiles: state.rootReducer.localFiles
    })
}

const mapDispatchToProps = dispatch => ({
    play: song => dispatch(PlayerSource.play(song)),
    next: () => dispatch(PlayerSource.next()),
    prev: () => dispatch(PlayerSource.prev()),
    download: track => dispatch(PlayerSource.download(track))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerComponent)
