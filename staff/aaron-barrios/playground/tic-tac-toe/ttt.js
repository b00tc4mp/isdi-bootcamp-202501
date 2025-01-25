var player1 = prompt('Player 1 name') || 'Player 1'
var player2 = prompt('Player 2 name') || 'Player 2'

console.clear()

var board = [['', '', ''], ['', '', ''], ['', '', '']]

var letterPos = ''
var numberPos = 0

var currentPlayer = true

function playerTurn() {
    currentPlayer = !currentPlayer
    //APLICAR CAMBIO DE NOMBRE
}

function printBoard() {
    console.log(stringBoardArray(board))
}

function askPosition() {
    var playerName = currentPlayer ? player1 : player2
    var target = prompt(`${playerName}, choose your move`)
    var position = choosePosition(target)

    if (position) {
        var row = choosePosition(target)[0]
        var column = choosePosition(target)[1]
        var symbol = currentPlayer ? 'X' : 'O'

        if (board[row][column] === '') {
            board[row][column] = symbol
            printBoard()

            if (checkWinner(symbol)) {
                alert(`Player ${playerName} wins! 🏆`)
                restartGame()
                return
            }

            if (checkDraw()) {
                alert('It is a draw! 🤝')
                restartGame()
                return
            }

            playerTurn()
            askPosition()
        } else {
            alert('Invalid position. Try again')
            askPosition()
        }
    }
}

function choosePosition(pos) {
    if (!pos || pos.length !== 2) {
        alert('Invalid input. Use format : a0, b1, c2')
        askPosition()
        return null
    }

    switch (pos[0].toLowerCase()) {
        case 'a':
            letterPos = 0
            break;
        case 'b':
            letterPos = 1
            break;
        case 'c':
            letterPos = 2
            break;
        default:
            alert('Choose proper character')
            askPosition()
    }

    switch (pos[1]) {
        case '0':
            numberPos = 0
            break;
        case '1':
            numberPos = 1
            break;
        case '2':
            numberPos = 2
            break;
        default:
            alert('Choose proper number')
            askPosition()
    }

    return [letterPos, numberPos]
}


function stringBoardArray(arr) {
    let arrString = ''

    for (let i = 0; i < arr.length; i++) {
        arrString += '|'
        for (let j = 0; j < arr[i].length; j++) {
            arrString += ` ${arr[i][j] || ' '} |`
        }
        arrString += '\n'
    }
    return arrString
}

function checkWinner(symbol) {
    for (let i = 0; i < 3; i++) {
        //row
        if (board[i][0] === symbol && board[i][1] === symbol && board[i][2] === symbol) return true
        //column
        if (board[0][i] === symbol && board[1][i] === symbol && board[2][i] === symbol) return true
    }
    //diagonals
    if (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) return true
    if (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol) return true

    return false
}

function checkDraw() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === '')
                return false;
        }
    }
    return true
}

function restartGame() {
    var player1 = prompt('Player 1 name') || 'Player 1'
    var player2 = prompt('Player 2 name') || 'Player 2'

    board = [['', '', ''], ['', '', ''], ['', '', '']]
    currentPlayer = true
    printBoard();
    askPosition()
}

printBoard()
askPosition()