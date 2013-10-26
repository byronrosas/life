 if(!localStorage.id)
    		{
    			location.href="/menu";
    		}

    		$(document).on('ready',function(){
			var razon,
				min_pulso,
				min_edad,
				val=0,
				pulsaciones_minutos_var=0,
				arr_tipo_ejercicio=[],
				arr_valor_ejercicio=[],
				arr_porcentaje_ejercicio=[];
			var socket=io.connect();
			if(!Modernizr.inputtypes.number)
			{
			$('#spinner').spinner({
				min:0,
				max:150,
				step:10
			});
			}
			$('.capa2').on('click',function(e){
				var seleccion=$(this).attr('id');
				var pocentaje_esfuerzo=parseFloat($(this).attr('data-porcentaje'));
				localStorage.aux=pocentaje_esfuerzo;
				localStorage.ejercicio=seleccion;
				console.log(seleccion);
				$('#tiempo').css('display','block');
				$('#volver').click(function(){
					$('#tiempo').css('display','none');
					$('#spinner').val('');
				});
			

			});

			$('#frm').submit(function(e)
			{
				
				
				e.preventDefault();
				//operacion

				var minutos=$('input[name=minutos]').val();
				$('#tiempo').css('display','none');
				$('input[name=minutos]').val("");
				if(localStorage.edad==0)
				{
					razon=120;
					min_pulso=70;
					min_edad=0;
					pulsaciones_minutos(fc_reposo(razon,min_pulso,min_edad),fc_maxima(),minutos);
				}
				if(localStorage.edad>=1 && localStorage.edad<=2)
				{
					razon=50;
					min_pulso=80;
					min_edad=1;
					pulsaciones_minutos(fc_reposo(razon,min_pulso,min_edad),fc_maxima(),minutos);
				}
				if(localStorage.edad>=3 && localStorage.edad<=4)
				{
					razon=40;
					min_pulso=80;
					min_edad=3;
					pulsaciones_minutos(fc_reposo(razon,min_pulso,min_edad),fc_maxima(),minutos);
				}
				if(localStorage.edad>=5 && localStorage.edad<=6)
				{
					razon=40;
					min_pulso=75;
					min_edad=5;
					pulsaciones_minutos(fc_reposo(razon,min_pulso,min_edad),fc_maxima(),minutos);
				}
				if(localStorage.edad>=7 && localStorage.edad<=9)
				{
					razon=20;
					min_pulso=70;
					min_edad=7;
					pulsaciones_minutos(fc_reposo(razon,min_pulso,min_edad),fc_maxima(),minutos);
				}
				if(localStorage.edad>=10 && localStorage.edad<=120)
				{
					razon=0.36;
					min_pulso=60;
					min_edad=10;	
					pulsaciones_minutos(fc_reposo(razon,min_pulso,min_edad),fc_maxima(),minutos);
					
				}

				//location.href="/menu";
			});


			function fc_reposo(razon,min_pulso,min_edad)
			{
				var edad=localStorage.edad-min_edad;
				var fc_reposo=min_pulso+(razon*edad);
				return fc_reposo;
			}
			function fc_maxima()
			{
				if(localStorage.sexo=="M")
				{
					var fc_maxima=220-localStorage.edad;
				}
				else if(localStorage.sexo=="F")
				{
					var fc_maxima=226-localStorage.edad;	
				}
				return fc_maxima;
			}

			function pulsaciones_minutos(fc_reposo,fc_maxima,minutos)
			{
				
				
				pulsaciones_minutos_var=((fc_maxima-fc_reposo)*localStorage.aux)+fc_reposo;
				console.log(pulsaciones_minutos_var);
				arr_tipo_ejercicio.push(localStorage.ejercicio);
				arr_valor_ejercicio.push(pulsaciones_minutos_var*minutos);
			 	enviar(aux(fc_reposo,fc_maxima,minutos),arr_valor_ejercicio,arr_tipo_ejercicio);
				
			}

			function aux(fc_reposo,fc_maxima,minutos)
			{
				
				for (var i = 0.60; i <= 0.90; i=i+0.10) {
					pulsaciones_minutos_var=((fc_maxima-fc_reposo)*i)+fc_reposo;
				val=(pulsaciones_minutos_var*minutos)+val;
				console.log(i,val);
				};	
				pulsaciones_minutos_var=0+fc_reposo;
				val=val+pulsaciones_minutos_var;
				return val;


			}



			function enviar(aux,arr_valor_ejercicio,arr_tipo_ejercicio)
			{
				
				console.log(aux);
				$('#menu').on('click',function(e){
					
					for (var i = arr_tipo_ejercicio.length - 1; i >= 0; i--) {
					arr_porcentaje_ejercicio[i]=Math.ceil(((arr_valor_ejercicio[i]*100)/aux));
					

				};
				var data_h='{ejercicio:[{tipo:"'+arr_tipo_ejercicio[0]+'",porc:'+arr_porcentaje_ejercicio[0]+'},{tipo:"'+arr_tipo_ejercicio[1]+'",porc:'+arr_porcentaje_ejercicio[1]+'},{tipo:"'+arr_tipo_ejercicio[2]+'",porc:'+arr_porcentaje_ejercicio[2]+'},{tipo:"'+arr_tipo_ejercicio[3]+'",porc:'+arr_porcentaje_ejercicio[3]+'},{tipo:"'+arr_tipo_ejercicio[4]+'",porc:'+arr_porcentaje_ejercicio[4]+'}]}';
				data_h=JSON.stringify(eval("(" + data_h + ")"));

				console.log(data_h);
				socket.emit('arr_porcentaje_ejercicio',data_h,localStorage.id);
				
					
				});
			}

			
		});