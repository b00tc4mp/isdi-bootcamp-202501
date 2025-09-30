const data = {
    gameWonBy1: '1',
    gameWonBy2: '2',
    numberOfGamesWonBy1: 0,
    numberOfGamesWonBy2: 0,
    gameDraw: '0',
    playFigure1: '',
    playFigure2: '',
    roundsNumber: 0,
    winner: '0',
    rounds: []
}

const logic = {
    helper: {
        gameOver() {
            data.rounds.length === roundsNumber && (data.winner === '1' || data.winner === '2' || data.winner === '0')
        }
    },
    randomRPS() {
        data.playFigure2 = Math.floor(Math.random() * (3 - 1 + 1)) + 1
    },
    roundsNumber(number) {
        data.roundsNumber = number
    },
    winOrLose(playFigure1, playFigure2) {
        if (typeof numberOfGames !== 'number') throw new Error('is not a number')

        if (playFigure1 === playFigure2) {
            data.rounds.push(data.gameDraw)
        }

        if (playFigure1 === '1' && playFigure2 === '3') {
            data.rounds.push(data.gameWonBy1)
        }

        if (playFigure2 === '1' && playFigure1 === '3') {
            data.rounds.push(data.gameWonBy2)
        }

        if (playFigure1 === '2' && playFigure2 === '1') {
            data.rounds.push(data.gameWonBy1)
        }

        if (playFigure2 === '2' && playFigure1 === '1') {
            data.rounds.push(data.gameWonBy2)
        }

        if (playFigure1 === '3' && playFigure2 === '2') {
            data.rounds.push(data.gameWonBy1)
        }

        if (playFigure2 === '3' && playFigure1 === '2') {
            data.rounds.push(data.gameWonBy2)
        }
    },
    getStatus() {
        const { roundsNumber, winner, rounds } = data
        if (rounds.length === roundsNumber && numberOfGamesWonBy1 > numberOfGamesWonBy2) {
            data.winner = '1'
        } else if (rounds.length === roundsNumber && numberOfGamesWonBy2 > numberOfGamesWonBy1) {
            data.winner = '2'
        }

        return {
            roundsNumber,
            winner,
            rounds
        }
    },
    restartGame() {
        gameWonBy1 = '1',
            gameWonBy2 = '2',
            gameDraw = '0',
            playFigure1 = '',
            playFigure2 = '',
            roundsNumber = 0,
            winner = '',
            rounds = []
    }
}


do {
    while (gamesPlayed === 0) {
        startGame()
        break
    }
    askplayFigure1()
    askplayFigure2()
    winOrLose()
} while (gamesPlayed < numberOfGames)

if (gamesWonBy1 > gamesWonBy2) {
    console.log(`Player 1 WON`)
} else if (gamesWonBy2 > gamesWonBy1) {
    console.log(`Player 2 WON`)
} else {
    console.log(`Draw`)
}