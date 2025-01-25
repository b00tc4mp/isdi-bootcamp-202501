var player1
var player2

console.clear()

var p1target
var p2target
var moves = ['rock', 'paper', 'scissors']

var isGameOver = false

function winCon() {
    if (p1target === moves[0] && p2target === moves[2] ||
        p1target === moves[1] && p2target === moves[0] ||
        p1target === moves[2] && p2target === moves[1]) {
        isGameOver = true
        icons()
        alert(` ${player1}: ${p1target} vs ${p2target} :${player2}
                        ${player1} wins! 🏆`)
        restartGame()
    }
    else if (p2target === moves[0] && p1target === moves[2] ||
        p2target === moves[1] && p1target === moves[0] ||
        p2target === moves[2] && p1target === moves[1]) {
        isGameOver = true
        icons()
        alert(` ${player1}: ${p1target} vs ${p2target} :${player2}
                        ${player2} wins! 🏆`)
        restartGame()
    }
    else {
        icons()
        alert(` ${player1}: ${p1target} vs ${p2target} :${player2}
            IT IS A DRAW!!!`)
        isGameOver = false
        startGame()
    }
}

function startGame() {
    if (!isGameOver) {
        player1 = prompt('Player 1 name') || 'Player 1'
        player2 = prompt('Player 2 name') || 'Player 2'

        p1target = prompt(`${player1}, choose your move`).toLowerCase()

        if (!moves.includes(p1target)) {
            alert('Choose correctly, please')
            startGame()
        }

        p2target = prompt(`${player2}, choose your move`).toLowerCase()

        if (!moves.includes(p2target)) {
            alert('Choose correctly, please')
            startGame()
        }
        else {
            winCon()
        }
    }
}

function icons() {
    if (p2target === moves[0])
        p2target = '👊 ' + p2target
    else if (p2target === moves[1])
        p2target = '✋ ' + p2target
    else if (p2target === moves[2])
        p2target = '✌️ ' + p2target

    if (p1target === moves[0])
        p1target = p1target + ' 👊'
    else if (p1target === moves[1])
        p1target = p1target + ' ✋'
    else
        p1target = p1target + ' ✌️'
}

function restartGame() {
    var ha = prompt('Restart game? (yes - no)')

    if (ha === 'yes') {
        isGameOver = false
        startGame()
    }
    else {
        isGameOver = true
        alert('Ciao')
    }
}

startGame()