console.clear()

var gameboard = [['  ', '  ', '  '], ['  ', '  ', '  '], ['  ', '  ', '  ']]
var playsPlayed = 0

function selectPlayer() {
    if (playsPlayed % 2 === 0) {
        return 1
    } else {
        return 2
    }
}

function makeAMove() { // recibe el jugador y juega con su corresponiente letra? 
    var currentPlayer = selectPlayer()
    var playerMove = prompt(`tirate una jugador ${currentPlayer}\n` + printTwoLevelsArray(gameboard)).toLowerCase()
    if (!isCorrectInput(playerMove)) {
        alert('El formato para realizar una tirada es letra + numero\nPor ejemplo: b2')
        makeAMove()
    }
    var correctFormatMove = convertToPosition(playerMove)
    var row = correctFormatMove[0]
    var column = correctFormatMove[1]
    var symbol = chooseSymbolForPlayer(currentPlayer)
    
    if (gameboard[row][column] === '  ') {
        gameboard[row][column] = symbol
        playsPlayed ++
    } else {
        alert('Prueba mejor a tirar en una casilla que esté vacía ;)')
    }
    alert(printTwoLevelsArray(gameboard))
    
    if (isThisAWin(gameboard, symbol)) {
        alert(`¡Genial, jugador ${currentPlayer}!\n¡HAS GANADO!`)
        if (confirm('¿Echamos otra partidita?')){
            resetGame()
        }
    } else {
        makeAMove()
    }
}

function chooseSymbolForPlayer(player) {
    var symbol
    player === 1 ? symbol = 'X' : player === 2 ? symbol = 'O' : symbol = 'player number error'
    return symbol
}

function isThisAWin(array, symbol) {
    var winCombinations =
        array[0][0] === symbol && array[0][1] === symbol && array[0][2] === symbol ||  // 00 01 01
        array[0][0] === symbol && array[1][0] === symbol && array[2][0] === symbol ||  // 00 10 20
        array[2][0] === symbol && array[2][1] === symbol && array[2][2] === symbol ||  // 20 21 22
        array[0][2] === symbol && array[1][2] === symbol && array[2][2] === symbol ||  // 02 12 22
        array[0][1] === symbol && array[1][1] === symbol && array[2][1] === symbol ||  // 01 11 21
        array[1][0] === symbol && array[1][1] === symbol && array[1][2] === symbol ||  // 10 11 12
        array[0][0] === symbol && array[1][1] === symbol && array[2][2] === symbol ||  // 00 11 22
        array[0][2] === symbol && array[1][1] === symbol && array[2][0] === symbol     // 02 11 20
    if (winCombinations) {
        return true
    } else {
        return false
    }
}

function convertToPosition (move) {
    var firstPosition
    var secondPosition

    switch (move[0]) {
        case 'a':
            firstPosition = 0
            break
        case 'b':
            firstPosition = 1
            break
        case 'c':
            firstPosition = 2
            break
        default:
            alert('Elige una tirada valida')
    }

    switch (move[1]) {
        case '1':
            secondPosition = 0
            break
        case '2':
            secondPosition = 1
            break
        case '3':
            secondPosition = 2
            break
        default:
            alert('Elige una tirada valida')
    }
    return [firstPosition, secondPosition]

}

function printTwoLevelsArray(arr) {
    var arrString = ''
    for (var i = 0; i < arr.length; i++) {
        arrString += '|'
        for (var j = 0; j < arr.length; j++) {
            arrString += ' ' + arr[i][j] + ' |'
        }
        arrString += '\n'
    }
    return arrString
}

function resetGame() {
    gameboard = [['  ', '  ', '  '], ['  ', '  ', '  '], ['  ', '  ', '  ']]
    playsPlayed = 0
    makeAMove()
}

function isCorrectInput(input) {
    var regex = /^[a-c][1-3]$/
    if (regex.test(input)){
        return true
    } else {
        return false
    }
}

makeAMove()