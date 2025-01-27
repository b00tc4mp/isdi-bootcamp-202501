console.clear();
var cells = [[], [], []];

var player1RowPositionsIndex = [];
var player1ColumnPositionsIndex = [];
var player1PiecesCounter = 0;

var player2RowPositionsIndex = [];
var player2ColumnPositionsIndex = [];
var player2PiecesCounter = 0;

var maxColumn = 3;
var maxRow = 3;

var gameIsFinished = false;

var player1Piece = "O";
var player1Name = "";
var player1Move = [];

var player2Piece = "X";
var player2Name = "";
var player2Move = [];

var player1Turn = true;

for (let i = 0; i < maxColumn; i++) {
  for (let j = 0; j < maxRow; j++) {
    cells[i][j] = "-";
  }
}
function setInitialBoard() {
  for (let i = 0; i < maxColumn; i++) {
    for (let j = 0; j < maxRow; j++) {
      cells[i][j] = "-";
    }
  }
}
function askPlayersNames() {
  player1Name = prompt("What's the name of the player 1?");
  alert(`Nice to meet you, ${player1Name}!`);
  player2Name = prompt("What's the name of the player 2?");
  alert(`Nice to meet you, ${player2Name}!`);
  alert("Let's play tic-tac-toe!");
}
function printCells() {
  console.log(`${cells[0]}\n${cells[1]}\n${cells[2]}`);
}
function askMove() {
  player1Turn
    ? (player1Move = prompt(`${player1Name} move. Row and column.`))
    : (player2Move = prompt(`${player2Name} move. Row and column.`));
  placePiece();
}
function placePiece() {
  if (player1Turn === true) {
    if (cells[player1Move[0] - 1][player1Move[1] - 1] === "-") {
      cells[player1Move[0] - 1][player1Move[1] - 1] = player1Piece;
      player1RowPositionsIndex[player1PiecesCounter] = player1Move[0];
      player1ColumnPositionsIndex[player1PiecesCounter] = player1Move[1];
      player1PiecesCounter++;
    } else if (cells[player1Move[0] - 1][player1Move[1] - 1] === player1Piece) {
      alert("You already have a piece in that position");
      askMove();
      printCells();
    } else if (cells[player1Move[0] - 1][player1Move[1] - 1] === player2Piece) {
      alert(`${player2Name} is in this position`);
      askMove();
      printCells();
    }
  } else {
    if (cells[player2Move[0] - 1][player2Move[1] - 1] === "-") {
      cells[player2Move[0] - 1][player2Move[1] - 1] = player2Piece;
      player2RowPositionsIndex[player2PiecesCounter] = player2Move[0];
      player2ColumnPositionsIndex[player2PiecesCounter] = player2Move[1];
      player2PiecesCounter++;
    } else if (cells[player2Move[0] - 1][player2Move[1] - 1] === player2Piece) {
      alert("You already have a piece in that position");
      askMove();
      printCells();
    } else if (cells[player2Move[0] - 1][player2Move[1] - 1] === player1Piece) {
      alert(`${player1Name} is in this position`);
      askMove();
      printCells();
    }
  }
}

function checkIfWinRow() {
  var player1WinConditionArr = [0, 0, 0];
  var player2WinConditionArr = [0, 0, 0];

  if (player1Turn === true) {
    for (var i = 0; i < player1RowPositionsIndex.length; i++) {
      if (player1RowPositionsIndex[i] === "1") {
        player1WinConditionArr[0] += 1;
      } else if (player1RowPositionsIndex[i] === "2") {
        player1WinConditionArr[1] += 1;
      } else if (player1RowPositionsIndex[i] === "3") {
        player1WinConditionArr[2] += 1;
      }
    }
    if (
      player1WinConditionArr[0] === 3 ||
      player1WinConditionArr[1] === 3 ||
      player1WinConditionArr[2] === 3
    ) {
      gameIsFinished = true;
      return gameIsFinished;
    }
  }

  if (player1Turn === false) {
    for (var i = 0; i < player2RowPositionsIndex.length; i++) {
      if (player2RowPositionsIndex[i] === "1") {
        player2WinConditionArr[0] += 1;
      } else if (player2RowPositionsIndex[i] === "2") {
        player2WinConditionArr[1] += 1;
      } else if (player2RowPositionsIndex[i] === "3") {
        player2WinConditionArr[2] += 1;
      }
    }
    if (
      player2WinConditionArr[0] === 3 ||
      player2WinConditionArr[1] === 3 ||
      player2WinConditionArr[2] === 3
    ) {
      gameIsFinished = true;
      return gameIsFinished;
    }
  }
  return gameIsFinished;
}
function checkIfWinColumns() {
  var player1WinConditionArr = [0, 0, 0];
  var player2WinConditionArr = [0, 0, 0];

  if (player1Turn === true) {
    for (var i = 0; i < player1ColumnPositionsIndex.length; i++) {
      if (player1ColumnPositionsIndex[i] === "1") {
        player1WinConditionArr[0] += 1;
      } else if (player1ColumnPositionsIndex[i] === "2") {
        player1WinConditionArr[1] += 1;
      } else if (player1ColumnPositionsIndex[i] === "3") {
        player1WinConditionArr[2] += 1;
      }
    }
    if (
      player1WinConditionArr[0] === 3 ||
      player1WinConditionArr[1] === 3 ||
      player1WinConditionArr[2] === 3
    ) {
      gameIsFinished = true;
      return gameIsFinished;
    }
  }

  if (player1Turn === false) {
    for (var i = 0; i < player2ColumnPositionsIndex.length; i++) {
      if (player2ColumnPositionsIndex[i] === "1") {
        player2WinConditionArr[0] += 1;
      } else if (player2ColumnPositionsIndex[i] === "2") {
        player2WinConditionArr[1] += 1;
      } else if (player2ColumnPositionsIndex[i] === "3") {
        player2WinConditionArr[2] += 1;
      }
    }
    if (
      player2WinConditionArr[0] === 3 ||
      player2WinConditionArr[1] === 3 ||
      player2WinConditionArr[2] === 3
    ) {
      gameIsFinished = true;
      return gameIsFinished;
    }
  }
  return gameIsFinished;
}

function checkIfWin() {
  if (checkIfWinRow()) {
    player1Turn
      ? alert(`Congratulations, ${player1Name}, you are the winner!`)
      : alert(`Congratulations, ${player2Name}, you are the winner!`);
    resetGame();
  } else if (checkIfWinColumns()) {
    player1Turn
      ? alert(`Congratulations, ${player1Name}, you are the winner!`)
      : alert(`Congratulations, ${player2Name}, you are the winner!`);
    resetGame();
  } else if (checkIfWinDiagonalsX()) {
    player1Turn
      ? alert(`Congratulations, ${player1Name}, you are the winner!`)
      : alert(`Congratulations, ${player2Name}, you are the winner!`);
    resetGame();
  } else if (checkIfWinDiagonalsY()) {
    player1Turn
      ? alert(`Congratulations, ${player1Name}, you are the winner!`)
      : alert(`Congratulations, ${player2Name}, you are the winner!`);
    resetGame();
  } else {
    console.log("Game is not over yet");
    player1Turn = !player1Turn;
  }
}

function checkIfWinDiagonalsX() {
  var player1DiagonalMatchCounter = 0;
  var player2DiagonalMatchCounter = 0;
  var arrayIncrementAux = 0;

  if (player1Turn) {
    for (var i = 0; i < maxColumn; i++) {
      if (cells[i][arrayIncrementAux] === "O") {
        player1DiagonalMatchCounter++;
      }
      arrayIncrementAux++;
    }

    if (player1DiagonalMatchCounter === 3) {
      gameIsFinished = true;
      return gameIsFinished;
    }
  } else {
    for (var i = 0; i < maxColumn; i++) {
      if (cells[i][arrayIncrementAux] === "X") {
        player2DiagonalMatchCounter++;
      }
      arrayIncrementAux++;
    }
    if (player2DiagonalMatchCounter === 3) {
      gameIsFinished = true;
      return gameIsFinished;
    }
  }
  return gameIsFinished;
}

function checkIfWinDiagonalsY() {
  var player1DiagonalMatchCounter = 0;
  var player2DiagonalMatchCounter = 0;
  var arrayIncrementAux = 3;

  if (player1Turn) {
    for (var i = 0; i < maxColumn; i++) {
      if (cells[i][arrayIncrementAux] === "O") {
        player1DiagonalMatchCounter--;
      }
      arrayIncrementAux--;
    }

    if (player1DiagonalMatchCounter === 3) {
      gameIsFinished = true;
      return gameIsFinished;
    }
  } else {
    for (var i = 0; i < maxColumn; i++) {
      if (cells[i][arrayIncrementAux] === "X") {
        player2DiagonalMatchCounter--;
      }
      arrayIncrementAux--;
    }
    if (player2DiagonalMatchCounter === 3) {
      gameIsFinished = true;
      return gameIsFinished;
    }
  }
  return gameIsFinished;
}

function isDraw() {
  var draw = true;
  for (var i = 0; i < maxColumn; i++) {
    for (var j = 0; j < maxRow; j++) {
      if (cells[i][j] === "-") {
        return false;
      }
    }
  }
  return draw;
}
function resetGame() {
  var wantToReset = "";
  while (wantToReset !== "yes" && wantToReset !== "no") {
    wantToReset = prompt("Do you want to play again? yes or no");
  }
  if (wantToReset === "yes") {
    askPlayersNames();
    setInitialBoard();
    gameIsFinished = false;
    player1RowPositionsIndex = [];
    player1ColumnPositionsIndex = [];
    player1PiecesCounter = 0;
    player2RowPositionsIndex = [];
    player2ColumnPositionsIndex = [];
    player2PiecesCounter = 0;
    player1Turn = true;
  } else {
    alert("See you!");
    gameIsFinished = true;
  }
}
askPlayersNames();
setInitialBoard();
while (!gameIsFinished && isDraw() === false) {
  askMove();
  printCells();
  checkIfWin();
  printCells();
}
