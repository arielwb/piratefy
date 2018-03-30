var youtubeAPI = require('youtube-api');

var youtubeAPISimplifier = {
    /**
     * The Youtube-API Key which will be used for all Requests.
     *
     * @property {String} _APIKEY
     * @private
     */
    _APIKEY: '',

    /**
     * Setup function, needs to be called first!
     *
     * @method setup
     * @param  {String}    apiKEY
     */
    setup: function (apiKEY) {
        this._APIKEY = apiKEY;
        youtubeAPI.authenticate({
            type: 'key',
            key: apiKEY
        });
    },

    channelFunctions: require('./libs/channel-functions'),

    playlistFunctions: require('./libs/playlist-functions'),

    searchFunctions: require('./libs/search-functions'),

    videoFunctions: require('./libs/video-functions'),

    activitiesFunctions: require('./libs/activities-functions')
};

module.exports = youtubeAPISimplifier;