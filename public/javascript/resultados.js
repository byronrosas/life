 if(!localStorage.id)
    		{
    			location.href="/menu";
    		}

   $(document).on('ready',function(){
			var socket=io.connect();
			socket.emit('usuario',localStorage.id);
			socket.on('datos',function(data){
				
				if(!data.citas || !data.enfermedad)
				{
					$('#ar_medica').css('display','none');
					$('#ar_medica_msg').html('No has ingresado ningún dato. <a href="/med">Ir al menú área médica.</a>');
				}
				else
				{
					$('label[for=fech_ultima_cita]').html(aux(data.citas.ultima_cita));
					$('label[for=fech_prox_cita]').html(aux(data.citas.siguiente_cita));
					$('label[for=medico_dato]').html(aux(data.enfermedad.medico));
					$('label[for=especialidad_dato]').html(aux(data.enfermedad.especialidad));
					$('label[for=enfermedad_dato]').html(aux(data.enfermedad.enfermedad));
					$('label[for=telefono_dato]').html(aux(data.enfermedad.telf));
					$('label[for=direccion_dato]').html(aux(data.enfermedad.dir_hosp));
				}
			
				if(!data.porcentajes)
				{
					$('#alimentacion').css('display','none');
					$('#alimentacion_msg').html('No has ingresado ningún dato.<a href="/alimentacion">Ir al menú alimentación.</a>');
				}
				else
				{


					$('#progressbar_proteinas').css(
					{
						width:convertir(data.porcentajes.proteina_porcentaje,1)+"%"
					});
				$('#progressbar_hidratos').css(
					{
						width:convertir(data.porcentajes.hidratos_porcentaje,2)+"%"
					});
				$('#progressbar_grasas').css(
					{
						width:convertir(data.porcentajes.grasas_porcentaje,3)+"%"
					});
				$('#progressbar_vitaminas').css(
					{
						width:convertir(data.porcentajes.vitaminas_porcentaje,4)+"%"
					});
				$('#progressbar_minerales').css(
					{
						width:convertir(data.porcentajes.minerales_porcentaje,5)+"%"
					});
				$('#progressbar_fibra').css(
					{
						width:convertir(data.porcentajes.fibra_porcentaje,6)+"%"
					});
			

				}
				if(!data.ejercicios)
				{
					$('#ejercicio').css('display','none');
					$('#ejercicio_msg').html('No has ingresado ningún dato.<a href="/ejercicios">Ir al menú deporte.</a>');
				}
				else
				{
					var data2=JSON.parse(data.ejercicios);

				$('#progressbar_aerobicos').css(
					{
						width:convertir(data2.ejercicio[0].porc,7)+"%"
					});
				$('#progressbar_anaerobicos').css(
					{
						width:convertir(data2.ejercicio[1].porc,8)+"%"
					});
				$('#progressbar_am').css(
					{
						width:convertir(data2.ejercicio[2].porc,9)+"%"
					});
				$('#progressbar_ninguno').css(
					{
						width:convertir(data2.ejercicio[3].porc,10)+"%"
					});
				$('#progressbar_otros').css(
					{
						width:convertir(data2.ejercicio[4].porc,11)+"%"
					});

				}
				
				if(!data.estres)
				{
					$('#estres').css('display','none');
					$('#estres_msg').html('No has ingresado ningún dato.<a href="/diversion">Ir al menú estres.</a>');
				}
				else
				{
					var data3=JSON.parse(data.estres);
					$('#progressbar_fisico').css(
					{
						width:convertir(data3.estress[0].porc,12)+"%"
					});
				$('#progressbar_psicologico').css(
					{
						width:convertir(data3.estress[1].porc,13)+"%"
					});
				$('#progressbar_social').css(
					{
						width:convertir(data3.estress[2].porc,14)+"%"
					});




				}

				
				function convertir(datos,val)
				{
					
					if(datos<=98)
					{
						
						$('label[for=valor'+val+']').html(datos+"%");

						return datos;
					}
					else if(datos>=99)
					{
						datos=100;
						$('label[for=valor'+val+']').html(datos+"%");
						return datos;
					}
					else if(typeof datos=="undefined")
					{
						$('label[for=valor'+val+']').html(0+"%");
						return 0;
					}
					else if(datos==null)
					{
						
						$('label[for=valor'+val+']').html(0+"%");
						return 0;	
					}
				}


				function aux(dato)
				{
					if(dato)
					{
						return dato;	
					}
					else if(typeof dato=="undefined")
					{
						return "No has llenado este dato.";
					}
					else
					{
						return "No has llenado este dato.";
					}
					
				}
				


				


				
			});
		});