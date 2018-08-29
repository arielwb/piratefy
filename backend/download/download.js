var fs = require('fs');
var youtubedl = require('youtube-dl');

module.exports = class DownloadVideo {

    download(videoId, cb) {
        // Optional arguments passed to youtube-dl.
        // Additional options can be given for calling `child_process.execFile()`.
        var video = youtubedl(
            `http://www.youtube.com/watch?v=${videoId}`,
            ['--format=18', '-x', '--audio-format', 'mp3'],
            { cwd: __dirname }
        );

        const path = 'music/' + videoId + '.mp3';

        // Will be called when the download starts.
        video.on('info', function (info) {
            console.log('Download started');
            console.log('filename: ' + info._filename);
            console.log('size: ' + info.size);
        });

        video.on('complete', function complete(info) {
            'use strict';
            console.log('filename: ' + info._filename + ' already downloaded.');
        });

        video.on('end', function () {
            console.log('finished downloading!');
            cb(path);
        });

        video.pipe(fs.createWriteStream(path));
    }
}

// ytdl.exec(url, ['-x', '--audio-format', 'mp3'], {}, function (err, output) {
//     if (err) throw err;
//     console.log(output.join('\n'));
// });