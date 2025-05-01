// implement guess-number game (orienting player with temperature: 'very cold', 'cold', 'mild', 'warm', 'hot', 'super hot')

/*
player
- adivinar numero random que sólo conoce la maquina (entre 0 y 100)
- tiene 10 intentos
- si intento (numero) tiene una diferencia >= 50 con el random, entonces "very cold"
- si intento tiene una diferencia < 50 y >= 30, entonces "cold"
- si intento tiene una diferencia < 30 y >= 20, entonces "mild"
- si intento tiene una diferencia < 20 y >= 10, entonces "warm"
- si intento tiene una diferencia < 10 y >= 5, entonces "hot"
- si intento tiene una diferencia < 5 y >= 1, entonces "very hot"
- si acierta en menos de 10 intentos, win! por el contrario lost!
*/
const data = {
    constant: {
        MAX_ATTEMPTS: 10,
        number: {
            MIN: 0,
            MAX: 100
        },
        temperature: {
            literal: {
                VERY_COLD: 'very cold',
                COLD: 'cold',
                MILD: 'mild',
                WARM: 'warm',
                HOT: 'hot',
                VERY_HOT: 'very hot'
            },
            limit: {
                VERY_COLD: 50,
                COLD: 30,
                MILD: 20,
                WARM: 10,
                HOT: 5,
                VERY_HOT: 1,
                BURNED: 0
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
            return data.attempts <= data.constant.MAX_ATTEMPTS && data.attemptedNumbers.length && data.attemptedNumbers[data.attemptedNumbers.length - 1] === data.numberToGuess
        },
        isGameOver() {
            return this.isLost() || this.isWon()
        }
    },
    initializeNumberToGuess() {
        data.numberToGuess = Math.round(Math.random() * data.constant.number.MAX)
    },
    tryNumber(number) {
        if (this.helper.isGameOver()) throw new Error('game over')
        // TODO check remaining attempts (if 0, then game over)
        if (typeof number !== 'number') throw new Error('invalid number type')
        // TODO validate number is not float
        // TODO validate number is positive between 0 to 100

        const diff = Math.abs(number - data.numberToGuess)

        if (diff === 0) {
            data.temperature = data.constant.temperature.literal.BURNED
        } else if (diff >= data.constant.temperature.limit.VERY_HOT && diff < data.constant.temperature.limit.HOT) {
            data.temperature = data.constant.temperature.literal.VERY_HOT
        } else if (diff < data.constant.temperature.limit.WARM) {
            data.temperature = data.constant.temperature.literal.HOT
        } else if (diff < data.constant.temperature.limit.MILD) {
            data.temperature = data.constant.temperature.literal.WARM
        } else if (diff < data.constant.temperature.limit.COLD) {
            data.temperature = data.constant.temperature.literal.MILD
        } else if (diff < data.constant.temperature.limit.VERY_COLD) {
            data.temperature = data.constant.temperature.literal.COLD
        } else if (diff >= data.constant.temperature.limit.VERY_COLD && diff <= 100) {
            data.temperature = data.constant.temperature.literal.VERY_COLD
            return playerNumber
        }

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
            lose: this.helper.isLost(),
            gameOver: this.helper.isGameOver()
        }
    },

    resetGame() {
        data.numberToGuess = -1
        data.attempts = 0
        data.temperature = ''
        data.attemptedNumbers = []
    }
}

const interface = {
    startGame() {
        try {
            logic.initializeNumberToGuess()

        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    },
    askNumber() {
        try {
            const number = Number(prompt('Guess number: '))

            logic.tryNumber(number)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    },
    viewGameStatus() {
        try {
            const { attempts, temperature, attemptedNumbers, won, lost, gameOver } = logic.getStatus()

            alert(`temperature: ${temperature}, \n attempts: ${attempts}, \n attempted numbers: ${attemptedNumbers}, \n won? ${won}, \n lost? ${lost}, \n Game over? ${gameOver}`)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    },
    restart() {
        try {
            logic.resetGame()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
}
