// declaro tablero con filas y columnas
var tictac = [[], [], []];
// declaro entrada de user
var userXentry = "";
// declaro entrada de user
var userOentry = "";
//declaro valor inicial de fila por defecto 0
var row = 0;
//declaro valor inicial de columna por defecto 0
var col = 0;

// Este bucle for me permite inicializar el tablero con '_'
// su funcionalidad esta en que el primer for me accede al array tictac y el segundo for me accede a cada uno de los arrays que estan dentro de tictac
//  tictac[i][j] = '_'; esto me permite asignarle a cada uno de los arrays que estan dentro de tictac un guion bajo
for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    tictac[i][j] = "_";
  }
}
// Este bucle me permite imprimir el tablero en la consola con los espacios entre celda y celda y las filas separadas por un salto de linea 
function printTable() {
  for (var i = 0; i < 3; i++) {
    var rowString = "";
    for (var j = 0; j < 3; j++) {
      rowString += tictac[i][j];
      if (j < 2) {
        rowString += " ";
      }
    }
    console.log(rowString);
  }
}
// entrada de primer jugador me permite ingresar la fila y columna donde quiero poner la X
function player1Entry() {
  alert("Primer jugador es su turno");
  var row = parseInt(prompt("Primer jugador, ingrese la fila (0, 1, 2):"));
  var col = parseInt(prompt("Primer jugador, ingrese la columna (0, 1, 2):"));

  if (row < 0 || row > 2 || col < 0 || col > 2) {
    console.warn("SOLO PUEDE ELEGIR ENTRE 0, 1, 2");
    return;
  }
  if (tictac[row][col] !== "_") {
    console.error("Espacio ocupado, intenta de nuevo.");
    return;
  }
  // Si el espacio está vacío, asignar 'X'
  tictac[row][col] = "X";
}
// entrada de segundo jugador me permite ingresar la fila y columna donde quiero poner la O
function player2Entry() {
  alert("Segundo jugador es su turno");
  var row = parseInt(prompt("Segundo jugador, ingrese la fila (0, 1, 2):"));
  var col = parseInt(prompt("Segundo jugador, ingrese la columna (0, 1, 2):"));

  if (row < 0 || row > 2 || col < 0 || col > 2) {
    console.warn("SOLO PUEDE ELEGIR ENTRE 0, 1, 2");
    return;
  }
  // Si el espacio está ocupado, imprimir un mensaje de error
  if (tictac[row][col] !== "_") {
    console.error("Espacio ocupado, intenta de nuevo.");
    return;
  }
  // Si el espacio está vacío, asignar 'O'
  tictac[row][col] = "O";
}

function checkWins(player) {
  // recorro el tablero buscando coincidencias con un for iterando de 0 a 3
  //empezando con un if y iterando en el array[array externo(global)//tablero]buscando los match con el primer if
  //luego en el siguiente if itero sobre los array internos//casillas//
  //con esto chequeo filas y columnas
  for (var i = 0; i < 3; i++) {
    if (
      tictac[i][0] === player &&
      tictac[i][1] === player &&
      tictac[i][2] === player
    )
      return true;
    if (
      tictac[0][i] === player &&
      tictac[1][i] === player &&
      tictac[2][i] === player
    )
      return true;
  }
  // con esto chequeo diagonales
  if (
    tictac[0][0] === player &&
    tictac[1][1] === player &&
    tictac[2][2] === player
  )
    return true;
  if (
    tictac[1][0] === player &&
    tictac[1][1] === player &&
    tictac[2][0] === player
  )
    return true;
  return false;
}

while (true) {
    
}
 
