var allOrientacions;
var isMapa = false;
var isAllMapa = false;

document.addEventListener("DOMContentLoaded", function () {
    initA();
})

function initA() {
    dadesRec();
    dadesTour();
}

function dadesTour() {
    var xmlhttp = new XMLHttpRequest();
    var url = "bbdd/tours";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var info = JSON.parse(xmlhttp.responseText);
            pieChart(info);
            lineChart(info);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function dadesRec() {
    var xmlhttp = new XMLHttpRequest();
    var url = "bbdd/recs&users";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var info = JSON.parse(xmlhttp.responseText);
            columnChart(info);
            columnChart2(info);
            crearSelect(info);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function dadesOr(id) {
    var xmlhttp = new XMLHttpRequest();
    var url = "bbdd/orientaciones/" + id;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var info = JSON.parse(xmlhttp.responseText);
            allheatmap(info);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function dadesOrMapa(id) {
    var xmlhttp = new XMLHttpRequest();
    var url = "bbdd/orientacionesVideo/" + id;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var info = JSON.parse(xmlhttp.responseText);
            crearMapa(info);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function pieChart(datos) {
    var tourE = 0;
    var tourI = 0;
    var tourC = 0;
    for (var cont = 0; cont < datos.length; cont++) {
        if (datos[cont].lengua == "es") {
            tourE++;
        } else if (datos[cont].lengua == "cat") {
            tourC++;
        } else if (datos[cont].lengua == "ing") {
            tourI++;
        }
    }
    var Total = tourE + tourC + tourI;
    var porE = (tourE * 100) / Total;
    var porI = (tourI * 100) / Total;
    var porC = (tourC * 100) / Total;
    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        }, accessibility: {
            description: 'Image description: Gráfico que describe en porcentaje los idiomas más seleccionados por los usuarios.'
        },
        title: {
            text: 'Idioma más utilizado por parte de los usuarios en el Tour'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Idiomas',
            colorByPoint: true,
            data: [{
                name: 'Castellano',
                y: porE,
                selected: true
            }, {
                name: 'Catalán',
                y: porC
            }, {
                name: 'Inglés',
                y: porI
            }]
        }]
    });
}

function lineChart(datos) {

    let res = [];
    var fecI = datos[0].fecha.split(" ")[0];
    var añoI = fecI.split('-')[0];
    var mesI = fecI.split('-')[1];
    var diaI = fecI.split('-')[2];
    var dtInit = new Date(añoI, (mesI - 1), diaI);
    var segInit = dtInit.getTime();

    var dtHoy = new Date();
    var diaF = dtHoy.getDate();
    var mesF = dtHoy.getMonth();
    var añoF = dtHoy.getFullYear();

    var dtF = new Date(añoF, mesF, diaF);
    var segFin = dtF.getTime();

    for (var i = segInit; i < (segFin + 86400000); i = i + 86400000) {
        var value = 0;

        for (var cont = 0; cont < datos.length; cont++) {

            var fecA = datos[cont].fecha.split(" ")[0];
            var añoA = fecA.split('-')[0];
            var mesA = fecA.split('-')[1];
            var diaA = fecA.split('-')[2];
            var dtAct = new Date(añoA, (mesA - 1), diaA);
            var segAct = dtAct.getTime();

            if (i == segAct) {
                value++;
            }

        }

        var timeI = i + 86400000 - 79200000;
        let newAr = [timeI, value];
        res.push(newAr);
    }



    Highcharts.chart('container1', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Número de visitas virtuales al campus de la UIB'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Visitas virtuales'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                series: {
                    dataLabels: {
                        align: 'center',
                        enabled: true,
                        inside: true
                    }
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,

                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            type: 'area',
            name: 'Visitas Virtuales',
            data: res
        }]
    });
}

function columnChart(datos) {
    var numVideos = datos[2].length;
    var nomVideos = datos[2];
    var rec = datos[0];
    let result = [];
    for (var i = 0; i < numVideos; i++) {
        let data = [];
        data.push(nomVideos[i].NameVideo);
        var cont = 0;
        for (var ii = 0; ii < rec.length; ii++) {
            if (rec[ii].nom == nomVideos[i].NameVideo) {
                cont++;
            }
        }
        data.push(cont);
        result.push(data);
    }
    Highcharts.chart('container2', {
        chart: {
            type: 'column'
        },
        accessibility: {
            description: 'Image description: Columnas que describe el numero de visualizaciones de cada video.'
        },
        title: {
            text: 'Número de visualizaciones totales de cada vídeo'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Visualizaciones'
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Visitas',
            data: result,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
}

function columnChart2(datos) {
    var rec = datos[0];
    let res = [];
    console.log(rec);

    for (var i = 0; i < rec.length; i = i + cont) {
        var cont = 1;

        while ((i + cont) < rec.length && rec[i].idtour == rec[(i + cont)].idtour) {
            cont++;
        }

        res.push(cont);

    }
    console.log(res);

    var rang = 40;
    var data = [];
    for (var i = 0; i < rang; i = i + 5) {
        var value = 0;

        for (var ii = 0; ii < res.length; ii++) {
            if (res[ii] >= i && res[ii] <= (i + 5)) {
                value++
            }
        }
        data.push(value);
    }

    var value = 0;

    for (var ii = 0; ii < res.length; ii++) {
        if (res[ii] > 40) {
            value++
        }
    }
    data.push(value);

    console.log(data);

    Highcharts.chart('container3', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Histograma de vídeos visualizados en una visita'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                '[0-5]',
                '[6-10]',
                '[11-15]',
                '[16-20]',
                '[21-25]',
                '[26-30]',
                '[31-35]',
                '[36-40]',
                '[40-∞]'
            ],
            crosshair: true,
            title: {
                text: 'Rango de vídeos por visitas'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Número de visitas'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0"></td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                borderWidth: 0,
                groupPadding: 0,
                shadow: false
            }
        },
        series: [{
            name: 'Número de visitas',
            data: data

        }]
    });
}

function allheatmap(data) {
    if (isAllMapa) {
        var cont = document.querySelector('#container4');
        while (cont.firstChild) {
            cont.removeChild(cont.firstChild);
        }

    } else {
        isAllMapa = true;
    }

    var datos = data;

    var heatmapInstance = h337.create({
        container: document.querySelector('#container4'),
        radius: 45
    });

    var long = document.querySelector('#container4').clientWidth;

    for (var i = 0; i < datos.length; i++) {
        datos[i].y = datos[i].y * (340 / 180);
        datos[i].x = datos[i].x * (long / 360);
        datos[i].y = Math.round(datos[i].y);
        datos[i].x = Math.round(datos[i].x);
    }

    let maxDades = [];
    for (var i = 0; i < datos.length; i++) {
        maxDades.push(datos[i].value);
    }

    var maxD = Math.max(...maxDades);
    console.log(maxD);
    heatmapInstance.setData({
        max: maxD,
        data: datos
    });

}

function crearSelect(datos) {
    var t1 = document.querySelector("#selectorAllVideos")
    var t2 = document.querySelector("#selectorOneVideos")
    var videos = datos[2];

    var selectPI = document.createElement("select");
    selectPI.setAttribute('class', "selectpicker");
    selectPI.setAttribute("data-width", "100%");

    selectPI.setAttribute("data-live-search", "true");

    for (var i = 0; i < videos.length; i++) {
        var option = document.createElement("option");
        option.value = videos[i].IdVideo;
        option.text = videos[i].NameVideo;
        selectPI.appendChild(option);
    }

    t2.appendChild(selectPI);
    $(function () { $(".selectpicker").selectpicker('render'); })

    var selectPI2 = document.createElement("select");
    selectPI2.setAttribute('class', "selectpicker");
    selectPI2.setAttribute('id', "selectAll");
    selectPI2.setAttribute("data-width", "100%");
    selectPI2.setAttribute("multiple", true);

    selectPI2.setAttribute("data-live-search", "true");

    var boxAll = document.querySelector("#boxAll");
    var boxLoop = document.querySelector("#boxLoop");
    var boxRec = document.querySelector("#boxRec");

    for (var i = 0; i < videos.length; i++) {
        var option = document.createElement("option");
        option.value = videos[i].IdVideo;
        option.text = videos[i].NameVideo;
        
        selectPI2.appendChild(option);
    }

    selectPI2.addEventListener("change", function() {
        console.log("Entro");
        var values = getSelectValues(selectPI2);
        console.log(values);
        console.log(values.length);
        if(values.length == 0){
            boxAll.checked = true;
            boxLoop.checked = false;
            boxRec.checked = false;
        } else {
            boxAll.checked = false;
            boxLoop.checked = false;
            boxRec.checked = false;
        }
    });

    t1.appendChild(selectPI2);
    $(function () { $(".selectpicker").selectpicker('render'); }) 

    boxAll.addEventListener('change', function () {
        if (this.checked) {
            boxLoop.checked = false;
            boxRec.checked = false;

            $('#selectAll').selectpicker('deselectAll');
        }
    });


    boxLoop.addEventListener('change', function () {
        if (this.checked) {
            boxAll.checked = false;
            boxRec.checked = false;
            $('#selectAll').selectpicker('deselectAll');
        }
    });

    boxRec.addEventListener('change', function () {
        if (this.checked) {
            boxAll.checked = false;
            boxLoop.checked = false;
            $('#selectAll').selectpicker('deselectAll');
        }
    });

    var botonMapa = document.querySelector("#botonMapa");

    botonMapa.addEventListener('click', function () {
        var video = document.querySelector('#videoMapaPlay');
        var nomV = "";
        for (var i = 0; i < videos.length; i++) {
            if (videos[i].IdVideo == selectPI.value) {
                nomV = videos[i].NameVideo;
            }
        }
        var nomFolder = nomV;
        video.src = "assets/video/videosUIB/" + nomFolder + "/" + nomFolder + "_720_frag.mp4";
        var val = selectPI.value;
        dadesOrMapa(val);
    })

    var botonAllMapa = document.querySelector("#botonAllMapa");
    botonAllMapa.addEventListener('click', function () {
        var v = document.querySelector("#videoMapa");
        if (boxAll.checked) {
            var cont = "";
            cont += videos[0].IdVideo
            for (var i = 1; i < videos.length; i++) {
                cont += '*'
                cont += videos[i].IdVideo;
            }
            dadesOr(cont);
            v.src = "";
        } else if (boxLoop.checked) {
            var cont = "";
            var isV = true;
            var contador = 0;
            while (isV) {
                if (videos[contador].IsLoop) {
                    cont += videos[contador].IdVideo
                    isV = false;
                }
                contador++;
            }
            for (var i = contador; i < videos.length; i++) {
                if (videos[i].IsLoop) {
                    cont += '*'
                    cont += videos[i].IdVideo;
                }
            }
            dadesOr(cont);
            v.src = "";
        } else if (boxRec.checked) {
            var cont = "";
            var isV = true;
            var contador = 0;
            while (isV) {
                if (!videos[contador].IsLoop) {
                    cont += videos[contador].IdVideo
                    isV = false;
                }
                contador++;
            }
            for (var i = contador; i < videos.length; i++) {
                if (!videos[i].IsLoop) {
                    cont += '*'
                    cont += videos[i].IdVideo;
                }
            }
            dadesOr(cont);
            v.src = "";
        } else {
            var values = getSelectValues(selectPI2);
            var cont = "";
            cont += values[0]
            for (var i = 1; i < values.length; i++) {
                cont += '*'
                cont += values[i];
            }
            dadesOr(cont);
            v.src = "";
            if (values.length == 1) {
                var nomV = "";
                for (var i = 0; i < videos.length; i++) {
                    if (videos[i].IdVideo == values[0]) {
                        nomV = videos[i].NameVideo;
                    }
                }

                var nomFolder = nomV;
                v.src = "assets/video/videosUIB/" + nomFolder + "/" + nomFolder + "_720_frag.mp4";
            }
        }
    });
}

function crearMapa(datos) {
    if (isMapa) {
        var cont = document.querySelector('#container5');
        var cont2 = document.querySelector('#buttonTime');
        cont.removeChild(cont.firstChild);
        cont2.removeChild(cont2.firstChild);
    } else {
        isMapa = true;
    }
    var long = document.querySelector('#container5').clientWidth;
    let arrayTemps = [];
    for (var i = 0; i < datos.length; i++) {
        datos[i].y = datos[i].y * (340 / 180);
        datos[i].x = datos[i].x * (long / 360);
        datos[i].y = Math.round(datos[i].y);
        datos[i].x = Math.round(datos[i].x);
        arrayTemps.push(datos[i].tempsid);
    }

    var tempsMin = 0;
    var tempsMax = Math.max(...arrayTemps);

    let res = [];
    for (var i = tempsMin; i < tempsMax; i++) {
        let arrayAux = [];
        for (var ii = 0; ii < datos.length; ii++) {
            if (i == datos[ii].tempsid) {
                arrayAux.push(datos[ii]);
            }
        }
        res.push(arrayAux);
    }

    let dataH = [];
    for (var i = 0; i < res.length; i++) {
        let arrayAux = [];

        for (var ii = 0; ii < res[i].length; ii++) {
            arrayAux.push(res[i][ii].value);
        }
        var valueMin = 0;
        var valueMax = Math.max(...arrayAux);
        var obj = {
            min: valueMin,
            max: valueMax,
            data: res[i]
        }
        dataH.push(obj);
    }
    console.log(dataH);


    // creating a class to wrap the heatmap cycling logic
    function AnimationPlayer(options) {
        this.heatmap = options.heatmap;
        this.data = options.data;
        this.interval = null;
        this.animationSpeed = options.animationSpeed || 1000;
        this.wrapperEl = options.wrapperEl;
        this.isPlaying = false;
        this.init();
    };

    // define the prototype functions
    AnimationPlayer.prototype = {
        init: function () {
            var dataLen = this.data.length;
            this.wrapperEl.innerHTML = '';
            var playButton = this.playButton = document.createElement('button');
            playButton.onclick = function () {
                if (this.isPlaying) {
                    this.stop();
                } else {
                    this.play();
                }
                this.isPlaying = !this.isPlaying;
            }.bind(this);
            playButton.innerText = 'play';

            this.wrapperEl.appendChild(playButton);

            var events = document.createElement('div');
            events.className = 'heatmap-timeline';
            events.innerHTML = '';

            for (var i = 0; i < dataLen; i++) {

                var xOffset = 100 / (dataLen - 1) * i;

                var ev = document.createElement('div');
                ev.className = 'time-point';
                ev.style.left = xOffset + '%';

                ev.onclick = (function (i) {
                    return function () {
                        this.isPlaying = false;
                        this.stop();
                        this.setFrame(i);
                    }.bind(this);
                }.bind(this))(i);

                events.appendChild(ev);

            }
            this.wrapperEl.appendChild(events);
            this.setFrame(0);
        },
        play: function () {
            var video = document.querySelector('#videoMapaPlay');
            video.play();
            var dataLen = this.data.length;
            this.playButton.innerText = 'pause';
            this.interval = setInterval(function () {
                this.setFrame(++this.currentFrame % dataLen);
            }.bind(this), this.animationSpeed)
        },
        stop: function () {
            var video = document.querySelector('#videoMapaPlay');
            video.pause();
            clearInterval(this.interval);
            this.playButton.innerText = 'play';
        },
        setFrame: function (frame) {
            this.currentFrame = frame;
            var snapshot = this.data[frame];
            this.heatmap.setData(snapshot);
            var timePoints = $('.heatmap-timeline .time-point');
            for (var i = 0; i < timePoints.length; i++) {
                timePoints[i].classList.remove('active');
            }
            timePoints[frame].classList.add('active');
        },
        setAnimationData: function (data) {
            this.isPlaying = false;
            this.stop();
            this.data = data;
            this.init();
        },
        setAnimationSpeed: function (speed) {
            this.isPlaying = false;
            this.stop();
            this.animationSpeed = speed;
        }
    };

    var heatmapInstance = h337.create({
        container: document.querySelector('#container5'),
        radius: 20
    });

    var player = new AnimationPlayer({
        heatmap: heatmapInstance,
        wrapperEl: document.querySelector('.timeline-wrapper'),
        data: dataH,
        animationSpeed: 1000
    });
}

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}