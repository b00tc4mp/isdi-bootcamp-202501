const logic = {
    helper: {
        handleError(error) {
            console.error(error)
            alert(error.message)
        },

        getRandomNumber() {
            return data.randomNumber
        },

        isGameStarted() {
            return data.isGameStarted
        },

        areWeStillPlaying() {
            return !data.isGameWon && this.isGameStarted()
        },

        isGameLost() {
            return data.remainingAttempts === 0 //TODO  faltan condiciones
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
        },

        isAlreadyTried(number) {
            if (data.triedNumbers.indexOf(number) > -1) throw new Error('number already tried')
        }
    },

    startGame() {
        data.isGameStarted = true
    },

    generateRandom() {
        data.randomNumber = Math.floor(Math.random() * (data.constant.MAX_NUM + 1))
        console.log(data.randomNumber)
    },

    attemptNumber(number) {
        this.validate.isFinished()
        this.validate.isAlreadyTried(number)

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
        data.remainingAttempts = data.constant.MAX_ATTEMPTS
        data.triedNumbers = []
        data.isGameWon = false
    }
}