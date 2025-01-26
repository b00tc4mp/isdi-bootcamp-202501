console.clear();
var gameIsFinished = false;
var isDraw = false;

var player1Name = "";
var player2Name = "";

var optionsArr = ["scissors", "paper", "rock"];
var move = [];
var player1Turn = true;

var playAgain = true;

function askNames() {
  player1Name = prompt("What's he name of the player 1?");
  player2Name = prompt("What's the name of the player 2");
}

function askMove() {
  if (player1Turn === true) {
    move[0] = prompt(`What will you do ${player1Name}?`);
    if (move[0] !== "scissors" && move[0] !== "rock" && move[0] !== "paper") {
      askMove();
    } else {
      player1Turn = !player1Turn;
    }
  } else {
    move[1] = prompt(`What will you do ${player2Name}?`);
    if (move[1] !== "scissors" && move[1] !== "rock" && move[1] !== "paper") {
      askMove();
    } else {
      player1Turn = !player1Turn;
    }
  }
}

function checkIfWin() {
  if (
    (move[0] === optionsArr[0] && move[1] === optionsArr[1]) ||
    move[1] === optionsArr[2] ||
    (move[0] === optionsArr[2] && move[1] === optionsArr[0])
  ) {
    playAgain = prompt(
      `${player1Name} wins! Want to play again? Type yes or no`
    );
    while (playAgain !== "yes" && playAgain !== "no") {
      playAgain = prompt("Want to play again? yes or no");
    }
    if (playAgain === "no") {
      alert("See you soon!");
      gameIsFinished = true;
    } else {
      askNames();
    }
  } else if (move[0] === move[1]) {
    alert("It's a draw!");
  } else {
    playAgain = prompt(
      `${player2Name} wins! Want to play again? Type yes or no`
    );
    while (playAgain !== "yes" && playAgain !== "no") {
      playAgain = prompt("Want to play again? yes or no");
    }
    if (playAgain === "no") {
      alert("See you soon!");
      gameIsFinished = true;
    } else {
      askNames();
    }
  }
}

askNames();
while (!gameIsFinished) {
  askMove();
  askMove();
  checkIfWin();
}
