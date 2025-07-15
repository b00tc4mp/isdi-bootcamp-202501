const logic = {
    validate: {
        isValidPlay(play) {
            if (!(play === 'rock' || play === 'paper' || play === 'scissors')) throw new SyntaxError('play is not valid')
        },

        isPositiveNumber(number) {
            if (typeof number !== 'number' || number < 1) throw new TypeError('input is not a positive number')
        },

        hasRoundsLeft() {
            if (!(data.playedRounds < data.totalRounds)) throw new Error('game already finished')
        }
    },

    helper: {
        handleError(error) {
            console.error(error)
            alert(error.message)
        },

        getPlayImage(play) {
            return `./assets/player.png`
        }
    },

    setRounds(number) {
        this.validate.isPositiveNumber(number)

        data.totalRounds = number
    },

    generateComputerPlay() {
        var randomNumber = Math.floor(Math.random() * 3)

        var computerPlay = randomNumber === 0 ? 'rock' : randomNumber === 1 ? 'paper' : 'scissors'

        data.computerPlay = computerPlay

        return computerPlay
    },

    setPlayerPlay(playerPlay) {
        this.validate.isValidPlay(playerPlay)

        data.userPlay = playerPlay
    },

    setRoundWinner() {
        const player = data.userPlay
        const computer = data.computerPlay
        let currentRoundWinner

        if (player === computer) {
            currentRoundWinner = 'draw'
        }

        else if (player === 'rock' && computer === 'paper' ||
            player === 'paper' && computer === 'scissors' ||
            player === 'scissors' && computer === 'rock') {
            currentRoundWinner = 'computer'
        }

        else if (player === 'rock' && computer === 'scissors' ||
            player === 'paper' && computer === 'rock' ||
            player === 'scissors' && computer === 'paper') {
            currentRoundWinner = 'player'
        }
        data.currentRoundWinner = currentRoundWinner
        return currentRoundWinner
    },

    increaseWinningCount() {
        var winner = data.currentRoundWinner
        data.playedRounds++

        switch (winner) {
            case 'computer':
                data.gamesWonComputer++
                break
            case 'player':
                data.gamesWonPlayer++
                break
            case 'draw':
                data.gamesDrawn++
                break
        }
        return { gamesWonComputer: data.gamesWonComputer, gamesWonPlayer: data.gamesWonPlayer, gamesDrawn: data.gamesDrawn, playedRounds: data.playedRounds }
    },

    selectWinnerRoundSentence(roundWinner) {
        switch (roundWinner) {
            case 'computer': return 'Computer wins this round. Don\'t give up, try again!!'

            case 'player': return 'Congratulations, you won! You got lucky this time!!'

            case 'draw': return 'It\'s a tie! You both chose the same!!'
        }
    },

    getStatus() {
        return {
            computerPlay: data.computerPlay,
            userPlay: data.userPlay,
            gamesWonComputer: data.gamesWonComputer,
            gamesWonPlayer: data.gamesWonPlayer,
            gamesDrawn: data.gamesDrawn,
            totalRounds: data.totalRounds,
            playedRounds: data.playedRounds,
            currentRoundWinner: data.currentRoundWinner
        }
    },

    getOverallWinner() {
        data.overallWinner = 'pito'
        if (data.gamesWonComputer > data.gamesWonPlayer)
            return 'computer'
        else if (data.gamesWonComputer < data.gamesWonPlayer)
            return 'player'
        else
            return 'draw'

    },

    setWinnerOverallSentence(overallWinner) {
        switch (overallWinner) {
            case 'computer': return 'Final winner: Computer'

            case 'player': return 'Final winner: Player'

            case 'draw': return 'Final result: Draw'
        }
    },
}











/*
convertCharacterToNumber(playerOption) { // TODO delete   lleva letra a numero
switch (playerOption) {
    case 'r': return 0
    case 'p': return 1
    case 's': return 2
    }
    },
    
    generateComputerOption() { //esta en tijeras para probar  // genera un numero y llama a otra funcion para obtener una jugada
    var randomNumber = Math.floor(Math.random() * 3)
    data.computerPlay = 'scissors' //data.possiblePlays[randomNumber]
    },
    
    setUserPlay(playerNumber) {  //
    this.helper.validateInputIsNotEmpty(playerOption)
    
            data.userPlay = data.possiblePlays[playerNumber]
        },
    
        getRoundWinner() { // coge de data las jugadas que son strings y retorna un string
            var player = data.userPlay
            var computer = data.computerPlay
    
            if (player === computer) {
                return 'draw'
            }
    
            else if (player === 'rock' && computer === 'paper' ||
                player === 'paper' && computer === 'scissors' ||
                player === 'scissors' && computer === 'rock') {
                return 'computer'
            }
    
            else if (player === 'rock' && computer === 'scissors' ||
                player === 'paper' && computer === 'rock' ||
                player === 'scissors' && computer === 'paper') {
                return 'player'
            }
        },
    
        increaseWinningCount() {
            var winner = logic.getRoundWinner()
            data.playedRounds++
    
            switch (winner) {
                case 'computer':
                    data.gamesWonComputer++
                    break
                case 'player':
                    data.gamesWonPlayer++
                    break
                case 'draw':
                    data.gamesDrawn++
                    break
            }
        },
    
        getOverallWinner() {
            if (data.gamesWonComputer > data.gamesWonPlayer)
                return 'computer'
            else if (data.gamesWonComputer < data.gamesWonPlayer)
                return 'player'
            else
                return 'draw'
        },
    
        selectWinnerSentence(roundWinner) {
            switch (roundWinner) {
                case 'computer': return 'Computer wins this round. Don\'t give up, try again!!'
    
                case 'player': return 'Congratulations, you won! You got lucky this time!!'
    
                case 'draw': return 'It\'s a tie! You both chose the same!!'
            }
        },
    
        selectWinnerDeclare(winner, word) { //final o round
            switch (winner) {
                case 'computer': return `${word} winner: Computer ${logic.getResultEmoji(winner)}`
    
                case 'player': return `${word} winner: Player ${logic.getResultEmoji(winner)}`
    
                case 'draw': return `${word} result: Draw ${logic.getResultEmoji(winner)}`
            }
        },
    
        getOverallResults() {
            return `Your wins: ${data.gamesWonPlayer}\nComputer wins: ${data.gamesWonComputer}\nDraws: ${data.gamesDrawn}`
        },
    
        getBothPlays() {
            var userPlay = data.userPlay
            var computerPlay = data.computerPlay
            return `Your play: ${userPlay} ${logic.getPlayEmoji(userPlay)}\nComputer play: ${computerPlay} ${logic.getPlayEmoji(computerPlay)}`
        },
    
        getResultEmoji(result) {
            switch (result) {
                case 'computer': return '💻'
    
                case 'player': return '😁'
    
                case 'draw': return '✖️'
            }
        },
    
        getPlayEmoji(play) {
            switch (play) {
                case 'rock': return '👊'
    
                case 'paper': return '🤚'
    
                case 'scissors': return '✌️'
            }
        },
        restartGame() {
            data.computerPlay = ''
            data.userPlay = ''
            data.gamesWonComputer = 0
            data.gamesWonPlayer = 0
            data.gamesDrawn = 0
            data.playedRounds = 0
        }
    }
    
    
    
    
    var interface = {
        helpers: {
            promptToLowerCase() {
                var playerOption = prompt('r for rock, p for paper and s for scissors')
                logic.helper.validateInputIsNotEmpty(playerOption)
                logic.helper.validateInputIsRPS(playerOption)
                playerOption = playerOption.toLowerCase()
                return playerOption
            }
        },
    
        introducePlayerOption() {
            try {
                var playerOption = interface.helpers.promptToLowerCase()
                var numberPlayerOption = logic.convertCharacterToNumber(playerOption)
                logic.setUserPlay(numberPlayerOption)
            } catch (error) {
                console.log(error)
                alert(error.message)
                interface.introducePlayerOption()
            }
        },
    
        startGame() {
            logic.generateComputerOption()
            interface.introducePlayerOption()
            var roundWinner = logic.getRoundWinner()
            logic.increaseWinningCount()
            alert(`${logic.selectWinnerSentence(roundWinner)}\n\n${logic.getBothPlays()}\n${logic.selectWinnerDeclare(roundWinner, 'Round')}\n\n${logic.getOverallResults()}`) // post de cada partida
    
            if (logic.hasRoundsLeft()) {
                interface.startGame()
            } else if (!logic.hasRoundsLeft()) {
                var overallWinner = logic.getOverallWinner()
                alert(logic.selectWinnerDeclare(overallWinner, 'Final')) // post overall
                interface.askForRematch()
            }
        },
        askForRematch() {
            if (confirm(`Do you want a rematch?`)) {
                logic.restartGame()
                interface.startGame()
            } else {
                alert('Bye!!')
            }
        }*/