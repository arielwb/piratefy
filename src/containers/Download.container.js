import React from 'react';
import { connect } from 'react-redux'
import actions from '../actions';

import YoutubeSearch from 'youtube-api-v3-search';

class DownloadContainer extends React.PureComponent {
    componentWillReceiveProps(nextProps) {
        if (nextProps.downloadStack.length > 0 && Object.keys(nextProps.currentDownload).length === 0) {
            console.log(nextProps.downloadStack[0])
            
            let track = nextProps.downloadStack[0]
            let query = `${track.name} ${track.album.name} ${track.artists[0].name}`
            
            YoutubeSearch('AIzaSyCI4yhoPXO2fDprwIO6vp_HCcZdvXy2W-c', {
                q: query,
                part: 'snippet',
                type: 'video'
            }).then(
                response => this.props.download({
                    id: track.id,
                    youtubeId: response.items[0].id.videoId
                }),
                error => done(error, null),
            )
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => {
    console.log(state)
    return ({
        currentDownload: state.downloadReducer.currentDownload,
        downloadStack: state.downloadReducer.downloadStack,
        localFiles: state.downloadReducer.localFiles
    })
}
console.log(actions)
const mapDispatchToProps = dispatch => ({
    download: track => dispatch(actions.downloadBegin({ track }))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadContainer)