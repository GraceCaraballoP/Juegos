/**
 * La función muestra toma un parámetro, `id` del elemento que quiere mostrar.
 * @param id - El ID del elemento que desea mostrar.
 */
function muestra(id) {
    let campo=document.getElementById(id);
    campo.className = "visible"; 
}

/**
 * La función oculta toma un parámetro, `id` del elemento que quiere ocultar.
 * @param id - El ID del elemento que desea ocultar.
 */
function oculta(id) {
    let campo=document.getElementById(id);
    campo.className = "oculto"; 
}

/**
 * Toma el valor del campo de entrada y lo almacena en el almacenamiento local
 * y redirige a jugadores.html
 */
function cargaFormulario(){
    let numJug=document.getElementById("numJugadores").value;
    localStorage.setItem('numJugadores', numJug);
    location.href="jugadores.html";
}

/**
 * Muestra el formulario de inicio de sesión para uno o dos jugadores.
 */
function inicioSesion(){
    let numJug=localStorage.getItem('numJugadores');
    oculta('jug2');
    muestra('formularioJugador');
    console.log(numJug)
    if(numJug==1){
        oculta('jug2');
        muestra('formularioJugador');
    }else{
        muestra('jug2');
        muestra('formularioJugador');
    }
}

/**
 * Almacena los datos de los jugadores en el almacenamiento local. Y redirige a index.html
 */
function generaPartida(){
    let jug1=document.getElementById("jugador1").value;
    let jug2=document.getElementById("jugador2").value;
    let rondas=document.getElementById("rondas").value;
    localStorage.setItem('jug1', jug1);
    localStorage.setItem('rondas', rondas);
    localStorage.setItem('puntosJug1', 0);
    if(jug2!=""){
        localStorage.setItem('jug2', jug2);
        localStorage.setItem('puntosJug2', 0);
    }
    location.href="partida.html"
}