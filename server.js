var express = require('express')
var app = express();

var fs = require('fs');
var Canvas = require('canvas');
var Image = Canvas.Image;
require('./lib/node-easel.js');

//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(app.router);
//app.use(express.static(__dirname + '/public'));
//app.set('views', __dirname + '/public');
app.use(express.errorHandler({ showStack:true }));


app.get('/bg.png', function (req, res) {
	    var stage, w=960, h=400, loader, x, img;
	    var sky, grant, ground, hill, hill2;


		var canvas = new Canvas(960, 400);
		var stage = new createjs.Stage(canvas);

        sky = new createjs.Shape();
        img = new Image();
		img.src = fs.readFileSync(__dirname + '/img/sky.png');
        sky.graphics.beginBitmapFill(img).drawRect(0, 0, w, h);

        var groundImg = new Image();
		groundImg.src = fs.readFileSync(__dirname + '/img/ground.png');
        ground = new createjs.Shape();
        ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w + groundImg.width, groundImg.height);
        ground.y = h - groundImg.height;

        img = new Image();
		img.src = fs.readFileSync(__dirname + '/img/hill1.png');
        hill = new createjs.Bitmap(img);
        x =(Math.random() * (w - hill.image.width));
        hill.setTransform(x, h - hill.image.height * 1 - groundImg.height, 1, 1);
        hill.alpha = 0.5;


        img = new Image();
		img.src = fs.readFileSync(__dirname + '/img/hill2.png');
        hill2 = new createjs.Bitmap(img);
        x =  (Math.random() * (w-hill2.image.width));
        hill2.setTransform(x, h - hill2.image.height * 1 - groundImg.height, 1, 1);

        img = new Image();
		img.src = fs.readFileSync(__dirname + '/img/tree.png');
        tree = new createjs.Bitmap(img);
        x =  (Math.random() * (w-tree.image.width));
        tree.setTransform(x, h - tree.image.height * 1 - groundImg.height + 9, 1, 1);

        stage.addChild(
            sky,
            hill,
            hill2,
            ground,
            tree

        );

        stage.update();

		sendImage(canvas, res);
});

function sendImage(buffer, res) {
	res.contentType('image/png');

	buffer.toBuffer(function (err, buf) {
		res.send(buf);
	});
}

app.listen(9000, "0.0.0.0");

var os = require('os');
var interfaces = os.networkInterfaces();
var addresses = [];
for (var n in interfaces) {
	for (var j in interfaces[n]) {
		var address = interfaces[n][j];
		if (address.family == 'IPv4' && !address.internal) {
			addresses.push(address.address)
		}
	}
}
console.log('App started: ', addresses);
