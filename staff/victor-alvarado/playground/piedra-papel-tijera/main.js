
function eleccionPiedraPapelTijera() { // funcion pra elejir las opciones de el juego.
    var opciones = ["piedra", "papel", "tijera"]  // variable donde se guardan las opciones.
    var numeroAleatorio = Math.floor(Math.random() * opciones.length) // variable que elije un numero aleatorio entre las 3 opciones.
    return opciones[numeroAleatorio]  // retorna el numero aleatorio

}

// funcion para determinar jugadas y el ganador

function comparacionJugadas(jugadaJugador, jugadaMaquina) {
    if (jugadaJugador === jugadaMaquina) {
        return "Empate"
    } else if (

        (jugadaJugador === "piedra" && jugadaMaquina === "tijera") ||
        (jugadaJugador === "papel" && jugadaMaquina === "piedra") ||
        (jugadaJugador === "tijera" && jugadaMaquina === "papel")
    ) {

        return "Ganaste!"

    } else {
        return "perdiste!"
    }
}

function jugar() {
    jugadaJugador = prompt("Elije: piedra, papel o tijera").toLowerCase() //muestra una ventana donde el usuario elije las opciones.

    if (jugadaJugador !== "piedra" && jugadaJugador !== "papel" && jugadaJugador !== "tijera") { // compara si lo que ha puesto el usuario es correcto.
        return

    }
    var jugadaMaquina = elecionPiedraPapelTijera()
    alert(`Tu jugada: ${jugadaJugador}\nJugada de la maquina: ${jugadaMaquina}`) // muestra una alerta con tu jugada y de la maquina.


    var resultado = comparacionJugadas(jugadaJugador, jugadaMaquina) // compara lo que ha elejido el jugador y la maquina.
    alert(resultado) // muestra una alerta con el resultado de jugador y maquina.
}
jugar()

