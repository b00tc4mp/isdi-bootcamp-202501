var logical = {
    initialStatment: function () {
        data.randomNumber = Math.floor(Math.random() * 11)
        console.log(data.randomNumber)
        data.attempts = 3
        data.victory = false
        data.defeat = false
        data.listNumbersTried = []
        logical.getStatus()

    },

    getStatus: function () {
        var status = {
            attempts: data.attempts,
            victory: data.victory,
            listNumbersTried: data.listNumbersTried,
        }

        return status
    },

    numberValidation: function (num) {

        if (num === null) {
            throw new Error('Game cancel')
        }
        if (typeof num != 'string') {
            throw new TypeError('Incorrect type of answer')
        }

        var isANumber
        if (num === '' || num.length > 2) {
            isANumber = false
        }
        else {
            for (var j = 0; j < data.alphabet.length; j++) {
                if (num === data.alphabet[j]) {
                    isANumber = false
                }
            }
            for (var i = 0; i < data.optionsList.length; i++) {
                if (Number(num) === data.optionsList[i]) {
                    isANumber = true
                }
            }
        }

        if (isANumber === false || isANumber === undefined) {
            interface.showInvalidMessage()
        }
        return isANumber
    },
    numberComparation: function (guess) {
        if (guess === data.randomNumber) {
            data.victory = true
        }
        else {
            data.attempts--
            logical.addNumberTried(guess)
            interface.showAttemptsAndNumberTried()
            data.victory = false
        }
        return data.victory
    },

    addNumberTried: function (num) {
        data.listNumbersTried[data.listNumbersTried.length] = num
    },
    isAWin: function () {
        var status = logical.getStatus()
        if (status.victory && status.attempts != 0) {
            interface.isEnd(1)
        }
        else if (status.victory === false && status.attempts === 0) {
            data.defeat = true
            interface.isEnd(0)
        }


    },
    validAnswer: function (answer) {
        if (answer === 'yes') {
            data.playAgain = true
        } else if (answer === 'no') {
            data.playAgain = false
        }
        else {
            interface.showInvalidMessage()
            interface.keepPlaying()
        }
    },

    start: function () {
        try {
            logical.initialStatment()
            while (data.playAgain) {
                if (data.victory === true || data.defeat === true) {
                    logical.initialStatment()
                }
                interface.askUserGuess()
                logical.getStatus()
                logical.isAWin()
            }
        } catch (error) {
            alert(error.message)
        }



    }
}
