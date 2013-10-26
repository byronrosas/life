module.exports=function(app,db,io)
{


io.sockets.on('connection',function(socket){
			socket.on('usuario',data);
			});
	
	app.get('/resultados',function(req,res){
		
		res.render('resultados.html');
	});


	function data(data){
					db.collection('usuarios').findOne({"_id":data},function(err,doc)
					{
						if(err) throw err;
						if(doc==null)
					{
				console.log('no encontrado');
					}
					else
					{
						console.log(doc);
						io.sockets.emit('datos',doc);
					}
					});


			}

}