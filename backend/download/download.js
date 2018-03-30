var fs = require('fs');
var youtubedl = require('youtube-dl');

class downloadVideo {
    
    download(videoId){
        // Optional arguments passed to youtube-dl.
        // Additional options can be given for calling `child_process.execFile()`.
        var video = youtubedl(`http://www.youtube.com/watch?v=${videoId}`,['--format=18'],{ cwd: __dirname });

        // Will be called when the download starts.
        video.on('info', function(info) {
            console.log('Download started');
            console.log('filename: ' + info.filename);
            console.log('size: ' + info.size);
        });
        
        video.pipe(fs.createWriteStream(videoId + '.mp4'));
    }
}