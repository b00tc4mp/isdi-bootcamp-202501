console.clear()

var data = {
    constants: {
        POSSIBLE_PLAYS: ['rock', 'paper', 'scissors'],
        GAME_ROUNDS: 3
    },
    computerPlay: '',
    userPlay: '',
    gamesWonComputer: 0,
    gamesWonPlayer: 0,
    gamesDrawn: 0,
    roundsPlayed: 0,
}
data.possiblePlays = data.constants.POSSIBLE_PLAYS
data.gameRounds = data.constants.GAME_ROUNDS


var logic = {
    helper: {
        validateInputIsRPS: function(playerOption) {
            if (playerOption !== 'r' && playerOption !== 'p' && playerOption !== 's')
                throw new SyntaxError('Invalid input format')
        },

        validateInputIsNotEmpty: function(playerOption) {
            if (playerOption === '' || playerOption === null)
                throw new Error('Invalid input length')
        }

    },

    convertCharacterToNumber: function(playerOption) {
        switch(playerOption) {
            case 'r': return 0
            case 'p': return 1
            case 's': return 2
        }
    },

    generateComputerOption: function() { //esta en tijeras para probar
        var randomPlay = Math.floor(Math.random() * 3)
        data.computerPlay = 'scissors' //logic.convertNumberToPlay(randomPlay)
    },

    setUserPlay: function(numberPlayerOption) {
        data.userPlay = logic.convertNumberToPlay(numberPlayerOption)
    },

    convertNumberToPlay: function(number) {
        return data.possiblePlays[number]
    },

    getRoundWinner: function() {
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

    increaseWinningCount: function() {
        var winner = logic.getRoundWinner()
        data.roundsPlayed++

        switch(winner) {
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

    hasRoundsLeft : function() {
        return (data.roundsPlayed < data.gameRounds)
    },

    getOverallWinner: function() {
        if (data.gamesWonComputer > data.gamesWonPlayer)
            return 'computer'
        else if (data.gamesWonComputer < data.gamesWonPlayer)
            return 'player'
        else
            return 'draw'
    },
    
    selectWinnerSentence: function(roundWinner) {
        switch(roundWinner) {
            case 'computer': return 'Computer wins this round. Don\'t give up, try again!!'
                
            case 'player': return 'Congratulations, you won! You got lucky this time!!'

            case 'draw': return 'It\'s a tie! You both chose the same!!'
        }
    },

    selectWinnerDeclare: function(winner, word) { //final o round
        switch(winner) {
            case 'computer': return `${word} winner: Computer ${logic.getResultEmoji(winner)}`
                
            case 'player': return `${word} winner: Player ${logic.getResultEmoji(winner)}`

            case 'draw': return `${word} result: Draw ${logic.getResultEmoji(winner)}`
        }
    },

    getOverallResults: function() {
        return `Your wins: ${data.gamesWonPlayer}\nComputer wins: ${data.gamesWonComputer}\nDraws: ${data.gamesDrawn}`
    },

    getBothPlays: function() {
        var userPlay = data.userPlay
        var computerPlay = data.computerPlay
        return `Your play: ${userPlay} ${logic.getPlayEmoji(userPlay)}\nComputer play: ${computerPlay} ${logic.getPlayEmoji(computerPlay)}`
    },

    getResultEmoji: function(result) {
        switch(result) {
            case 'computer': return '💻'
                
            case 'player': return '😁'

            case 'draw': return '✖️'
        }
    },

    getPlayEmoji: function(play) {
        switch(play) {
            case 'rock': return '👊'

            case 'paper': return '🤚'
            
            case 'scissors': return '✌️'            
        }
    },
    restartGame: function() {
        data.computerPlay = ''
        data.userPlay = ''
        data.gamesWonComputer = 0
        data.gamesWonPlayer = 0
        data.gamesDrawn = 0
        data.roundsPlayed = 0
    }
}

var interface = {
    helpers: {
        promptToLowerCase: function() {
            var playerOption = prompt('r for rock, p for paper and s for scissors')
            logic.helper.validateInputIsNotEmpty(playerOption)
            logic.helper.validateInputIsRPS(playerOption)
            playerOption = playerOption.toLowerCase()
            return playerOption
        }
    },

    introducePlayerOption: function() {
        try {
            var playerOption = interface.helpers.promptToLowerCase()
            var numberPlayerOption = logic.convertCharacterToNumber(playerOption)
            logic.setUserPlay(numberPlayerOption)
        } catch(error) {
            console.log(error)
            alert(error.message)
            interface.introducePlayerOption()
        }
    },

    startGame: function() {
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
    askForRematch: function() {
        if (confirm(`Do you want a rematch?`)){
            logic.restartGame()
            interface.startGame()
        } else {
            alert('Bye!!')
        }
    }
}
interface.startGame()