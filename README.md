# node-svg2img
A high-performance in-memory convertor to convert svg to png/jpeg images for Node.
Based on [canvg](https://github.com/gabelerner/canvg) and [node-canvas](https://github.com/Automattic/node-canvas)

Please notice: this library is only for Node, can not run in browsers.

## Install

```bash
npm install svg2img
```

## Usage

```javascript
var svg2img = require('svg2img');

var svgString = [
'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="236" height="120" ',
'viewBox="0 0 236 120">',
'<rect x="14" y="23" width="200" height="50" fill="#55FF55" stroke="black" stroke-width="1" />',
'</svg>'
].join('');

//1. convert from svg string
svg2img(svgString, function(error, buffer) {
    //returns a Buffer
    fs.writeFileSync('foo.png', buffer);
});

//2. convert from svg's base64 string
svg2img(
    'data:image/svg+xml;base64,'+ btoa(svgString), 
    function(error, buffer) {
        fs.writeFileSync('foo.png', buffer);
});

//3. convert from a local file
svg2img(__dirname+'/foo.svg', function(error, buffer) {
    fs.writeFileSync('foo.png', buffer);
});

//4. convert from a remote file
svg2img(
    'https://upload.wikimedia.org/wikipedia/commons/a/a0/Svg_example1.svg', 
    function(error, buffer) {
        fs.writeFileSync('foo.png', buffer);
});

//5. convert to jpeg file
svg2img(svgString, {format:'jpg','quality':75}, function(error, buffer) {
    //default jpeg quality is 75
    fs.writeFileSync('foo.jpg', buffer);
});
```

## Run the Test
```bash
    gulp test
```
