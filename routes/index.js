var alimentacion=require('./alimentacion.js');
var ejercicio=require('./ejercicio.js');
var diversion=require('./diversion.js');
var medica=require('./med.js');
var resultados=require('./resultados.js');
module.exports=function(app,db,io)
{
	



	var cursor=db.collection('usuarios');
	app.get("/",function(req,res){
				
		res.redirect('/menu');
		
		});
	app.get("/menu",function(req,res){
		res.render("menu.html");
	});
	
	io.sockets.on('connection', function(socket){
		socket.on('log',log);
		socket.on('reg',insertar);
	});

	app.get("/salir",function(req,res)
	{
		res.render('salir.html');
	});

var log=function log(data)
{
	cursor.findOne(data,function(err,doc){
	if(err) throw err;
	if(doc==null)
	{
	io.sockets.emit('noEncontrado',{"msg":"Usuario no encontrado"});
	console.log("no encontrado");
	}
	else
	{
	io.sockets.emit('encontrado',doc);
	console.log("encontrado");
}
});
}

function insertar(data)
{ 
console.log("Nuevo usuario insertado:"+data);

cursor.insert(data,function(err){ if(err) { io.sockets.emit('usuario_existente',{"msg":"El usuario ya esta en uso."});}
else
{ 

io.sockets.emit('registrado',data);
}
});

}

alimentacion(app,db,io);
ejercicio(app,db,io);
diversion(app,db,io); 
medica(app,db,io);
resultados(app,db,io);

}