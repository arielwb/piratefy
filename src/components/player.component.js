import React, { Component } from 'react';

export default class PlayerComponent extends React.PureComponent {
    renderNowPlaying(track) {
        return (
            <div className="media ml-2 mt-2 mb-2" >
                <img
                    className="mr-2 img-thumbnail"
                    style={{ width: '70px' }}
                    src={track.album.images[0].url}
                />
                <div className="media-body">
                    <h5 className="m-0 playlist-header-name">{track.name}</h5>
                    <p className="m-0">
                        <small>{track.artists[0].name}</small>
                        <br />
                        <small>{track.album.name}</small>
                    </p>
                </div>
            </div>
        )
    }

    render() {
        let nowPlaying = Object.keys(this.props.currentSong).length > 0 ?
            this.renderNowPlaying(this.props.currentSong.track) : null;

        return (
            <div id="player-bar" >
                <div className="row no-gutters border-top bg-light" style={{ boxShadow: '0 -.125rem .25rem rgba(0,0,0,.075)' }}>
                    <div className="col col-md-4" style={{ minHeight: '88px' }}>
                        {nowPlaying}
                    </div>
                    <div className="col col-md-8 border-left">
                        <div className="btn-group flex-row d-flex justify-content-center align-items-center m-4" role="group" aria-label="First group">
                            <button type="button" className="btn btn-outline-primary" onClick={() => this.props.prev(this.props.currentPlaylist.tracks)}>
                                <i className="fa fa-step-backward"></i>
                            </button>
                            <button type="button" className="btn btn-outline-primary" onClick={() => this.props.play(!this.props.playStatus)}>
                                <i className={this.props.playStatus ? 'fa fa-pause' : 'fa fa-play'}></i>
                            </button>
                            <button type="button" className="btn btn-outline-primary" onClick={() => this.props.next(this.props.currentPlaylist.tracks)}>
                                <i className="fa fa-step-forward"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="progress" style={{ height: '4px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '50%' }} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div >
        );
    }
}