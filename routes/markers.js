const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const mysqlConnection = require('../database.js');

// GET video y sus marcadores
router.get('/bbdd/marcadores/:id', (req, res) => {
    var id = req.params.id;
    var infoVideo;
    var infoMarcadores;
    var infoPI;
    var infoMark;

    mysqlConnection.query('SELECT * FROM videos WHERE IdVideo = ?', [id], (err, rows, fields) => {
        if (!err) {
            infoVideo = rows;
        } else {
            res.send("Error");
            console.log(err);
        }
    });

    mysqlConnection.query('SELECT * FROM puntosInteres', (err, rows, fields) => {
        if (!err) {
            infoPI = rows;
        } else {
            res.send("Error");
            console.log(err);
        }
    });

    mysqlConnection.query('SELECT * FROM marcadores WHERE IdVideo = ?', [id], (err, rows, fields) => {
        if (!err) {
            infoMarcadores = rows;
        } else {
            res.send("Error");
            console.log(err);
        }
    });

    mysqlConnection.query('SELECT * FROM marcadores', [id], (err, rows, fields) => {
        if (!err) {
            infoMark = rows;
            var info = [infoVideo, infoMarcadores, infoPI, infoMark];
            res.json(info);
        } else {
            res.send("Error");
            console.log(err);
        }
    });


})

router.get('/bbdd/videos', (req, res) => {

    mysqlConnection.query('SELECT * FROM videos', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.send("Error");
            console.log(err);
        }
    });

})

router.get('/bbdd/PI', (req, res) => {

    mysqlConnection.query('SELECT * FROM puntosInteres', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.send("Error");
            console.log(err);
        }
    });

})

router.get('/bbdd/Updatevideos/:actcont/:newcont', (req, res) => {
    var actContenido = req.params.actcont;
    var newContenido = req.params.newcont;
    var contA = actContenido.split("*");
    var contN = newContenido.split("*");

    for (var i = 0; i < contA.length - 1; i = i + 5) {

        var issLoop;
        if (contA[i + 3] == "False") {
            issLoop = 0;
        } else {
            issLoop = 1;
        }

        var sql1 = "UPDATE videos SET GeoPos = '" + contA[i + 2] + "', isLoop = '" + issLoop + "', IdNextVideo = '" + contA[i + 4] + "' WHERE IdVideo = '" + contA[i] + "'";

        mysqlConnection.query(sql1, (err, rows, fields) => {
            if (!err) {
                console.log("OK");
            } else {
                res.send("Error");
                console.log(err);
            }
        });

    }

    for (var i = 0; i < contN.length - 1; i = i + 5) {

        var issLoop;
        if (contN[i + 3] == "False") {
            issLoop = 0;
        } else {
            issLoop = 1;
        }

        var sql1 = "INSERT INTO videos (IdVideo, NameVideo, GeoPos, IdNextVideo, IsLoop) VALUES ('" + contN[i] + "', '" + contN[i + 2] + "','" + contN[i + 3] + "', '" + contN[i + 4] + "','" + issLoop + "')";

        mysqlConnection.query(sql1, (err, rows, fields) => {
            if (!err) {
                console.log("OK");
            } else {
                res.send("Error");
                console.log(err);
            }
        });

    }

    res.send("ok")


})

router.get('/bbdd/Updatemarkers/:vid/:actcont/:newcont', (req, res) => {
    var video = req.params.vid;
    var actContenido = req.params.actcont;
    var newContenido = req.params.newcont;
    var contA = actContenido.split("*");
    var contN = newContenido.split("*");

    console.log(contA);
    for (var i = 0; i < contA.length - 1; i = i + 9) {

        var sql1 = "UPDATE marcadores SET TempsIn = '" + contA[i + 2] + "', TempsF = '" + contA[i + 3] + "',LatIn = '" + contA[i + 4] + "', LatF = '" + contA[i + 5] + "', LongIn = '" + contA[i + 6] + "', LongF = '" + contA[i + 7] + "', IdNextVideo = '" + contA[i + 8] + "', IdVideo = '" + video + "', NamePI = '" + contA[i + 1] + "' WHERE IdMarker = '" + contA[i] + "'";
        console.log(sql1)
        mysqlConnection.query(sql1, (err, rows, fields) => {
            if (!err) {
                console.log("OK");
            } else {
                //res.send("Error");
                console.log(err);
            }
        });

    }

    console.log(contN);
    for (var i = 0; i < contN.length - 1; i = i + 9) {
        var sql1 = "INSERT INTO marcadores (IdMarker, TempsIn, TempsF, LatIn, LatF, LongIn, LongF, IdNextVideo, IdVideo, NamePI) VALUES ('" + contN[i] + "', '" + contN[i + 2] + "','" + contN[i + 3] + "', '" + contN[i + 4] + "','" + contN[i + 5] + "', '" + contN[i + 6] + "','" + contN[i + 7] + "', '" + contN[i + 8] + "','" + video + "', '" + contN[i + 1] + "')";;

        console.log(sql1)
        mysqlConnection.query(sql1, (err, rows, fields) => {
            if (!err) {
                console.log("OK");
            } else {
                //res.send("Error");
                console.log(err);
            }
        });

    }

    console.log("Envio OK")
    res.send("OK");


})

router.get('/bbdd/UpdatePI/:actcont/:newcont', (req, res) => {
    var actContenido = req.params.actcont;
    var newContenido = req.params.newcont;
    var contA = actContenido.split("*");
    var contN = newContenido.split("*");

    console.log(contA);
    console.log(contN);
    for (var i = 0; i < contA.length - 1; i = i + 4) {

        console.log("Hago un UPDATE");
        var sql1 = "UPDATE puntosInteres SET NamePI = '" + contA[i] + "', DescCast = '" + contA[i + 1] + "',DescCat = '" + contA[i + 2] + "', DescIng = '" + contA[i + 3] + "' WHERE NamePI = '" + contA[i] + "'";
        console.log(sql1)
        mysqlConnection.query(sql1, (err, rows, fields) => {
            if (!err) {
                console.log("OK");
            } else {
                //res.send("Error");
                console.log(err);
            }
        });

    }

    for (var i = 0; i < contN.length - 1; i = i + 4) {

        if (contN[0] == 1) {
            console.log("No Insert")
        } else {
            console.log("Hago un INSERT");
            var sql1 = "INSERT INTO puntosInteres (NamePI, DescCast, DescCat, DescIng) VALUES ('" + contN[i] + "', '" + contN[i + 1] + "', '" + contN[i + 2] + "','" + contN[i + 3] + "')";;

            console.log(sql1)
            mysqlConnection.query(sql1, (err, rows, fields) => {
                if (!err) {
                    console.log("OK");
                } else {
                    //res.send("Error");
                    console.log(err);
                }
            });
        }


    }

    console.log("Envio OK")
    res.send("OK");


})

router.get('/bbdd/deleteVideo/:id', (req, res) => {
    var idPI = req.params.id;

    console.log(idPI);
    var sql1 = "DELETE FROM marcadores WHERE IdVideo = '" + idPI + "'";
    var sql2 = "DELETE FROM videos WHERE IdVideo = '" + idPI + "'";

    mysqlConnection.query(sql1, (err, rows, fields) => {
        if (!err) {
            console.log("OK");
        } else {
            res.send("Error");
            console.log(err);
        }
    });

    mysqlConnection.query(sql2, (err, rows, fields) => {
        if (!err) {
            res.send("OK");
        } else {
            res.send("Error");
            console.log(err);
        }
    });



})

router.get('/bbdd/deletePI/:id', (req, res) => {
    var idPI = req.params.id;

    console.log(idPI);
    var sql1 = "DELETE FROM marcadores WHERE NamePI = '" + idPI + "'";
    var sql2 = "DELETE FROM puntosInteres WHERE NamePI = '" + idPI + "'";

    mysqlConnection.query(sql1, (err, rows, fields) => {
        if (!err) {
            console.log("OK");
        } else {
            res.send("Error");
            console.log(err);
        }
    });

    mysqlConnection.query(sql2, (err, rows, fields) => {
        if (!err) {
            res.send("OK");
        } else {
            res.send("Error");
            console.log(err);
        }
    });



})

router.get('/bbdd/deleteMarker/:id', (req, res) => {
    var idPI = req.params.id;

    var sql1 = "DELETE FROM marcadores WHERE IdMarker = '" + idPI + "'";

    mysqlConnection.query(sql1, (err, rows, fields) => {
        if (!err) {
            res.send("OK");
        } else {
            res.send("Error");
            console.log(err);
        }
    });

})

router.get('/bbdd/crearUsuari', (req, res) => {

    mysqlConnection.query("SELECT * FROM usuarios", (err, rows, fields) => {
        if (!err) {

            var id = rows.length;
            var cookie = uuidv4();
            mysqlConnection.query("INSERT INTO usuarios (idUsuario, cookie) VALUES ('" + id + "','" + cookie + "')", (err, rows, fields) => {
                if (!err) {
                    res.send(id.toString());
                } else {
                    res.send("Error");
                    console.log(err);
                }
            });

        } else {
            res.send("Error");
            console.log(err);
        }
    });

})

router.get('/bbdd/nouTour/:user/:lang', (req, res) => {

    mysqlConnection.query("SELECT * FROM visitas", (err, rows, fields) => {
        if (!err) {

            var id = rows.length;
            var user = req.params.user;
            var lang = req.params.lang;
            let date_ob = new Date();
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            let hours = date_ob.getHours();
            let minutes = date_ob.getMinutes();
            let seconds = date_ob.getSeconds();
            let fecha = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
            mysqlConnection.query("INSERT INTO visitas (idtour, lengua, idUsuario, fecha) VALUES ('" + id + "','" + lang + "','" + user + "','" + fecha + "')", (err, rows, fields) => {
                if (!err) {
                    res.send(id.toString());
                } else {
                    res.send("Error");
                    console.log(err);
                }
            });

        } else {
            res.send("Error");
            console.log(err);
        }
    });



})

router.get('/bbdd/nouRec/:tipus/:nom/:idtour', (req, res) => {

    mysqlConnection.query("SELECT * FROM recorridos", (err, rows, fields) => {
        if (!err) {

            var id = rows.length;
            var tipus = req.params.tipus;
            var nom = req.params.nom;
            var idtour = req.params.idtour;
            mysqlConnection.query("INSERT INTO recorridos (idRecorregut, tipus, nom, idtour) VALUES ('" + id + "','" + tipus + "','" + nom + "','" + idtour + "')", (err, rows, fields) => {
                if (!err) {
                    res.send(id.toString());
                } else {
                    res.send("Error");
                    console.log(err);
                }
            });

        } else {
            res.send("Error");
            console.log(err);
        }
    });

})

router.get('/bbdd/nouOrient/:cont', (req, res) => {


    var contenidoVid = req.params.cont;
    var contV = contenidoVid.split("*");
    var temps = contV[0];
    var lat = contV[1];
    var long = contV[2];
    var idRec = contV[3];
    var idVid = contV[4];

    var sql = "INSERT INTO orientaciones (temps, latitud, longitud, idRecorregut, IdVideo) VALUES ('" + temps + "','" + lat + "','" + long + "','" + idRec + "','" + idVid + "')";
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err) {
            res.send("ok");
        } else {
            res.send("Error");
            console.log(err);
        }
    });

})

router.get('/bbdd/tours', (req, res) => {

    mysqlConnection.query('SELECT * FROM visitas', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.send("Error");
            console.log(err);
        }
    });

})

router.get('/bbdd/orientaciones/:id', (req, res) => {

    var id = req.params.id;
    var contId = id.split("*");

    var sql = "SELECT FLOOR(longitud + 180) as x, FLOOR(latitud * -1 + 90) as y, COUNT(*) as value FROM orientaciones WHERE IdVideo = ";
    sql += contId[0]
    for(var i = 1; i < contId.length; i++){
        sql += " OR IdVideo = "
        sql += contId[i];
    }
    sql += " GROUP BY 1, 2 ORDER BY 1, 2;"

    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            res.send("Error");
            console.log(err);
        }
    });

})

router.get('/bbdd/orientacionesVideo/:id', (req, res) => {

    var id = req.params.id;
    var sql = "SELECT FLOOR(longitud + 180) as x, FLOOR(latitud * -1 + 90) as y,FLOOR(temps) as tempsid, COUNT(*) as value  FROM uib360.orientaciones WHERE IdVideo = "+id+" GROUP BY 1, 2, 3 ORDER BY 3";

    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err) { 
            res.json(rows);
        } else {
            res.send("Error");
            console.log(err);
        }
    });

})

router.get('/bbdd/recs&users', (req, res) => {
    var infoRecs;
    var infoUsers;
    var infoVid;

    mysqlConnection.query('SELECT * FROM recorridos', (err, rows, fields) => {
        if (!err) {
            infoRecs = rows;
        } else {
            res.send("Error");
            console.log(err);
        }
    });

    mysqlConnection.query('SELECT * FROM videos', (err, rows, fields) => {
        if (!err) {
            infoVid = rows;
        } else {
            res.send("Error");
            console.log(err);
        }
    });

    mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
        if (!err) {
            infoUsers = rows;
            var info = [infoRecs, infoUsers, infoVid];
            res.json(info);
        } else {
            res.send("Error");
            console.log(err);
        }
    });


})

module.exports = router;