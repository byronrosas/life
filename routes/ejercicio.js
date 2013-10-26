module.exports=function(app,db,io)
{
	app.get("/ejercicio",function(req,res){
		res.render("ejercicio.html",{"title":"Ejercicio"});
	});
	io.sockets.on('connection',function(socket)
		{
			socket.on('arr_porcentaje_ejercicio',porcentajes);
		});
	
	function porcentajes(data,id)
	{
		var data=data.replace("\\",' ');
		
		console.log(data);
	db.collection('usuarios').update({"_id":id},{"$set":{"ejercicios":data}},function(err){if(err) throw err;});
	
				
	}

	
	
}