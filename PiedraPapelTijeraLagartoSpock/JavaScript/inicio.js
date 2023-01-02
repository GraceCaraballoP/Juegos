/**
 * Toma los valores de los campos de entrada y los almacena en el almacenamiento local
 */
function generaPartida(){
    let jug=document.getElementById("jugador").value;
    let rondas=document.getElementById("rondas").value;
    localStorage.setItem('jug', jug);
    localStorage.setItem('rondas', rondas);
    localStorage.setItem('victorias', 0);
    localStorage.setItem('victoriasMaquina', 0);
    location.href="partida.html"
}