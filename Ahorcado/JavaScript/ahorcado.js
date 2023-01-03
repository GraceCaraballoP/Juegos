let palabras, palabra, nombrePalabra;
let imagen, titulo, anio, sinopsis, director;
let tipo;
let errores=0;
let puntaje=1000;
let posicion;
let rondas=localStorage.getItem('rondas');
let numJugadores=localStorage.getItem('numJugadores');
let nombreJ1=localStorage.getItem('jug1');
let nombreJ2=localStorage.getItem('jug2');

/**
 * Crea un nuevo objeto XMLHttpRequest, establece su función de carga en una función que analiza el
 * texto de respuesta como JSON y lo asigna a la variable palabras, abre la solicitud en el archivo
 * palabras.json y envía la solicitud
 */
function cargaJson() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        palabras=JSON.parse(xhttp.responseText);
        nuevaPartida();
    }
    xhttp.open("GET", "./JavaScript/palabras.json");
    xhttp.send();
}

/**
 * Genera un nuevo juego.
 * @param [ronda=1] - El número de la ronda a jugar.
 * @param [jugadorActual] - El nombre del jugador que está jugando actualmente.
 */
function nuevaPartida(ronda=1,jugadorActual=nombreJ1){
    
    let puntosJ1=parseInt(localStorage.getItem('puntosJug1'));
    let puntuacion=document.getElementById("puntuacion");
    let numeroRonda=document.getElementById("numRonda");
    let nombreJugador=document.getElementById("nombreJugador");
    
    if(jugadorActual==nombreJ1){
        puntuacion.innerHTML=puntosJ1;
    }else{
        let puntosJ2=parseInt(localStorage.getItem('puntosJug2'));
        puntuacion.innerHTML=puntosJ2;
    }

    nombreJugador.innerHTML=jugadorActual;
    numeroRonda.innerHTML=ronda+"/"+rondas;
    localStorage.setItem('rondaActual',ronda);
    localStorage.setItem('jugadorActual',jugadorActual);

    let acierto=document.getElementById("acierto");
    let proxRonda=document.getElementById("proxRonda");
    let ultimaRonda=document.getElementById("ultimaRonda");
    let proximoJugador=document.getElementById("proxJugador");
    let botones=document.getElementById("botones");
    let botonLetras=document.getElementsByName("btn");

    acierto.style.display="none";
    proxRonda.style.display="none";
    ultimaRonda.style.display="none";
    proximoJugador.style.display="none";
    botones.style.display="inline";

    for(i=0;i<botonLetras.length;i++){
        botonLetras[i].style.display="inline"
    }
    
    generaPartida();
}

/**
 * Escoge una pelicula o serie aleatoria de la matriz de palabras.
 * @returns el valor de la variable palabra a adivinar.
 */
function generaPalabra(){
    tipo=parseInt(Math.random()*2);
    posicion=parseInt(Math.random()*10);

    if(tipo==0){
        palabra=palabras['peliculas'][posicion]['nombre'];
        imagen=palabras['peliculas'][posicion]['imagen'];
        anio=palabras['peliculas'][posicion]['anio'];
        sinopsis=palabras['peliculas'][posicion]['sinopsis'];
        director=palabras['peliculas'][posicion]['director'];
    }else{
        palabra=palabras['series'][posicion]['nombre'];
        imagen=palabras['series'][posicion]['imagen'];
        anio=palabras['series'][posicion]['anio'];
        sinopsis=palabras['series'][posicion]['sinopsis'];
        director=palabras['series'][posicion]['director'];
    }
    return palabra;
}

/**
 * Genera una palabra aleatoria de la matriz de palabras, luego crea una cadena de guiones bajos que
 * tiene la misma longitud que la palabra y, finalmente, muestra los guiones bajos en el HTML.
 */
function generaPartida(){
    nombrePalabra=generaPalabra();

    let guiones="";

    for(i=0;i<nombrePalabra.length;i++){
        if(nombrePalabra[i]==" "){
            guiones+=nombrePalabra[i];    
        }else{
            guiones+="_";    
        }
    }
    let pelicula=document.getElementById("pelicula");
    pelicula.innerHTML=guiones;
}

/**
 * Comprueba si la letra está en la palabra, si lo está, reemplaza los guiones bajos con la letra, si
 * no lo está, agrega uno al contador de errores y dibuja la siguiente parte del ahorcado.
 * @param letra - La letra en la que el usuario ha hecho clic.
 */
function validaLetra(letra){
    let pelicula=document.getElementById("pelicula");
    let campoLetra=document.getElementById("Letra"+letra);
    let canvas=document.getElementById("canvas");
    let peliculaIncluye = nombrePalabra.includes(letra);
    let peli=pelicula.innerHTML;
    let rondaActual=localStorage.getItem('rondaActual');
    
    if(errores<10){
        if (peliculaIncluye) { 
            pelicula.innerHTML="";
            for(i=0;i<peli.length;i++){
                if(peli[i]=="_"){
                    if(nombrePalabra[i]==letra){
                        pelicula.innerHTML+=letra;
                    }else{
                        pelicula.innerHTML+=peli[i];    
                    }
                }else{
                    pelicula.innerHTML+=peli[i];    
                }
            }
            if(pelicula.innerHTML==nombrePalabra){
                
                muestraDatos();
                
                evaluaRonda(rondaActual);

                errores=0;
                puntaje=1000;
            } 
            campoLetra.style.display="none";
            generaCanvas();                                                    
            return true;
        }else{
            canvas.style.display="inline"
            errores++;
            console.log("Llevas "+errores+" errores de 10");
            campoLetra.style.display="none";
            puntaje=puntaje-100;
            generaCanvas("false");
            
            return false;
        }
    }else{
        muestraDatos();

        let jugadorActual=localStorage.getItem('jugadorActual');    
        if(rondaActual==rondas){
        let botonUltimaRonda=document.getElementById("ultimaRonda");
        
        if(numJugadores==2 && jugadorActual==nombreJ2){
            botonUltimaRonda.style.display="inline";
        }else if(numJugadores==2 ){
            let botonSiguienteJugador=document.getElementById("proxJugador"); 
            botonSiguienteJugador.style.display="inline";
        }else{
            botonUltimaRonda.style.display="inline";
        } 
    }else{
        let botonSiguienteRonda=document.getElementById("proxRonda");
        
        if(nombreJ1!=jugadorActual){
            localStorage.setItem('jugadorActual',nombreJ2);
            localStorage.setItem('rondaActual',parseInt(rondaActual));
        }

        botonSiguienteRonda.style.display="inline";
    }
        errores=0;
        puntaje=1000;
    }
}

/**
 * Muestra y oculta los botones, el lienzo y muestra la imagen, la descripción y el año, el director y la
 * sinopsis.
 */
function muestraDatos(){
    let botones=document.getElementById("botones");
    let portada=document.getElementById("portada");
    let descripcion=document.getElementById("descripcion");
    let divTitulo=document.getElementById("titulo");
    let divAnio=document.getElementById("anio");
    let divDirector=document.getElementById("director");
    let divSinopsis=document.getElementById("sinopsis");
    
    botones.style.display="none"
    canvas.style.display="none"
    portada.style.display="inline"
    descripcion.style.display="inline"
    descripcion.style.textAlign="justify"

    divTitulo.innerText=palabra;
    divAnio.innerText=anio;
    divDirector.innerText=director;
    divSinopsis.innerText=sinopsis;
    portada.setAttribute("src",imagen);

    let acierto=document.getElementById("acierto");
    acierto.style.display="inline"
}

/**
 * Evalúa la ronda actual y, según el número de jugadores y el jugador actual, muestra el botón de la
 * siguiente ronda o el botón de la última ronda.
 * @param rondaActual - La ronda actual.
 */
function evaluaRonda(rondaActual){
    let jugadorActual=localStorage.getItem('jugadorActual');

    if(rondaActual==rondas){
        let botonUltimaRonda=document.getElementById("ultimaRonda");
        
        if(numJugadores==2 && jugadorActual==nombreJ2){
            let puntosj2=parseInt(localStorage.getItem('puntosJug2'));
            localStorage.setItem('puntosJug2',puntosj2+puntaje);
            botonUltimaRonda.style.display="inline";
        }else if(numJugadores==2 ){
            let puntosj1=parseInt(localStorage.getItem('puntosJug1'));
            localStorage.setItem('puntosJug1', puntosj1+puntaje);
            let botonSiguienteJugador=document.getElementById("proxJugador"); 
            botonSiguienteJugador.style.display="inline";
        }else{
            let puntosj1=parseInt(localStorage.getItem('puntosJug1'));
            localStorage.setItem('puntosJug1', puntosj1+puntaje);
            botonUltimaRonda.style.display="inline";
        } 
    }else{
        let botonSiguienteRonda=document.getElementById("proxRonda");
        
        if(nombreJ1==jugadorActual){
            let puntosj1=parseInt(localStorage.getItem('puntosJug1'));
            localStorage.setItem('puntosJug1', puntosj1+puntaje);
        }else{
            let puntosj2=parseInt(localStorage.getItem('puntosJug2'));
            localStorage.setItem('puntosJug2', puntosj2+puntaje);
            localStorage.setItem('jugadorActual',nombreJ2);
            localStorage.setItem('rondaActual',parseInt(rondaActual));
        }

        botonSiguienteRonda.style.display="inline";
    }
}

/**
 * Establece la ronda actual en 1, el jugador actual en el segundo jugador, la puntuación del segundo
 * jugador en 0, oculta el botón "siguiente jugador" y comienza un nuevo juego.
 */
function proximoJugador(){
    localStorage.setItem('rondaActual',1);
    localStorage.setItem('jugadorActual',nombreJ2);
    localStorage.setItem('puntosJug2',0);

    let botonProxJugador=document.getElementById("proxJugador");

    botonProxJugador.style.display="none";
        
    nuevaPartida(1,nombreJ2);
}

/**
 * Crea una tabla con las puntuaciones finales de los jugadores y se la muestra al usuario
 */
function verPuntuaciones(){
    let puntosJ1=parseInt(localStorage.getItem('puntosJug1'));
    let puntosFinales=document.getElementById("puntosFinales");
    let divPuntajes=document.getElementById("puntajes");
    let botonUltimaRonda=document.getElementById("ultimaRonda");
    let partida=document.getElementById("partida");
    let barraNav=document.getElementById("navBar");
    barraNav.style.display="none";
    partida.style.display="none"
    botonUltimaRonda.style.display="none";
    divPuntajes.style.display="inline";

    if(numJugadores!=1){
        let puntosJ2=parseInt(localStorage.getItem('puntosJug2'));
        let ganador=document.getElementById("ganador");
        ganador.style.display="inline";

        console.log("p1:"+puntosJ1+" , p2: "+puntosJ2);

        if(puntosJ1>puntosJ2){
            ganador.innerHTML="La partida la ha ganado: "+nombreJ1 ;
        }else if(puntosJ1<puntosJ2){
            ganador.innerHTML="La partida la ha ganado: "+nombreJ2 ;
        }else{
            ganador.innerHTML=nombreJ1+" y "+nombreJ2+" han empatado la partida.";
        }
        let filaJug2=creaFila(nombreJ2,puntosJ2);
        puntosFinales.appendChild(filaJug2);
    }

    let filaJug1=creaFila(nombreJ1,puntosJ1);
    puntosFinales.appendChild(filaJug1);

    let nuevaPartida=document.getElementById("nuevaPartida");
    nuevaPartida.style.display="inline";
}

/**
 * Crea una fila de tabla con dos celdas, la primera que contiene el nombre del jugador y la segunda
 * que contiene la puntuación del jugador.
 * @param jugador - El nombre del jugador.
 * @param puntuacion - La puntuación del jugador
 * @returns Una fila de tabla con dos celdas, una con el nombre del jugador y otra con la puntuación.
 */
function creaFila(jugador,puntuacion){
    let tr=document.createElement("tr");
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    td1.appendChild(document.createTextNode(jugador));
    td2.appendChild(document.createTextNode(puntuacion));
    tr.appendChild(td1);
    tr.appendChild(td2);
    
    return tr;
}

/**
 * Redirige al usuario a la página nuevaPartida.html
 */
function iniciarPartida(){
    location.href="index.html"
}

/**
 * Dibuja una persona basado en el número de errores
 * @param [tipo=acierto] - Este es el tipo de lienzo para dibujar. Puede ser "acierto" o "error".
 */
function generaCanvas(tipo="acierto"){

    let canvas = document.getElementById("myCanvas");
    let canvasContenido = canvas.getContext("2d");
    
    canvas.width = 250;
    canvas.height = 300;

    if(tipo=="acierto"){
        canvasContenido.strokeStyle = "black";
    }else{
        canvasContenido.strokeStyle = "red";
    }

    canvasContenido.beginPath();
    
    canvasContenido.lineWidth = 3;

    /* Dibuja Linea de suelo */
    if(errores >= 1){
        canvasContenido.moveTo(50, 280);
        canvasContenido.lineTo(200, 280);
    }
    
    /*Dibuja linea vertical */
    if(errores >= 2){
        canvasContenido.lineTo(200, 20);
    }

    /*Dibuja horizontal superior */
    if(errores >= 3){
        canvasContenido.lineTo(115, 20);
    }

    /*Dibujo cuerda ahorcado*/
    if(errores >= 4){
        canvasContenido.lineTo(115, 60);
    }

    /* Dibuja cabeza*/
    if(errores >= 5){
        canvasContenido.arc(115, 90, 30, Math.PI * 1.5, Math.PI * 3.5, false);
    }

    /* Dibuja cuerpo */
    if(errores >= 6){
        canvasContenido.moveTo(115,120);
        canvasContenido.lineTo(115,210);
    }

    /* Dibuja brazo derecho*/
    if(errores >= 7){
        canvasContenido.moveTo(115,150);
        canvasContenido.lineTo(145,180);
    }    

    /* Dibuja brazo izquierdo*/
    if(errores >= 8){
        canvasContenido.moveTo(115,150);
        canvasContenido.lineTo(85,180);
    }

    /* Dibuja pierna derecha*/
    if(errores >= 9){
        canvasContenido.moveTo(115,209);
        canvasContenido.lineTo(145,240);
    }

    /* Dibuja pierna izquierda*/
    if(errores >= 10){
        canvasContenido.moveTo(115,209);
        canvasContenido.lineTo(85,240);
    }

    canvasContenido.stroke();
}