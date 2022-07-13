//Variables Globales
var language = "es";
var escenaActual = -1;
var infoVideos;
var datos;
var usuari, tour, recorrido;


document.addEventListener("DOMContentLoaded", function () {
    var escena = document.querySelector('a-scene');

    if (escena.hasLoaded) {
        init();
    } else {
        escena.addEventListener('loaded', init());
    }


})

//FUNCIÓN DE INICIALIZACIÓN
/*Esta función se encarga de atribuir a la esfera la imagen de la portada,
  crea un elemento video donde se le assigna una id,
  crea una box asignandole una clase, varios atributos y una función
  y los annexa a la esfera.*/
function init() {

    crearUsuari();
    //Asignar al material de la esfera la dirección de la portada
    document.getElementById("sky").setAttribute('material', "src: assets/images/image360.jpg");

    //Se crea el boton de los idiomas.
    var botonLang2 = document.createElement("a-box");
    botonLang2.setAttribute('class', "clickable");
    botonLang2.setAttribute('material', "src: assets/images/espanya.jpg");
    botonLang2.setAttribute('position', "1 -0.485 0.14");
    botonLang2.setAttribute('width', "0.001");
    botonLang2.setAttribute('height', "0.1");
    botonLang2.setAttribute('depth', "0.13");

    //Se crea el boton de los idiomas.
    var botonLang3 = document.createElement("a-box");
    botonLang3.setAttribute('class', "clickable");
    botonLang3.setAttribute('material', "src: assets/images/ingles.jpg");
    botonLang3.setAttribute('position', "1 -0.485 0.01");
    botonLang3.setAttribute('width', "0.001");
    botonLang3.setAttribute('height', "0.1");
    botonLang3.setAttribute('depth', "0.13");

    //Se crea el boton de los idiomas.
    var botonLang4 = document.createElement("a-box");
    botonLang4.setAttribute('class', "clickable");
    botonLang4.setAttribute('material', "src: assets/images/catalan.jpg");
    botonLang4.setAttribute('position', "1 -0.485 -0.12");
    botonLang4.setAttribute('width', "0.001");
    botonLang4.setAttribute('height', "0.1");
    botonLang4.setAttribute('depth', "0.13");

    //Se crea un panel que se pueda clicar, con una imagen y una posición.
    var panel = document.createElement("a-box");
    panel.setAttribute('material', "src: assets/images/portadaTFG/cast.png");
    if (AFRAME.utils.device.isMobile()) {
        console.log("es un mobil");
        panel.setAttribute('position', "3 -0.2 0");
    } else {
        console.log("es un pc")
        panel.setAttribute('position', "2 0 0");
    }


    panel.setAttribute('scale', "1 1 1");
    panel.setAttribute('width', "0.01");
    panel.setAttribute('height', "2");
    panel.setAttribute('depth', "3");
    panel.setAttribute('animation', "property: scale; startEvents: more; from: 1 1 1; to: 1.5 1.5 1.5; dur: 2000; easing: easeOutQuart");
    panel.setAttribute('animation__2', "property: scale; startEvents: less; from: 1.5 1.5 1.5; to: 1 1 1; dur: 2000; easing: easeOutQuart");

    botonLang2.addEventListener('click', function () {
        panel.setAttribute('material', "src: assets/images/portadaTFG/cast.png");
        language = "es";
    });

    botonLang3.addEventListener('click', function () {
        panel.setAttribute('material', "src: assets/images/portadaTFG/ing.png");
        language = "ing";
    });

    botonLang4.addEventListener('click', function () {
        panel.setAttribute('material', "src: assets/images/portadaTFG/cat.png");
        language = "cat";
    });

    //Se crea un panel que se pueda clicar, con una imagen y una posición.
    var boxInicio = document.createElement("a-box");
    boxInicio.setAttribute('class', "clickable");
    //boxInicio.setAttribute('color', "#CCC");
    boxInicio.setAttribute('material', "opacity: 0.0;transparent: false");
    boxInicio.setAttribute('position', "1.8 -0.50 0");
    boxInicio.setAttribute('width', "0.001");
    boxInicio.setAttribute('height', "0.20");
    boxInicio.setAttribute('depth', "1.5");

    //Se crea un panel que se pueda clicar, con una imagen y una posición.
    var botonMax = document.createElement("a-box");
    botonMax.setAttribute('class', "clickable");
    botonMax.setAttribute('material', "src: assets/images/maximizar.png");
    botonMax.setAttribute('position', "1.8 0.6 -0.95");
    botonMax.setAttribute('width', "0.001");
    botonMax.setAttribute('height', "0.25");
    botonMax.setAttribute('depth', "0.25");

    var botonActualMax = true;
    var botonActualMin = false;

    //Se crea un panel que se pueda clicar, con una imagen y una posición.
    var botonMin = document.createElement("a-box");
    botonMin.setAttribute('material', "src: assets/images/minimizar.png");
    botonMin.setAttribute('position', "1.8 0.8 -1.4");
    botonMin.setAttribute('width', "0.001");
    botonMin.setAttribute('height', "0.5");
    botonMin.setAttribute('depth', "0.5");
    botonMin.setAttribute('material', "opacity: 0.0; transparent: true");

    var timeOutMax;
    var timeOutMin;

    //Se añade un evento cuando se clica que se autoelimine
    botonMax.addEventListener('click', function () {
        botonActualMax = false;
        botonMax.classList.remove('clickable');
        botonMax.setAttribute('material', "opacity: 0.0; transparent: true");
        panel.emit('more');
        var timeOutMax = setTimeout(function () {
            botonActualMin = true;
            botonMin.setAttribute('class', "clickable");
            botonMin.setAttribute('material', "opacity: 1; transparent: false");

            boxInicio.setAttribute('position', "1.8 -0.70 0");
            boxInicio.setAttribute('height', "0.25");
            boxInicio.setAttribute('depth', "2");
        }, 2000);
    });

    //Se añade un evento cuando se clica que se autoelimine
    botonMin.addEventListener('click', function () {
        botonActualMin = false;
        botonMin.classList.remove('clickable');
        botonMin.setAttribute('material', "opacity: 0.0; transparent: true");
        panel.emit('less');
        var timeOutMin = setTimeout(function () {
            botonActualMax = true;
            botonMax.setAttribute('class', "clickable");
            botonMax.setAttribute('material', "opacity: 1; transparent: false");

            boxInicio.setAttribute('position', "1.8 -0.50 0");
            boxInicio.setAttribute('height', "0.20");
            boxInicio.setAttribute('depth', "1.5");
        }, 2000);
    });

    boxInicio.addEventListener('click', function () {
        initTour();
        document.getElementById("sky").removeChild(panel);
        document.getElementById("sky").removeChild(boxInicio);
        document.getElementById("sky").removeChild(botonLang2);
        document.getElementById("sky").removeChild(botonLang3);
        document.getElementById("sky").removeChild(botonLang4);
        if (botonActualMax) {
            document.getElementById("sky").removeChild(botonMax);
        }
        if (botonActualMin) {
            document.getElementById("sky").removeChild(botonMin);
        }
        clearTimeout(timeOutMax);
        clearTimeout(timeOutMin);
    });

    //Anexamos el panel a la esfera y el video a los assets
    document.getElementById("sky").appendChild(botonLang2);
    document.getElementById("sky").appendChild(botonLang3);
    document.getElementById("sky").appendChild(botonLang4);
    document.getElementById("sky").appendChild(panel);
    document.getElementById("sky").appendChild(botonMax);
    document.getElementById("sky").appendChild(botonMin);
    document.getElementById("sky").appendChild(boxInicio);

}

//FUNCION PARA REPRODUCIR LOS VIDEOS EN LA ESFERA
/*Esta función se encarga de consultar el JSON, modificar el elemento
  video con la información del JSON y luego modificar el material de la
  esfera con este video. También se crean elementos BOX por cada punto 
  de interes que hay en el JSON. Mediante estas BOX se podrá reproducir
  otros videos del JSON.*/
function CarregarVideos(i) {
    escenaActual = i;
    //Solicitar info de los marcadores
    var xmlhttp = new XMLHttpRequest();
    var url = "bbdd/marcadores/" + i;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var info = JSON.parse(xmlhttp.responseText);
            datos = info[1];
            infoVideos = info[0];
            var infoPI = info[2];

            var video = document.getElementById('myVideo');
            var nomV = infoVideos[0].NameVideo;
            console.log(nomV);
            if (Hls.isSupported()) {
                var hls = new Hls();
                // bind them together
                hls.attachMedia(video);
                hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                    console.log('video and hls.js are now bound together !');
                    hls.loadSource('assets/video/videosUIB/' + nomV + '/master.m3u8');
                    video.play();
                });
            } else if (dashjs.supportsMediaSource) {
                // Definir URL del manifest 
                var urlDash = 'assets/video/videosUIB/' + nomV + '/stream.mpd';
                // Crear e inicialitzar el player
                var player = dashjs.MediaPlayer().create();
                player.initialize(video, urlDash, true);
                player.updateSettings({
                    streaming: {
                        abr: {
                            autoSwitchBitrate: { audio: true, video: true },
                            useDefaultABRRules: true,
                            ABRStrategy: "abrDynamic",
                            additionalAbrRules: {
                                insufficientBufferRule: true,
                                switchHistoryRule: true,
                                droppedFramesRule: true,
                                abandonRequestsRule: true
                            }
                        },
                        buffer: {
                            fastSwitchEnabled: true,
                        }
                    }
                });
            }        

            document.getElementById("sky").setAttribute('material', "src: #myVideo");
            video.play();
            video.loop = infoVideos[0].IsLoop;

            if (video.loop) {
                var tipus = "Bucle"
            } else {
                var tipus = "Recorrido"
            }
            insertRecor(tipus, infoVideos[0].NameVideo);

            Object.keys(datos).forEach(id => {
                var box = document.createElement("a-box");
                box.setAttribute('width', "15");
                box.setAttribute('height', "15");
                box.setAttribute('depth', "0.01");
                box.setAttribute('transparent', "true");
                box.setAttribute('opacity', "0.0");
                box.setAttribute('hover-video', true);
                box.setAttribute('look-at', "[camera]")
                puntInt = datos[id];
                box.setAttribute('ID', puntInt.IdMarker);

                let posBox = CalculoTrigonometrico(puntInt.LatIn, puntInt.LatF, puntInt.LongIn, puntInt.LongF, puntInt.TempsIn, puntInt.TempsF, 0);
                box.setAttribute('position', { x: posBox[0], y: posBox[1], z: posBox[2] });

                var panelPI = document.createElement("a-image");
                panelPI.setAttribute('class', "clickable");
                panelPI.setAttribute('src', "assets/images/PI/edificis.png");
                panelPI.setAttribute('position', { x: 0, y: 0, z: 0.5 });
                panelPI.setAttribute('width', 15);
                panelPI.setAttribute('height', 15);
                box.appendChild(panelPI);


                var titolPunt = document.createElement("a-entity");
                titolPunt.setAttribute('position', { x: 0, y: -13, z: 0 });
                titolPunt.setAttribute('scale', "8 8 8");
                var titolMarcador = puntInt.NamePI.replaceAll('&', '\n');
                titolPunt.setAttribute('text', "value: " + titolMarcador + "; font: assets/custom-msdf.json; negate: false; color: white; width: 10; align:center");

                panelPI.addEventListener('click', function () {
                    borrarPunts();
                    cont = datos[id].IdNextVideo;
                    video.pause();
                    CarregarVideos(cont);
                });

                var infoPopUp = document.createElement("a-box");
                infoPopUp.setAttribute('position', { x: 10, y: 12, z: 0 });
                infoPopUp.setAttribute('scale', "4 4 4");
                infoPopUp.setAttribute('src', "assets/images/info.jpeg");
                infoPopUp.setAttribute('class', "clickable");
                infoPopUp.setAttribute('id', puntInt.NamePI);
                var isPopUp = false;
                infoPopUp.addEventListener('click', function () {
                    if (isPopUp) {
                        this.removeChild(this.firstChild);
                        this.removeChild(this.firstChild);
                        video.play();
                        isPopUp = false;
                    } else {
                        var infoPlane = document.createElement("a-plane");
                        infoPlane.setAttribute('color', "#F4F4F4");
                        infoPlane.setAttribute('position', { x: -2.5, y: 2, z: 3 });
                        infoPlane.setAttribute('width', 12);
                        infoPlane.setAttribute('height', 7);

                        var infoDefPI;
                        for (var conta = 0; conta < infoPI.length; conta++) {
                            if (infoPI[conta].NamePI == this.id) {
                                infoDefPI = infoPI[conta];
                            }
                        }

                        var tituloPlane = document.createElement("a-entity");
                        tituloPlane.setAttribute('position', { x: 0, y: 1, z: 0.25 })
                        tituloPlane.setAttribute('text', "value: " + infoDefPI.NamePI + "; color: black; width: 11; wrapCount: 25; shader: msdf; font: assets/custom-msdf.json; negate: false;");
                        infoPlane.appendChild(tituloPlane);

                        var textoPlane = document.createElement("a-entity");
                        textoPlane.setAttribute('scale', "1 1 2");
                        textoPlane.setAttribute('position', { x: 0, y: -1, z: 0.25 })
                        if (language == "es") {
                            textoPlane.setAttribute('text', "value:" + infoDefPI.DescCast + "; color: black; width: 11; wrapCount: 40; shader: msdf; font: assets/custom-msdf.json; negate: false;");
                        } else if (language == "cat") {
                            textoPlane.setAttribute('text', "value:" + infoDefPI.DescCat + "; color: black; width: 11; wrapCount: 40; shader: msdf; font: assets/custom-msdf.json; negate: false;");
                        } else if (language == "ing") {
                            textoPlane.setAttribute('text', "value:" + infoDefPI.DescIng + "; color: black; width: 11; wrapCount: 40; shader: msdf; font: assets/custom-msdf.json; negate: false;");
                        }
                        infoPlane.appendChild(textoPlane);

                        this.appendChild(infoPlane);

                        var closePlane = document.createElement("a-box");
                        closePlane.setAttribute('src', "assets/images/cerrar.jpeg");
                        closePlane.setAttribute('class', "clickable");
                        closePlane.setAttribute('position', { x: 2.5, y: 4.5, z: 5 });
                        closePlane.setAttribute('width', 1.5);
                        closePlane.setAttribute('height', 1.5);
                        closePlane.addEventListener('click', function () {
                            isPopUp = true;
                        });
                        this.appendChild(closePlane);
                    }

                });

                box.appendChild(infoPopUp);
                box.appendChild(titolPunt);
                document.getElementById("escena").appendChild(box);
            });

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

//FUNCION PARA BORRAR LOS PUNTOS DE INTERES
/*Esta función se encarga de borrar los puntos de interes
  de una zona. Para eso se le pasa por parámetro la zona y
  recorre los puntos borrando cada uno.*/
function borrarPunts() {
    if (datos !== undefined) {
        Object.keys(datos).forEach(id => {
            var invPunt = datos[id];
            var invBox = document.getElementById(invPunt.IdMarker);
            if (invBox !== null) {
                document.getElementById("escena").removeChild(invBox);
                console.log(document.getElementById("escena").childNodes);
            }

        });
    }
}


//FUNCION PARA COMPROBAR LOS PUNTOS DE INTERES
/*Esta función se encarga de comprobar. */
function ComprovarPunts() {
    var video = document.getElementById('myVideo');

    if (video.src) {
        Object.keys(datos).forEach(id => {

            var movePunt = datos[id];
            var moveBox = document.getElementById(movePunt.IdMarker);

            if (video.currentTime < movePunt.TempsIn || video.currentTime > movePunt.TempsF) {
                if (moveBox !== null) {
                    moveBox.setAttribute('position', { x: 200, y: 200, z: 200 });
                }

            } else {
                let posBox = CalculoTrigonometrico(movePunt.LatIn, movePunt.LatF, movePunt.LongIn, movePunt.LongF, movePunt.TempsIn, movePunt.TempsF, video.currentTime);
                if (moveBox !== null) {
                    moveBox.setAttribute('position', { x: posBox[0], y: posBox[1], z: posBox[2] });
                }

            }

        });

    }


    if (!video.loop) {
        if (video.currentTime > (video.duration - 0.2)) {
            borrarPunts();
            video.pause();
            video.currentTime = video.currentTime - 0.5;
            CarregarVideos(infoVideos[0].IdNextVideo);
        }
    }
}

/*
Esta función ...
*/
function CalculoTrigonometrico(latI, latF, longI, longF, tI, tF, tA) {

    latI = latI * (Math.PI / 180);
    latF = latF * (Math.PI / 180);
    longI = longI * (Math.PI / 180);
    longF = longF * (Math.PI / 180);

    if (latI == latF) {
        latF += 0.001;
    }

    if (longI == longF) {
        longF += 0.001;
    }

    var d = Math.acos(Math.cos(latI) * Math.cos(latF) * Math.cos(longI - longF) + Math.sin(latI) * Math.sin(latF));
    var f = (tA - tI) / (tF - tI);
    var A = Math.sin((1 - f) * d) / Math.sin(d);
    var B = Math.sin(f * d) / Math.sin(d);

    var posX = A * Math.cos(latI) * Math.sin(longI) + B * Math.cos(latF) * Math.sin(longF);
    var posY = A * Math.sin(latI) + B * Math.sin(latF);
    var posZ = A * Math.cos(latI) * (-1) * Math.cos(longI) + B * Math.cos(latF) * (-1) * Math.cos(longF);

    //Escalado al radio de la esfera
    var resX = posX * 95;
    var resY = posY * 95;
    var resZ = posZ * 95;

    //Creo el vector de coordenadas y lo devuelvo
    let coordenadas = [resX, resY, resZ];

    return coordenadas;

    //var latA = Math.atan2(posY, Math.sqrt( Math.pow(posX, 2) + Math.pow(posZ, 2)));
    //var longA = Math.atan2(posX, posZ);

}

document.addEventListener('keypress', logKey);

function logKey(e) {
    if (e.code == "KeyM") {
        if (escenaActual == -1) {
            var url = "https://www.google.es/maps/@39.6375636,2.6450854,3a,75y,258.44h,91.23t/data=!3m7!1e1!3m5!1sdChZ0lCao1Llaocl8nMdMg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3DdChZ0lCao1Llaocl8nMdMg%26cb_client%3Dmaps_sv.tactile.gps%26w%3D203%26h%3D100%26yaw%3D98.58683%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656";
            window.open(url, '_blank');
        } else {

        }
    }
}

function crearUsuari() {
    var user = localStorage.getItem('user');
    if (user) {
        console.log("si hay user");
        usuari = user;
    } else {
        console.log("no hay user");
        var xmlhttp = new XMLHttpRequest();
        var url = "bbdd/crearUsuari";
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var idUser = xmlhttp.responseText;
                localStorage.setItem('user', idUser);
                usuari = idUser;
            }

        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    }
}

function initTour() {

    var xmlhttp = new XMLHttpRequest();
    var url = "bbdd/nouTour/" + usuari + "/" + language;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var idTour = xmlhttp.responseText;
            tour = idTour;
            //setInterval(insertOr, 250);
            CarregarVideos(0);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function insertRecor(tipus, nom) {

    var xmlhttp = new XMLHttpRequest();
    var url = "bbdd/nouRec/" + tipus + "/" + nom + "/" + tour;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var idRec = xmlhttp.responseText;
            recorrido = idRec;
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function insertOr() {
    var video = document.getElementById('myVideo');
    var cam = document.getElementById("camara");

    if (video.readyState === 4) {
        var tempsA = video.currentTime.toFixed(2);
        var rotCamera = cam.getAttribute('rotation');
        var lat = rotCamera.x.toFixed(2);
        var newLong = rotCamera.y.toFixed(2);
        newLong = (((newLong % 360) + 360 + 180) % 360) - 180;
        newLong = newLong * (-1)
        var long = newLong.toFixed(2);

        var cont = tempsA + '*' + lat + '*' + long + '*' + recorrido + '*' + escenaActual

        var xmlhttp = new XMLHttpRequest();
        var url = "bbdd/nouOrient/" + cont;
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var IdOr = xmlhttp.responseText;
                //console.log(IdOr)
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}