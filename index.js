const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const parser = require('subtitles-parser-vtt');
const SpotifyWebApi = require('spotify-web-api-node');
const multer = require('multer');
var video = "";


var storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        var locVtt = 'public/vtt_';
        var loc = locVtt.concat(video);
        cb("", path.join(__dirname, loc));
    },
    filename: function (req, file, cb) {
        cb("", file.originalname);
    }
})

const uploadVTT = multer({
    storage: storage1
})

const storage2 = multer.diskStorage({
    destination: path.join(__dirname, 'public/media'),
    filename: function (req, file, cb) {
        cb("", file.originalname);
        var nomV = file.originalname.split(".")[0];
        video = nomV;
        var pathInicial = 'public/vtt_'
        var pathId = pathInicial.concat(nomV);
        /*Crear carpeta*/
        fs.mkdir(path.join(__dirname, pathId), (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
    }
})

const uploadVideo = multer({
    storage: storage2
})


// Settings
app.set('port', process.env.PORT || 80);

// Middlewares: això fa que si rebem un json, gràcies a aquesta linia podrem entendre-ho
app.use(express.json());

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

// Starting the server
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/editor.html', function (req, res) {
    res.sendFile(__dirname + '/public/editor.html');
});

// Enviar dades
app.get('/dades/:nomVideo', function (req, res) {
    var articleId = req.params.nomVideo;
    video = articleId;
    var pathInicial = 'public/vtt_'
    var pathId = pathInicial.concat(articleId);
    fs.readdir(path.join(__dirname, pathId), function (err, archivos) {
        if (err) {
            res.send("error");
            return;
        }

        res.send(archivos);
    });
});

// Enviar dades
app.get('/videos', function (req, res) {
    fs.readdir(path.join(__dirname, 'public/media'), function (err, archivos) {
        if (err) {
            res.send("error");
            return;
        }

        res.send(archivos);
    });
});

// Enviar dades
app.get('/arxius/:nom', function (req, res) {
    var articleId = req.params.nom;
    var pathInicial = 'public/vtt_';
    pathInicial = pathInicial.concat(video);
    pathInicial = pathInicial.concat('/');
    var pathId = pathInicial.concat(articleId);
    fs.readFile(path.join(__dirname, pathId), 'utf-8', (err, data) => {
        if (err) {
            res.send("error");
        } else {
            var realVTT = parser.fromVtt(data);
            res.send(realVTT);
        }
    });
});

// Enviar dades
app.get('/guardar/:nom/:cont', function (req, res) {
    var textO = req.params.cont;
    var text = textO.replace(/&/g, '\n');

    var articleId = req.params.nom;
    var pathInicial = 'public/vtt_';
    pathInicial = pathInicial.concat(video);
    pathInicial = pathInicial.concat('/');
    var pathId = pathInicial.concat(articleId);

    fs.writeFile(path.join(__dirname, pathId), text, (err) => {
        if (err) throw err;

        console.log("The file was succesfully saved!");
    });
    res.send(text);
});

//Eliminar un arxiu
app.get('/borrar/:nom', function (req, res) {
    try {
        var articleId = req.params.nom;
        var pathInicial = 'public/vtt_';
        pathInicial = pathInicial.concat(video);
        pathInicial = pathInicial.concat('/');
        var pathId = pathInicial.concat(articleId);
        fs.unlink(path.join(__dirname, pathId), (err => {
            if (err) console.log(err);
            else {
                console.log("\nDeleted file: example_file.txt");
            }
        }));
        res.send(200);
    } catch (err) {
        res.send(err);
    }

});

app.post('/uploadVTT', uploadVTT.single('avatar'), function (req, res) {
    res.redirect('/gdie2210/editor.html');
})

app.post('/uploadVideo', uploadVideo.single('avatar1'), function (req, res) {
    res.redirect('/gdie2210/editor.html');
})


app.use('/', express.static(path.join(__dirname, 'public')))

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
];

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: '0b327e90b6fa4b36bbb6bee51b611dd9',
    clientSecret: '58bce54745b14683954de9952f6689e6',
    redirectUri: 'https://alumnes-ltim.uib.es/gdie2210/getToken'
});

var token;
var refresh_token;

app.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get('/getToken', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            const token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            const expires_in = data.body['expires_in'];

            spotifyApi.setAccessToken(token);
            spotifyApi.setRefreshToken(refresh_token);

            console.log('access_token:', token);
            console.log('refresh_token:', refresh_token);

            console.log(
                `Sucessfully retreived access token. Expires in ${expires_in} s.`
            );
            res.send('Success! You can now close the window.');

            setInterval(async () => {
                const data = await spotifyApi.refreshAccessToken();
                const token = data.body['access_token'];

                console.log('The access token has been refreshed!');
                console.log('access_token:', token);
                spotifyApi.setAccessToken(token);
            }, expires_in / 2 * 1000);
        })
        .catch(error => {
            console.error('Error getting Tokens:', error);
            res.send(`Error getting Tokens: ${error}`);
        });
});


spotifyApi.setAccessToken(token);
spotifyApi.setRefreshToken(refresh_token);

app.get('/artista/:cod', function (req, res) {

    spotifyApi.getArtist(req.params.cod).then(
        function (data) {
            res.send(data);
        },
        function (err) {
            console.error(err);
        }
    );
});


/**
 * Notas pen miquel den miquel
 *  - crec q sha de canviar a Redirect URIs xq lo q fa spoti es enviarte sa info a lo q tens adalt
 * i dalla treus ses claus
 *  - intenta fer q enlloc de ser es login qui fa sa peticio sigui /artist:cod i rebi de lo q torna spoti
 * es request token
 * 
 */