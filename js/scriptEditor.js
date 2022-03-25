//Regió on hi haurà el menú principal de l'editor
var editorPrincipal = document.createElement("div");
editorPrincipal.setAttribute('class', "contigutEditor");

//opcio principal per crear un nou vtt
var crearNouVtt = document.createElement("p");
crearNouVtt.setAttribute('class', "opcioPrincipalEditor");
var text3 = document.createTextNode("Crear un nou VTTs");
crearNouVtt.appendChild(text3);
editorPrincipal.appendChild(crearNouVtt);

//botó per obrir editor de crear nou vtt
var afegirVtt = document.createElement("button");
afegirVtt.setAttribute('type', "button");
afegirVtt.setAttribute('class', "botonsEditar");
var iconoPlus = document.createElement("i");
iconoPlus.setAttribute('class', "fa-solid fa-plus");
afegirVtt.appendChild(iconoPlus);

editorPrincipal.appendChild(afegirVtt);


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
    var iconoEditar = document.createElement("i");
    iconoEditar.setAttribute('class', "fa-solid fa-pencil");
    editarVtt.appendChild(iconoEditar);
    editorPrincipal.appendChild(editarVtt);
    
    editarVtt.addEventListener("click", (e) => {
        document.getElementById("editor").removeChild(editorPrincipal);
        document.getElementById("editor").appendChild(editorSecundariCues);
    });

     //botó per borrar un vtt
     var borrarVtt = document.createElement("button");
     borrarVtt.setAttribute('type', "button");
     borrarVtt.setAttribute('class', "botonsEditar");
     var iconoBasura = document.createElement("i");
     iconoBasura.setAttribute('class', "fa-solid fa-trash-can");
     borrarVtt.appendChild(iconoBasura);
     editorPrincipal.appendChild(borrarVtt);
}

//Afegir els botons de l'editor a l'Index
document.getElementById("editor").appendChild(editorPrincipal);


/* ************************************ */
//Creació del elements del formulari

var editorSecundariCues = document.createElement("div");
editorSecundariCues.setAttribute('class', "contigutEditor");

var formulari = document.createElement("form");
formulari.setAttribute('action', "");

var titolEditorCues = document.createElement("h2");
var text7 = document.createTextNode("DADES SOBRE EL VTT SELECCIONAT");
titolEditorCues.appendChild(text7);
formulari.appendChild(titolEditorCues);

var form1 = document.createElement("input");
form1.setAttribute('type', "text");
form1.setAttribute('nombre', "nomArxiu");
form1.setAttribute('placeholder', "Nom d'arxiu");
formulari.appendChild(form1);

var form2 = document.createElement("input");
form2.setAttribute('type', "text");
form2.setAttribute('nombre', "tipusVTT");
form2.setAttribute('placeholder', "Tipus de VTT");
formulari.appendChild(form2);

var form3 = document.createElement("input");
form3.setAttribute('type', "text");
form3.setAttribute('nombre', "dadaX");
form3.setAttribute('placeholder', "dadaX");
formulari.appendChild(form3);

editorSecundariCues.appendChild(formulari);

//opcio principal editor
var crearNouCue = document.createElement("p");
crearNouCue.setAttribute('class', "opcioPrincipalEditor");
var text6 = document.createTextNode("Crear una nova CUE");
crearNouCue.appendChild(text6);
editorSecundariCues.appendChild(crearNouCue);

//botó per crear una nova cue
var afegirCue = document.createElement("button");
afegirCue.setAttribute('type', "button");
afegirCue.setAttribute('class', "botonsEditar");
var iconoPlus = document.createElement("i");
iconoPlus.setAttribute('class', "fa-solid fa-plus");
afegirCue.appendChild(iconoPlus);
editorSecundariCues.appendChild(afegirCue);

//llista cue's existent dins l'VTT seleccionat
for (var i = 0; i < 3; i++) {
    var elemLlistaCues = document.createElement("p");
    elemLlistaCues.setAttribute('class', "llistaForm");
    var text7 = document.createTextNode("CUE 1: subtítols en idioma X");
    elemLlistaCues.appendChild(text7);
    editorSecundariCues.appendChild(elemLlistaCues);

    //botó per editar un vtt
    var editarCue = document.createElement("button");
    editarCue.setAttribute('type', "button");
    editarCue.setAttribute('class', "botonsEditar");
    var iconoEditar = document.createElement("i");
    iconoEditar.setAttribute('class', "fa-solid fa-pencil");
    editarCue.appendChild(iconoEditar);
    editorSecundariCues.appendChild(editarCue);
    
    editarCue.addEventListener("click", (e) => {
        document.getElementById("editor").removeChild(editorSecundariCues);
        document.getElementById("editor").appendChild(editorPrincipal);
        
    });

     //botó per borrar un vtt
     var borrarCue = document.createElement("button");
     borrarCue.setAttribute('type', "button");
     borrarCue.setAttribute('class', "botonsEditar");
     var iconoBasura = document.createElement("i");
     iconoBasura.setAttribute('class', "fa-solid fa-trash-can");
     borrarCue.appendChild(iconoBasura);
     editorSecundariCues.appendChild(borrarCue);
}

var seccioBotons = document.createElement("div");
seccioBotons.setAttribute('class', "seccioBotonsFormularis");

var botoCancelar = document.createElement("input");
botoCancelar.setAttribute('type', "button");
botoCancelar.setAttribute('value', "Cancelar");
botoCancelar.setAttribute('class', "botoFormulari");
botoCancelar.setAttribute('id', "botonCancelar");
seccioBotons.appendChild(botoCancelar);

var botoAcceptar = document.createElement("input");
botoAcceptar.setAttribute('type', "button");
botoAcceptar.setAttribute('value', "Confirmar");
botoAcceptar.setAttribute('id', "botoAcceptar");
botoAcceptar.setAttribute('class', "botoFormulari");
seccioBotons.appendChild(botoAcceptar);

editorSecundariCues.appendChild(seccioBotons);


//Funció per obrir el formulari quan clicam al botó "+" o al botó d'editar "llapis"
afegirVtt.addEventListener("click", (e) => {
    document.getElementById("editor").removeChild(editorPrincipal);
    document.getElementById("editor").appendChild(editorSecundariCues);
});



//Funció per eliminar el formulari de l'Index
botoCancelar.addEventListener("click", (e) => {
    document.getElementById("editorCues").removeChild(editorSecundariCues);
    document.getElementById("editor").appendChild(editorPrincipal);
});





//Afegir els botons de l'editor a l'Index
//document.getElementById("editor").appendChild(editorPrincipal);

