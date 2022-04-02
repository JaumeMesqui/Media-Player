//VAR Globals
let totalTracks = [];
let respostaCorrecte;
let finalChapter = 0;
let flagContestat = false;
var nomVideo = "quiz1";

document.addEventListener("DOMContentLoaded", function () {
    init();
    solicitarDades();
})

function init() {
    //Creació del element Video (Reproductor de Media)
    var video = document.createElement("video");
    video.setAttribute('class', "video");
    video.setAttribute('poster', "media/poster_quiz1.png");
    //2 atributs per que des del mòbil es pugui posar pantalla completa
    video.setAttribute('webkit-playsinline', true);
    video.setAttribute('playsinline', true);

    //Fonts del video
    var sourceMP4 = document.createElement("source");
    sourceMP4.setAttribute('src', "media/quiz1.mp4");
    sourceMP4.setAttribute('type', "video/mp4");

    var sourceOGG = document.createElement("source");
    sourceOGG.setAttribute('src', "media/sabana.ogg");
    sourceOGG.setAttribute('type', "video/ogg");

    var textAlt = document.createTextNode("Your browser does not support the video tag.");

    //Afegir les fonts y el text al video
    video.appendChild(sourceMP4);
    video.appendChild(sourceOGG);
    video.appendChild(textAlt);

    //Afegir el video al Index
    document.getElementById("videoPlayer").appendChild(video);

    //Creació de barra progrés, els botons Play and pause / barra volumen / temps video --> playerControls
    var playerControls = document.createElement("div");
    playerControls.setAttribute('class', "player-controls");

    //Creació de barra progrés
    var barraProgres = document.createElement("div");
    barraProgres.setAttribute('class', "video-progress");

    var progresCompletat = document.createElement("div");
    progresCompletat.setAttribute('class', "video-progress-filled");

    barraProgres.appendChild(progresCompletat);
    playerControls.appendChild(barraProgres);

    //Creació botons Play and pause 
    var playButton = document.createElement("button");
    playButton.setAttribute('class', "play-button");
    playButton.setAttribute('title', "Play");
    var iconoPlay = document.createElement("i");
    iconoPlay.setAttribute('class', "fa-solid fa-play")
    playButton.appendChild(iconoPlay);

    playerControls.appendChild(playButton);


    //Creació boto per retrocedir vídeo 10 s
    var backwardButton = document.createElement("button");
    backwardButton.setAttribute('class', "video-player-button");
    backwardButton.setAttribute('title', "Backward");
    var iconoAtrasarT = document.createElement("i");
    iconoAtrasarT.setAttribute('class', "fa-solid fa-arrow-rotate-left")
    backwardButton.appendChild(iconoAtrasarT);

    playerControls.appendChild(backwardButton);


    //Creació boto per avançar vídeo 10 s
    var forwardButton = document.createElement("button");
    forwardButton.setAttribute('class', "video-player-button");
    forwardButton.setAttribute('title', "Forward");
    var iconoAdelantarT = document.createElement("i");
    iconoAdelantarT.setAttribute('class', "fa-solid fa-arrow-rotate-right")
    forwardButton.appendChild(iconoAdelantarT);

    playerControls.appendChild(forwardButton);


    //Creació botó de volum per mutear vídeo
    var volumeButton = document.createElement("button");
    volumeButton.setAttribute('class', "video-player-button");
    volumeButton.setAttribute('title', "Sound");
    var iconoSound = document.createElement("i");
    iconoSound.setAttribute('class', "fa-solid fa-volume-high")
    volumeButton.appendChild(iconoSound);

    playerControls.appendChild(volumeButton);

    //Creació de la barra del volumen
    var volumeRange = document.createElement("input");
    volumeRange.setAttribute('type', "range");
    volumeRange.setAttribute('id', "rangeVolume");
    volumeRange.setAttribute('class', "volume");
    volumeRange.setAttribute('min', "0");
    volumeRange.setAttribute('max', "1");
    volumeRange.setAttribute('step', "0.01");
    volumeRange.setAttribute('value', "1");

    //Afegir la barra del volumen als playerControls
    playerControls.appendChild(volumeRange);


    //Creació del valors del temps del video
    var valorTemps = document.createElement("div");
    valorTemps.setAttribute('class', "time");

    //Temps actual
    var tempsActual = document.createElement("span");
    tempsActual.setAttribute('class', "current");
    tempsActual.setAttribute('ID', "tA");
    var texto2 = document.createTextNode('0:00-');
    tempsActual.appendChild(texto2);

    valorTemps.appendChild(tempsActual);

    //Duració Temps 
    var duracioTemps = document.createElement("span");
    duracioTemps.setAttribute('class', "duration");
    duracioTemps.setAttribute('ID', "dT");
    var texto3 = document.createTextNode(' 0:00');
    duracioTemps.appendChild(texto3);

    valorTemps.appendChild(duracioTemps);

    //Afegir valor temps video als playerControls
    playerControls.appendChild(valorTemps);


    //Creació botó per activar els subtítols
    var subtitlesButton = document.createElement("button");
    subtitlesButton.setAttribute('class', "video-player-button alinear-derecha");
    subtitlesButton.setAttribute('title', "Subtitles");
    var iconoSubtitles = document.createElement("i");
    iconoSubtitles.setAttribute('class', "fa-solid fa-rectangle-list");
    subtitlesButton.appendChild(iconoSubtitles);
    playerControls.appendChild(subtitlesButton);


    //Creació botó per obrir les captions
    var captionsButton = document.createElement("button");
    captionsButton.setAttribute('class', "video-player-button");
    captionsButton.setAttribute('title', "Configuration");
    var iconoCaptions = document.createElement("i");
    iconoCaptions.setAttribute('class', "fa-solid fa-closed-captioning"); 
    captionsButton.appendChild(iconoCaptions);
    playerControls.appendChild(captionsButton);

       
    //Creació botó per obrir la configuració
    var configButton = document.createElement("button");
    configButton.setAttribute('class', "video-player-button");
    configButton.setAttribute('title', "Configuration");
    var iconoConfig = document.createElement("i");
    iconoConfig.setAttribute('class', "fa-solid fa-gear");
    configButton.appendChild(iconoConfig);
    playerControls.appendChild(configButton);

  
    //Creació botó per passar vídeo a pantalla completa
    var fullScreenButton = document.createElement("button");
    fullScreenButton.setAttribute('class', "video-player-button");
    fullScreenButton.setAttribute('title', "Full Screen");
    var iconoFullScreen = document.createElement("i");
    iconoFullScreen.setAttribute('class', "fa-solid fa-expand");
    fullScreenButton.appendChild(iconoFullScreen);
    playerControls.appendChild(fullScreenButton);


    //Afegir els player controls a l'Index
    document.getElementById("videoPlayer").appendChild(playerControls);

    var iconoStop = document.createElement("i");
    iconoStop.setAttribute('class', "fa-solid fa-pause");
    //Funció per fer Play and pause al playButton
    playButton.addEventListener("click", (e) => { //per errors
        if (video.paused) {
            video.play();
            playButton.removeChild(iconoPlay);
            playButton.appendChild(iconoStop);
            playButton.setAttribute('title', "Pause");
        } else {
            video.pause();
            playButton.removeChild(iconoStop);
            playButton.appendChild(iconoPlay);
            playButton.setAttribute('title', "Play");
        }

    });


    var iconoMute = document.createElement("i");
    iconoMute.setAttribute('class', "fa-solid fa-volume-xmark");
    //Funció per fer mute and unmute al playButton
    volumeButton.addEventListener("click", (e) => { //per errors
        if (video.muted) { //caso si el vídeo está muteado
            video.muted = false;
            volumeButton.removeChild(iconoMute);
            volumeButton.appendChild(iconoSound);
            volumeButton.setAttribute('title', "Sound");
            if (video.volume == 0) {  // si cuando desmuteamos, previamente se había bajado el volumen a 0, lo reactivamos a la mitad (0.5)
                video.volume = 0.5;
            }
            volumeRange.value = video.volume;//le damos volumen de nuevo

        } else { //en el vídeo hay ruido y queremos mutearlo
            video.muted = true;
            console.log("he clicat per Mutear")
            volumeButton.removeChild(iconoSound);
            volumeButton.appendChild(iconoMute);
            volumeButton.setAttribute('title', "Mute");
            volumeRange.value = 0;
        }
    });


    var iconoSoundLow = document.createElement("i");
    iconoSoundLow.setAttribute('class', "fa-solid fa-volume-low");
    //Volumen
    volumeRange.addEventListener("mousemove", function () {
        video.volume = this.value; //li donam al vídeo el volumen que hi hagi seleccionat a la barra de volumen
        if (video.volume == 0 && !video.muted) {
            video.muted = true;
            volumeButton.removeChild(iconoSound);
            volumeButton.appendChild(iconoMute);
            volumeButton.setAttribute('title', "Mute");
        } else if (video.volume > 0.01 && video.volume <= 0.5 && video.muted) { //aquí entram quan el vídeo estava muteado (volumen = 0), i volem moure la barra per desmutearho i tornar a donarli volumen
            video.muted = false;
            volumeButton.removeChild(iconoMute);
            volumeButton.appendChild(iconoSound);
            volumeButton.setAttribute('title', "Sound");
        } /*else if (video.volume > 0.5 && video.volume <= 1 && video.muted) { //aquí entram quan ...
            video.muted = false;
            volumeButton.removeChild(iconoMute);
            volumeButton.appendChild(iconoSoundLow);
            volumeButton.setAttribute('title', "Sound");
        }*/
    });

    video.addEventListener("timeupdate", currentTime);

    //eventListener que va pintant la barra de progrés a mesura que es va reproduint el vídeo
    video.addEventListener("timeupdate", () => {
        const percentatge = (video.currentTime / video.duration) * 100;
        progresCompletat.style.width = `${percentatge}%`;
        consultaTempsPregunta(video.currentTime);
    });

    //canviar la barra de progrés si clicam
    barraProgres.addEventListener("click", (e) => {
        const tempsAvanzado = (e.offsetX / barraProgres.offsetWidth) * video.duration;
        video.currentTime = tempsAvanzado;
    });

    //adelantar vídeo 10 s
    forwardButton.addEventListener("click", (e) => {
        video.currentTime = video.currentTime + 10;
    });


    //atrasar vídeo 10 s
    backwardButton.addEventListener("click", (e) => {
        video.currentTime = video.currentTime - 10;
    });

    //posar vídeo en pantalla completa; 
    //Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet 
    //Note: Internet Explorer 10 and earlier versions do not support the msRequestFullscreen() method
    fullScreenButton.addEventListener("click", function () {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { /* Firefox */
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { /* Safari + Android + Chrome + iOS */
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {  /* IE11 */
            video.msRequestFullscreen();
        }
    });


    var subtitolsActivats = false;
    //Funció per activar subtítolts
    subtitlesButton.addEventListener("click", function () {
        var textTracks = video.textTracks;
        var trackSubtitols;
        var noTrobat = true;

        for(var i = 0; i < textTracks.length && noTrobat; i++){
            if(textTracks[i].kind == "subtitles"){
                trackSubtitols = textTracks[i];
                noTrobat = false;
            }
        }

        if(subtitolsActivats){
            subtitolsActivats=false;
            iconoSubtitles.style.color = "";
            trackSubtitols.mode = "hidden"
        }else{
            subtitolsActivats= true;
            iconoSubtitles.style.color = "#ff8080";
            trackSubtitols.mode = "showing"
        }
       
    });

    //Funció per activar les opcions de configuració
    configButton.addEventListener("click", function () {
        
    });

    //Funció per activar les captions del vídeo
    captionsButton.addEventListener("click", function () {
        
    });


    

    // Posar Event Listeners per quan es respongui a les perguntes

    var opcio_1 = document.getElementById("info1");
    opcio_1.addEventListener("click", (e) => {
        mostrarSolucions(1);
    });

    var opcio_2 = document.getElementById("info2");
    opcio_2.addEventListener("click", (e) => {
        mostrarSolucions(2);
    });

    var opcio_3 = document.getElementById("info3");
    opcio_3.addEventListener("click", (e) => {
        mostrarSolucions(3);
    });

}

function consultaTempsPregunta(tempsActual) {
    if (tempsActual > finalChapter) {
        mostrarSolucions(-1);
    }
}

//Current time and duration video
function currentTime() {
    var video = document.querySelector('video');
    var currentMinutes = Math.floor(video.currentTime / 60);
    var currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
    var durationMinutes = Math.floor(video.duration / 60);
    var durationSeconds = Math.floor(video.duration - durationMinutes * 60);

    var tempsActual = document.getElementById("tA");
    var duracioTemps = document.getElementById("dT");
    tempsActual.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? "0" + currentSeconds : currentSeconds}-`;
    duracioTemps.innerHTML = `${durationMinutes}:${durationSeconds}`;
}

function solicitarDades() {
    var xmlhttp = new XMLHttpRequest();
    var url = "dades/"+nomVideo;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var dades = JSON.parse(xmlhttp.responseText);
            totalTracks = dades;

            inserirTracks();
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function inserirTracks() {

    var video = document.querySelector('video');
    console.log(totalTracks);

    video.addEventListener("loadedmetadata", function () {

        for (var i = 0; i < totalTracks.length; i++) {

            var track = document.createElement("track");
            track.setAttribute('default', true);

            if (totalTracks[i] == "dades.vtt") {
                track.setAttribute('kind', "metadata");
                track.setAttribute('src', "vtt_"+nomVideo+"/dades.vtt");
                track.setAttribute('label', "dades");
            } else if (totalTracks[i] == "sub.vtt") {
                track.setAttribute('kind', "subtitles");
                track.setAttribute('src', "vtt_"+nomVideo+"/sub.vtt");
                track.setAttribute('label', "subtitols");
                track.setAttribute('srclang', "es");
            } else if (totalTracks[i] == "chapters.vtt") {
                track.setAttribute('kind', "chapters");
                track.setAttribute('src', "vtt_"+nomVideo+"/chapters.vtt");
                track.setAttribute('label', "chapters");
            } else if (totalTracks[i] == "captions.vtt") {
                track.setAttribute('kind', "captions");
                track.setAttribute('src', "vtt_"+nomVideo+"/captions.vtt");
                track.setAttribute('label', "caption");
            } else if (totalTracks[i] == "descriptions.vtt") {
                track.setAttribute('kind', "descriptions");
                track.setAttribute('src', "vtt_"+nomVideo+"/descriptions.vtt");
                track.setAttribute('label', "description");
            }

            track.addEventListener("load", function () {
                this.mode = "showing";
                video.textTracks[0].mode = "showing"; // thanks Firefox
                obtenirDades(this);
            });

            video.appendChild(track);
        }
    });

}

function obtenirDades(track) {

    var video = document.querySelector('video');
    var aTrack;

    for (var i = 0; i < video.textTracks.length; i++) {
        if (video.textTracks[i].label == track.label) {
            aTrack = video.textTracks[i];
        }
    }

    aTrack.mode = "hidden";

    //Cas en es que se modifica el currentTime del video
    if (aTrack.label != "subtitols" && aTrack.label != "captions") {

        aTrack.oncuechange = function () {
            var cue = this.activeCues[0];
            if (cue != undefined) {
                if (track.label == "dades") {
                    var data = JSON.parse(cue.text);
                    posarInfoMetadades(data);
                } else if (track.label == "chapters") {
                    posarInfoChapters(cue);
                } else if (track.label == "descriptions") {
                    //TODO 
                    //posarInfoDesc();
                }
            } else {
                borrarInfo();
            }
        }

    }

}


function posarInfoMetadades(data) {
    carregarPreguntes(data.questionari);

    var divAside = document.getElementById("metadades-artista");
    var artist_name = document.getElementById("artist_name");
    artist_name.innerHTML = data.artista.nom;
    var artist_origin = document.getElementById("artist_origin");
    artist_origin.src = "flags/flag-" + data.artista.origen + ".png";
    var artist_spotify = document.getElementById("artist-spotify");
    artist_spotify.src = "https://open.spotify.com/embed/artist/" + data.artista.spotify + "?utm_source=generator";


    var song_genre = document.getElementById("song-genre");
    song_genre.innerHTML = data.canço.genere;
    var song_album = document.getElementById("song-album");
    song_album.innerHTML = data.canço.album;

    // TODO    
    var xmlhttp = new XMLHttpRequest();
    var url = "artista/" + data.artista.spotify;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var dades = JSON.parse(xmlhttp.responseText);
            console.log(dades);
            var div_artist_generes = document.getElementById("artist_genres");
            div_artist_generes.innerHTML = "";
            var p;
            for (var i = 0; i < dades.body.genres.length; i++) {
                p = document.createElement("p");
                p.innerHTML = dades.body.genres[i];
                div_artist_generes.appendChild(p);
            }
            var artist_image = document.getElementById("artist_image");
            artist_image.src = dades.body.images[2].url;

            var artist_followers = document.getElementById("artist_followers");
            artist_followers.innerHTML = dades.body.followers.total;

            var artist_popularity = document.getElementById("artist_popularity");
            artist_popularity.innerHTML = dades.body.popularity;

        } else {
            console.log("failed 1");
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}


function posarInfoChapters(data) {
    finalChapter = data.startTime + 10;
    var titolChapter = document.getElementById("titol-chapter");
    titolChapter.innerHTML = data.text;


}

function posarInfoDesc(data) {
    var info1 = document.getElementById("info1");
    var contingutInfo1 = document.createElement("h3");
    var textInfo1 = document.createTextNode(data.nom);
    contingutInfo1.appendChild(textInfo1);
    info1.appendChild(contingutInfo1);
}

function borrarInfo() {
    var info1 = document.getElementById("info1");
    while (info1.firstChild) {
        info1.removeChild(info1.firstChild);
    }
}


function carregarPreguntes(questionari) {
    // Borrar la pregunta anterior i carregar la nova la pregunta
    var pregunta = document.getElementById("h2_pregunta");
    pregunta.innerHTML = questionari.pregunta;
    flagContestat = false;
    // Posar les opcions
    var div_opcio;
    for (i = 1; i < questionari.opcions.length + 1; i++) {
        div_opcio = document.getElementById("info" + i);
        div_opcio.setAttribute("class", "widget-" + i + " opcio-default");
        div_opcio.innerHTML = questionari.opcions[i - 1];
    }

    respostaCorrecte = questionari.correcte;
}

function mostrarSolucions(idDiv) {
    // Correcte
    var titol = document.getElementById("h2_pregunta");
    if (!flagContestat) {
        if (idDiv == -1) {
            titol.innerHTML = "Massa lent! :S"
        } else if (idDiv == respostaCorrecte) {
            titol.innerHTML = "Correcte! :)"
        } else {
            titol.innerHTML = "Incorrecte! :("
        }

        // Per posar els colors verds a sa bona i vermell a sa dolenta, codi un poc patater
        // maybe fer una variable global de num total respostes o deixar-ho en estatic
        var divRespostes;
        var total = 3;
        for (var i = 1; i <= total; i++) {

            if (i == respostaCorrecte) {
                divRespostes = document.getElementById("info" + i);
                divRespostes.setAttribute("class", "widget-" + i + " opcio-correcte");
            } else {
                divRespostes = document.getElementById("info" + i);
                divRespostes.setAttribute("class", "widget-" + i + " opcio-incorrecte");
            }

        }
        flagContestat = true;
    }
}


