var player1
var player2

console.clear()

var p1target
var p2target

var moves = ['r', 'p', 's']

var isGameOver = false

//--- LOGIC --- 
function isGameFinished() {
    if (p1target === moves[0] && p2target === moves[2] ||
        p1target === moves[1] && p2target === moves[0] ||
        p1target === moves[2] && p2target === moves[1]) {
        isGameOver = true
        icons()
        alert(`${player1}: ${p1target} vs ${p2target} :${player2}
                        ${player1} wins! 🏆`)
        restartGame()
    }
    else if (p2target === p1target) {
        icons()
        alert(` ${player1}: ${p1target} vs ${p2target} :${player2}
            IT IS A DRAW!!!`)
        isGameOver = false
        restartGame()
    }
    else {
        isGameOver = true
        icons()
        alert(` ${player1}: ${p1target} vs ${p2target} :${player2}
                        ${player2} wins! 🏆`)
        restartGame()
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

function restart(res) {
    if (res === 'y' || res === 'yes') {
        isGameOver = false
        startGame()
    }
    else {
        isGameOver = true
        alert('Ciao')
    }
}

function playerMoves() {
    if (!isGameOver) {
        do {
            p1target = prompt(`${player1}, choose your move`).toLowerCase();
            if (!moves.includes(p1target)) alert("Choose correctly, please");
        } while (!moves.includes(p1target));

        do {
            p2target = prompt(`${player2}, choose your move`).toLowerCase();
            if (!moves.includes(p2target)) alert("Choose correctly, please");
        } while (!moves.includes(p2target));

        checkGameStatus()
    }
}

//--- PRESENTATION ---
function startGame() {
    try {
        var info = confirm('You can choose between rock(r), paper(p)and scissors(s)')

        player1 = prompt('Player 1 name') || 'Player 1'
        player2 = prompt('Player 2 name') || 'Player 2'

        gameSet()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

function gameSet() {
    try {
        playerMoves()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

function checkGameStatus() {
    try {
        isGameFinished()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

function restartGame() {
    var res = prompt('Do you want to restart the Game? Please type yes (y) or no (n)')

    try {
        restart(res)
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

startGame()