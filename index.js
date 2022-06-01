const express = require('express');
const app = express();
const path = require('path');

// Settings
app.set('port', process.env.PORT || 80);

// Middlewares
app.use(express.json());

// Routes
app.use(require('./routes/markers'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/editor.html', function (req, res) {
    res.sendFile(__dirname + '/public/editor.html');
  });

app.use('/', express.static(path.join(__dirname, 'public')));
