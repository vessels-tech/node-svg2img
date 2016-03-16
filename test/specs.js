var svg2img = require('../index'),
    expect = require('expect.js'),
    btoa = require('btoa'),
    fs = require('fs');
describe('Convert SVG', function () {
    it('convert a svg file to png',function(done) {
        svg2img(__dirname+'/ph.svg', function(error, data) {
            expect(error).not.to.be.ok();
            expect(Buffer.isBuffer(data)).to.be.ok();
            expect(data.length).to.be.above(0);
            done();
        })
    });

    it('convert tiger file to png',function(done) {
        svg2img(__dirname+'/tiger.svg', function(error, data) {
            expect(error).not.to.be.ok();
            expect(Buffer.isBuffer(data)).to.be.ok();
            expect(data.length).to.be.above(0);
            done();
        })
    });

    it('convert a svg file and scale it',function(done) {
        svg2img(__dirname+'/ph.svg', {'width':400, 'height':400}, function(error, data) {
            expect(error).not.to.be.ok();
            expect(Buffer.isBuffer(data)).to.be.ok();
            expect(data.length).to.be.above(0);
            done();
        })
    });

    it('convert a remote svg file to png',function(done) {
        this.timeout(5000);
        svg2img('https://upload.wikimedia.org/wikipedia/commons/a/a0/Svg_example1.svg', function(error, data) {
            expect(error).not.to.be.ok();
            expect(Buffer.isBuffer(data)).to.be.ok();
            expect(data.length).to.be.above(0);
            done();
        })
    });

    it('convert a svg string to png',function(done) {
        var svg = fs.readFileSync(__dirname+'/ph.svg');
        svg2img(svg, null ,function(error, data) {
            expect(error).not.to.be.ok();
            expect(Buffer.isBuffer(data)).to.be.ok();
            expect(data.length).to.be.above(0);
            done();
        })
    });

    it('convert a svg string to jpg',function(done) {
        var svg = fs.readFileSync(__dirname+'/ph.svg');
        svg2img(svg, {format:'jpeg'} ,function(error, data) {
            expect(error).not.to.be.ok();
            expect(Buffer.isBuffer(data)).to.be.ok();
            expect(data.length).to.be.above(0);
            done();
        })
    });

    it('convert a svg base64 to png',function(done) {
        var svg = fs.readFileSync(__dirname+'/ph.svg').toString('utf-8');
        svg = 'data:image/svg+xml;base64,'+ btoa(svg);
        svg2img(svg, null ,function(error, data) {
            expect(error).not.to.be.ok();
            expect(Buffer.isBuffer(data)).to.be.ok();
            expect(data.length).to.be.above(0);
            done();
        })
    });


});