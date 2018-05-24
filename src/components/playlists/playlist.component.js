import React, { Component } from 'react';


class PlaylistComponent extends React.Component {

    componentWillReceiveProps(nextProps) {
        if(nextProps.user && nextProps.user !== this.props.user){
            this.props.listPlaylists(nextProps.user.id);
        }
    }

    render() {
        return (
            <div className="list-container playlist pt-3 pb-3 pl-4 pr-4">
                <div className="list-group list-group-flush border shadow-sm">
                    {
                        this.props.playlists.map((pl, key) => {
                            return (
                                <a key={key} className="list-group-item list-group-item-action text-truncate" onClick={() => this.props.listSongs(pl.owner.id, pl.id)}>
                                    {pl.name}
                                </a>
                            )
                        })
                    }
                </div>
            </div>
        )
    };
}

export default PlaylistComponent;