$(function () {
    $.ajax({dataType: 'json', url: "./Logg?pagina=DIRECTORIO"});
    /*........................................................................*/
    $("#tipoDirectorio").val(0);
    listarTipoDirectorio();
    dataDirectorio();


    function listarTipoDirectorio() {
        $.ajax({
            dataType: 'json',
            url: "./GsonData?url=DataTipoDirectorio",
            cache: false,
            success: function (response) {

                $.each(response.tipoDirectorio, function (index, value) {
                    var obje = $("<option value=" + value.tigrId + ">" + value.tigrGrupo + "</option>");
                    $("#tipoDirectorio").append(obje);
                });
            }
        });
    }



    $("#tipoDirectorio").bind("change", function () {
        dataDirectorio();
    });

    $("#buscar").keyup(function () {
        dataDirectorio();
    });

    function dataDirectorio() {



        var totalPages = 0;
        var visiblePages = 0;
        $.ajax({
            dataType: 'json',
            async: false,
            url: "./GsonData?url=DataDirectorioTotal&tipo=" + $("#tipoDirectorio").val() + "&buscar=" + $("#buscar").val(),
            cache: false,
            success: function (response) {
                totalPages = response.total;
                visiblePages = response.visiblePages;
            }

        });


        $("#segementoDirectorio").show();
        $("#segementoAlerta").hide();
        if (totalPages == 0) {
            $("#segementoDirectorio").hide();
            $("#segementoAlerta").show();
        }


        $("#page-selection").twbsPagination('destroy');
        $('#page-selection').twbsPagination({
            totalPages: totalPages,
            visiblePages: visiblePages,
            onPageClick: function (event, page) {
                $('#listaDirectorio').empty();
                $.ajax({
                    dataType: 'json',
                    url: "./GsonData?url=DataDirectorio&pagina=" + page + "&tipo=" + $("#tipoDirectorio").val() + "&buscar=" + $("#buscar").val(),
                    cache: false,
                    async: false,
                    success: function (response) {

                        /*...............................................*/
                        var cont = "";
                        var p = 0;


                        $.each(response.datos, function (index, data) {
                            p++;

                            var rutaFija = "./GsonData?url=PdfPublicaciones&ruta=" + data.curriculum;
                            var curriculumx = "";
                            var direccion = "";
                            var telefono = "";
                            var email = "";
                            var foto = "FOTOS/blank.html";

                            if (data.curriculum != "") {
                                curriculumx = "<li><i class='fa fa-file-text-o'></i> Hoja de Vida: <a href='" + rutaFija + "' class='badge bg-red' target='_blank'>ver</a></li>";
                            }
                            if (data.dedeDireccion != "") {
                                direccion = "<li><i class='fa fa-street-view'></i> " + data.dedeDireccion + "</li>";
                            }
                            if (data.dedeTelefono != "") {
                                telefono = "<li><i class='fa fa-phone'></i> " + data.dedeTelefono + "</li>";
                            }
                            if (data.email != "") {
                                email = "<li><i class='fa fa-envelope-o'></i> " + data.email.toLowerCase() + "</li>";
                            }

                            if (data.fotoPersonal != "") {
                                foto = data.fotoPersonal;
                            }

                            cont += "<div class='col-md-6 not-padding' style='padding:10px;padding-top:10px;padding-bottom:0px;'><div class='divTargeta'><div class='divFoto'><img class='fotoFuncionario' alt='' src='./img.jpg?ruta=" + foto + "&pagina=fotoMiembros' /></div><div class='divTitulo'><div class='divNombre'>" + data.nombreRepresentante + " </div><div class='divCargo'>" + data.cargoRepresentante + "</div><div><ul class='ulinfo'>" + direccion + telefono + email + curriculumx + "</ul></div></div><div class='divClear'></div></div></div>";

                            if (p == 2) {
                                $("#listaDirectorio").append("<div class='col-md-12 not-padding'>" + cont + "</div>");
                                p = 0;
                                cont = "";
                            }

                        });

                        $("#listaDirectorio").append("<div class='col-md-12 not-padding'>" + cont + "</div>");



                    }

                });

            }

        });

    }

});