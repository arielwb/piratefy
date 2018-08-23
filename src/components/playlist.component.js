import React from 'react';


export default class PlaylistComponent extends React.PureComponent {

    componentDidMount() {
        if (this.props.playlists.length === 0) {
            this.props.listPlaylists(this.props.user.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        
        if (Object.keys(nextProps.user).length > 0 && Object.keys(this.props.user).length === 0){
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
                                <a
                                    key={key}
                                    className="list-group-item list-group-item-action"
                                    onClick={() => this.props.listSongs(pl.owner.id, pl.id)}
                                >
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