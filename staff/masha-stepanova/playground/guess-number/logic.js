const logic = {
    helper: {
        isLost() {
            return data.attempts === data.constant.MAX_ATTEMPTS && data.attemptedNumbers.length && data.attemptedNumbers[data.attemptedNumbers - 1] !== data.numberToGuess
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

        if (typeof number !== 'number') throw new TypeError('invalid number type')

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