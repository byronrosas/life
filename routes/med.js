module.exports=function(app,db,io)
{
	app.get("/med",function(req,res){
		res.render("med.html",{"title":"Area Médica"});
	});

	io.sockets.on('connection',function(socket){
		socket.on('enfermedad',enfermedad);
		socket.on('citas',citas);
	});

	function enfermedad(data,id)
	{
		console.log(data);
		db.collection('usuarios').update({"_id":id},{"$set":{"enfermedad":data}},function(err){if(err) throw err;});
	}
function citas(data,id)
	{
		console.log(data);
		db.collection('usuarios').update({"_id":id},{"$set":{"citas":data}},function(err){if(err) throw err;});
	}
}