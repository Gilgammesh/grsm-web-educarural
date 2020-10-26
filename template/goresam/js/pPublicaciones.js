$(function () {
    $.ajax({
        dataType: 'json',
        url: "./GsonData?url=DataPublicaciones",
        cache: false,
        success: function (response) {

            var conthead = "";
            $.each(response.datos, function (index, data) {
                var rutaFija = "./GsonData?url=PdfPublicaciones&ruta=" + data.publEnlace;
                var rutaFija2 = "./Descargas?format=downloadZip&ruta=" + data.publEnlace;
                if (data.publTipoPublicacion == 0) {
                    conthead += "<li class='news-item'>" + data.publTitulo + "<br/> <a class='link-publicacion' href='" + data.publEnlace + "' target='_blank'> Leer mas ...</a></li>";
                } else {
                    if (data.publEnlace.indexOf('.rar') != -1 || data.publEnlace.indexOf('.RAR') != -1 || data.publEnlace.indexOf('.zip') != -1 || data.publEnlace.indexOf('.ZIP') != -1) {

                        conthead += "<li class='news-item'>" + data.publTitulo + "<br/> <a class='link-publicacion' href='" + rutaFija2 + "'> Leer mas ...</a></li>";
                    } else {
                        conthead += "<li class='news-item'>" + data.publTitulo + "<br/> <a class='link-publicacion' href='" + rutaFija + "' target='_blank'> Leer mas ...</a></li>";
                    }
                }

            });

            var contPublicaciones = "<ul id='publicaciones' class='publi' style='overflow-y: hidden;'>" + conthead + "</ul>";
            $("#publicaciones").append(contPublicaciones);
        }

    });

    $.ajax({
        dataType: 'json',
        url: "./GsonData?url=DataPublicacionesBanner",
        cache: false,
        success: function (response) {

            var conthead = "";
            var contador = 0;

            var cambio = new Date();

            var dia = cambio.getDate();
            var mes = cambio.getMonth() + 1;
            var ano = cambio.getFullYear();
            var hoy = new Date("" + mes + "-" + dia + "-" + ano);

            $.each(response.datos, function (index, data) {
                var rutaFija = "./GsonData?url=PdfPublicaciones&ruta=" + data.publEnlace;
                var rutaFija2 = "./Descargas?format=downloadZip&ruta=" + data.publEnlace;
                var rutax = "";

                if (data.publEnlace.indexOf('.rar') != -1 || data.publEnlace.indexOf('.RAR') != -1 || data.publEnlace.indexOf('.zip') != -1 || data.publEnlace.indexOf('.ZIP') != -1) {
                    rutax = rutaFija2;
                } else {
                    rutax = rutaFija;
                }

                if (data.publFechaFin == null) {

                    if (contador == 0) {
                        if (data.publTipoPublicacion == 0) {
                            conthead += "<div class='item active'><div class='col-md-3 anchoImagen' style='padding:0px;height:198px;width:100%;'><a href='" + data.publEnlace + "' target='_blank' ><img style='width:100%;height:100%;' src='./img.jpg?ruta=" + data.publBanner + "&pagina=fotoBanner' /></a></div></div>";
                        } else {
                            conthead += "<div class='item active'><div class='col-md-3 anchoImagen' style='padding:0px;height:198px;width:100%;'><a href='" + rutax + "' ><img style='width:100%;height:100%;' src='./img.jpg?ruta=" + data.publBanner + "&pagina=fotoBanner' /></a></div></div>";


                        }
                    } else {
                        if (data.publTipoPublicacion == 0) {
                            conthead += "<div class='item'><div class='col-md-3 anchoImagen' style='padding:0px;height:198px;width:100%;'><a href='" + data.publEnlace + "' target='_blank' ><img  style='width:100%;height:100%;' src='./img.jpg?ruta=" + data.publBanner + "&pagina=fotoBanner' /></a></div></div>";
                        } else {
                            conthead += "<div class='item'><div class='col-md-3 anchoImagen' style='padding:0px;height:198px;width:100%;'><a href='" + rutax + "' ><img style='width:100%;height:100%;' src='./img.jpg?ruta=" + data.publBanner + "&pagina=fotoBanner' /></a></div></div>";

                        }
                    }

                    contador++;

                } else {

                    if (hoy.getTime() <= new Date(data.publFechaFin).getTime()) {
                        if (contador == 0) {
                            if (data.publTipoPublicacion == 0) {
                                conthead += "<div class='item active'><div class='col-md-3 anchoImagen' style='padding:0px;height:198px;width:100%;'><a href='" + data.publEnlace + "' target='_blank'><img style='width:100%;height:100%;' src='./img.jpg?ruta=" + data.publBanner + "&pagina=fotoBanner' /></a></div></div>";
                            } else {
                                conthead += "<div class='item active'><div class='col-md-3 anchoImagen' style='padding:0px;height:198px;width:100%;'><a href='" + rutax + "' ><img style='width:100%;height:100%;' src='./img.jpg?ruta=" + data.publBanner + "&pagina=fotoBanner' /></a></div></div>";
                            }

                        } else {
                            if (data.publTipoPublicacion == 0) {
                                conthead += "<div class='item'><div class='col-md-3 anchoImagen' style='padding:0px;height:198px;width:100%;'><a href='" + data.publEnlace + "' target='_blank'><img style='width:100%;height:100%;' src='./img.jpg?ruta=" + data.publBanner + "&pagina=fotoBanner' /></a></div></div>";
                            } else {
                                conthead += "<div class='item'><div class='col-md-3 anchoImagen' style='padding:0px;height:198px;width:100%;'><a href='" + rutax + "' ><img style='width:100%;height:100%;' src='./img.jpg?ruta=" + data.publBanner + "&pagina=fotoBanner' /></a></div></div>";

                            }

                        }
                        contador++;
                    }



                }
            });


            if (contador == 0) {
                $("#divInteres").hide();
                $("#divPublicaciones").removeClass("col-md-6");
                $("#divPublicaciones").addClass("col-md-9");
            } else {
                $("#divInteres").show();
                $("#divPublicaciones").removeClass("col-md-9");
                $("#divPublicaciones").addClass("col-md-6");

            }

            $("#banners").append(conthead);
        }

    });

});