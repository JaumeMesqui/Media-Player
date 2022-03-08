//VAR GLOBALS


//Creació del element Video (Reproductor de Media)
var video = document.createElement("video");
video.setAttribute('width',"640");
video.setAttribute('height',"340");

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
video.appendChild(textAlt); //InnerHTML he vist que es per escriure

//Afegir el video al Index
document.getElementById("mediaplayer").appendChild(video);