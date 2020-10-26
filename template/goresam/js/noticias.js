
$(function () {
    $.ajax({dataType: 'json', url: "./Logg?pagina=NOTICIA"});
    /*........................................................................*/
    dataSelect();
    dataNoticia();
    $("#AnoNoticia").bind("change", function () {
        dataNoticia();
    });
    $("#buscar").keyup(function () {
        dataNoticia();
    });
    /*...............*/
    function dataNoticia() {

        var totalPages = 0;
        var visiblePages = 0;
        $.ajax({
            dataType: 'json',
            async: false,
            url: "./GsonData?url=DataNoticiasTotal&ano=" + $("#AnoNoticia").val() + "&buscar=" + $("#buscar").val(),
            cache: false,
            success: function (response) {
                totalPages = response.total;
                visiblePages = response.visiblePages;
            }

        });
        $("#segementoNoticias").show();
        $("#segementoAlerta").hide();
        if (totalPages == 0) {
            $("#segementoNoticias").hide();
            $("#segementoAlerta").show();
        }

        $("#page-selection").twbsPagination('destroy');
        $('#page-selection').twbsPagination({
            totalPages: totalPages,
            visiblePages: visiblePages,
            onPageClick: function (event, page) {

                $('#listaNoticias').empty();
                $.ajax({
                    dataType: 'json',
                    url: "./GsonData?url=DataNoticias&pagina=" + page + "&ano=" + $("#AnoNoticia").val() + "&buscar=" + $("#buscar").val(),
                    cache: false,
                    success: function (response) {

                        var conte = "";
                        var listaId = new Array();
                        var listaNoticias = new Array();
                        var listaFotos = new Array();
                        var listaFechaPublicacion = new Array();
                        var contador = 0;
                        $.each(response.datosNotocias, function (index, data) {
                            listaId[contador] = data.id;
                            listaNoticias[contador] = data.titulo;
                            listaFotos[contador] = data.ruta;
                            listaFechaPublicacion[contador] = data.FechaPublicacion;
                            contador++;
                        });

                        var nroRegistro = contador;
                        var count = 1;
                        var cantidadFilas = Math.ceil(nroRegistro / 4);
                        if (cantidadFilas == 0) {
                            cantidadFilas = 1;
                        }


                        for (f = 1; f <= cantidadFilas; f++) {

                            var conte2 = "";
                            for (c = 1; c <= 4; c++) {
                                if (count <= nroRegistro) {
                                    conte2 += "<div class='col-md-3' style='margin-bottom:15px;'><div class='card'><div class='CONIMG' style='position: relative;height:155px'><img style='display:none' class='IMGREAL  center-block' src='img.jpg?ruta=" + listaFotos[count - 1] + "' /> </div><div class='content-info'><p class='tituloPublicacion' ><i class='fa fa-check-circle'></i> Publicado : " + listaFechaPublicacion[count - 1] + "</p><p class='title'>" + listaNoticias[count - 1] + "</p><p class='btnGo'><a class='form-control btn btn-default' href='./Noticias?url=noticia&id=" + listaId[count - 1] + "'>Enterate más ></a></p></div></div>      </div>";
                                }
                                count++;
                            }
                            conte += "<div class='col-md-12 ' style='margin-top:20px;'>" + conte2 + "</div>";
                        }

                        $("#listaNoticias").append(conte);


                        var contWidth = $(".CONIMG").width();
                        var contHeight = $(".CONIMG").height();

                        $('.IMGREAL').load(function () {

                            $(this).each(function () {

                                if (this.height > this.width) {

                                    this.style = "height:100%;";
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







                    }

                });
            }

        });
    }

    function dataSelect() {
        $.ajax({
            dataType: 'json',
            url: "./GsonData?url=DataNoticiasFecha",
            success: function (data) {
                var cadenaAnos = "";
                for (x = data.fechaMax; x >= data.fechaMin; x--) {
                    cadenaAnos += "<option value='" + x + "'>" + x + "</option>";
                }
                $("#AnoNoticia").append(cadenaAnos);
            }

        });
    }




});
