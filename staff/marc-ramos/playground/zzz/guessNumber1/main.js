const data = {
    constant: {
        MAX_ATTEMPTS: 10,
        number: {
            MIN: 0,
            MAX: 100,
        },
        temperature: {
            literal: {
                VERY_COLD: 'very cold',
                COLD: 'cold',
                TEMPERED: 'tempered',
                WARM: 'warm',
                HOT: 'hot',
                VERY_HOT: 'very hot'
            },
            limit: {
                VERY_COLD: 50,
                COLD: 30,
                TEMPERED: 20,
                WARM: 10,
                HOT: 5,
                VERY_HOT: 1
            }
        }
    },
    numberToGuess: -1,
    attempts: 0,
    temperature: '',
    attemptedNumbers: []
}

const logic = {
    helper: {
        isLost() {
            return data.attempts === data.constant.MAX_ATTEMPTS && data.attemptedNumbers.length && data.attemptedNumbers[data.attemptedNumbers.length - 1] !== data.numberToGuess
        },

        isWon() {
            return data.attempts <= data.constant.MAX_ATTEMPTS && data.attemptedNumbers.length && data.attemptedNumbers [data.attemptedNumbers.length - 1] === data.numberToGuess
        },

        isGameOver() {
            return this.isLost() || this.isWon()
        }
    },

    tryNumber(number) {
        if (this.helper.isGameOver()) throw new Error('game over')

         // TODO check remaining attempts (if 0, then game over)
         if (typeof number !== 'number') throw new TypeError('invalid number type')
        // TODO validate number is not float
        // TODO validate number is positive between 0 to 100
    
        const diff = Math.abs(data.numberToGuess - number)

        if (diff >= data.constant.temperature.limit.VERY_COLD)
            data.temperature = data.constant.temperature.literal.VERY_COLD
        else if (diff >= data.constant.temperature.limit.COLD)
            data.temperature = data.constant.temperature.literal.COLD
        else if (diff >= data.constant.temperature.limit.TEMPERED)
            data.temperature = data.constant.temperature.literal.TEMPERED
        else if (diff >= data.constant.temperature.limit.WARM)
            data.temperature = data.constant.temperature.literal.WARM
        else if (diff >= data.constant.temperature.limit.HOT)
            data.temperature = data.constant.temperature.literal.HOT
        else if (diff >= data.constant.temperature.limit.VERY_HOT)
            data.temperature = data.constant.temperature.literal.VERY_HOT

        data.attempts++
        data.attemptedNumbers.push(number)
    },

    getStatus() {
        const { attempts, temperature, attemptedNumbers } = data

        return {
            attempts,
            temperature,
            attemptedNumbers,
            won: this.helper.isWon(),
            lost: this.helper.isLost(),
            gameOver: this.helper.isGameOver()
        }
    },

    reset() {
        data.numberToGuess = -1
        data.attempts = 0
        data.temperature = ''
        data.attemptedNumbers = []
    }
}

const interface = {
    start() {
        try {
            logic.initializeNumberToGuess()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    },

    askNumber() {
        try {
            const number = Number(prompt('Number?'))

            logic.tryNumber(number)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    },

    viewStatus() {
        try {
            const { attempts, temperature, attemptedNumbers, won, lost, gameOver } = logic.getStatus()

            alert(`temperate ${temperature}, attempts ${attempts}, attemptedNumbers ${attemptedNumbers}, won ${won}, lost ${lost}, gameOver ${gameOver}`)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    },

    restart() {
        try {
            logic.reset()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
}
/*
var data = {}
var logic = {}
var interface = {}

// DATA

data.randomNumber = 0
data.maxChances = 10
data.userChances = 0
data.playerNumber = 0
data.chancesLeft = 10
data.numberDiference = 0
data.winner = false

// LOGIC

logic.calculateChances = function (){
    if(data.maxChances != 0)
     data.chancesLeft--
}

logic.addRandomNumber = function (){
    data.randomNumber = logic.generateRandomNumber(0,100)
}

logic.generateRandomNumber = function (){
    
    return data.randomNumber =  Math.floor(Math.random() * (101))    
}

logic.differenceNumbers = function (){
    if (data.playerNumber > data.randomNumber){
        data.numberDiference = data.playerNumber - data.randomNumber
    } else if (data.randomNumber > data.playerNumber){
        data.numberDiference = data.randomNumber - data.playerNumber
    }
}

logic.checkNumber = function (){
    if (data.numberDiference >= 50){

        alert ('Very cold!' + '\n' + 'You have ' + data.chancesLeft + ' chances left')

    } else if (data.numberDiference < 50 && data.numberDiference >= 30){

        alert ('Cold!' + '\n' + 'You have ' + data.chancesLeft + ' chances left')

    } else if (data.numberDiference < 30 && data.numberDiference >= 20){

        alert ('Tempered!' + '\n' + 'You have ' + data.chancesLeft + ' chances left')

    } else if (data.numberDiference < 20 && data.numberDiference >= 10){

        alert ('Warm!' + '\n' + 'You have ' + data.chancesLeft + ' chances left')

    } else if (data.numberDiference < 10 && data.numberDiference >= 5){

        alert ('Hot!' + '\n' + 'You have ' + data.chancesLeft + ' chances left')

    } else if (data.numberDiference < 5 && data.numberDiference >= 1){

        alert ('Very hot!' + '\n' + 'You have ' + data.chancesLeft + ' chances left')

    }
}

logic.winGame = function (){
    if (data.playerNumber === data.randomNumber){
    data.winner = true
    alert ('Congratulations! YOU WIN! with ' + data.chancesLeft + ' chances left' + '\n' + 'The number was ' + data.randomNumber)
 
    } else {
        data.maxChances--
    }
}

// PRESENTATION

interface.askNumber = function (){
    data.playerNumber = Number(prompt ('What number is it? ' + '\n' + 'You have ' + data.chancesLeft + ' chances left'))
}

interface.gameAuto = function (){
    logic.addRandomNumber()
    console.log(data.randomNumber)
    do {
        interface.askNumber()
        logic.differenceNumbers()
        logic.winGame()
        logic.calculateChances()
        logic.checkNumber()
        
    } while (data.winner === false && data.maxChances != 0) {

        alert ('You lost!')
    }
}

interface.gameAuto()
*/