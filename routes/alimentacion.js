module.exports=function(app,db,io)
{
	io.sockets.on('connection',function(socket)
		{
			socket.on('porcentajes',porcentajes);
			function porcentajes(data,id)
				{
					db.collection('usuarios').update({"_id":id},{"$set":{"porcentajes":data}},function(err){
					if(err)	throw err;
					});
					console.log(data);
				}
		});
	app.get("/alimentacion",function(req,res){
		res.render("alimentacion.html",{"title":"Alimentacion"});
	});


}

