var player1 = ''
var player2 = ''
var gamesPlayed = 0
var gamesWonBy1 = 0
var gamesWonBy2 = 0

function startGame() {
    numberOfGames = prompt('How many games do you wanna play?')

    if (numberOfGames === null) {
        console.log('The play was cancelled')
        return null
    }

    console.log(`You will play ${numberOfGames} games`)
}

function askPlayer1() {
    player1 = prompt('Options: \n 1. Rock \n 2. Paper \n 3. Scissors \n Player 1 please choose an option.')

    if (player1 === null) {
        console.log('The play was cancelled')
        return null
    }

    if (player1 !== '1' && player1 !== '2' && player1 !== '3' && player1 !== null) {
        return askPlayer1()
    }
}

function askPlayer2() {
    player2 = prompt('Options: \n 1. Rock \n 2. Paper \n 3. Scissors \n Player 2 please choose an option')

    if (player2 === null) {
        console.log('The play was cancelled')
        return null
    }

    if (player2 !== '1' && player2 !== '2' && player2 !== '3' && player2 !== null) {
        return askPlayer2()
    }
}

function winOrLose() {
    if (player1 === player2) {
        gamesPlayed++
        console.log(`Game n ${gamesPlayed} - Draw.`)

    }

    if (player1 === '1' && player2 === '3') {
        gamesPlayed++
        gamesWonBy1++
        console.log(`Game n ${gamesPlayed} - Player 1 wins.`)
    }

    if (player2 === '1' && player1 === '3') {
        gamesPlayed++
        gamesWonBy2++
        console.log(`Game n ${gamesPlayed} - Player 2 wins.`)
    }

    if (player1 === '2' && player2 === '1') {
        gamesPlayed++
        gamesWonBy1++
        console.log(`Game n ${gamesPlayed} - Player 1 wins.`)
    }

    if (player2 === '2' && player1 === '1') {
        gamesPlayed++
        gamesWonBy2++
        console.log(`Game n ${gamesPlayed} - Player 2 wins.`)
    }

    if (player1 === '3' && player2 === '2') {
        gamesPlayed++
        gamesWonBy1++
        console.log(`Game n ${gamesPlayed} - Player 1 wins.`)
    }

    if (player2 === '3' && player1 === '2') {
        gamesPlayed++
        gamesWonBy2++
        console.log(`Game n ${gamesPlayed} - Player 2 wins.`)
    }
}

do {
    while (gamesPlayed === 0) {
        startGame()
        break
    }
    askPlayer1()
    askPlayer2()
    winOrLose()
} while (gamesPlayed < numberOfGames)

if (gamesWonBy1 > gamesWonBy2) {
    console.log(`Player 1 WON`)
} else if (gamesWonBy2 > gamesWonBy1) {
    console.log(`Player 2 WON`)
} else {
    console.log(`Draw`)
}