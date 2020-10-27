$(function () {

    $.ajax({
        dataType: 'json',
        url: "./GsonData?url=DataNoti",
        cache: false,
        success: function (response) {
            var index = 0;
            var des = "";
            var titu = "";
            var count = 0;
            $.each(response, function () {

                if (index == 0) {
                    des += '<div class="item active"><div class="divIMAGEN" style="position: relative;height:405px;"><img style="display:none" class="IMGREAL  center-block" src="./img.jpg?ruta=' + this.ruta + '" ></div><div class="carousel-caption"><h4><a target="_blank" class="anaranja" style="font-size:15px;" href="./Noticias?url=noticia&id=' + this.id + '">' + this.titulo + '</a></h4><p>' + this.detalle + '<a class="label label-warning" href="./Noticias?url=noticia&id=' + this.id + '" target="_blank">Leer más...</a></p></div></div>';
                } else {
                    des += '<div class="item"><div class="divIMAGEN" style="position: relative;height:405px;" ><img class="IMGREAL center-block"  src="./img.jpg?ruta=' + this.ruta + '" ></div><div class="carousel-caption"><h4><a target="_blank" class="anaranja" style="font-size:15px;" href="./Noticias?url=noticia&id=' + this.id + '">' + this.titulo + '</a></h4><p>' + this.detalle + '<a class="label label-warning" href="./Noticias?url=noticia&id=' + this.id + '" target="_blank">Leer más...</a></p></div></div>';
                }

                if (index == 0) {
                    titu += '<li data-target="#myCarousel2" data-slide-to="' + index + '" class="list-group-item active"><h4 style="font-size:11px;">' + this.titulo + '</h4></li>';
                } else {
                    titu += '<li data-target="#myCarousel2" data-slide-to="' + index + '" class="list-group-item "><h4 style="font-size:11px;">' + this.titulo + '</h4></li>';
                }


                index++;
            });
            $("#todoNoticia").append("<div id='myCarousel2' class='carousel slide' data-ride='carousel' ><div class='carousel-inner' id='resultNoti'>" + des + " </div><ul class='list-group col-sm-4' id = 'tituloNoti'> " + titu + " </ul>   <div id='controlNoti' class='carousel-controls'><a class='left carousel-control' href='#myCarousel2' data-slide='prev'><span class='glyphicon glyphicon-chevron-left'></span></a><a class='right carousel-control' href='#myCarousel2' data-slide='next'><span class='glyphicon glyphicon-chevron-right'></span></a></div>  </div>")
            /*..................................................................*/


            var contWidth = $("#resultNoti").width();
            var contHeight = $("#resultNoti").height();

            $('.IMGREAL').load(function () {

                $(this).each(function () {

                    if (this.height > this.width) {

                        this.style = "display:block;height:100%;";
                        var porcentageWidth = (this.width * 100) / contWidth;
                        porcentageWidth = Math.round(porcentageWidth * 10) / 10;
                        this.style = "display:block;max-height:100%;max-width:" + porcentageWidth + "%;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;";
                    }

                    if (this.width > this.height) {
                        if (this.height > contHeight) {
                            this.style = "display:block;max-height:100%;max-width:100%;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;";
                        } else {
                            this.style = "display:block;height:auto;max-width:100%;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;";
                        }
                    }
                    if (this.width == this.height) {
                        this.style = "display:block;max-height:100%;max-width:100%;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;";
                    }

                });
            });

            /*....................................................................*/

            var clickEvent = false;
            $('#myCarousel2').on('click', '.list-group li', function () {
                clickEvent = true;
                $('.list-group li').removeClass('active');
                $(this).addClass('active');
            }).on('slid.bs.carousel', function (e) {
                if (!clickEvent) {
                    var count = $('.list-group').children().length - 1;
                    var current = $('.list-group li.active');
                    current.removeClass('active').next().addClass('active');
                    var id = parseInt(current.data('slide-to'));
                    if (count == id) {
                        $('.list-group li').first().addClass('active');
                    }
                }
                clickEvent = false;
            });

            // alert($("#tituloNoti").height());



        }
    });




    /*jQuery('.IMG0').each(function () {
     var width = this.width();
     
     
     var new_width = 100; //nuevo tamaño
     if (width > new_width) {
     var height = jQuery(this).height();
     var calculo = Math.round((100 * new_width) / width); //porcentaje
     var new_height = Math.round((height * calculo) / 100);
     jQuery(this).css({
     width: new_width + 'px',
     height: new_height + 'px'
     });
     }
     });*/


});

