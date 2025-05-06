/* 
User:
- introduce name
- choose symbol at the beginning (X or O)
- see current game board
- introduce its symbol to the position that he select
- play again

*/

// Maquina:

var player1
var player2
var symbolPlayer1
var symbolPlayer2
var board = [[], [], []]
var position

function askName() {
/*
- ask player one to introduce its name
- save it in a variable
- greet first player
- ask player two to introduce its name 
- save it in a variable
- greet second player
*/
    player1 = prompt('Player 1, please introduce your name:')
    alert(`Hello ${player1}`)
    player2 = prompt('Player 2, plase introduce your name:')
    alert(`Hello ${player2}`)
}

function chooseSymbol() {
/*
- ask player chosen symbol
- check if symbol matches the two initial symbols X or O , if not - ask again to choose only between given options
- convert it to upper case
- save it in a variable
- assign left symbol to player one, save it in a variable
*/
    symbolPlayer1 = prompt(`${player1}, please choose X or O`).toUpperCase()
    if (symbolPlayer1 !== 'X' || symbolPlayer1 !== 'O') {
        alert(`Carefull, you can only choose between 'X' and 'O'`)
        chooseSymbol()
    }
    switch (symbolPlayer1) {
        case 'X':
        symbolPlayer2 = 'O'
        break
        case 'O':
        symbolPlayer2 = 'X'
    }
}

function createBoard() {
/*
- create available positions it variable board (3 positions in each array)
- fill each position with symbol, accessible by player
*/
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < 3; j++) {
        board[i][j]= '_'
        }
    }
}

function showGameBoard() {
/*
- access the variable board
- print the board and show it to the player
*/
return console.table(board)
}

function choosePosition() {
/*
- check all the positions in board, if there's positions left:
- ask the position to the player 
- check the format of player's response. if it matches with positions, proceed. If not, print 'please, introduce coorect position'
- acces the variable board
- if chosen position is available, save the position in a variable
- return true
- if chosen position is unavailable, print 'position unavailable'
- return false
*/
isAvailable = false
for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] === '_')
            isAvailable = true
    }
}

if (isAvailable) {
    var askPosition = prompt(`Please, introduce the position, first row [0, 1, 2], next column [0, 1, 2].
        Ex: 02`)
    if (/\w/) {

    }
}

}

function introduceSymbol() {
/*
- check if the chosen position is available
- if available, set new value to this position (inside board variable) - symbol of current player
- if unavailable, print message 'unavailable position'
*/
}

function checkWinner() {
/*
- set all possible win combinations in the game
- access to the board and check its positions
- if there's a win combination detected, return true
- if no win combinations detected, return false
*/
}

function playAgain() {
/*
- check if game is won and there's no positions available
- ask player if he want to play again
- if answer is positive:
    - set all variables to its initial value
    - start again all the game process
- if answer is negative 
    - return 'goodbye'
*/
}