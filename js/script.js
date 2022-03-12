//VAR GLOBALS


//Creació del element Video (Reproductor de Media)
var video = document.createElement("video");
video.setAttribute('width',"600");
video.setAttribute('height',"320");

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
document.getElementById("mediaplayer").appendChild(video);

//Boto de reproducció
var buttonPlay = document.createElement("button");
buttonPlay.setAttribute('width',"100");
buttonPlay.setAttribute('height',"100");
buttonPlay.innerHTML = "Play";

buttonPlay.addEventListener("click", function () {
    video.play();
});

//Afegir el video al Index
document.getElementById("mediaplayer").appendChild(buttonPlay);

//Boto de reproducció
var buttonStop = document.createElement("button");
buttonStop.setAttribute('width',"100");
buttonStop.setAttribute('height',"100");
buttonStop.innerHTML = "Stop";

buttonStop.addEventListener("click", function () {
    video.pause();
});

//Afegir el video al Index
document.getElementById("mediaplayer").appendChild(buttonStop);


