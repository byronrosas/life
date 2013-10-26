var port= process.env.PORT || 3000;
var mongoUri = 'mongodb://byron:yaminada@ds051848.mongolab.com:51848/life2'
 ||'mongodb://localhost:27017/life_db';

var Mongoclient=require("mongodb").MongoClient;
	express= require("express"),
	app=express(),
	path = require('path'),
	server=require("http").createServer(app),
	io=require("socket.io").listen(server),
	routes=require("./routes"),
	cons=require("consolidate");
	app.engine("html",cons.swig);
	app.set("views",__dirname+"/views");
	app.set("view engine","html");
	app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'mi secreto'}));
	app.use(express.static(__dirname + '/public'));
	Mongoclient.connect(mongoUri,function(err,db){
		if(err) throw err;
		routes(app,db,io);
});
	server.listen(port);

