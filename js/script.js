
//Creació del element Video (Reproductor de Media)
var video = document.createElement("video");
video.setAttribute('class',"video"); 
video.setAttribute('poster',"media/poster.jpg"); 

//Fonts del video
var sourceMP4 = document.createElement("source");
sourceMP4.setAttribute('src',"media/sabana.mp4"); 
sourceMP4.setAttribute('type',"video/mp4"); 

var sourceOGG = document.createElement("source");
sourceOGG.setAttribute('src',"media/sabana.ogg"); 
sourceOGG.setAttribute('type',"video/ogg");

var textAlt = document.createTextNode("Your browser does not support the video tag.");

//Afegir les fonts y el text al video
video.appendChild(sourceMP4);
video.appendChild(sourceOGG);
video.appendChild(textAlt); 

//Afegir el video al Index
document.getElementById("videoPlayer").appendChild(video);

//Creació de barra progrés, els botons Play and pause / barra volumen / temps video --> playerControls
var playerControls = document.createElement("div");
playerControls.setAttribute('class',"player-controls"); 

//Creació de barra progrés
var barraProgres = document.createElement("div");
barraProgres.setAttribute('class',"video-progress"); 

var progresCompletat = document.createElement("div");
progresCompletat.setAttribute('class',"video-progress-filled");

barraProgres.appendChild(progresCompletat);
playerControls.appendChild(barraProgres);

//Creació botons Play and pause 
var playButton = document.createElement("button");
playButton.setAttribute('class',"buttonNou"); 
playButton.setAttribute('title',"Play");
var texto = document.createTextNode('►');
playButton.appendChild(texto);

playerControls.appendChild(playButton);

//Creació botons Play and pause 
var button2 = document.createElement("button");
button2.setAttribute('class',"play-button"); 
button2.setAttribute('title',"Play");
var texto2 = document.createTextNode('+');
button2.appendChild(texto2);

playerControls.appendChild(button2);


//Creació de la barra del volumen
var volumeRange = document.createElement("input");
volumeRange.setAttribute('type',"range"); 
volumeRange.setAttribute('class',"volume");
volumeRange.setAttribute('min',"0"); 
volumeRange.setAttribute('max',"1");
volumeRange.setAttribute('step',"0.01");
volumeRange.setAttribute('value',"1");

//Afegir la barra del volumen als playerControls
playerControls.appendChild(volumeRange);


//Creació del valors del temps del video
var valorTemps = document.createElement("div");
valorTemps.setAttribute('class',"time");

//Temps actual
var tempsActual = document.createElement("span");
tempsActual.setAttribute('class',"current");
var texto2 = document.createTextNode('0:00-');
tempsActual.appendChild(texto2);

valorTemps.appendChild(tempsActual);

//Duració Temps 
var duracioTemps = document.createElement("span");
duracioTemps.setAttribute('class',"duration");
var texto3 = document.createTextNode(' 0:00');
duracioTemps.appendChild(texto3);

valorTemps.appendChild(duracioTemps);


//Afegir valor temps video als playerControls
playerControls.appendChild(valorTemps);


//Afegir els player controls a l'Index
document.getElementById("videoPlayer").appendChild(playerControls);


//Funció per fer Play and pause al playButton
playButton.addEventListener("click", (e) =>{ //per errors
    if(video.paused){
        video.play();
        e.target.textContent = "❚❚";
        playButton.setAttribute('title',"Pause");
    }else{
        video.pause();
        e.target.textContent = "►";
        playButton.setAttribute('title',"Play");
    }
        
});


//Volumen
volumeRange.addEventListener("mousemove", (e) =>{
    video.volume = e.target.value; //li donam al vídeo el volumen que hi hagi seleccionat a la barra de volumen
});


//Current time and duration video
function currentTime(){
    var currentMinutes = Math.floor(video.currentTime/60);
    var currentSeconds = Math.floor(video.currentTime - currentMinutes * 60); 
    var durationMinutes = Math.floor(video.duration / 60);
    var durationSeconds = Math.floor(video.duration - durationMinutes * 60);

    tempsActual.innerHTML = `${currentMinutes }:${ currentSeconds < 10 ? "0"+currentSeconds : currentSeconds}-`;
    duracioTemps.innerHTML = `${durationMinutes }:${ durationSeconds}`;
}

video.addEventListener("timeupdate", currentTime);


//eventListener que va pintant la barra de progrés a mesura que es va reproduint el vídeo
video.addEventListener("timeupdate", () =>{
    const percentatge = (video.currentTime/ video.duration)* 100;
    progresCompletat.style.width = `${percentatge}%`
});

//canviar la barra de progrés si clicam
barraProgres.addEventListener("click", (e) =>{
    const tempsAvanzado = (e.offsetX / barraProgres.offsetWidth) * video.duration;
    video.currentTime = tempsAvanzado;
});


