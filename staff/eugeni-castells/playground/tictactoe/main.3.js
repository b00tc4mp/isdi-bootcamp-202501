/*USER
- start game with empty board [U1]
- introduce piece to a cell if possible [U2]
- see board after move [U3]
- see if someone wins [U4]
*/

//Declare variable with the cells
var cells = [[], [], []];

//Declare variable with current player
var piece = "O";

//[U1]
function printInitialBoard() {
  //M2: For every array inside, print three "-"
  for (var i = 0; i < cells.length; i++) {
    for (var j = 0; j < cells.length; j++) {
      cells[i][j] = "-";
    }
  }
  //M3: Pass the array to a string to make it more user friendly and show the string in the console
  console.log(cells);
}

//[U2]
function moveToCell(move) {
  //M1: Check if another move is possible
  checkIfMovePossible();
  //M2: Ask the move (the column and row)
  //M3: Check if the move can be placed
  //M4: If not, ask again
  //M5: Place the piece. Replace in the cells array the "-" for the player piece. If it's player 1 "O". If it's player 2 "X"

  if (cells[move[0] - 1][move[1] - 1] === "-") {
    cells[move[0] - 1][move[1] - 1] = piece;
  } else {
    console.log("Can't move there!");
    askMove();
  }
}

//[U3]
function printBoard() {
  //M1: Declare a string variable
  var boardString = "";

  //M2: Take the cells array and add every item in the string variable.
  for (var i = 0; i < cells.length; i++) {
    boardString += "\n";
    for (var j = 0; j < cells.length; j++) {
      boardString += `| ${cells[i][j]} ${j === 2 ? "|" : ""}`;
    }
  }

  //M3: Console.log() the string.
  console.log(boardString);
}

//[U4]
function checkIfWinner() {
  //M1: Check if win conditions matched
  for (var i = 0; i < cells.length; i++) {}
  //M2: If not matched, ask move other player.
  //M3: If matched, print alert
}

function checkIfMovePossible() {
  var draw = true;
  for (var i = 0; i < cells.length; i++) {
    for (var j = 0; j < cells.length; j++) {
      if (cells[i][j] === "-") {
        draw = false;
        return draw;
      }
    }
  }
}

function askMove() {
  var move = prompt("Whats you move? Row and column");
  moveToCell(move);
}

function checkWinRows() {
  var win = false;
  for (var i = 0; i < cells.length; i++) {
    if (
      cells[i][0] === piece &&
      cells[i][1] === cells[i][0] &&
      cells[i][1] === cells[i][2]
    ) {
      win = true;
      console.log(`${piece} is the winner!`);
      return (win = true);
    }
  }
}

function checkWinColumns() {
  var win = false;

  if (cells[0][0] === cells[0][1] && cells[0][2] === cells[0][0]) {
    win = true;
    console.log(`${piece} is the winner!`);
  }
}

function checkWinDiagonals() {
  if (cells[0][0] === piece && cells[1][1] === piece && cells[2][2] === piece) {
    win = true;

    console.log(`${piece} is the winner!`);

    return;
  } else if (
    cells[2][0] === piece &&
    cells[1][1] === piece &&
    cells[0][2] === piece
  ) {
    win = true;
    console.log(`${piece} is the winner!`);

    return;
  }
}

printInitialBoard();
askMove();
checkWinRows();
checkWinColumns();
checkWinDiagonals();
askMove();
