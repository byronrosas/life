module.exports=function(app,db,io)
{
app.get("/diversion",function(req,res){
	res.render("diversion.html",{"title":"Diversion"});
});

io.sockets.on('connection',function(socket){
	socket.on('porcentaje',data);
});


function data(data,id){
		var data=data.replace("\\",' ');
		
		console.log(data);
	db.collection('usuarios').update({"_id":id},{"$set":{"estres":data}},function(err){if(err) throw err;});
	}
}