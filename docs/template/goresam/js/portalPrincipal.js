/*REGISTRA LA VISITA DEL SISGEDO..............................................*/
function goPage1() {
    $.ajax({dataType: 'json', url: "./Logg?pagina=CONSULTA SISGEDO"});
    /*........................................................................*/
    $("#linkSisgedo").attr("target", "_blank");
    $("#linkSisgedo").attr("href", "http://std.regionsanmartin.gob.pe/sisgedo/app/main.php");
}

/*TRANSPARENCIA Y ACCESO A LA INFORMACION PUBLICA.............................*/


$("#tDatosGenerales").click(function () {
    window.open("DatosGenerales.html", "_blank");
});
$("#tPlaneamiento").click(function () {
    window.open("GestionTransparente82f1.html?url=plan", "_blank");
});
$("#tPresupuesto").click(function () {
    window.open("Presupuesto.html", "_blank");
});
$("#tInversion").click(function () {
    window.open("Proyecto.html", "_blank");
});
$("#tInversionPrivada").click(function () {
    window.location.href = "GestionTransparentecfce.html?url=proyectosInversionPrivadaMecanismo";
});

$("#tParticipacion").click(function () {
    window.open("Participacion.html", "_blank");
});
$("#tContrataciones").click(function () {
    window.open("http://www.transparencia.gob.pe/contrataciones/pte_transparencia_contrataciones.aspx?id_entidad=10166&amp;id_tema=34&amp;ver=D#.WV5Q_RV97IU", "_blank");
});
$("#tPersonal").click(function () {
    window.open("Transparencia07b0.html?url=infoPersonal", "_blank");
});
$("#tAgenda").click(function () {
    window.location.href = "GestionTransparente0884.html?url=mainagenda";
});
$("#tVisitas").click(function () {
    window.open("http://webapp.regionsanmartin.gob.pe/Visitas/controlVisitas/index.php?r=consultas/visitaConsulta/index", "_blank");
});
$("#tSolicitudPdf").click(function () {
    var rutaFija = "./GsonData?url=PdfInstitucion&mostrarPdf=";
    window.open("" + rutaFija + "/TRANSPARENCIA/ARCHIVOS/SOLICITUD_AIP.pdf", "_blank");
});
$("#tSolicitudOnline").click(function () {
    window.location.href = "Servicios3fc1.html?url=solicitud_acceso_informacion";

});
$("#tNormativaContratacion").click(function () {
    window.location.href = "GestionTransparente1b06.html?url=normativaContratacion";
});
$("#tFormatoDeclaracion").click(function () {
   var rutaFija = "./GsonData?url=PdfInstitucion&mostrarPdf=";
   window.open("" + rutaFija + "/TRANSPARENCIA/ARCHIVOS/FORMATO_DECLARACION_JURADA_INTERES.pdf", "_blank");
});

/*update_portal 05/09/2019*/
$("#tLibroReclamacion").click(function () {
    window.location.href = "Serviciose07e.html?url=reclamacionesFormulario";
});

$("#tProcesoSeleccion").click(function () {
    window.location.href = "http://www.transparencia.gob.pe/contrataciones/pte_transparencia_procesos.aspx?id_entidad=10166&amp;id_tema=34&amp;Ver=D#.WWPvCIh95PY";
});
$("#tOfertaLaboral").click(function () {
    window.location.href = "Servicios2f3e.html?url=ofertas_laborales";
});

$("#tCertificado").click(function () {
    window.location.href = "Serviciosbd0e.html?url=certificados";
});

/*update_portal 11/10/2019*/
$("#tPatrimonioConciliado").click(function () {
    window.location.href = "PatrimonioConciliado.html";
});


/*DEPENDENCIAS Y UNIDADES.............................*/
$.ajax({
    dataType: 'json',
    url: "./GsonData?url=DataListaNombreOrganico",
    success: function (response) {

        var contenido = "";
        var contenido2 = "";
        var cont = 0;
        $.each(response.datos, function (index, data) {
            var nroFilas = 0;
            var contFilas = 1;
            if (data.listaDependencia.length % 1 == 0) {
                nroFilas = data.listaDependencia.length / 2;
            } else {
                nroFilas = ((data.listaDependencia.length - 1) / 2) + 1;
            }

            if (data.listaDependencia.length > 0) {

                var contenido3 = "";
                var contenidox = "";
                var contenidox2 = "";
                $.each(data.listaDependencia, function (index, data2) {
                    if (contFilas <= nroFilas) {
                        if (data2.dedePortal == "") {
                            contenidox2 += "<li><a href='./DependenciasUnidades?url=dependenciasUnidadesPresentacion&cap=" + data2.centroCosto + "' ><i class='fa fa-chevron-circle-right rojo'></i> " + upperFirt(data2.nombre.toLowerCase()) + "</a></li>";
                        } else {
                            contenidox2 += "<li><a href='" + data2.dedePortal + "' target='_blank' ><i class='fa fa-chevron-circle-right rojo'></i> " + upperFirt(data2.nombre.toLowerCase()) + "</a></li>";
                        }

                    } else {
                        if (data2.dedePortal == "") {
                            contenidox += "<li><a href='./DependenciasUnidades?url=dependenciasUnidadesPresentacion&cap=" + data2.centroCosto + "' ><i class='fa fa-chevron-circle-right rojo'></i> " + upperFirt(data2.nombre.toLowerCase()) + "</a></li>";

                        } else {
                            contenidox += "<li><a href='" + data2.dedePortal + "' target='_blank'><i class='fa fa-chevron-circle-right rojo'></i> " + upperFirt(data2.nombre.toLowerCase()) + "</a></li>";

                        }
                    }

                    contFilas++;
                });
                if (contenidox != "") {
                    contenido3 += "<div class='col-md-6'><ul class='nav'>" + contenidox + "</ul></div>";
                }
                if (contenidox2 != "") {
                    contenido3 += "<div class='col-md-6'><ul class='nav'>" + contenidox2 + "</ul></div>";
                }

                /*..........................................*/
                if (cont == 0) {
                    contenido += "<li role='presentation'><a id='activelink' href='#grupoItem" + data.tigrId + "' aria-controls='settings' role='tab' data-toggle='tab'><i class='fa fa-angle-double-right'></i> " + upperFirt(data.tigrGrupo.toLowerCase()) + "</a></li>";
                    contenido2 += "<div role='tabpanel' class='tab-pane tab-pex fade in active' id='grupoItem" + data.tigrId + "' > " + contenido3 + "</div>";
                } else {
                    contenido += "<li role='presentation'><a href='#grupoItem" + data.tigrId + "' aria-controls='settings' role='tab' data-toggle='tab'><i class='fa fa-angle-double-right'></i> " + upperFirt(data.tigrGrupo.toLowerCase()) + "</a></li>";
                    contenido2 += "<div role='tabpanel' class='tab-pane tab-pex fade' id='grupoItem" + data.tigrId + "' >" + contenido3 + "</div>";
                }

                cont++;
            }

        });
        $("#contenidoMenuDependencias").append(contenido);
        $("#contenidoMenuDependenciasSub").append(contenido2);
        /*.........................................*/
        $("#activelink").css("background-color", "#EEEEEE");
        $(".menu-dependencias li a").click(function () {
            $(".menu-dependencias li a").css("background-color", "WHITE");
            $(this).css("background-color", "#EEEEEE");
        });
        function upperFirt(string) {

            var cadenax = string.split(" ");
            var concertido = " ";
            for (var i = 0; i < cadenax.length; i++) {
                concertido += cadenax[i].charAt(0).toUpperCase() + cadenax[i].slice(1) + " ";
            }


            return concertido.replace("Gerencia Regional De", "").replace("Oficina Regional De", "").replace("Organo Regional", "Organo").replace("Ara - Gerencia", "Autoridad Regional Ambiental").replace("Direccion Regional De", "").replace("Oficina De", "").replace("Y", "y").replace("De", "de").replace("E", "e").replace("Para La", "para la").replace("desarrollo", "Desarrollo");
        }

    }

});




