const logic = {
    isGameOver() {
        if (data.rounds.length >= data.roundsNumber) {
            logic.getWinner()
            return true
        }

        return false
    },
    randomRPS() {
        data.playFigure2 = Math.floor(Math.random() * (3 - 1 + 1)) + 1
    },
    roundsNumber(number) {
        data.roundsNumber = Number(number)
    },
    setChoice(numberPlayed, turn) {
        if (turn === true) {
            data.player1Choice = numberPlayed
        } else if (turn === false) {
            data.player2Choice = numberPlayed
        }
    },
    setRoundWinner() {
        //if (typeof numberOfGames !== 'number') throw new Error('is not a number')

        if (data.rounds.length >= data.roundsNumber) throw new Error('game over bro')

        if (data.player1Choice === data.player2Choice) {
            data.rounds.push(data.gameDraw)
            data.gamesDraw++
        }

        if (data.player1Choice === '1' && data.player2Choice === '3') {
            data.rounds.push(data.gameWonBy1)
            data.numberOfGamesWonBy1++
        }

        if (data.player2Choice === '1' && data.player1Choice === '3') {
            data.rounds.push(data.gameWonBy2)
            data.numberOfGamesWonBy2++
        }

        if (data.player1Choice === '2' && data.player2Choice === '1') {
            data.rounds.push(data.gameWonBy1)
            data.numberOfGamesWonBy1++
        }

        if (data.player2Choice === '2' && data.player1Choice === '1') {
            data.rounds.push(data.gameWonBy2)
            data.numberOfGamesWonBy2++
        }

        if (data.player1Choice === '3' && data.player2Choice === '2') {
            data.rounds.push(data.gameWonBy1)
            data.numberOfGamesWonBy1++
        }

        if (data.player2Choice === '3' && data.player1Choice === '2') {
            data.rounds.push(data.gameWonBy2)
            data.numberOfGamesWonBy2++
        }
    },
    getStatus() {
        //const gameOver = this.isGameOver()
        const { roundsNumber, winner, rounds, numberOfGamesWonBy1, numberOfGamesWonBy2 } = data

        return {
            gameOver: this.isGameOver(),
            roundsNumber,
            winner,
            rounds,
            numberOfGamesWonBy1,
            numberOfGamesWonBy2
        }
    },
    getWinner() {
        if (data.rounds.length === data.roundsNumber) {
            if (data.numberOfGamesWonBy1 > data.numberOfGamesWonBy2) {
                data.winner = '1'
            } else if (data.numberOfGamesWonBy2 > data.numberOfGamesWonBy1) {
                data.winner = '2'
            } else {
                data.winner = '0'
            }
        }
    },
    restartGame() {
        data.gameWonBy1 = '1',
            data.gameWonBy2 = '2',
            data.numberOfGamesWonBy1 = 0,
            data.numberOfGamesWonBy2 = 0,
            data.gameDraw = '0',
            data.player1Choice = '',
            data.player2Choice = '',
            data.roundsNumber = 0,
            data.winner = '',
            data.rounds = []
    }
}