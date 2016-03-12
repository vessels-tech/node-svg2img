var svg2img = require('../index'),
    fs = require('fs');

svg2img(__dirname+'/tiger.svg', {'width':1400, 'height':1400}, function(error, data) {
            fs.writeFileSync(__dirname+'/test.png', data);
        });
