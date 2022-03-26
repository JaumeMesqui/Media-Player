//VAR Globals
let totalTracks = ["dades.vtt"];

document.addEventListener("DOMContentLoaded", function () {
    init();
    inserirTracks();

})

function init() {
    //Creació del element Video (Reproductor de Media)
    var video = document.createElement("video");
    video.setAttribute('class', "video");
    video.setAttribute('poster', "media/poster.jpg");

    //Fonts del video
    var sourceMP4 = document.createElement("source");
    sourceMP4.setAttribute('src', "media/sabana.mp4");
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
    var texto = document.createTextNode('►');
    playButton.appendChild(texto);

    playerControls.appendChild(playButton);

    //Creació boto per avançar vídeo 10 s
    var forwardButton = document.createElement("button");
    forwardButton.setAttribute('class', "forward-button");
    forwardButton.setAttribute('title', "Play");
    var texto2 = document.createTextNode('+');
    forwardButton.appendChild(texto2);

    playerControls.appendChild(forwardButton);


    //Creació de la barra del volumen
    var volumeRange = document.createElement("input");
    volumeRange.setAttribute('type', "range");
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

    //Afegir els player controls a l'Index
    document.getElementById("videoPlayer").appendChild(playerControls);

    //Funció per fer Play and pause al playButton
    playButton.addEventListener("click", (e) => { //per errors
        if (video.paused) {
            video.play();
            e.target.textContent = "❚❚";
            playButton.setAttribute('title', "Pause");
        } else {
            video.pause();
            e.target.textContent = "►";
            playButton.setAttribute('title', "Play");
        }

    });

    //Volumen
    volumeRange.addEventListener("mousemove", (e) => {
        video.volume = e.target.value; //li donam al vídeo el volumen que hi hagi seleccionat a la barra de volumen
    });

    video.addEventListener("timeupdate", currentTime);

    //eventListener que va pintant la barra de progrés a mesura que es va reproduint el vídeo
    video.addEventListener("timeupdate", () => {
        const percentatge = (video.currentTime / video.duration) * 100;
        progresCompletat.style.width = `${percentatge}%`
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

function inserirTracks() {

    var video = document.querySelector('video');


    video.addEventListener("loadedmetadata", function () {

        var track = document.createElement("track");
        track.kind = "captions";
        track.label = "subtitols";
        track.srclang = "es";
        track.src = "vtt/dades.vtt";
        track.addEventListener("load", function () {
            this.mode = "showing";
            video.textTracks[0].mode = "showing"; // thanks Firefox
            obtenirDades();
        });
        this.appendChild(track);
    });

}

function obtenirDades() {
    var video = document.querySelector('video');

    var tracks = video.textTracks;
    for (var i = 0, L = tracks.length; i < L; i++) {
        tracks[i] = video.addTextTrack("metadata", "subtitols", "es");
        tracks[i].mode = "hidden";

        //Cas en es que se modifica el currentTime del video
        tracks[i].oncuechange = function () {
            var cue = this.activeCues[0];
            if (cue != undefined) {
                var data = JSON.parse(cue.text);
                posarInfo(data);
            } else {
                borrarInfo();
            }
        }
    }

}

function posarInfo(data) {
    console.log(data.nom);
    var info1 = document.getElementById("info1");
    var contingutInfo1 = document.createElement("h3");
    var textInfo1 = document.createTextNode(data.nom);
    contingutInfo1.appendChild(textInfo1);
    info1.appendChild(contingutInfo1);
}

function borrarInfo() {
    console.log("borrar");
    var info1 = document.getElementById("info1");
    while (info1.firstChild) {
        info1.removeChild(info1.firstChild);
    }
}