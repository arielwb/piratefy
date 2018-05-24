const fs = require('fs');
const readline = require('readline');
const path = require('path');
const ytdl = require('ytdl-core');


var yAPI = require('./youtube-api/youtube-api');
var APIKEY = 'AIzaSyAN3FVKnhhaqnH-f5Pc1fjwc0Msw3aJZlM'; //Must be Replaced by your API-Key

yAPI.setup(APIKEY);
yAPI.searchFunctions.simpleSearch('Annita', '15').then(function (data) {
    console.log('ANNITA');
    
    
    new downloadPlaylist()
    .download(data);
    
});



class downloadPlaylist {
    download(playlist) {
        let song = playlist[0];
        if(typeof song.videoId !== 'undefined'){
            console.log(`titulo: ${song.title} - videoId: ${song.videoId}`);
            this.ytdl(song.videoId)
            .then((s) => {
                    playlist.shift();
                    this.download(playlist);
                })
        } else {
            playlist.shift();
            this.download(playlist);
        }
    }
    ytdl(videoId) {
        return new Promise((resolve, reject) => {
            let fileAndPath = path.join(__dirname, './videos/' + videoId + '.mp4');
            if(!fs.existsSync(fileAndPath)){
                let video = ytdl(`http://www.youtube.com/watch?v=${videoId}`, { filter: (format) => format.container === 'mp4' });
                let starttime;
                video.pipe(fs.createWriteStream(fileAndPath))
                video.once('response', () => {
                    starttime = Date.now();
                });
                
                video.on('progress', (chunkLength, downloaded, total) => {
                    const floatDownloaded = downloaded / total;
                    const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
                    readline.cursorTo(process.stdout, 0);
                    process.stdout.write(`${(floatDownloaded * 100).toFixed(2)}% downloaded`);
                    process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
                    process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
                    process.stdout.write(`, estimated time left: ${(downloadedMinutes / floatDownloaded - downloadedMinutes).toFixed(2)}minutes `);
                    readline.moveCursor(process.stdout, 0, -1);
                });
                
                video.on('end', () => {
                    process.stdout.write('\n\n');
                    resolve(true);
                });

            } else {
                resolve(true);
            }

        })
    }

}