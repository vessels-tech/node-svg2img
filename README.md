# node-svg2image
100% in Node, fast convert SVG files to PNG/JPEG image in memory.
Based on [canvg](https://github.com/gabelerner/canvg) and [node-canvas](https://github.com/Automattic/node-canvas)

Please notice: this library is only suitable for Node, can not run in browsers.

## Install

```bash
npm install node-svg2image
```

## Usage

```javascript
//1. convert from svg string
var svgString = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="236" height="120" viewBox="0 0 236 120"> <rect x="14" y="23" width="200" height="50" fill="#55FF55" stroke="black" stroke-width="1" /></svg>';
svg2image(svgString, {format:'png'}, function(error, buffer) {
    //a Buffer
    fs.writeFileSync('foo.png', buffer);
    });

//2. convert from svg's base64 string
svg2image(atob(svgString), {format:'png'}, function(error, buffer) {
    fs.writeFileSync('foo.png', buffer);
    });

//3. convert from a local file
svg2image(__dirname+'/foo.svg', {format:'png'}, function(error, buffer) {
    fs.writeFileSync('foo.png', buffer);
    });

//4. convert from a remote file
svg2image('https://upload.wikimedia.org/wikipedia/commons/a/a0/Svg_example1.svg', {format:'png'}, function(error, buffer) {
    fs.writeFileSync('foo.png', buffer);
    });

//5. convert to jpeg file
svg2image(svgString, {format:'jpg'}, function(error, buffer) {
    fs.writeFileSync('foo.jpg', buffer);
    });
```

## Run the Test
```bash
    gulp test
```