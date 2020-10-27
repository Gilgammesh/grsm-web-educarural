$(function () {

    $.ajax({
        dataType: 'json',
        url: "./GsonData?url=DataPie",
        cache: false,
        success: function (response) {            
                       
            if(response.datos2!=null){                
                $("#nombreResponsable").append(response.datos2.retrRepresentante);
                $("#resolucion").append(response.datos2.retrDetalle);   
                $("#reponsableAIP").show(); 
            }else{
                $("#reponsableAIP").hide();                
            }
            
            if(response.datos3!=null){
                $("#nombreResponsable2").append(response.datos3.retrRepresentante);
                $("#resolucion2").append(response.datos3.retrDetalle);
                $("#reponsableAPI").show(); 
            }else{
                $("#reponsableAPI").hide();                
            }
            
           
            
        }
    });
});

