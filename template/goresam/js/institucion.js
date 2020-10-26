$(function () {

    $.ajax({dataType: 'json', url: "./Logg?pagina=INSTITUCION"});
    /*........................................................................*/
    $.ajax({
        dataType: 'json',
        url: "./GsonData?url=DataInstitucion",
        cache: false,
        success: function (response) {
            var rutaFija = "./GsonData?url=PdfInstitucion&mostrarPdf=";

            $("#pMision").append(convertToLink(response.mision));
            $("#pVision").append(convertToLink(response.vision));
            $("#pOrganigrama").append(convertToLink(response.organigrama));
            $("#aRutaOrganigrama").attr("href", "OriArc5445.html?id=" + response.docuId);
            $("#pRuc").append("RUC : " + response.ruc);
            $("#pInfo").append(convertToLink(response.informacion));
            //..........................................................

            //...........................................................
            var ley = "";
            $.each(response.datosArchivo, function (index, data) {
                ley += " " + "<p><a href='" + rutaFija + data.inarRuta + "' class='link-efect' target='_blank'>" + data.inarNombreRuta + " - " + data.inarTitulo + " </a></p>";
            });
            $("#divData").append(ley);


            /*..........................................................*/
            function convertToLink(cadena) {
                var cadena = cadena.replace(new RegExp('<br />', 'g'), "�");

                cadena = cadena.split(" ");
                var nuevaCadena = " ";
                for (i = 0; i < cadena.length; i++) {
                    if (cadena[i].indexOf('@') > -1) {

                        if (cadena[i].indexOf('�') > -1) {
                            var cadena2 = cadena[i].split("�");

                            var nuevaCadena2 = " ";
                            for (w = 0; w < cadena2.length; w++) {
                                if (cadena2[w].indexOf('|') > -1) {
                                    var link = cadena2[w].split("|");
                                    var nameLink = link[0].substring(1, link[0].length);
                                    var hrefLink = link[1];

                                    if (hrefLink.indexOf('index.html') > -1) {
                                        nuevaCadena2 += " " + "<a style='color:#83C14D;' href='" + hrefLink + "' target='_blank'>" + nameLink + "</a>" + "�";
                                    } else {
                                        nuevaCadena2 += " " + "<a style='color:#83C14D;' href='" + rutaFija + "/TRANSPARENCIA/ARCHIVOS/" + hrefLink + ".pdf' target='_blank'>" + nameLink + "</a>" + "�";
                                    }

                                } else {
                                    if (w < cadena2.length - 1) {
                                        nuevaCadena2 += " " + cadena2[w] + "�";
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
                                    nuevaCadena += " " + "<a style='color:#83C14D;' href='" + rutaFija + "/TRANSPARENCIA/ARCHIVOS/" + hrefLink + ".pdf' target='_blank'>" + nameLink + "</a>";
                                }
                            } else {
                                nuevaCadena += " " + cadena[i];
                            }
                        }

                    } else {
                        nuevaCadena += " " + cadena[i];
                    }

                }
                return $.parseHTML(nuevaCadena.replace(new RegExp('�', 'g'), "<br />"));

            }

        }
    });
});