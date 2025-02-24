const logic = {
    helper: {
        handleError(error) {
            console.error(error)
            alert(error.message)
        },

        isGameStarted() {
            return data.isGameStarted
        },

        areWeStillPlaying() {
            return !data.isGameWon && this.isGameStarted()
        }
    },
    validate: {
        hasRemainingAttempts() {
            if (data.remainingAttempts === 0) throw new Error('no remaining attemps')
        },

        hasAreadyWon() {
            if (data.isGameWon) throw new Error('player already won')
        },

        isFinished() {
            this.hasRemainingAttempts()
            this.hasAreadyWon()
        }
    },

    startGame() {
        data.isGameStarted = true
    },

    generateRandom() {
        data.randomNumber = Math.floor(Math.random() * 11)
        console.log(data.randomNumber)
    },

    attemptNumber(number) {
        this.validate.isFinished()
        data.remainingAttempts--

        data.triedNumbers.push(number)

        data.triedNumber = number

        data.isGameWon = number === data.randomNumber
    },

    getTriedNumbers() {
        return data.triedNumbers.join(', ')
    },

    getHint(number) {
        const difference = data.randomNumber - number
        return (difference > 0 ? 'Try going up ↑' : 'Try going down ↓')
    },

    getStatus() {
        return {
            remainingAttempts: data.remainingAttempts,
            roundSentence: data.isGameWon ? 'You won!' : data.remainingAttempts === 0 ? 'You lost!' : 'Keep trying',
            hint: this.getHint(data.triedNumber)
        }
    },

    resetGame() {
        data.isGameStarted = false
        data.remainingAttempts = data.constant.attempts
        data.triedNumbers = []
        data.isGameWon = false
    }
}