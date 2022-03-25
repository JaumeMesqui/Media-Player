//Regió on hi haurà el menú principal de l'editor
var editorPrincipal = document.createElement("div");
editorPrincipal.setAttribute('class', "contigutEditor");

//titol principal formulari
var crearNouVtt = document.createElement("p");
crearNouVtt.setAttribute('class', "titolFormulari");
var text3 = document.createTextNode("Crear un nou VTTs");
crearNouVtt.appendChild(text3);
editorPrincipal.appendChild(crearNouVtt);

//botó per obrir formulari editor
var afegirCue = document.createElement("button");
afegirCue.setAttribute('type', "button");
afegirCue.setAttribute('class', "botonsEditar");
var text1 = document.createTextNode('+');
afegirCue.appendChild(text1);

editorPrincipal.appendChild(afegirCue);


//Caja de colores HTML y CSS con borde redondeado a la izquierda: llista VTTs
for (var i = 0; i < 3; i++) {
    var elemLlistaVTT = document.createElement("p");
    elemLlistaVTT.setAttribute('class', "llistaForm");
    var text5 = document.createTextNode("VTT 1: subtítols del vídeo");
    elemLlistaVTT.appendChild(text5);
    editorPrincipal.appendChild(elemLlistaVTT);

    //botó per editar un vtt
    var editarVtt = document.createElement("button");
    editarVtt.setAttribute('type', "button");
    editarVtt.setAttribute('class', "botonsEditar");
    var text6 = document.createTextNode('E');
    editarVtt.appendChild(text6);

    editorPrincipal.appendChild(editarVtt);

     //botó per borrar un vtt
     var borrarVtt = document.createElement("button");
     borrarVtt.setAttribute('type', "button");
     borrarVtt.setAttribute('class', "botonsEditar");
     var text7 = document.createTextNode('B');
     borrarVtt.appendChild(text7);
 
     editorPrincipal.appendChild(borrarVtt);
}




/*
//botó per tancar formulari editor
var eliminarCue = document.createElement("button");
eliminarCue.setAttribute('type',"button"); 
eliminarCue.setAttribute('class',"botonsEditar"); 
var text2 = document.createTextNode('Eliminar CUE');
eliminarCue.appendChild(text2);

editorPrincipal.appendChild(eliminarCue);*/



//Afegir els botons de l'editor a l'Index
document.getElementById("editor").appendChild(editorPrincipal);

/* ************************************ */
//Creació del elements del formulari
var formulari = document.createElement("form");
formulari.setAttribute('action', "");

var titolForm = document.createElement("h2");
var text4 = document.createTextNode('FORMULARI');
titolForm.appendChild(text4);
formulari.appendChild(titolForm);

var form1 = document.createElement("input");
form1.setAttribute('type', "text");
form1.setAttribute('nombre', "Cantant");
form1.setAttribute('placeholder', "Cantant");
formulari.appendChild(form1);

var form2 = document.createElement("input");
form2.setAttribute('type', "text");
form2.setAttribute('nombre', "MinInici");
form2.setAttribute('placeholder', "Minut d'inici");
formulari.appendChild(form2);

var form3 = document.createElement("input");
form3.setAttribute('type', "text");
form3.setAttribute('nombre', "MinFinal");
form3.setAttribute('placeholder', "Minut final");
formulari.appendChild(form3);

var seccioBotons = document.createElement("div");
seccioBotons.setAttribute('class', "seccioBotonsFormularis");


var botoAcceptar = document.createElement("input");
botoAcceptar.setAttribute('type', "button");
botoAcceptar.setAttribute('value', "Confirmar");
botoAcceptar.setAttribute('id', "botoAcceptar");
botoAcceptar.setAttribute('class', "botoFormulari");
seccioBotons.appendChild(botoAcceptar);

var botoCancelar = document.createElement("input");
botoCancelar.setAttribute('type', "button");
botoCancelar.setAttribute('value', "Cancelar");
botoCancelar.setAttribute('class', "botoFormulari");
botoCancelar.setAttribute('id', "botonCancelar");
seccioBotons.appendChild(botoCancelar);
formulari.appendChild(seccioBotons);


//Funció per afegir el formulari a l'Index
afegirCue.addEventListener("click", (e) => {
    document.getElementById("formEditor").appendChild(formulari);
});

//Funció per eliminar el formulari de l'Index
eliminarCue.addEventListener("click", (e) => {
    document.getElementById("formEditor").removeChild(formulari);
});





//Afegir els botons de l'editor a l'Index
//document.getElementById("editor").appendChild(editorPrincipal);

