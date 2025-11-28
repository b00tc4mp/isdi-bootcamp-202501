/*
player
- adivinar numero random que sólo conoce la maquina (entre 0 y 100)
- tiene 10 intentos
- si intento (numero) tiene una diferencia >= 50 con el random, entonces "very cold"
- si intento tiene una diferencia < 50 y >= 30, entonces "cold"
- si intento tiene una diferencia < 30 y >= 20, entonces "tempered"
- si intento tiene una diferencia < 20 y >= 10, entonces "warm"
- si intento tiene una diferencia < 10 y >= 5, entonces "hot"
- si intento tiene una diferencia < 5 y >= 2, entonces "very hot"
- si acierta en menos de 10 intentos, win! por el contrario lost!
*/

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
    input: {
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

        restart() {
            try {
                logic.reset()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }
    },
    output: {
        viewStatus() {
            try {
                const { attempts, temperature, attemptedNumbers, won, lost, gameOver } = logic.getStatus()

                alert(`temperate ${temperature}, attempts ${attempts}, attemptedNumbers ${attemptedNumbers}, won ${won}, lost ${lost}, gameOver ${gameOver}`)
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }
    }

}