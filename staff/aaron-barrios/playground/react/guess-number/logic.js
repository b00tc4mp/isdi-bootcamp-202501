var logic = {
    randomNumber: function () {
        const random = Math.floor(Math.random() * (data.constants.MAX_NUMBER - 1 + 1))
        return random
    },

    validateInput: function (number) {
        if (isNaN(number)) {
            alert('Invalid input. Please enter a number.')
            this.checkAttempts()
        }
        else if (number > data.constants.MAX_NUMBER || number < 1) {
            alert('Number out of range. Please enter a number between 1 and 100.')
            this.checkAttempts()
        }
    },

    checkAttempts: function () {
        var hasAttempts = this.totalAttempts()

        if (!hasAttempts) {
            data.constants.END_GAME = 'lose'
            // this.checkEndGame(data.constants.END_GAME)
        }
    },


    totalAttempts: function () {
        return data.remainingAttempts !== 0
    },

    sentNumber: function (randomNumber, number) {
        var difference = Math.abs(randomNumber - number)

        if (randomNumber === number) {
            data.constants.END_GAME = 'win'
            // this.checkEndGame(data.constants.END_GAME)
        }
        else if (difference > 40) {
            alert(`It freezes 
            Remaining Attempts:${data.remainingAttempts}`)
            data.remainingAttempts--
            this.checkAttempts()
        }
        else if (difference > 30 && difference <= 40) {
            alert(`Soooo cold 
            Remaining Attempts:${data.remainingAttempts}`)
            data.remainingAttempts--
            this.checkAttempts()
        }
        else if (difference > 20 && difference <= 30) {
            alert(`Meh... 
            Remaining Attempts:${data.remainingAttempts}`)
            data.remainingAttempts--
            this.checkAttempts()
        }
        else if (difference > 10 && difference <= 20) {
            alert(`hot, hot 
            Remaining Attempts:${data.remainingAttempts}`)
            data.remainingAttempts--
            this.checkAttempts()
        }
        else if (difference > 5 && difference <= 10) {
            alert(`Sooo hot 
            Remaining Attempts:${data.remainingAttempts}`)
            data.remainingAttempts--
            this.checkAttempts()
        }
        else if (difference <= 5) {
            alert(`It burns!!! 
            Remaining Attempts:${data.remainingAttempts}`)
            data.remainingAttempts--
            this.checkAttempts()
        }
    },


    restart: function () {
        data.remainingAttempts = 10
        this.randomNumber()
    },

    // checkEndGame: function (state) {
    //     const end = false
    //     if (data.constants.END_GAME === 'win' || data.constants.END_GAME === 'lose') {
    //         end = true
    //         return end
    //     }
    // }
}
