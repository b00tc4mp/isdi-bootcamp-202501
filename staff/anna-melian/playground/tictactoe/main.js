console.clear()

var cells = [[], [], []]
var maxRows = 3
var maxColumns = 3
var playerName1 = ''
var playerName2 = ''
var movePlayer1 = ''
var movePlayer2 = ''
var symbolPlayer1 = ''
var symbolPlayer2 = ''
var validMovePlayer1 = false
var validMovePlayer2 = false
var emptyCells = 9
var winnerPlayer1 = false
var winnerPlayer2 = false
var someoneWin = false


function askingName() {
    playerName1 = prompt('Player 1, enter your name: ') 
    playerName2 = prompt('Player 2, enter your name: ') 

}

function choosingSymbol() {
    symbolPlayer1 = prompt( playerName1 + ' choose your symbol: X or O. Has to be in uppercase')
    while (symbolPlayer1 != 'X' && symbolPlayer1 != 'O' ) {
        console.log('This answer is not valid. The options are X or O. Has to be in uppercase')
        choosingSymbol()
    }
    if (symbolPlayer1 === 'X') {
        symbolPlayer2 = 'O'
        console.log( playerName1 + ' is X.')
        console.log( playerName2 + ' is O.')
    }
    else {
        symbolPlayer2 = 'X'
        console.log( playerName1 + ' is O.')
        console.log( playerName2 + ' is X.')
    }
}

function emptyBoard() {
    for (var i = 0; i < maxRows; i++) {
        for (var j = 0; j < maxColumns; j++) {
            cells[i][j] = '-'
    }
}
    console.log(cells)
}

function askMovePlayer1() {
    movePlayer1 = prompt( playerName1 + ' choose a cell. Has to be in this format: row,column')
    checkValidMovePlayer1()
}


function checkValidMovePlayer1() {
    validMovePlayer1 = false
    if (
        (Number(movePlayer1[0]) <= maxRows && Number(movePlayer1[0]) != 0 ) &&
        (Number(movePlayer1[2]) <= maxRows && Number(movePlayer1[2]) != 0 )
    ){
        validMovePlayer1 = true
    }
    while (validMovePlayer1 === false) {
        askMovePlayer1()
    }
}

function askMovePlayer2() {
    movePlayer2 = prompt( playerName2 + ' choose a cell. Has to be in this format: row,column')
    checkValidMovePlayer2()
}


function checkValidMovePlayer2() {
    validMovePlayer2 = false
    if (
        (Number(movePlayer2[0]) <= maxRows && Number(movePlayer2[0]) != 0 ) &&
        (Number(movePlayer2[2]) <= maxRows && Number(movePlayer2[2]) != 0 )
    ){
        validMovePlayer2 = true
    }
    while (validMovePlayer2 === false) {
        askMovePlayer2()
    }
}

function validCellPlayer1() {
    if (
        (cells[Number(movePlayer1[0])-1][Number(movePlayer1[2])-1] === symbolPlayer1) ||
        (cells[Number(movePlayer1[0])-1][Number(movePlayer1[2])-1] === symbolPlayer2) 
    ){
        console.log('This cell is not available.')
        askMovePlayer1()
        validCellPlayer1()
    }
    else {
        cells[Number(movePlayer1[0])-1][Number(movePlayer1[2])-1] = symbolPlayer1
        console.log(cells)
        emptyCells--
        winOrLose()
    }
}


function validCellPlayer2() {
    if (
        (cells[Number(movePlayer2[0])-1][Number(movePlayer2[2])-1] === symbolPlayer1) ||
        (cells[Number(movePlayer2[0])-1][Number(movePlayer2[2])-1] === symbolPlayer2) 
    ){
        console.log('This cell is not available.')
        askMovePlayer2()
        validCellPlayer2()
    }
    else {
        cells[Number(movePlayer2[0])-1][Number(movePlayer2[2])-1] = symbolPlayer2
        console.log(cells)
        emptyCells--
        winOrLose()
    }
}


function winOrLose () {
    someoneWin = false
    winnerPlayer1 = false
    winnerPlayer2 = false
    
    for (var i = 0; i < maxRows; i++) {
        if (cells[i][0] === symbolPlayer1 && cells[i][1] === symbolPlayer1 && cells[i][2] === symbolPlayer1) {
            winnerPlayer1 = true
            }
        if (cells[i][0] === symbolPlayer2 && cells[i][1] === symbolPlayer2 && cells[i][2] === symbolPlayer2) {
            winnerPlayer2 = true
        }
    }

    for (var j = 0; j < maxColumns; j++) {
        if (cells[0][j] === symbolPlayer1 && cells[1][j] === symbolPlayer1 && cells[2][j] === symbolPlayer1) {
            winnerPlayer1 = true
        }
        if (cells[0][j] === symbolPlayer2 && cells[1][j] === symbolPlayer2 && cells[2][j] === symbolPlayer2) {
            winnerPlayer2 = true
        }
    }

    if (cells[0][0] === symbolPlayer1 && cells[1][1] === symbolPlayer1 & cells[2][2] === symbolPlayer1) {
        winnerPlayer1 = true
    }

    if (cells[0][0] === symbolPlayer2 && cells[1][1] === symbolPlayer2 & cells[2][2] === symbolPlayer2) {
        winnerPlayer2 = true
    }

    if (cells[2][0] === symbolPlayer1 && cells[1][1] === symbolPlayer1 && cells[2][0] === symbolPlayer1) {
        winnerPlayer1 = true
    }
    
    if (cells[2][0] === symbolPlayer2 && cells[1][1] === symbolPlayer2 && cells[2][0] === symbolPlayer2) {
        winnerPlayer2 = true
    }

    if (winnerPlayer1 === true || winnerPlayer2 === true) {
        someoneWin = true
        return someoneWin
    }
    
}

function play() {
    while (emptyCells != 0 && someoneWin != true) {
            askMovePlayer1()
            validCellPlayer1()
            if (winnerPlayer1 != true) {
                askMovePlayer2()
                validCellPlayer2()
                if (winnerPlayer2) {
                    console.log(playerName2 + ' has ganado')
                }
            }
        else {
            console.log(playerName1 + ' has ganado')
        }
          
        }
        
    if (emptyCells === 0) {
        console.log('Draw')
    }
}



console.log('...')
askingName()
choosingSymbol()
emptyBoard()