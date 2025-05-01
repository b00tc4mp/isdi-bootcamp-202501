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
        number = Number(number)
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