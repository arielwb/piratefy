import React, { Component } from 'react';


class SonglistComponent extends React.Component {

    constructor() {
        super();
        this.downloadBtn;
    }

    componentWillReceiveProps(nextProps) {
        if (this.downloadBtn && Object.keys(nextProps.currentPlaylist).length > 0) {

            let currentPlaylist = nextProps.currentPlaylist.tracks.items;
            let compare = [];
            currentPlaylist.forEach(item => {
                let found = nextProps.localFiles.find(local => item.track.id === local.id)
                if (found) {
                    compare.push(found)
                }
            })

            this.downloadBtn.checked = compare.length === currentPlaylist.length;
        }
    }

    minTime(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    addToDownloads() {
        let currentPlaylist = this.props.currentPlaylist.tracks.items;
        if (this.downloadBtn.checked) {
            currentPlaylist.forEach(item => {
                console.log('item.track', item.track)
                this.props.downloadStackAdd(item.track)
            });
        }
        else {
            currentPlaylist.forEach(item => this.props.removeLocalFile(item.track))
        }
    }

    getDownloadIcon(item) {

        let isLocal = this.props.localFiles.some(local => local.id === item.track.id);
        let isOnDownloadStack = this.props.downloadStack.some(stack => stack.id === item.track.id);
        let isCurrentDownload = this.props.currentDownload.id === item.track.id;

        return isCurrentDownload ? 'fa fa-circle-o-notch fa-spin text-success' :
            isLocal ? 'fa fa-download text-success' :
                isOnDownloadStack ? 'fa fa-download text-secondary' : '';
    }

    render() {
        let content = null;
        if (Object.keys(this.props.currentPlaylist).length > 0)
            content = (
                <div className="list-container">
                    <div className="media playlist-header mt-3 mb-3 d-flex flex-row align-items-stretch" style={{ height: '180px' }}>
                        <img className="mr-3 img-thumbnail" style={{ width: '180px' }} src={this.props.currentPlaylist.images[0].url} />
                        <div className="media-body d-flex flex-column ">
                            <h3 className="playlist-header-name">{this.props.currentPlaylist.name}</h3>
                            <div>by <span>{this.props.currentPlaylist.owner.display_name}</span></div>
                            <div><span>{this.props.currentPlaylist.tracks.total}</span> songs</div>

                            <div className="custom-control custom-checkbox mt-auto">
                                <input type="checkbox" className="custom-control-input" id="download" onChange={this.addToDownloads.bind(this)} ref={input => this.downloadBtn = input} />
                                <label className="custom-control-label" htmlFor="download" >Download</label>
                            </div>

                        </div>
                    </div>
                    <div className="list-group list-group-flush mb-4 mr-3 border-left border-bottom border-right shadow-sm">
                        {
                            this.props.currentPlaylist.tracks.items.map((song, key) => {
                                return (
                                    <a key={key} className="list-group-item list-group-item-action" onClick={() => this.props.changeSong(song)}>
                                        <div className="track-name">
                                            {song.track.name}
                                            <span className="track-length float-right">
                                                {this.minTime(song.track.duration_ms)}
                                            </span>
                                        </div>
                                        <span className="track-album">{song.track.album.name} - </span>
                                        {
                                            song.track.album.artists.map(
                                                (artist, i) => <span key={i} className="track-artist">{`${artist.name}${i < song.track.album.artists.length - 1 ? ', ' : ''}`}</span>)
                                        }
                                        <span className="float-right">
                                            <i className={this.getDownloadIcon(song)}></i>
                                        </span>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            )

        return content;
    };
}

export default SonglistComponent;