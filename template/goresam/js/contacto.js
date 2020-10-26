$(function () {
    $.ajax({dataType: 'json', url: "./Logg?pagina=CONTACTO"});
    /*........................................................................*/
    $.ajax({
        dataType: 'json',
        url: "./GsonData?url=DataContacto",
        cache: false,
        success: function (response) {
            var rutaFija = "./GsonData?url=PdfInstitucion&mostrarPdf=";
            //..........................................................
            var contenido0 = "";

            $.each(response.data, function (index, data) {
                var contenido1 = "";
                $.each(data.listaDependencia, function (index, data2) {


                    var enlancex = "";
                    var direccionx = "";

                    if (data2.dedeDireccion != "") {
                        direccionx = "Direccion : " + data2.dedeDireccion;
                    }

                    if (data2.dedePortal != "") {
                        enlancex = "<br><i class='fa fa-chevron-circle-right'></i>Portal : <a href='" + data2.dedePortal + "' target='_blank'>" + data2.dedePortal + "</a>";
                        contenido1 += "<div class='subtitulox'><i class='fa fa-arrow-circle-right'></i> " + data2.cargoRepresentante + " <div class='subtitulo2'><i class='fa fa-chevron-circle-right'></i>" + direccionx + enlancex + "</div></div>";
                    }
                });

                if (data.listaDependencia.length > 0) {

                    contenido0 += "<div class='titulox'><i class='fa fa-check-square'></i>" + data.tigrGrupo + "</div>" + contenido1;
                }

            });

            $("#sedes").append(contenido0);

            /*..........................................................*/
            function convertToLink(cadena) {
                var cadena = cadena.replace(new RegExp('<br />', 'g'), "¬");

                cadena = cadena.split(" ");
                var nuevaCadena = " ";
                for (i = 0; i < cadena.length; i++) {
                    if (cadena[i].indexOf('@') > -1) {

                        if (cadena[i].indexOf('¬') > -1) {
                            var cadena2 = cadena[i].split("¬");

                            var nuevaCadena2 = " ";
                            for (w = 0; w < cadena2.length; w++) {
                                if (cadena2[w].indexOf('|') > -1) {
                                    var link = cadena2[w].split("|");
                                    var nameLink = link[0].substring(1, link[0].length);
                                    var hrefLink = link[1];

                                    if (hrefLink.indexOf('index.html') > -1) {
                                        nuevaCadena2 += " " + "<a style='color:#83C14D;' href='" + hrefLink + "' target='_blank'>" + nameLink + "</a>" + "¬";
                                    } else {
                                        nuevaCadena2 += " " + "<a style='color:#83C14D;' href='" + rutaFija + "/ARCHIVOS/" + hrefLink + ".pdf' target='_blank'>" + nameLink + "</a>" + "¬";
                                    }

                                } else {
                                    if (w < cadena2.length - 1) {
                                        nuevaCadena2 += " " + cadena2[w] + "¬";
                                    } else {
                                        nuevaCadena2 += " " + cadena2[w];
                                    }
                                }
                            }
                            nuevaCadena += " " + nuevaCadena2;
                        } else {
                            if (cadena[i].indexOf('|') > -1) {

                                var link = cadena[i].split("|");
                                var nameLink = link[0].substring(1, link[0].length);
                                var hrefLink = link[1];
                                if (hrefLink.indexOf('index.html') > -1) {
                                    nuevaCadena += " " + "<a style='color:#83C14D;' href='" + hrefLink + "' target='_blank'>" + nameLink + "</a>";
                                } else {
                                    nuevaCadena += " " + "<a style='color:#83C14D;' href='" + rutaFija + "/ARCHIVOS/" + hrefLink + ".pdf' target='_blank'>" + nameLink + "</a>";
                                }
                            } else {
                                nuevaCadena += " " + cadena[i];
                            }
                        }

                    } else {
                        nuevaCadena += " " + cadena[i];
                    }

                }
                return $.parseHTML(nuevaCadena.replace(new RegExp('¬', 'g'), "<br />"));

            }

        }
    });
});
