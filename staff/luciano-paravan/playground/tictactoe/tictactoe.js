/*
var cells = []

var maxCells = 9

for (var i = 0; i < maxCells; i++)
    cells[i] = '-'

console.log(cells)
*/


// or

// Crear el tablero de tic tac toe en funcion de 1 array con 3 arrays anidados dentro(filas)
// Vamos a solicitar la posicion (x,y) donde usuario 1 y usuario 2 desean poner X o O
// Crear 
// Chequear todas las filas para ver si son iguales los indices, chequear todas las columnas, chequear las dos diagonales


var askPosition = ''
var positionRow = 0
var positionColumn = 0
var cells = [[], [], []]

var askPlayer = ''
var winner1 = false
var winner2 = false
var draw = false

var maxRows = 3
var maxColumns = 3

var player = 'x'
var someoneWin = false



function printZeroBoard () {
    var cellsString = ''
    
    for (var i = 0; i < maxRows; i++) {
        for (var j = 0; j < maxColumns; j++) {
            cells[i][j] = '-'
            cellsString += cells[i][j] + ' '
        }
        cellsString += '\n'
    }
    console.log(cellsString)
    
}

function printBoard () {
    var cellsString = ''

    for (var i = 0; i < maxRows; i++) {
        for (var j = 0; j < maxColumns; j++) {
            cellsString += cells[i][j] + ' '
        }
        cellsString += '\n'
    }
    console.log(cells)
    console.log(cellsString)
}

function positionXY () {
    askPosition = prompt('Hi Player ' + player + '. Mark the position (x,y) of your move \n x: row, y: column e.g. 0,1 ')
    
    positionRow = Number(askPosition[0])
    positionColumn = Number(askPosition[2])

    if (askPosition === null) {
        console.log('The play was cancelled')
        return null
    }
}

function move () {
    if (cells[positionRow][positionColumn] !== '-') {
        console.log('The position is already taken.')
        return positionXY()
    }

    cells[positionRow][positionColumn] = player

    if (player === 'x') {
        player = 'o'
    } else {
        player = 'x'
    }
    
    //console.log(cells)
}

function winOrLose () {
    
    for (var i = 0; i < maxRows; i++) {
        if (cells[i][0] === 'x' && cells[i][1] === 'x' && cells[i][2] === 'x') {
            winner1 = true
            }
        if (cells[i][0] === 'o' && cells[i][1] === 'o' && cells[i][2] === 'o') {
            winner2 = true
        }
    }

    for (var j = 0; j < maxColumns; j++) {
        if (cells[0][j] === 'x' && cells[1][j] === 'x' && cells[2][j] === 'x') {
            winner1 = true
        }
        if (cells[0][j] === 'o' && cells[1][j] === 'o' && cells[2][j] === 'o') {
            winner2 = true
        }
    }

    if (cells[0][0] === 'x' && cells[1][1] === 'x' & cells[2][2] === 'x') {
        winner1 = true
    }

    if (cells[0][0] === 'o' && cells[1][1] === 'o' & cells[2][2] === 'o') {
        winner2 = true
    }

    if (cells[2][0] === 'x' && cells[1][1] === 'x' && cells[2][0] === 'x') {
        winner1 = true
    }
    
    if (cells[2][0] === 'o' && cells[1][1] === 'o' && cells[2][0] === 'o') {
        winner2 = true
    }

    if (winner1 === true || winner2 === true) {
        someoneWin = true
        return someoneWin
    }
    
}

function keepPlaying () {
    for (var i = 0; i < maxRows; i++) {
        for (var j = 0; j < maxColumns; j++) {
            if (cells[i][j] === '-') {
                console.log('Keep playing')
                return
            }          
        }
    }
}

printZeroBoard()


while (!winOrLose()) {
    positionXY()
    move()
    printBoard()
    winOrLose()
    
    if (someoneWin === false) {
        keepPlaying()
    }
    
    if (winner1 === true) {
        console.log('Player 1 won. Congrats!')
    } else if (winner2 === true) {
        console.log('Player 2 won. Congrats!')
    }
    
}




