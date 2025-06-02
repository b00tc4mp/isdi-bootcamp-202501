var tablero = [[], [], []]

var maxFilas = 3
var maxColumnas = 3
var jugador = 'X'

//for para plantear el tablero con '-'

for(var i = 0; i < maxFilas; i++) {
    for( var j = 0; j < maxColumnas; j++) {
         tablero[i][j] = '-'
    }
}
console.log(tablero)

//Función para tirar 
function tiradaCompleta(){
    var tiradaFila = parseInt(prompt('Jugador ' + jugador + ' inserte una fila (0, 1 o 2)'))
    var tiradaColumna = parseInt(prompt('Jugador ' + jugador + ' inserte una columna (0, 1 o 2)'))

    // Verificar si la fila o la columna estan entre los rangos
    if (tiradaFila >= maxFilas || tiradaColumna >= maxColumnas) {
        console.log('Fila o columna mal insertada. Vuelva a intentarlo.')
        return tiradaCompleta()
    }

    // Verifica si la casilla está libre
    if (tablero[tiradaFila][tiradaColumna] !== '-') {
        console.log('Casilla ocupada. Prueba con otra.')
        return tiradaCompleta()
    }

    //marcar la casilla
    tablero[tiradaFila][tiradaColumna] = jugador
    jugar()
    //console.log(tablero)
}

/*Función copiada de Frank para controlar cuando se hace
raya, columna o diagonal
*/
function comprobarRaya(a, b, c) {
    return a !== '-' && a === b && b === c
}

//función para chequear ganador 
function verificarGanador() {
    //Verificamos las filas: for para recorrer array i
    for(var i = 0; i < maxFilas; i++) {
        if(comprobarRaya(tablero[i][0], tablero[i][1], tablero[i][2])) {
            console.log('¡Felicidades jugador ' + jugador + ' ha ganado por filas!')
            return true
       }  
    }
    
    //Verificamos las columnas: for para recorrer array j
    for(var j = 0; j < maxColumnas; j++) {
        if(comprobarRaya(tablero[0][j], tablero[1][j], tablero[2][j])) {
            console.log('¡Felicidades jugador ' + jugador + ' ha ganado por columnas!')
            return true
        }
    }

    //Verificamos las diagonales. No hace falta for
    if(comprobarRaya(tablero[0][0], tablero[1][1], tablero[2][2]) ||
       comprobarRaya(tablero[0][2], tablero[1][1], tablero[2][0])) {
        console.log('¡Felicidades jugador ' + jugador + ' ha ganado por diagonal!')
        return true
    }

    return false   
}

//funcion para verificar empate

function verificarEmpate(){
  for(var i = 0; i < maxFilas; i++) {
    for(var j = 0; j < maxColumnas; j++) {
      if(tablero[i][j] === '-') {
        return false
      }
    }
  }
    console.log('Hay un empate. Volved a probar.')
    return true
}

//funcion para controlar el juego
function jugar() {
    while (true) {
        if (verificarGanador()) {
            
            break 
        }
        if (verificarEmpate()) {
            
            break 
        }
    //imprime tablero, cambiar de turno, vuelva a la tiradaCompleta
    console.log(tablero)
    jugador = jugador === 'X' ? 'O' : 'X'
    tiradaCompleta()
    }
}

tiradaCompleta()

/*
Se queda en bucle infinito al ganar. Faltaria hacer una función para preguntar
si quiere volver a jugar y empezar de nuevo el juego.
*/
