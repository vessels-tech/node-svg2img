var canvg = require('canvg'),
    atob = require('atob'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    Canvas = require('canvas');


/**
 * Main method
 * @param  {String}   svg      - a svg string, or a base64 string starts with "data:image/svg+xml;base64", or a file url (http or local)
 * @param  {Object} [options=null]          - options
 * @param  {Object} [options.format=png]    - format of the image: png or jpeg, default is png
 * @param  {Function} callback - result callback, 2 parameters: error, and result buffer in png
 */
function svg2img(svg, options, callback) {
    loadSVGContent(svg, function(error, content) {
        if (error) {
            callback(error);
            return;
        }
        var format = options?options.format:null;
        if (!format) {
            format = 'png';
        }
        var canvas = convert(content, options);
        var stream;
        if (format === 'jpg' || format === 'jpeg') {
            stream = canvas.jpegStream({
                quality: options['quality'] // JPEG quality (0-100) default: 75
            });
        } else {
            stream = canvas.pngStream();
        }
        var data = [];
        var pos = 0;
        stream.on('data', function(chunk) {
            data.push(chunk);
        });
        stream.on('error', function(error) {
            callback(error);
        });
        stream.on('end', function () {
            callback(null,Buffer.concat(data));
        });
    });
}

function convert(svgContent) {
    var canvas = new Canvas();
    canvg(canvas, svgContent, { ignoreMouse: true, ignoreAnimation: true });
    return canvas;
}

function loadSVGContent(svg, callback) {
    if (Buffer.isBuffer(svg)) {
        svg = svg.toString('utf-8');
    }
    if (svg.indexOf('data:image/svg+xml;base64,') >= 0) {
        callback(null,atob(svg.substring('data:image/svg+xml;base64,'.length)));
    } else if (svg.indexOf('<svg') >= 0) {
        callback(null, svg);
    } else {
        if (svg.indexOf('http://')>=0 || svg.indexOf('https://')>=0) {
            loadRemoteImage(svg, callback);
        } else {
            fs.readFile(svg, function(error, data) {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null, data.toString('utf-8'));
            });
        }
    }
}

function loadRemoteImage(url, onComplete) {
    //http
    var loader;
    if (url.indexOf('https://') >= 0) {
        loader = https;
    } else {
        loader = http;
    }
    loader.get(url, function(res) {
        var data = [];
        res.on('data', function(chunk) {
          data.push(chunk)
        });
        res.on('end', function () {
            var content = Buffer.concat(data).toString('utf-8');
            onComplete(null, content);
        });
    }).on('error', onComplete);
}


exports = module.exports = svg2img;

