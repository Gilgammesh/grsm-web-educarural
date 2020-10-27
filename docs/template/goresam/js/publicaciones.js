$(function () {
    $.ajax({dataType: 'json', url: "./Logg?pagina=PUBLICACIONES"});
    /*..........................................................*/
    dataSelect();
    dataPublicacion();
    $("#AnoPublicacion").bind("change", function () {
        dataPublicacion();
    });
    $("#buscar").keyup(function (e) {
        dataPublicacion();
    });

    //..........................................................        
    function dataPublicacion() {

        var totalPages = 0;
        var visiblePages = 0;
        $.ajax({
            dataType: 'json',
            async: false,
            cache: false,
            url: "./GsonData?url=DataListaPublicacionesTotal&ano=" + $("#AnoPublicacion").val() + "&buscar=" + $("#buscar").val() + "&pagina=0",
            success: function (response) {
                totalPages = response.total;
                visiblePages = response.visiblePages;
            }

        });

        $("#segementoPublicaciones").show();
        $("#segementoAlerta").hide();
        if (totalPages == 0) {
            $("#segementoPublicaciones").hide();
            $("#segementoAlerta").show();
        }

        $("#page-selection").twbsPagination('destroy');
        $('#page-selection').twbsPagination({
            totalPages: totalPages,
            visiblePages: visiblePages,
            onPageClick: function (event, page) {

                $('#listaPublicaciones').empty();
                $.ajax({
                    dataType: 'json',
                    async: false,
                    cache: false,
                    url: "./GsonData?url=DataListaPublicaciones&pagina=" + page + "&ano=" + $("#AnoPublicacion").val() + "&buscar=" + $("#buscar").val(),
                    success: function (response) {
                        var conten = "";
                        $.each(response.datos, function (index, data) {
                            var rutaFija = "./GsonData?url=PdfPublicaciones&ruta=" + data.publEnlace;
                            var rutaFija2 = "./Descargas?format=downloadZip&ruta=" + data.publEnlace;
                            var rutax = "";
                            if (data.publEnlace.indexOf('.rar') != -1 || data.publEnlace.indexOf('.RAR') != -1 || data.publEnlace.indexOf('.zip') != -1 || data.publEnlace.indexOf('.ZIP') != -1) {
                                rutax = rutaFija2;
                            } else {
                                rutax = rutaFija;
                            }

                            if (data.publTipoPublicacion == 0) {
                                conten += "<div class='col-md-12 espacio-top'><div class='list-group-item '><div class='media'><div class='media-left'><div class='fa fa-pinterest-p fa-2x icono-publicidad'></div></div><div class='media-body'><strong>Publicado : " + data.publFechaInicio + "</strong><a class='link-hover' href='" + data.publEnlace + "' target='_blank'><p>" + data.publTitulo + "</p></a></div></div></div></div>";
                            } else {
                                conten += "<div class='col-md-12 espacio-top'><div class='list-group-item '><div class='media'><div class='media-left'><div class='fa fa-pinterest-p fa-2x icono-publicidad'></div></div><div class='media-body'><strong>Publicado : " + data.publFechaInicio + "</strong><a class='link-hover' href='" + rutax + "' target='_blank' ><p>" + data.publTitulo + "</p></a></div></div></div></div>";

                            }
                        });
                        $('#listaPublicaciones').append(conten);
                    }

                });

            }

        });

    }

    function dataSelect() {
        $.ajax({
            dataType: 'json',
            url: "./GsonData?url=DataPublicacionesFecha",
            cache: false,
            success: function (data) {
                var cadenaAnos = "";
                for (x = data.fechaMax; x >= data.fechaMin; x--) {
                    cadenaAnos += "<option value='" + x + "'>" + x + "</option>";
                }
                $("#AnoPublicacion").append(cadenaAnos);
            }

        });

    }


});