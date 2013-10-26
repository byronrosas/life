var socket=io.connect();
$(document).on("ready",function()
	{
		if(localStorage.id)
		{
			$('#log_reg').css('display','none');
		}
		if(sessionStorage.usuario_existente)
		{
			$('label[for="noEncontrado"]').html(sessionStorage.usuario_existente+'</br>');
			sessionStorage.clear();
		}
		else
		{
			socket.on('registrado',function(data)
				{
					localStorage.id=data._id;
					localStorage.edad=data.edad;
					localStorage.sexo=data.rd_sexo;
				});
		}
		
		
		$('#bttenviar_registro').on('click',function(){

		if($('.reg').css('display')=="inline-block")
		{
			login();
			enviar();

		}
		else
		{
			registro();
			enviar();
			console.log($('.reg').css('display'));
		}
		});
		enviar_log();
		console.log($('.reg').css('display'));
	});

function menu(e)
		{
				location.href="/"+e;
		}

function registro()
		{
			$('.reg').css('display','inline');
			$('#txtusuario').css('display','none');
			$('#bttenviar_registro').attr('value','Volver al login');			
			if(!Modernizr.inputtypes.number)
		{
		$('#spinner').spinner(
  {min: 1, max: 120,widget:"destroy"}
);
		}
		}
function login()
		{
			$('.reg').css('display','none');
			$('#txtusuario').css('display','inline');
			$('#bttenviar_registro').attr('value','Registrarse');						
			if(!Modernizr.inputtypes.number)
			{
			$('#spinner').spinner('destroy');
			}

		}

function enviar()
{
	var textusuario=$('input[name="textusuario2"]');
	var textedad=$('input[name="textedad"]');
	$("input:radio[name=rd_sexo]").click(function() {
    var rd_sexo=$(this).val();
    submit(rd_sexo);
});

	function submit(rd_sexo)
	{
	$('#frm').submit(function(event){
				event.preventDefault();
				$('#log_reg').css('display','none');
				socket.emit('reg',{"_id":textusuario.val(),
									"edad":textedad.val(),
									"rd_sexo":rd_sexo});
				socket.on('usuario_existente',function(data)
					{
							location.href='/menu';
							sessionStorage.usuario_existente=data.msg;
													
					});
			});
	}
	
}


function enviar_log()
{
	
		var textusuario=$('input[name="textusuario"]');
		$('#frm').submit(function(event){
				event.preventDefault();

				if($('#txtusuario').css('display')=="inline-block")
					socket.emit('log',{"_id":textusuario.val()});
					socket.on('encontrado',function(data){
							
						$('#log_reg').css('display','none');
						console.log(data);
						localStorage.id=data._id;
						localStorage.edad=data.edad;
						localStorage.sexo=data.rd_sexo;
					});
					socket.on('noEncontrado',function(data){
						$('#log_reg').css('display','inline-block');
						$('label[for="noEncontrado"]').html(data.msg+'</br>');
						console.log(data.msg);
					
					});
				

			});
	
	
}