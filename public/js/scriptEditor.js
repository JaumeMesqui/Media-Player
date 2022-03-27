let opcioPrincipalEditor = ["Crear un nou VTT", "Crear una nova CUE"];
let opcionsForm = ["Dades sobre el nou VTT", "Dades sobre el VTT seleccionat", "Dades sobre la nova CUE", "Dades sobre la CUE seleccionada", "Menu Principal"];
let estatArxiu = ["nou", "existent"];
let llistaVTTs = ["VTT 1: subtítols del vídeo", "VTT 2: metadades", "VTT 3: dades random"];
let llistaCUEs = ["CUE 1: subtítols en idioma X", "CUE 2: subtítols en idioma Y", "CUE 3: subtítols en idioma Z"];


document.addEventListener("DOMContentLoaded", function () {
    opcionsPrincipals(opcioPrincipalEditor[0], llistaVTTs, opcionsForm[4]);

})


//Regió on hi haurà el menú principal de l'editor
var editorPrincipal = document.createElement("div");

function opcionsPrincipals(opcio, llistaVTTs, paginaActual) {
    console.log("he entrat amb: "+ paginaActual);

    editorPrincipal.setAttribute('class', "contigutEditor");
    
    var crearNouArxiu = document.createElement("p");
    crearNouArxiu.setAttribute('class', "opcioPrincipalEditor");
    var text1 = document.createTextNode(opcio);
    crearNouArxiu.appendChild(text1);
    editorPrincipal.appendChild(crearNouArxiu);

    //botó per crear un nou vtt
    var butonAfegirElement = document.createElement("button");
    butonAfegirElement.setAttribute('type', "button");
    butonAfegirElement.setAttribute('class', "botonsEditar");
    var iconoPlus = document.createElement("i");
    iconoPlus.setAttribute('class', "fa-solid fa-plus");
    butonAfegirElement.appendChild(iconoPlus);
    editorPrincipal.appendChild(butonAfegirElement);

    //Funció per obrir el formulari quan clicam al botó "+" 
    butonAfegirElement.addEventListener("click", (e) => {
        editorPrincipal.innerHTML = "";
        if (paginaActual == "Menu Principal") { //he clical al + per crear un nou VTT
            console.log("hola1")
            formulari(opcionsForm[0], estatArxiu[0]);
            opcionsPrincipals(opcioPrincipalEditor[1], llistaCUEs, opcionsForm[0]);
            botonsOpcions(opcionsForm[4]); //Vull que el botó cancelar em dugui al  menú principal

        }else if (paginaActual == "Dades sobre el nou VTT") {//he clical al + per crear una nova CUE al nou VTT
            console.log("hola2")
            formulari(opcionsForm[2], estatArxiu[0]);
            botonsOpcions(opcionsForm[0]);

        }else if (paginaActual = "Dades sobre el VTT seleccionat"){//he clical al + per crear una nova CUE al VTT seleccionat
            console.log("o soc aki dessa???")
            formulari(opcionsForm[2], estatArxiu[0]);
            botonsOpcions(opcionsForm[1]);
        }
    });


    // llistat VTTs o CUEs
    for (var i = 0; i < 3; i++) {
        var elemLlista = document.createElement("p");
        elemLlista.setAttribute('class', "llistaForm");
        var text2 = document.createTextNode(llistaVTTs[i]);
        elemLlista.appendChild(text2);
        editorPrincipal.appendChild(elemLlista);

        //botó per editar un element
        var buttonEditarElem = document.createElement("button");
        buttonEditarElem.setAttribute('type', "button");
        buttonEditarElem.setAttribute('class', "botonsEditar");
        var iconoEditar = document.createElement("i");
        iconoEditar.setAttribute('class', "fa-solid fa-pencil");
        buttonEditarElem.appendChild(iconoEditar);
        editorPrincipal.appendChild(buttonEditarElem);


        buttonEditarElem.addEventListener("click", (e) => {
            editorPrincipal.innerHTML = "";
            if (paginaActual == "Menu Principal") { //vull editar un VTT existent
                console.log("AAAAAaqui");
                formulari(opcionsForm[1], estatArxiu[1]);
                opcionsPrincipals(opcioPrincipalEditor[1], llistaCUEs, opcionsForm[1]);
                botonsOpcions(opcionsForm[4]);
    
            }else if (paginaActual == "Dades sobre el VTT seleccionat"){ //vull editar una CUE d'un VTT existent
                console.log("o soc aki dessa???")
                formulari(opcionsForm[3], estatArxiu[1]);
                botonsOpcions(opcionsForm[1]);

            }else if (paginaActual == "Dades sobre el nou VTT") { //vull editar una CUE d'un VTT nou
                console.log("soc aqu?");
                formulari(opcionsForm[3], estatArxiu[1]);
               botonsOpcions(opcionsForm[0]); 
            }
        });

        //botó per borrar un element
        var buttonBorrarElem = document.createElement("button");
        buttonBorrarElem.setAttribute('type', "button");
        buttonBorrarElem.setAttribute('class', "botonsEditar");
        var iconoBasura = document.createElement("i");
        iconoBasura.setAttribute('class', "fa-solid fa-trash-can");
        buttonBorrarElem.appendChild(iconoBasura);
        editorPrincipal.appendChild(buttonBorrarElem);
    }

    //Afegir els botons de l'editor a l'Index
    document.getElementById("editor").appendChild(editorPrincipal);
}

//Regió on hi haurà els botons d'acceptar i cancelar
function botonsOpcions(onVullAnar) {
    console.log("entramos")
    var seccioBotons = document.createElement("div");
    seccioBotons.setAttribute('class', "seccioBotonsFormularis");

    var botoCancelar = document.createElement("input");
    botoCancelar.setAttribute('type', "button");
    botoCancelar.setAttribute('value', "Cancelar");
    botoCancelar.setAttribute('class', "botoFormulari");
    botoCancelar.setAttribute('id', "botonCancelar");
    seccioBotons.appendChild(botoCancelar);

    //Funció per eliminar el formulari de l'Index
    botoCancelar.addEventListener("click", (e) => {
        editorPrincipal.innerHTML = "";
       if (onVullAnar == "Menu Principal") {
            console.log("hellowitos")
            opcionsPrincipals(opcioPrincipalEditor[0], llistaVTTs, opcionsForm[4]);

        }  else if (onVullAnar =="Dades sobre el VTT seleccionat"){
            console.log("alhora")
            formulari(opcionsForm[1], estatArxiu[1]);
            opcionsPrincipals(opcioPrincipalEditor[1], llistaCUEs, opcionsForm[1]);
            botonsOpcions(opcionsForm[4]);
       
        }else if (onVullAnar == "Dades sobre el nou VTT") {
            console.log("hellowitos2")
            formulari(opcionsForm[0], estatArxiu[0]);
            opcionsPrincipals(opcioPrincipalEditor[1], llistaCUEs, opcionsForm[0]);
            botonsOpcions(opcionsForm[4]);
        }
    });

    var botoAcceptar = document.createElement("input");
    botoAcceptar.setAttribute('type', "button");
    botoAcceptar.setAttribute('value', "Guardar");
    botoAcceptar.setAttribute('id', "botoGuardar");
    botoAcceptar.setAttribute('class', "botoFormulari");
    seccioBotons.appendChild(botoAcceptar);

    editorPrincipal.appendChild(seccioBotons);
}

//Formulari per rellenar o modificar les dades d'un VTT o d'una CUE
function formulari(titolFormulari, estatArxiu) {

    var formulari = document.createElement("form");
    formulari.setAttribute('action', "");

    var titolEditorCues = document.createElement("h2");
    var text7 = document.createTextNode(titolFormulari);
    titolEditorCues.appendChild(text7);
    formulari.appendChild(titolEditorCues);

    var form1 = document.createElement("input");
    form1.setAttribute('type', "text");
    form1.setAttribute('nombre', "nomArxiu");

    var form2 = document.createElement("input");
    form2.setAttribute('type', "text");
    form2.setAttribute('nombre', "tipusVTT");


    var form3 = document.createElement("input");
    form3.setAttribute('type', "text");
    form3.setAttribute('nombre', "dadaX");

    if (titolFormulari == "Dades sobre el nou VTT") {

        form1.setAttribute('placeholder', "Nom d'arxiu");
        form2.setAttribute('placeholder', "Tipus de VTT");
        form3.setAttribute('placeholder', "dadaX");

    } else if (titolFormulari == "Dades sobre la nova CUE") {

        form1.setAttribute('placeholder', "Identificador de la CUE");
        form2.setAttribute('placeholder', "Minut inicial CUE");
        form3.setAttribute('placeholder', "Minut final CUE");
    }

    formulari.appendChild(form1);
    formulari.appendChild(form2);
    formulari.appendChild(form3);


    //Funció que rellena els camps del formulari si s'ha clicat el botó d'editar
    if (estatArxiu == "existent") {
        form1.setAttribute('value', "Hannah Montana");
        form2.setAttribute('value', "Metadades");
        form3.setAttribute('value', "Descripcio o algo");
    }
    editorPrincipal.appendChild(formulari);
}

