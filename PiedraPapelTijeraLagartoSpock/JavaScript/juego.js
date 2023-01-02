let nombreJugador=localStorage.getItem('jug');
let rondas=parseInt(localStorage.getItem('rondas'));


/**
 * Establece el número de victorias, el nombre del jugador, el número de la ronda actual y el número de
 * rondas, y oculta los botones, el resultado, el botón "próxima ronda" y el botón "última ronda".
 * @param [ronda=1] - El número redondo.
 */
function nuevaPartida(ronda=1){
    
    let victorias=parseInt(localStorage.getItem('victorias'));
    let divVictorias=document.getElementById("victorias");
    let numeroRonda=document.getElementById("numRonda");
    let nombreJug=document.getElementById("nombreJugador");
    
    divVictorias.innerHTML=victorias;
    nombreJug.innerText=nombreJugador;
    numeroRonda.innerHTML=ronda+"/"+rondas;

    localStorage.setItem('rondaActual',ronda);

    let botones=document.getElementById("botones");
    let resultado=document.getElementById("resultado");
    let jugado=document.getElementById("jugado");
    let proxRonda=document.getElementById("proxRonda");
    let ultimaRonda=document.getElementById("ultimaRonda");
    
    botones.style.display="inline";
    jugado.style.display="none";
    resultado.style.display="none";
    proxRonda.style.display="none";
    ultimaRonda.style.display="none";
}

/**
 * Genera un número aleatorio entre 0 y 4, y luego devuelve el elemento correspondiente de la matriz
 * @returns el valor del arreglo figuras en el índice de la variable tipo.
 */
function generaFiguraAleatoria(){
    tipo=parseInt(Math.random()*5);
    figuras=["piedra","papel","tijera","lagarto","spock"];

    return figuras[tipo];
}

/**
 * Devuelve un valor booleano diciendo si gana el jugador o la máquina.
 * @param jugador - la elección del jugador
 * @param maquina - la elección de la máquina
 * @returns un valor booleano.
 */
function ganaJugador(jugador,maquina){
    if(jugador=="piedra"){
        if(maquina=="papel" || maquina=="spock"){
            return false;
        }else{
            return true;
        }
    }else if(jugador=="papel"){
        if(maquina=="tijera" || maquina=="lagarto"){
            return false;
        }else{
            return true;
        }
    }else if(jugador=="tijera"){
        if(maquina=="piedra" || maquina=="spock"){
            return false;
        }else{
            return true;
        }
    }else if(jugador=="lagarto"){
        if(maquina=="piedra" || maquina=="tijera"){
            return false;
        }else{
            return true;
        }
    }else if(jugador=="spock"){
        if(maquina=="papel" || maquina=="lagarto"){
            return false;
        }else{
            return true;
        }
    }
}

/**
 * Crea una fila de la tabla con las imágenes de la elecciín del jugador y la máquina y el símbolo 
 * indicando quien ha ganado o si han empatado
 * @param jugador - La elección del jugador.
 * @param maquina - la elección de la computadora
 * @param simbolo - el símbolo que se usará para comparar las opciones del jugador y la computadora.
 * @returns Una fila de tabla con tres celdas.
 */
function creaFilaRonda(jugador,maquina,simbolo){
    let tr=document.createElement("tr");
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    let td3=document.createElement("td");
    let imgJugador=document.createElement("img");
    let imgSimbolo=document.createElement("img");
    let imgMaquina=document.createElement("img");
    let textoAlt;

    if(simbolo=='igual'){
        textoAlt= "Simbolo de " 
    } else{
        textoAlt= "Flecha hacia la "
    }

    imgJugador.src="./imagenes/"+jugador+".png";
    imgJugador.alt=jugador;
    imgJugador.width=150;
    imgSimbolo.src="./imagenes/"+simbolo+".png";
    imgSimbolo.alt=textoAlt+simbolo;
    imgSimbolo.width=150;
    imgMaquina.src="./imagenes/"+maquina+".png";
    imgMaquina.alt=jugador;
    imgMaquina.width=150;
    
    td1.appendChild(imgJugador);
    td2.appendChild(imgSimbolo);
    td3.appendChild(imgMaquina);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    
    return tr;
}

/**
 * Toma una figura como parámetro, genera una figura aleatoria, las compara y muestra el resultado
 * @param figura - la figura que el jugador ha elegido
 */
function juega(figura){
    let rondaActual=parseInt(localStorage.getItem('rondaActual'));
    let figuraAle=generaFiguraAleatoria();

    
    let botones=document.getElementById("botones");
    let resultado=document.getElementById("resultado");
    let resultadoTexto=document.getElementById("resultadoRondaTexto");
    let resultadoRonda=document.getElementById("resultadoRonda");

    botones.style.display="none";
    resultado.style.display="inline";
    resultadoRonda.innerHTML = "";
        
    let fila;

    if(figura==figuraAle){
        fila=creaFilaRonda(figura,figuraAle,"igual");
        console.log("empate");
        resultadoTexto.innerHTML="La máquina tiene: "+figuraAle+". Por tanto "+nombreJugador+" y la máquina empatan y no suman victorias.";
    } else{
        if(ganaJugador(figura,figuraAle)){
            console.log("gana Jugador");
            let victorias=parseInt(localStorage.getItem('victorias'));
            localStorage.setItem('victorias', victorias+1);
            fila=creaFilaRonda(figura,figuraAle,"derecha");
            resultadoTexto.innerHTML="La máquina tiene: "+figuraAle+". Por tanto "+nombreJugador+" gana a la máquina y suma una victoria.";
        }else{
            console.log("gana maquina");
            let victoriasMaquina=parseInt(localStorage.getItem('victoriasMaquina'));
            localStorage.setItem('victoriasMaquina', victoriasMaquina+1);
            fila=creaFilaRonda(figura,figuraAle,"izquierda");    
            resultadoTexto.innerHTML="La máquina tiene: "+figuraAle+". Por tanto gana la máquina a "+nombreJugador+".";
        }
    } 
    
    resultadoRonda.appendChild(fila);

    let jugado=document.getElementById("jugado");
    jugado.style.display="inline";
    if(rondaActual==rondas){
        let botonUltimaRonda=document.getElementById("ultimaRonda");
        botonUltimaRonda.style.display="inline";
    }else{
        let botonSiguienteRonda=document.getElementById("proxRonda");
        botonSiguienteRonda.style.display="inline";
    }
}

function creaFilaVictorias(jugador,victorias){
    let tr=document.createElement("tr");
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    let td3=document.createElement("td");
    td1.appendChild(document.createTextNode(jugador));
    td2.appendChild(document.createTextNode(rondas));
    td3.appendChild(document.createTextNode(victorias));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    
    return tr;
}

/**
 * Crea una tabla con el número de victorias del jugador y la máquina, y también muestra quién ganó el
 * juego.
 */
function verVictorias(){
    let victorias=parseInt(localStorage.getItem('victorias'))
    let victoriasMaquina=parseInt(localStorage.getItem('victoriasMaquina'));
    
    let victoriasTotales=document.getElementById("victoriasTotales");
    let divPuntajes=document.getElementById("puntajes");
    let botonUltimaRonda=document.getElementById("ultimaRonda");
    let partida=document.getElementById("partida");
    let barraNav=document.getElementById("navBar");
    
    barraNav.style.display="none";
    partida.style.display="none";
    botonUltimaRonda.style.display="none";
    divPuntajes.style.display="inline";
        
    let ganador=document.getElementById("ganador");
    ganador.style.display="inline";
    if(victorias>victoriasMaquina){
        ganador.innerHTML="La partida la ha ganado: "+nombreJugador+".";
    }else if(victoriasMaquina>victorias){
        ganador.innerHTML="La partida la ha ganado la máquina.";
    }else{
        ganador.innerHTML=nombreJugador+" y la máquina han empatado la partida.";
    }

    let filaJug=creaFilaVictorias(nombreJugador,victorias);
    let filaMaquina=creaFilaVictorias("Máquina",victoriasMaquina);
    victoriasTotales.appendChild(filaJug);
    victoriasTotales.appendChild(filaMaquina);

    let nuevaPartida=document.getElementById("nuevaPartida");
    nuevaPartida.style.display="inline";
}

/**
 * Redirige al usuario a la página index.html
 */
function iniciarPartida(){
    location.href="index.html"
}