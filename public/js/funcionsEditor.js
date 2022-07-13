var videoSelec = -1;
var videoFont;
var idPuntMarker = [];

document.addEventListener("DOMContentLoaded", function () {
    initE();
})

//FUNCIÓN DE INICIALIZACIÓN
/* */
function initE() {
    tablaVideos();
}

function tablaVideos() {
    var xmlhttp = new XMLHttpRequest();
    var url = "bbdd/videos";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = JSON.parse(xmlhttp.responseText);

            var titolTabla = document.querySelector("#titolTabla");
            titolTabla.innerHTML = "Tabla de Videos";

            var divUpload = document.querySelector("#videoUpload");
            var botUpload = document.createElement("button");
            botUpload.setAttribute("id", "botonUpload");
            botUpload.setAttribute("type", "button");
            botUpload.setAttribute("class", "btn btn-success btn-rounded btn-sm");
            botUpload.innerHTML = "Añadir manifiesto";
            botUpload.addEventListener("click", function () {
                console.log("Hola");
                var tr = document.createElement("tr");

                var td1 = document.createElement("td");
                td1.setAttribute("class", "pt-3-half");
                td1.setAttribute("contenteditable", "true");
                td1.innerHTML = "-";

                var td2 = document.createElement("td");
                td2.setAttribute("class", "pt-3-half");
                td2.setAttribute("contenteditable", "true");
                td2.innerHTML = "-";

                var td3 = document.createElement("td");
                td3.setAttribute("class", "pt-3-half");
                td3.setAttribute("contenteditable", "true");
                td3.innerHTML = "-";

                var td4 = document.createElement("td");
                td4.setAttribute("class", "pt-3-half");
                td4.setAttribute("contenteditable", "true");
                td4.innerHTML = "-";

                var td5 = document.createElement("td");
                td5.setAttribute("class", "pt-3-half");
                td5.setAttribute("contenteditable", "true");                
                td5.innerHTML = "-";

                var td6 = document.createElement("td");
                td6.setAttribute("class", "pt-3-half");
                var buttP = document.createElement("button");
                buttP.setAttribute("type", "button");
                buttP.setAttribute("class", "btn btn-warning btn-rounded btn-sm my-0");
                buttP.innerHTML = "Prever";

                buttP.addEventListener("click", function () {
                    alert("Aun no has actualizado el servidor.");
                });

                td6.appendChild(buttP);

                var td7 = document.createElement("td");
                td7.setAttribute("class", "pt-3-half");
                var buttE = document.createElement("button");
                buttE.setAttribute("type", "button");
                buttE.setAttribute("class", "btn btn-primary btn-rounded btn-sm my-0");
                buttE.innerHTML = "Editar";

                buttE.addEventListener("click", function () {
                    alert("Aun no has actualizado el servidor.");
                });

                td7.appendChild(buttE);

                var td8 = document.createElement("td");
                td8.setAttribute("class", "pt-3-half");
                var buttB = document.createElement("button");
                buttB.setAttribute("type", "button");
                buttB.setAttribute("class", "btn btn-danger btn-rounded btn-sm my-0");
                buttB.innerHTML = "Borrar";
                buttB.addEventListener("click", function () {
                    tbody.removeChild(this.parentNode.parentNode);
                });

                td8.appendChild(buttB);

                tr.appendChild(td1)
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                tr.appendChild(td8);

                tbody.appendChild(tr);
            });

            divUpload.appendChild(botUpload);

            var tabla = document.querySelector("#table");

            var thead = document.createElement("thead");
            var tr = document.createElement("tr");

            var th1 = document.createElement("th");
            th1.setAttribute("class", "text-center");
            th1.innerHTML = "Identificador";

            var th2 = document.createElement("th");
            th2.setAttribute("class", "text-center");
            th2.innerHTML = "Carpeta del manifiesto";

            var th3 = document.createElement("th");
            th3.setAttribute("class", "text-center");
            th3.innerHTML = "Geoposición";

            var th4 = document.createElement("th");
            th4.setAttribute("class", "text-center");
            th4.innerHTML = "Bucle";

            var th5 = document.createElement("th");
            th5.setAttribute("class", "text-center");
            th5.innerHTML = "Siguiente Video";

            var th6 = document.createElement("th");
            th6.setAttribute("class", "text-center");
            th6.innerHTML = "Previsualizar";

            var th7 = document.createElement("th");
            th7.setAttribute("class", "text-center");
            th7.innerHTML = "Editar";

            var th8 = document.createElement("th");
            th8.setAttribute("class", "text-center");
            th8.innerHTML = "Eliminar";

            tr.appendChild(th1)
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            tr.appendChild(th6);
            tr.appendChild(th7);
            tr.appendChild(th8);

            thead.appendChild(tr);

            var tbody = document.createElement("tbody");

            for (var cont = 0; cont < datos.length; cont++) {
                var tr = document.createElement("tr");

                var td1 = document.createElement("td");
                td1.setAttribute("class", "pt-3-half");
                td1.setAttribute("contenteditable", "false");
                //this.textContent
                td1.innerHTML = datos[cont].IdVideo;

                var td2 = document.createElement("td");
                td2.setAttribute("class", "pt-3-half");
                td2.setAttribute("contenteditable", "false");
                td2.innerHTML = datos[cont].NameVideo;

                var td3 = document.createElement("td");
                td3.setAttribute("class", "pt-3-half");
                td3.setAttribute("contenteditable", "true");
                td3.innerHTML = datos[cont].GeoPos;

                var td4 = document.createElement("td");
                td4.setAttribute("class", "pt-3-half");
                td4.setAttribute("contenteditable", "true");
                if (datos[cont].IsLoop) {
                    td4.innerHTML = "True";
                } else {
                    td4.innerHTML = "False";
                }

                var td5 = document.createElement("td");
                td5.setAttribute("class", "pt-3-half");
                td5.setAttribute("contenteditable", "true");
                if (datos[cont].IdNextVideo === null) {
                    td5.innerHTML = "-";
                } else {
                    td5.innerHTML = datos[cont].IdNextVideo;
                }


                var td6 = document.createElement("td");
                td6.setAttribute("class", "pt-3-half");
                var buttP = document.createElement("button");
                buttP.setAttribute("type", "button");
                buttP.setAttribute("ID", datos[cont].IdVideo);
                buttP.setAttribute("class", "btn btn-warning btn-rounded btn-sm my-0");
                buttP.innerHTML = "Prever";

                buttP.addEventListener("click", function () {
                    var video = document.getElementById('myVideo');
                    var nomV = this.parentNode.parentNode.childNodes[1].innerHTML;
                    var nomFolder = nomV;
                    video.setAttribute('src', "assets/video/videosUIB/" + nomFolder + "/" + nomFolder + "_720_frag.mp4");
                    document.getElementById("sky").setAttribute('material', "src: #myVideo");
                    video.play();
                });

                td6.appendChild(buttP);

                var td7 = document.createElement("td");
                td7.setAttribute("class", "pt-3-half");
                var buttE = document.createElement("button");
                buttE.setAttribute("type", "button");
                buttE.setAttribute("ID", datos[cont].IdVideo);
                buttE.setAttribute("class", "btn btn-primary btn-rounded btn-sm my-0");
                buttE.innerHTML = "Editar";

                buttE.addEventListener("click", function () {
                    var video = document.getElementById('myVideo');
                    var nomV = this.parentNode.parentNode.childNodes[1].innerHTML;
                    var nomFolder = nomV;
                    video.setAttribute('src', "assets/video/videosUIB/" + nomFolder + "/" + nomFolder + "_720_frag.mp4");
                    videoFont = this.parentNode.parentNode.childNodes[1].innerHTML;
                    document.getElementById("sky").setAttribute('material', "src: #myVideo");
                    video.play();
                    tabla.removeChild(tabla.firstElementChild);
                    tabla.removeChild(tabla.firstElementChild);
                    var divUpload = document.querySelector("#videoUpload");
                    var botonUpload = document.querySelector("#botonUpload");
                    divUpload.removeChild(botonUpload);
                    var card = document.querySelector("#card");
                    var divButt = document.querySelector("#divButt");
                    card.removeChild(divButt);
                    tablaMarkers(this.id);

                });

                td7.appendChild(buttE);

                var td8 = document.createElement("td");
                td8.setAttribute("class", "pt-3-half");
                var buttB = document.createElement("button");
                buttB.setAttribute("type", "button");
                buttB.setAttribute("class", "btn btn-danger btn-rounded btn-sm my-0");
                buttB.innerHTML = "Borrar";
                buttB.addEventListener("click", function () {
                    var elem = this.parentNode.parentNode.firstChild;
                    tbody.removeChild(this.parentNode.parentNode);
                    borrarVideo(elem.innerHTML);
                });

                td8.appendChild(buttB);

                tr.appendChild(td1)
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                tr.appendChild(td8);

                tbody.appendChild(tr);
            };

            tabla.appendChild(thead);
            tabla.appendChild(tbody);

            var card = document.querySelector("#card");

            var buttGuardar = document.createElement("button");
            buttGuardar.setAttribute("type", "button");
            buttGuardar.setAttribute("id", "botonGuardar");
            buttGuardar.setAttribute("class", "btn btn-success btn-rounded btn-sm px-4");
            buttGuardar.innerHTML = "Actualizar el servidor";
            buttGuardar.addEventListener("click", function () {
                var contenido = [];
                for (var i = 0; i < tbody.childNodes.length; i++) {
                    for (var ii = 0; ii < tbody.childNodes[i].childNodes.length - 3; ii++) {
                        contenido.push(tbody.childNodes[i].childNodes[ii].innerHTML);
                    }
                }
                var contenidoAct = contenido.slice(0, (datos.length * 5));
                var contenidoNew = contenido.slice((datos.length * 5), contenido.length);
                console.log(contenidoAct);
                console.log(contenidoNew);
                //actualizarVideos(contenido);
            });

            var divButt = document.createElement("div");
            divButt.setAttribute("class", "d-flex justify-content-center");
            divButt.setAttribute("id", "divButt");

            divButt.appendChild(buttGuardar);
            card.appendChild(divButt);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function tablaMarkers(i) {
    videoSelec = i;
    var tabla = document.querySelector("#table");

    var xmlhttp = new XMLHttpRequest();
    var url = "bbdd/marcadores/" + i;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var info = JSON.parse(xmlhttp.responseText);
            var datos = info[1];
            var allInfoMark = info[3]

            var titolTabla = document.querySelector("#titolTabla");
            titolTabla.innerHTML = "Tabla de Marcadores";

            var divPlayer = document.querySelector("#botonesPlayer");

            var divP1 = document.createElement("div");
            divP1.setAttribute("class", "px-3");

            var divP2 = document.createElement("div");
            divP2.setAttribute("class", "px-3");

            var divP3 = document.createElement("div");
            divP3.setAttribute("class", "px-3");

            var divP4 = document.createElement("div");
            divP4.setAttribute("class", "px-3");

            var divP0 = document.createElement("div");
            divP0.setAttribute("class", "px-3");

            var divP5 = document.createElement("div");
            divP5.setAttribute("class", "px-3");

            var divP6 = document.createElement("div");
            divP6.setAttribute("class", "px-3");



            var botReset = document.createElement("button");
            botReset.setAttribute("type", "button");
            botReset.setAttribute("class", "btn btn-light btn-rounded btn-sm pl-3");
            botReset.innerHTML = "Reset Video"
            botReset.addEventListener("click", function () {
                var video = document.getElementById('myVideo');
                video.currentTime = 0;
            });

            var botPlay = document.createElement("button");
            botPlay.setAttribute("type", "button");
            botPlay.setAttribute("class", "btn btn-light btn-rounded btn-sm pl-3");
            botPlay.innerHTML = "Play Video"
            botPlay.addEventListener("click", function () {
                var video = document.getElementById('myVideo');
                video.play();
            });

            var botStop = document.createElement("button");
            botStop.setAttribute("type", "button");
            botStop.setAttribute("class", "btn btn-light btn-rounded btn-sm pl-3");
            botStop.innerHTML = "Stop Video"
            botStop.addEventListener("click", function () {
                var video = document.getElementById('myVideo');
                video.pause();
            });

            var botTime = document.createElement("button");
            botTime.setAttribute("type", "button");
            botTime.setAttribute("class", "btn btn-light btn-rounded btn-sm pl-3");
            botTime.innerHTML = "Current Time: __";
            botTime.addEventListener("click", function () {
                var video = document.getElementById('myVideo');
                console.log(video.currentTime.toFixed(2));
                botTime.innerHTML = "Current Time: " + video.currentTime.toFixed(2) + " s";
            });

            var botDur = document.createElement("button");
            botDur.setAttribute("type", "button");
            botDur.setAttribute("class", "btn btn-light btn-rounded btn-sm pl-3");
            botDur.innerHTML = "Duration video: __";
            botDur.addEventListener("click", function () {
                var video = document.getElementById('myVideo');
                botDur.innerHTML = "Duration video: " + video.duration + " s";
            });

            var botLat = document.createElement("button");
            botLat.setAttribute("type", "button");
            botLat.setAttribute("class", "btn btn-light btn-rounded btn-sm pl-3");
            botLat.innerHTML = "Obtener Latitud: __";
            botLat.addEventListener("click", function () {
                var cam = document.getElementById("camara");
                var rotCamera = cam.getAttribute('rotation');
                botLat.innerHTML = "Obtener Latitud: " + rotCamera.x.toFixed(2);
            });

            var botLong = document.createElement("button");
            botLong.setAttribute("type", "button");
            botLong.setAttribute("class", "btn btn-light btn-rounded btn-sm pl-3");
            botLong.innerHTML = "Obtener Longitud: __";
            botLong.addEventListener("click", function () {
                var cam = document.getElementById("camara");
                var rotCamera = cam.getAttribute('rotation');
                var newLong = rotCamera.y.toFixed(2);
                newLong = (((newLong % 360) + 360 + 180) % 360) - 180;
                newLong = newLong * (-1)
                botLong.innerHTML = "Obtener Longitud: " + newLong.toFixed(2);
            });

            divP1.appendChild(botReset);
            divP2.appendChild(botPlay);
            divP3.appendChild(botStop);
            divP4.appendChild(botTime);
            divP0.appendChild(botDur);
            divP5.appendChild(botLat);
            divP6.appendChild(botLong);

            divPlayer.appendChild(divP1);
            divPlayer.appendChild(divP2);
            divPlayer.appendChild(divP3);
            divPlayer.appendChild(divP4);
            divPlayer.appendChild(divP0);
            divPlayer.appendChild(divP5);
            divPlayer.appendChild(divP6);

            var divUpload = document.querySelector("#videoUpload");

            var div1 = document.createElement("div");
            div1.setAttribute("id", "divAñadirMarcador");
            div1.setAttribute("class", "px-3");

            var div2 = document.createElement("div");
            div2.setAttribute("id", "divModificarPI");
            div2.setAttribute("class", "pl-3");

            var botUpload = document.createElement("button");
            botUpload.setAttribute("type", "button");
            botUpload.setAttribute("class", "btn btn-info btn-rounded btn-sm pl-3");
            botUpload.innerHTML = "Modificar los Puntos de Interés"
            botUpload.addEventListener("click", function () {
                var tabla = document.querySelector("#table");
                tabla.removeChild(tabla.firstElementChild);
                tabla.removeChild(tabla.firstElementChild);

                var divUpload = document.querySelector("#videoUpload");
                var divBut1Upload = document.querySelector("#divAñadirMarcador");
                var divBut2Upload = document.querySelector("#divModificarPI");
                divUpload.removeChild(divBut1Upload);
                divUpload.removeChild(divBut2Upload);

                var card = document.querySelector("#card");
                var divButt = document.querySelector("#divButt");
                card.removeChild(divButt);

                var divPlayer = document.querySelector("#botonesPlayer");
                divPlayer.innerHTML = "";

                document.getElementById("sky").setAttribute('material', "src: assets/images/image360.jpg");

                tablaPI();
            });

            var botUpload2 = document.createElement("button");
            botUpload2.setAttribute("type", "button");
            botUpload2.setAttribute("class", "btn btn-success btn-rounded btn-sm");
            botUpload2.innerHTML = "Añadir Marcador"

            div1.appendChild(botUpload);
            div2.appendChild(botUpload2);

            divUpload.appendChild(div1);
            divUpload.appendChild(div2);

            var thead = document.createElement("thead");
            var tr = document.createElement("tr");

            var th1 = document.createElement("th");
            th1.setAttribute("class", "text-center");
            th1.innerHTML = "Punto de Interés";

            var th2 = document.createElement("th");
            th2.setAttribute("class", "text-center");
            th2.innerHTML = "Tiempo Inicial";

            var th3 = document.createElement("th");
            th3.setAttribute("class", "text-center");
            th3.innerHTML = "Tiempo Final";

            var th4 = document.createElement("th");
            th4.setAttribute("class", "text-center");
            th4.innerHTML = "Latitud Inicial";

            var th5 = document.createElement("th");
            th5.setAttribute("class", "text-center");
            th5.innerHTML = "Latitud Final";

            var th6 = document.createElement("th");
            th6.setAttribute("class", "text-center");
            th6.innerHTML = "Longitud Inicial";

            var th7 = document.createElement("th");
            th7.setAttribute("class", "text-center");
            th7.innerHTML = "Longitud Final";

            var th8 = document.createElement("th");
            th8.setAttribute("class", "text-center");
            th8.innerHTML = "ID del siguiente video";

            var th9 = document.createElement("th");
            th9.setAttribute("class", "text-center");
            th9.innerHTML = "Eliminar";

            tr.appendChild(th1)
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            tr.appendChild(th6);
            tr.appendChild(th7);
            tr.appendChild(th8);
            tr.appendChild(th9);

            thead.appendChild(tr);

            var tbody = document.createElement("tbody");

            botUpload2.addEventListener("click", function () {
                var tr = document.createElement("tr");
                var idTR;
                var isIdTR = false;
                var allIds = [];
                for (var iii = 0; iii < allInfoMark.length; iii++) {
                    allIds.push(allInfoMark[iii].IdMarker);
                }
                //maximo 100 punteros
                for (var iii = 0; iii < 100 && !isIdTR; iii++) {
                    idTR = "P" + (iii + 1);
                    if (!allIds.includes(idTR) && !idPuntMarker.includes(idTR)) {
                        isIdTR = true;
                        tr.setAttribute("id", idTR);
                        idPuntMarker.push(idTR);
                        console.log(idTR);
                    }
                }

                var td1 = document.createElement("td");
                td1.setAttribute("class", "pt-3-half");
                td1.setAttribute("contenteditable", "false");

                var selectPI = document.createElement("select");
                selectPI.setAttribute('class', "selectpicker");
                selectPI.setAttribute("data-width", "100%");

                selectPI.setAttribute("data-live-search", "true");

                for (var i = 0; i < info[2].length; i++) {
                    var option = document.createElement("option");
                    option.value = info[2][i].NamePI;
                    option.text = info[2][i].NamePI;
                    selectPI.appendChild(option);
                }

                td1.appendChild(selectPI);
                $(function () { $(".selectpicker").selectpicker('render'); })

                var td2 = document.createElement("td");
                td2.setAttribute("class", "pt-3-half");
                td2.setAttribute("contenteditable", "true");
                td2.innerHTML = "-";

                var td3 = document.createElement("td");
                td3.setAttribute("class", "pt-3-half");
                td3.setAttribute("contenteditable", "true");
                td3.innerHTML = "-";

                var td4 = document.createElement("td");
                td4.setAttribute("class", "pt-3-half");
                td4.setAttribute("contenteditable", "true");
                td4.innerHTML = "-";

                var td5 = document.createElement("td");
                td5.setAttribute("class", "pt-3-half");
                td5.setAttribute("contenteditable", "true");
                td5.innerHTML = "-";

                var td6 = document.createElement("td");
                td6.setAttribute("class", "pt-3-half");
                td6.setAttribute("contenteditable", "true");
                td6.innerHTML = "-";

                var td7 = document.createElement("td");
                td7.setAttribute("class", "pt-3-half");
                td7.setAttribute("contenteditable", "true");
                td7.innerHTML = "-";

                var td8 = document.createElement("td");
                td8.setAttribute("class", "pt-3-half");
                td8.setAttribute("contenteditable", "true");
                td8.innerHTML = "-";

                var td9 = document.createElement("td");
                td9.setAttribute("class", "pt-3-half");

                var buttB = document.createElement("button");
                buttB.setAttribute("type", "button");
                buttB.setAttribute("class", "btn btn-danger btn-rounded btn-sm my-0");
                buttB.innerHTML = "Borrar";
                buttB.addEventListener("click", function () {
                    let isConfirmed = confirm("¿Estas seguro de borrar este Marcador?");
                    if (isConfirmed) {
                        tbody.removeChild(this.parentNode.parentNode);
                    }
                });


                td9.appendChild(buttB);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                tr.appendChild(td8);
                tr.appendChild(td9);

                tbody.appendChild(tr);
            });

            for (var cont = 0; cont < datos.length; cont++) {
                var tr = document.createElement("tr");
                tr.setAttribute("id", datos[cont].IdMarker);

                var td1 = document.createElement("td");
                td1.setAttribute("class", "pt-3-half");
                td1.setAttribute("contenteditable", "false");

                var selectPI = document.createElement("select");
                selectPI.setAttribute('class', "selectpicker");
                selectPI.setAttribute("data-width", "100%");

                selectPI.setAttribute("data-live-search", "true");

                for (var i = 0; i < info[2].length; i++) {
                    var option = document.createElement("option");
                    option.value = info[2][i].NamePI;
                    option.text = info[2][i].NamePI;
                    if (info[2][i].NamePI == datos[cont].NamePI) {
                        option.setAttribute("selected", true);
                    }
                    selectPI.appendChild(option);
                }

                td1.appendChild(selectPI);
                $(function () { $(".selectpicker").selectpicker('render'); })

                var td2 = document.createElement("td");
                td2.setAttribute("class", "pt-3-half");
                td2.setAttribute("contenteditable", "true");
                td2.innerHTML = datos[cont].TempsIn;

                var td3 = document.createElement("td");
                td3.setAttribute("class", "pt-3-half");
                td3.setAttribute("contenteditable", "true");
                td3.innerHTML = datos[cont].TempsF;

                var td4 = document.createElement("td");
                td4.setAttribute("class", "pt-3-half");
                td4.setAttribute("contenteditable", "true");
                td4.innerHTML = datos[cont].LatIn;

                var td5 = document.createElement("td");
                td5.setAttribute("class", "pt-3-half");
                td5.setAttribute("contenteditable", "true");
                td5.innerHTML = datos[cont].LatF;

                var td6 = document.createElement("td");
                td6.setAttribute("class", "pt-3-half");
                td6.setAttribute("contenteditable", "true");
                td6.innerHTML = datos[cont].LongIn;

                var td7 = document.createElement("td");
                td7.setAttribute("class", "pt-3-half");
                td7.setAttribute("contenteditable", "true");
                td7.innerHTML = datos[cont].LongF;

                var td8 = document.createElement("td");
                td8.setAttribute("class", "pt-3-half");
                td8.setAttribute("contenteditable", "true");
                td8.innerHTML = datos[cont].IdNextVideo;

                var td9 = document.createElement("td");
                td9.setAttribute("class", "pt-3-half");

                var buttB = document.createElement("button");
                buttB.setAttribute("type", "button");
                buttB.setAttribute("class", "btn btn-danger btn-rounded btn-sm my-0");
                buttB.innerHTML = "Borrar";
                buttB.addEventListener("click", function () {
                    let isConfirmed = confirm("¿Estas seguro de borrar este Marcador?");
                    if (isConfirmed) {
                        tbody.removeChild(this.parentNode.parentNode);
                        console.log(datos);
                        console.log(this.parentNode.parentNode.id);
                        var isThisDato = false;
                        for (var contador = 0; contador < datos.length && !isThisDato; contador++) {
                            if (datos[contador].IdMarker == this.parentNode.parentNode.id) {
                                isThisDato = true;
                                datos.splice(contador, 1);
                            }
                        }
                        borrarMarcador(this.parentNode.parentNode.id);
                    }

                });


                td9.appendChild(buttB);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                tr.appendChild(td8);
                tr.appendChild(td9);

                tbody.appendChild(tr);
            };

            tabla.appendChild(thead);
            tabla.appendChild(tbody);

            var card = document.querySelector("#card");

            var buttVolver = document.createElement("button");
            buttVolver.setAttribute("type", "button");
            buttVolver.setAttribute("id", "botonVolver");
            buttVolver.setAttribute("class", "btn btn-light btn-rounded btn-sm px-4");
            buttVolver.addEventListener("click", function () {
                var tabla = document.querySelector("#table");
                tabla.removeChild(tabla.firstElementChild);
                tabla.removeChild(tabla.firstElementChild);

                var divUpload = document.querySelector("#videoUpload");
                var divBut1Upload = document.querySelector("#divAñadirMarcador");
                var divBut2Upload = document.querySelector("#divModificarPI");
                divUpload.removeChild(divBut1Upload);
                divUpload.removeChild(divBut2Upload);

                var card = document.querySelector("#card");
                var divButt = document.querySelector("#divButt");
                card.removeChild(divButt);

                var divPlayer = document.querySelector("#botonesPlayer");
                divPlayer.innerHTML = "";

                document.getElementById("sky").setAttribute('material', "src: assets/images/image360.jpg");
                tablaVideos();
            });

            buttVolver.innerHTML = "Volver";

            var buttGuardar = document.createElement("button");
            buttGuardar.setAttribute("type", "button");
            buttGuardar.setAttribute("id", "botonGuardar");
            buttGuardar.setAttribute("class", "btn btn-success btn-rounded btn-sm px-4");
            buttGuardar.innerHTML = "Actualizar el servidor";
            buttGuardar.addEventListener("click", function () {
                var contenido = [];
                for (var i = 0; i < tbody.childNodes.length; i++) {
                    contenido.push(tbody.childNodes[i].id);
                    for (var ii = 0; ii < tbody.childNodes[i].childNodes.length - 1; ii++) {
                        if (ii == 0) {
                            contenido.push(tbody.childNodes[i].childNodes[ii].firstChild.firstChild.value);
                        } else {
                            contenido.push(tbody.childNodes[i].childNodes[ii].innerHTML);
                        }

                    }
                }
                var contenidoAct = contenido.slice(0, (datos.length * 9));
                var contenidoNew = contenido.slice((datos.length * 9), contenido.length);

                actualizarMarcadores(contenidoAct, contenidoNew);

                var tabla = document.querySelector("#table");
                tabla.removeChild(tabla.firstElementChild);
                tabla.removeChild(tabla.firstElementChild);

                var divUpload = document.querySelector("#videoUpload");
                var divBut1Upload = document.querySelector("#divAñadirMarcador");
                var divBut2Upload = document.querySelector("#divModificarPI");
                divUpload.removeChild(divBut1Upload);
                divUpload.removeChild(divBut2Upload);

                var card = document.querySelector("#card");
                var divButt = document.querySelector("#divButt");
                card.removeChild(divButt);

                var divPlayer = document.querySelector("#botonesPlayer");
                divPlayer.innerHTML = "";

                document.getElementById("sky").setAttribute('material', "src: assets/images/image360.jpg");
                tablaVideos();
            });

            var divButt = document.createElement("div");
            divButt.setAttribute("class", "d-flex justify-content-center");
            divButt.setAttribute("id", "divButt");

            var div1 = document.createElement("div");
            div1.setAttribute("class", "px-3");

            var div2 = document.createElement("div");
            div2.setAttribute("class", "px-3");

            div1.appendChild(buttVolver);
            div2.appendChild(buttGuardar);

            divButt.appendChild(div1);
            divButt.appendChild(div2);

            card.appendChild(divButt);

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function tablaPI() {
    var tabla = document.querySelector("#table");
    var xmlhttp = new XMLHttpRequest();
    var url = "bbdd/PI";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var info = JSON.parse(xmlhttp.responseText);

            var titolTabla = document.querySelector("#titolTabla");
            titolTabla.innerHTML = "Tabla de Puntos de Interés";

            var divUpload = document.querySelector("#videoUpload");

            var div1 = document.createElement("div");
            div1.setAttribute("id", "divAñadirMarcador");

            var botUpload = document.createElement("button");
            botUpload.setAttribute("type", "button");
            botUpload.setAttribute("class", "btn btn-success btn-rounded btn-sm pl-3");
            botUpload.innerHTML = "Añadir un Punto de Interés"

            div1.appendChild(botUpload);

            divUpload.appendChild(div1);

            var thead = document.createElement("thead");
            var tr = document.createElement("tr");

            var th1 = document.createElement("th");
            th1.setAttribute("class", "text-center");
            th1.innerHTML = "Nombre del Punto de Interés";

            var th2 = document.createElement("th");
            th2.setAttribute("class", "text-center");
            th2.innerHTML = "Descripción Castellano";

            var th3 = document.createElement("th");
            th3.setAttribute("class", "text-center");
            th3.innerHTML = "Descripción Catalán";

            var th4 = document.createElement("th");
            th4.setAttribute("class", "text-center");
            th4.innerHTML = "Descripción Inglés";

            var th5 = document.createElement("th");
            th5.setAttribute("class", "text-center");
            th5.innerHTML = "Eliminar";

            tr.appendChild(th1)
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);

            thead.appendChild(tr);

            var tbody = document.createElement("tbody");

            botUpload.addEventListener("click", function () {
                var tr = document.createElement("tr");

                var td1 = document.createElement("td");
                td1.setAttribute("class", "pt-3-half");
                td1.setAttribute("contenteditable", "true");
                td1.innerHTML = "-";

                var td2 = document.createElement("td");
                td2.setAttribute("class", "pt-3-half");
                td2.setAttribute("contenteditable", "true");

                var infoCamp = document.createElement("textarea");
                infoCamp.setAttribute('type', "text");
                infoCamp.setAttribute('placeholder', "Biografia castellà");
                infoCamp.value = "";

                td2.appendChild(infoCamp);

                var td3 = document.createElement("td");
                td3.setAttribute("class", "pt-3-half");
                td3.setAttribute("contenteditable", "true");

                var infoCamp1 = document.createElement("textarea");
                infoCamp1.setAttribute('type', "text");
                infoCamp1.setAttribute('placeholder', "Biografia castellà");
                infoCamp1.value = "";

                td3.appendChild(infoCamp1);

                var td4 = document.createElement("td");
                td4.setAttribute("class", "pt-3-half");
                td4.setAttribute("contenteditable", "true");

                var infoCamp2 = document.createElement("textarea");
                infoCamp2.setAttribute('type', "text");
                infoCamp2.setAttribute('placeholder', "Biografia castellà");
                infoCamp2.value = "";

                td4.appendChild(infoCamp2);

                var td5 = document.createElement("td");
                td5.setAttribute("class", "pt-3-half");

                var buttB = document.createElement("button");
                buttB.setAttribute("type", "button");
                buttB.setAttribute("class", "btn btn-danger btn-rounded btn-sm my-0");
                buttB.innerHTML = "Borrar";
                buttB.addEventListener("click", function () {
                    let isConfirmed = confirm("¿Estas seguro de borrar este punto de Interes?");
                    if (isConfirmed) {
                        tbody.removeChild(this.parentNode.parentNode);
                    }

                });


                td5.appendChild(buttB);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);

                tbody.appendChild(tr);
            });

            for (var cont = 0; cont < info.length; cont++) {
                var tr = document.createElement("tr");
                tr.setAttribute("id", cont);

                var td1 = document.createElement("td");
                td1.setAttribute("class", "pt-3-half");
                td1.setAttribute("contenteditable", "false");
                var nomPI = info[cont].NamePI;
                td1.innerHTML = nomPI;

                var td2 = document.createElement("td");
                td2.setAttribute("class", "pt-3-half");
                td2.setAttribute("contenteditable", "true");

                var infoCamp = document.createElement("textarea");
                infoCamp.setAttribute('type', "text");
                infoCamp.setAttribute('placeholder', "Biografia castellà");
                infoCamp.value = info[cont].DescCast;

                td2.appendChild(infoCamp);

                var td3 = document.createElement("td");
                td3.setAttribute("class", "pt-3-half");
                td3.setAttribute("contenteditable", "true");

                var infoCamp1 = document.createElement("textarea");
                infoCamp1.setAttribute('type', "text");
                infoCamp1.setAttribute('placeholder', "Biografia castellà");
                infoCamp1.value = info[cont].DescCat;

                td3.appendChild(infoCamp1);

                var td4 = document.createElement("td");
                td4.setAttribute("class", "pt-3-half");
                td4.setAttribute("contenteditable", "true");

                var infoCamp2 = document.createElement("textarea");
                infoCamp2.setAttribute('type', "text");
                infoCamp2.setAttribute('placeholder', "Biografia castellà");
                infoCamp2.value = info[cont].DescIng;

                td4.appendChild(infoCamp2);

                var td5 = document.createElement("td");
                td5.setAttribute("class", "pt-3-half");

                var buttB = document.createElement("button");
                buttB.setAttribute("type", "button");
                buttB.setAttribute("class", "btn btn-danger btn-rounded btn-sm my-0");
                buttB.innerHTML = "Borrar";
                buttB.addEventListener("click", function () {
                    let isConfirmed = confirm("¿Estas seguro de borrar este punto de Interes?");
                    if (isConfirmed) {
                        var isThisDato = false;
                        for (var contador = 0; contador < info.length && !isThisDato; contador++) {
                            if (info[contador].NamePI == this.parentNode.parentNode.firstChild.innerHTML) {
                                isThisDato = true;
                                info.splice(contador, 1);
                            }
                        }
                        borrarPI(this.parentNode.parentNode.firstChild.innerHTML);
                        tbody.removeChild(this.parentNode.parentNode);

                    }
                });

                td5.appendChild(buttB);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);

                tbody.appendChild(tr);
            };

            tabla.appendChild(thead);
            tabla.appendChild(tbody);

            var card = document.querySelector("#card");

            var buttVolver = document.createElement("button");
            buttVolver.setAttribute("type", "button");
            buttVolver.setAttribute("id", "botonVolver");
            buttVolver.setAttribute("class", "btn btn-light btn-rounded btn-sm px-4");
            buttVolver.addEventListener("click", function () {
                var tabla = document.querySelector("#table");
                tabla.removeChild(tabla.firstElementChild);
                tabla.removeChild(tabla.firstElementChild);

                var divUpload = document.querySelector("#videoUpload");
                var divBut1Upload = document.querySelector("#divAñadirMarcador");
                divUpload.removeChild(divBut1Upload);

                var card = document.querySelector("#card");
                var divButt = document.querySelector("#divButt");
                card.removeChild(divButt);

                var video = document.getElementById('myVideo');
                var nomV = videoFont;
                var nomFolder = nomV.split('.')[0];
                video.setAttribute('src', "assets/video/videosUIB/" + nomFolder + "/" + nomFolder + "_720_frag.mp4");
                document.getElementById("sky").setAttribute('material', "src: #myVideo");
                video.play();
                tablaMarkers(videoSelec);
            });

            buttVolver.innerHTML = "Volver";

            var buttGuardar = document.createElement("button");
            buttGuardar.setAttribute("type", "button");
            buttGuardar.setAttribute("id", "botonGuardar");
            buttGuardar.setAttribute("class", "btn btn-success btn-rounded btn-sm px-4");
            buttGuardar.innerHTML = "Actualizar el servidor";
            buttGuardar.addEventListener("click", function () {
                var contenido = [];
                for (var i = 0; i < tbody.childNodes.length; i++) {
                    for (var ii = 0; ii < tbody.childNodes[i].childNodes.length - 1; ii = ii + 4) {
                        if (tbody.childNodes[i].childNodes[ii].innerHTML.includes('&')) {
                            var Astr = tbody.childNodes[i].childNodes[ii].innerHTML.split('&');
                            var str = Astr[0];
                            for (var iii = 1; iii < Astr.length; iii++) {
                                str += '&' + Astr[iii].slice(4);
                            }
                            contenido.push(str);
                        } else {
                            contenido.push(tbody.childNodes[i].childNodes[ii].innerHTML);
                        }
                        contenido.push(tbody.childNodes[i].childNodes[ii + 1].firstChild.value);
                        contenido.push(tbody.childNodes[i].childNodes[ii + 2].firstChild.value);
                        contenido.push(tbody.childNodes[i].childNodes[ii + 3].firstChild.value);
                    }
                }
                var contenidoAct = contenido.slice(0, (info.length * 4));
                var contenidoNew = contenido.slice((info.length * 4), contenido.length);
                actualizarPI(contenidoAct, contenidoNew);
            });

            var divButt = document.createElement("div");
            divButt.setAttribute("class", "d-flex justify-content-center");
            divButt.setAttribute("id", "divButt");

            var div1 = document.createElement("div");
            div1.setAttribute("class", "px-3");

            var div2 = document.createElement("div");
            div2.setAttribute("class", "px-3");

            div1.appendChild(buttVolver);
            div2.appendChild(buttGuardar);

            divButt.appendChild(div1);
            divButt.appendChild(div2);

            card.appendChild(divButt);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function borrarVideo(id) {
    var xmlhttp = new XMLHttpRequest();
    var url = "bbdd/deleteVideo/" + id;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = xmlhttp.responseText;
            console.log(datos);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function borrarMarcador(id) {
    var xmlhttp = new XMLHttpRequest();
    var url = "bbdd/deleteMarker/" + id;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = xmlhttp.responseText;
            console.log(datos);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function borrarPI(id) {
    var xmlhttp = new XMLHttpRequest();
    var urlName = id.split('&');
    var newUrlName = "";
    newUrlName += urlName[0];
    for (var i = 1; i < urlName.length; i++) {
        newUrlName += "&";
        newUrlName += urlName[i].substr(4, urlName[i].length);
    }
    var url = "bbdd/deletePI/" + newUrlName;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = xmlhttp.responseText;
            console.log(datos);
            //window.location.reload();
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function actualizarPI(ActContenido, newContenido) {
    console.log(ActContenido);
    console.log(newContenido);

    var xmlhttp = new XMLHttpRequest();
    var url = "bbdd/UpdatePI/";
    for (var i = 0; i < ActContenido.length; i++) {
        url += ActContenido[i];
        url += '*';
    }
    url += '/';
    for (var i = 0; i < newContenido.length; i++) {
        url += newContenido[i];
        url += '*';
    }

    if (newContenido.length == 0) {
        url += "1*"
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = xmlhttp.responseText;
            console.log(datos);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function actualizarMarcadores(ActContenido, newContenido) {

    var xmlhttp = new XMLHttpRequest();
    var url = "bbdd/Updatemarkers/" + videoSelec + "/";
    for (var i = 0; i < ActContenido.length; i++) {
        url += ActContenido[i];
        url += '*';
    }
    if (ActContenido.length == 0) {
        url += "1*"
    }
    url += '/';
    for (var i = 0; i < newContenido.length; i++) {
        url += newContenido[i];
        url += '*';
    }

    if (newContenido.length == 0) {
        url += "1*"
    }
    console.log(url);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = xmlhttp.responseText;
            console.log(datos);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function actualizarVideos(ActContenido, newContenido) {
    var xmlhttp = new XMLHttpRequest();
    var url = "bbdd/Updatevideos/";
    for (var i = 0; i < contenido.length; i++) {
        url += contenido[i];
        url += '*';
    }
    url += '/';
    for (var i = 0; i < newContenido.length; i++) {
        url += newContenido[i];
        url += '*';
    }

    if (newContenido.length == 0) {
        url += "1*"
    }
    console.log(url);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var datos = xmlhttp.responseText;
            console.log(datos);
            window.location.reload();
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

