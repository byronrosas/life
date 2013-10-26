 if(!localStorage.id)
    		{
    			location.href="/menu";
    		}
$(document).on('ready',function(){
	
	var datos=[],
	socket=io.connect();
	$('input[name=enfermedades]').click(function(){
		var rd_enfermedad=$(this).attr('id');
		$('#div_frm_secundario').css('display','inline-block');
		$('input[name=cerrar_frm_sec]').click(function(){
			$('#div_frm_secundario').css('display','none');
			
		});
		frm_sec(rd_enfermedad);
	});
function frm_sec(rd_enfermedad)
{
	$('#frm_secundario').submit(function(e){
		e.preventDefault();
		var text_med=$('input[name="nombre_medico"]').val();
		var text_especialidad=$('input[name="especialidad"]').val();
		var text_num_telf=$('input[name="numero_telf"]').val();
		var text_dir_hosp=$('input[name="dir_hospital"]').val();
		var datos_enfermedad={"enfermedad":rd_enfermedad,"medico":text_med,"especialidad":text_especialidad,"telf":text_num_telf,"dir_hosp":text_dir_hosp};

		socket.emit('enfermedad',datos_enfermedad,localStorage.id);
		$('#div_frm_secundario').css('display','none');
		
	});

	$('#menu').on('click',function(){
		var ultima_cita=$('input[name=ultima_cita]');
		var siguiente_cita=$('input[name=siguiente_cita]');
		var citas={"ultima_cita":ultima_cita.val(),"siguiente_cita":siguiente_cita.val()};
		socket.emit('citas',citas,localStorage.id);
	});

}
$('#date').datepicker();
$('#date2').datepicker();
});