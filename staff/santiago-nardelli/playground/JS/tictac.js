// Este es un juego de tic tac toe en el que dos jugadores pueden jugar en la consola.

// Capa de datos
var tictac = [[], [], []];
var user1entry = { name: "", symbol: "" };
var user2entry = { name: "", symbol: "" };
var currentPlayer = "";
var row = 0;
var col = 0;
var moveCount = 0;

// CAPA DE LOGICA

// Inicializa el tablero con guiones bajos
function initTable() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      tictac[i][j] = "_";
    }
  }
}

// Imprime el tablero en la consola
function printTable() {
  console.log("    0   1   2");
  console.log("  -------------");
  for (var i = 0; i < 3; i++) {
    var rowString = i + " | ";
    for (var j = 0; j < 3; j++) {
      rowString += tictac[i][j] + " | ";
    }
    console.log(rowString);
    console.log("  -------------");
  }
}

// Pregunta los nombres de los jugadores
function askNamesUsers() {
  user1entry.name = prompt("Primer jugador, ingrese su nombre:");
  user2entry.name = prompt("Segundo jugador, ingrese su nombre:");
  console.log(`Bienvenido ${user1entry.name} y ${user2entry.name}`);
}

// Decide aleatoriamente quién empieza y asigna los símbolos
function randomPlayerInit() {
  var random = Math.floor(Math.random() * 2);
  if (random === 0) {
    console.log(`Empieza ${user1entry.name} con X`);
    user1entry.symbol = "X";
    user2entry.symbol = "O";
    currentPlayer = user1entry.symbol;
  } else {
    console.log(`Empieza ${user2entry.name} con X`);
    user1entry.symbol = "O";
    user2entry.symbol = "X";
    currentPlayer = user2entry.symbol;
  }
}

// Valida la entrada del usuario
function validateUserEntry(row, col) {
  if (isNaN(row) || isNaN(col)) {
    console.error("Debe ingresar números válidos.");
    return false;
  }

  if (row < 0 || row > 2 || col < 0 || col > 2) {
    console.warn("Solo puede elegir entre 0 y 2 para fila y columna.");
    return false;
  }

  if (tictac[row][col] !== "_") {
    console.error("Espacio ocupado, intenta de nuevo.");
    return false;
  }

  return true;
}

// Pide entrada de movimientos a los jugadores
function makeMove() {
  var player = currentPlayer === "X" ? user1entry : user2entry;
  alert(player.name + " ingrese su jugada");
  row = parseInt(prompt(player.name + ", ingrese la fila (0, 1, 2):"));
  if (isNaN(row)) {
    if (!confirmEndGame()) return;
  }
  col = parseInt(prompt(player.name + ", ingrese la columna (0, 1, 2):"));
  if (isNaN(col)) {
    if (!confirmEndGame()) return;
  }

  if (validateUserEntry(row, col)) {
    tictac[row][col] = player.symbol;
    printTable();
    moveCount++;
    if (checkWins(player.symbol)) {
      alert("¡" + player.name + " ha ganado!");
      if (!endGame()) return;
    } else if (moveCount === 9) {
      alert("¡Es un empate!");
      if (!endGame()) return;
    }
    switchPlayer();
  } else {
    alert("Movimiento inválido, intenta de nuevo.");
    makeMove();
  }
}

// Cambia de jugador
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  console.log(`${currentPlayer} es el jugador actual.`);
}

// Verifica si hay un ganador
function checkWins(player) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      tictac[i][0] === player &&
      tictac[i][1] === player &&
      tictac[i][2] === player
    ) return true;
  }
  
  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      tictac[0][j] === player &&
      tictac[1][j] === player &&
      tictac[2][j] === player
    ) return true;
  }
  
  // Check diagonals
  if (
    tictac[0][0] === player &&
    tictac[1][1] === player &&
    tictac[2][2] === player
  ) return true;
  if (
    tictac[0][2] === player &&
    tictac[1][1] === player &&
    tictac[2][0] === player
  ) return true;
  
  return false;
}

// Confirma si el usuario quiere terminar el juego
function confirmEndGame() {
  var confirmEnd = prompt("¿Quieres terminar de jugar? si/no").toLowerCase();
  if (confirmEnd === "si") {
    console.log("Juego terminado");
    return false;
  }
  return true;
}

// Finaliza el juego y pregunta si quieren seguir jugando
function endGame() {
  var askUserEndGameOrNot = prompt("¿Quieren seguir jugando? si/no").toLowerCase();
  if (askUserEndGameOrNot === "no") {
    console.log("Juego terminado");
    return false;
  } else {
    resetGame();
    return true;
  }
}

// Reinicia el juego
function resetGame() {
  initTable();
  printTable();
  randomPlayerInit();
  moveCount = 0;
}

// Función principal del juego
function main() {
  initTable();
  printTable();
  askNamesUsers();
  randomPlayerInit();
  while (true) {
    makeMove();
    if (checkWins(currentPlayer)) {
      printTable();
      console.log("¡" + (currentPlayer === "X" ? user1entry.name : user2entry.name) + " ha ganado!");
      if (!endGame()) break;
    } else if (moveCount === 9) {
      printTable();
      console.log("¡Es un empate!");
      if (!endGame()) break;
    }
    switchPlayer();
  }
}

console.clear();
main();
