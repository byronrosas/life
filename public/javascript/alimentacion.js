var socket=io.connect();
    if(!localStorage.id)
    		{
    			location.href="/menu";
    		}
    	$(document).on('ready',function(){

    		var proteina=0,
    		hidratos=0,
    		grasas=0,
    		vitaminas=0,
    		minerales=0,
    		fibra=0,
    		id=localStorage.id,
    		edad=localStorage.edad,
    		sexo=localStorage.sexo;
    		$('.alimentos').draggable(
    				{
                        
    					helper:dragimg
    				}
    			);
    		$('#canasta').droppable(
    				{
    					accept:".alimentos",
    					drop:drop
    				}
    		);

    		$('#menu').on('click',function(e)
    			{
    				operaciones();
    			});
    		
    		function dragimg(event)
    		{
    			var draggable=event.target;
    			var data_img=$(draggable).attr('data-img');
                
    			return $("<img src='/images/"+data_img+"'>");
    		}

            

    		function drop(event,ui)
    		{
    			var draggableObject=ui.draggable;
    			proteina=draggableObject.data('proteina')+proteina;
    			hidratos=draggableObject.data('hidratos')+hidratos;
    			grasas=draggableObject.data('grasas')+grasas;
    			vitaminas=draggableObject.data('vitaminas')+vitaminas;
    			minerales=draggableObject.data('minerales')+minerales;
    			fibra=draggableObject.data('fibra')+fibra;
    			localStorage.proteina=proteina;
    			localStorage.hidratos=hidratos;
    			localStorage.grasas=grasas;
    			localStorage.vitaminas=vitaminas;
    			localStorage.minerales=minerales;
    			localStorage.fibra=fibra;
                
    		}

    		function operaciones()
    		{
    			if(edad>=1 && edad<=14)
    			{
    				porcentajes(146.26,164.11,83.88,32.41,7.71,56.2);
    			}
                if(edad>=15 && edad<=54)
                {
                    porcentajes(104.78,201.55,74.07,191.49,7.11,15.1);
                }
    			if(edad==1)
    			{
    				porcentajes(156.44,224.54,104.37,33.60,8.34,14.6);
    			}
    			if(edad>=55 && sexo=="M")
    			{
    				porcentajes(70.43,174.11,70.68,2.35,5.32,9.7);
    			}
    			if(edad>=55 && sexo=="F")
    			{
    				porcentajes(74.53,137.53,67.43,2.1,349,29.5);
    			}


    			
    		}

    		function porcentajes(proteina,hidratos,grasas,vitaminas,minerales,fibra)
    			{
    				var proteina_porcentaje=Math.ceil(((localStorage.proteina*100)/proteina)*100)/100;
    				 var hidratos_porcentaje=Math.ceil(((localStorage.hidratos*100)/hidratos)*100)/100;
    				var grasas_porcentaje=Math.ceil(((localStorage.grasas*100)/grasas)*100)/100;
    				var vitaminas_porcentaje=Math.ceil(((localStorage.vitaminas*100)/vitaminas)*100)/100;
    				var minerales_porcentaje=Math.ceil(((localStorage.minerales*100)/minerales)*100)/100;
    				var fibra_porcentaje=Math.ceil(((localStorage.fibra*100)/fibra)*100)/100;
    				
    				var porcentajes_total={		
    											"proteina_porcentaje":proteina_porcentaje,
    											"hidratos_porcentaje":hidratos_porcentaje,
    											"grasas_porcentaje":grasas_porcentaje,
    											"vitaminas_porcentaje":vitaminas_porcentaje,
    											"minerales_porcentaje":minerales_porcentaje,
    											"fibra_porcentaje":fibra_porcentaje
    										};
    				socket.emit('porcentajes',porcentajes_total,id);

    			}


    		
    	});