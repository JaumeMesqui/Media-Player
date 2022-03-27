const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
 
// Settings
app.set('port', process.env.PORT || 80);
 
// Middlewares: això fa que si rebem un json, gràcies a aquesta linia podrem entendre-ho
app.use(express.json());
 
// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

/*

    fs.readFile(path.join(__dirname, 'public/vtt/dades.vtt'), (err, data) => {
        if(err) {
          res.send("error");
        } else {
          res.send(data);
        }
    });
*/

// Starting the server
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html'); 
});

// Enviar dades
app.get('/dades', function (req, res) {
    fs.readdir(path.join(__dirname, 'public/vtt'), function (err, archivos) { 
        if (err) { 
            res.send("error");
            return; 
        }  
        res.send(archivos);
    });
});
 
app.use('/', express.static(path.join(__dirname, 'public')))
 
 
