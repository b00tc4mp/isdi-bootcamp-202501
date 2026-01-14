const logic = {
    constant: {
        moves: ['r', 'p', 's']
    },
    helper: {
        playerWon() {
            return data.playerWins === 3 && data.cpuWins === 0 || data.playerWins === 2 && data.cpuWins === 1
        },
        cpuWon() {
            return data.playerWins === 0 && data.cpuWins === 3 || data.playerWins === 1 && data.cpuWins === 2
        },
        isGameOver() {
            return this.playerWon() || this.cpuWon()
        }
    },

    cpuElection() {
        randomIndex = Math.floor(Math.random() * logic.constant.moves.length)
        data.cpuInput = logic.constant.moves[randomIndex]
    },

    checkPlayerMove(playerMove) {
        if (this.helper.isGameOver()) throw new Error('game Over')
        if (typeof playerMove !== 'string') throw new SyntaxErrorError('invalid syntax')
        if (playerMove !== "r" && playerMove !== "s" && playerMove !== "s") throw new Error('please choose wisely')
    },

    playerMove(playerMove) {
        data.playerInput = playerMove

        if (data.playerInput === logic.constant.moves[0] && data.cpuInput === logic.constant.moves[2] ||
            data.playerInput === logic.constant.moves[1] && data.cpuInput === logic.constant.moves[0] ||
            data.playerInput === logic.constant.moves[2] && data.cpuInput === moves[1]) {
            data.playerWins++
            alert('PLAYER wins! 🏆')
        }
        else if (data.cpuInput === data.playerInput) {
            alert('IT IS A DRAW!!!')
        }
        else {
            data.cpuWins++
            alert(' CPU wins! 🏆')
        }
    },

    icons() {
        if (data.playerInput === moves[0])
            data.playerInput = data.playerInput + ' 👊'
        else if (data.playerInput === moves[1])
            data.playerInput = data.playerInput + ' ✋'
        else
            data.playerInput = data.playerInput + ' ✌️'
    },

    restart(res) {
        if (res === 'y' || res === 'yes') {
            startGame()
        }
        else {
            alert('Ciao')
        }
    },

    playerMoves() {
        if (!isGameOver) {
            do {
                data.playerInput = prompt(`${player1}, choose your move`).toLowerCase();
                if (!moves.includes(data.playerInput)) alert("Choose correctly, please");
            } while (!moves.includes(data.playerInput));

            do {
                data.cpuInput = prompt(`${player2}, choose your move`).toLowerCase();
                if (!moves.includes(data.cpuInput)) alert("Choose correctly, please");
            } while (!moves.includes(data.cpuInput));

            checkGameStatus()
        }
    },


    gameStatus() {
        const { cpuWins, playerWins } = data

        return {
            cpuWins,
            playerWins,
            playerWon: this.helper.playerWon(),
            cpuWon: this.helper.cpuWon(),
            gameOver: this.helper.isGameOver()
        }
    },

    restartGame() {
        player = ''

        playerInput = ''
        cpuInput = ''

        cpuWins = 0
        playerWins = 0
    }
}
