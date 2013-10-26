 if(!localStorage.id)
    		{
    			location.href="/menu";
    		}
  $(document).on('ready',function()
		{
			var nivel_estres=[],
				valor_nivel=[],
				socket=io.connect();
			
$("input:radio[name=rd_estres1]").click(function() {
    var rd_fisico=$(this).val();
    var rd_data=parseFloat($(this).attr('data-num'));
    var val=(rd_data*100)/105.07;

    submit(rd_fisico,val);
});

			$("input:radio[name=rd_estres2]").click(function() {
    var rd_psicologico=$(this).val();
    var rd_data=parseFloat($(this).attr('data-num'));
    var val=(rd_data*100)/99.89;
    submit(rd_psicologico,val);
});

			$("input:radio[name=rd_estres3]").click(function() {
    var rd_sociales=$(this).val();
    var rd_data=parseFloat($(this).attr('data-num'));
    var val=(rd_data*100)/100;
    submit(rd_sociales,val);
});
		

		function submit(rd,val)
		{
			nivel_estres.push(rd);
			valor_nivel.push(Math.ceil(val));
			console.log(nivel_estres);
				console.log(valor_nivel);
			arr(nivel_estres,valor_nivel);
			
		}
		function arr(tipo,val){

			$('#menu').on('click',function(e){
		
				var data='{estress:[{tipo:"'+tipo[0]+'",porc:'+val[0]+'},{tipo:"'+tipo[1]+'",porc:'+val[1]+'},{tipo:"'+tipo[2]+'",porc:'+val[2]+'}]}';
				data=JSON.stringify(eval("(" + data + ")"));
				console.log(data);
				socket.emit('porcentaje',data,localStorage.id);
			});
		}
			
		});