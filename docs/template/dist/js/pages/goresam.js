var top_menu_height = 0;

// HEAD SLIDER
$(document).ready(function () {
    $('#CarouselHead').carousel({
        interval: 5000
    });

})

jQuery(function ($) {
    $(window).load(function () {
        $('.external-link').unbind('click');
    });

    $(document).ready(function () {
        top_menu_height = $('.goresam-top-menu').height();
        $('body').scrollspy({target: '#goresam-nav-bar', offset: top_menu_height + 10});
        $('.external-link').unbind('click');
        $('.goresam-top-menu .navbar-nav a').click(function (e) {
            e.preventDefault();
            var linkId = $(this).attr('href');
            scrollTo(linkId);
            if ($('.navbar-toggle').is(":visible") == true) {
                $('.navbar-collapse').collapse('toggle');
            }
            $(this).blur();
            return false;
        });
        $('.goresam-top-menu ').stickUp();

    });
});


// Animacion
function scrollTo(selectors)
{

    if (!$(selectors).size())
        return;
    var selector_top = $(selectors).offset().top - top_menu_height;
    $('html,body').animate({scrollTop: selector_top}, 'slow');

}

// noticias 

$(document).ready(function () {


})





/*
 $(window).load(function () {
 var boxheight = $('#myCarousel .carousel-inner').innerHeight();
 var itemlength = $('#myCarousel .item').length;
 var triggerheight = Math.round(boxheight / itemlength + 1);
 $('#myCarousel .list-group-item').outerHeight(triggerheight);
 });
 
 
 
 //noticias moviles
 $(document).ready(function () {
 //Set the carousel options
 $('#quote-carousel').carousel({
 pause: true,
 interval: 4000,
 });
 }); */

/*////////////CARGAR SLIDER PARTICIPANTES//////////////*/
$(function () {


    /*$(".publi").bootstrapNews({
     newsPerPage: 5,
     autoplay: true,
     pauseOnHover: true,
     navigation: false,
     direction: 'down',
     newsTickerInterval: 3000,
     onToDo: function () {
     //console.log(this);
     }
     });*/

});

(function ($) {
    $.get = function (key) {
        key = key.replace(/[\[]/, '\\[');
        key = key.replace(/[\]]/, '\\]');
        var pattern = "[\\?&]" + key + "=([^&#]*)";
        var regex = new RegExp(pattern);
        var url = unescape(window.location.href);
        var results = regex.exec(url);
        if (results === null) {
            return null;
        } else {
            return results[1];
        }
    }
})(jQuery);  


/*MINIVIDEOS-SEÑAS..........................*/
var myVar; 
/*$(".minivideo").mouseenter(function() {   
   // var this_ = this;
    createViewvideo(this);
    
    
    
}).mouseleave(function() {
    clearTimeout(myVar);       
    $(".viewMinivideo").remove();
});*/

$(".minivideo").click(function() {   
    if($(".viewMinivideo").length){
        $(".viewMinivideo").remove();
        clearTimeout(myVar);    
    }else{
        createViewvideo(this);
    }
        
}).mouseleave(function() {
    $(".viewMinivideo").remove();
})

function createViewvideo(this_){
    
    $(this_).css("cursor","pointer");
    myVar = setTimeout(function(){      
        var position = $(this_).position();  
        
        var left = (($(this_).width()/2) - (200/2))+position.left; 
        
        var pad = $(this_).css("padding").split("px")[0];
        var padtop = $(this_).css("padding-top").split("px")[0];
        var padbutton = $(this_).css("padding-bottom").split("px")[0];
         
        var top = position.top+$(this_).height()+10+parseInt(pad)+parseInt(padtop)+parseInt(padbutton);
        
        $.ajax({
            dataType: 'json',
            url: "./GsonData?url=DataGetMinivideo&component="+$(this_).attr("data-minivideo"),
            success: function (response) { 
               $(this_).after("<div id='"+response.componente+"' class='viewMinivideo' style='left:"+left +"px;top:"+top+"px;position:absolute;z-index:2000;width:200px;height:200px;border:1px solid #DDDDDD;background-color:white;-webkit-box-shadow: -1px 0px 14px 1px rgba(0,0,0,0.40);-moz-box-shadow: -1px 0px 14px 1px rgba(0,0,0,0.40);box-shadow: -1px 0px 14px 1px rgba(0,0,0,0.40);'><img src='./img.jpg?ruta="+response.ruta+"&pagina=fotoPortal&a="+Math.random()+"' width='100%' height:100%;></div>");
            }
        });
    }, 900);
}