var logic = {
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
    helper: {
        isLost() {
            return data.attempts === logic.constant.MAX_ATTEMPTS && data.attemptedNumbers.length && data.attemptedNumbers[data.attemptedNumbers.length - 1] !== data.numberToGuess
        },
        isWon() {
            return data.attempts <= logic.constant.MAX_ATTEMPTS && data.attemptedNumbers.length && data.attemptedNumbers[data.attemptedNumbers.length - 1] === data.numberToGuess
        },
        isGameOver() {
            return this.isLost() || this.isWon()
        }
    },
    randomNumber() {
        data.numberToGuess = Math.round(Math.random() * logic.constant.number.MAX)
    },

    sentNumber(number) {
        if (this.helper.isGameOver()) throw new Error('game over')
        if (typeof number !== 'number') throw new TypeError('invalid number type')

        const difference = Math.abs(data.numberToGuess - number)

        if (difference >= logic.constant.temperature.limit.VERY_COLD)
            data.temperature = logic.constant.temperature.literal.VERY_COLD
        else if (difference >= logic.constant.temperature.limit.COLD)
            data.temperature = logic.constant.temperature.literal.COLD
        else if (difference >= logic.constant.temperature.limit.TEMPERED)
            data.temperature = logic.constant.temperature.literal.TEMPERED
        else if (difference >= logic.constant.temperature.limit.WARM)
            data.temperature = logic.constant.temperature.literal.WARM
        else if (difference >= logic.constant.temperature.limit.HOT)
            data.temperature = logic.constant.temperature.literal.HOT
        else if (difference >= logic.constant.temperature.limit.VERY_HOT)
            data.temperature = logic.constant.temperature.literal.VERY_HOT

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

    restart() {
        data.numberToGuess = -1
        data.attempts = 0
        data.temperature = ''
        data.attemptedNumbers = []
        this.randomNumber()
    }
}
