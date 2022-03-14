//VAR GLOBALS


//Creació del element Video (Reproductor de Media)
var video = document.createElement("video");
video.setAttribute('width',"640");
<<<<<<< HEAD
video.setAttribute('height',"340");

=======
video.setAttribute('height',"480");
>>>>>>> main
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
document.getElementById("videoP").appendChild(video);

//Div dels Controls
var divControls = document.createElement("div");
divControls.classList.add("controls");

//Boto de reproducció
var buttonPlay = document.createElement("button");
buttonPlay.setAttribute('width',"100");
buttonPlay.setAttribute('height',"100");
buttonPlay.setAttribute('title',"Play");

buttonPlay.addEventListener("click", function () {
    if(video.paused){
        video.play();
        buttonPlay.setAttribute('title',"Pause");
    }else{
        video.pause();
        buttonPlay.setAttribute('title',"Play");
    }
        
});




