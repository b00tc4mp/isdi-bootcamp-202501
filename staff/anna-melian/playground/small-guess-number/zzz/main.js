var data = {}
var logical = {}
var interface = {}

data.optionsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
data.randomNumber
data.attempts = 3
data.victory = false
data.defeat = false
data.playAgain = true
data.alphabet = 'abcdefghijklmnopqrstuvwxyzàáéèóòúí-.,-'
data.listNumbersTried = []


logical.initialStatment = function () {
    data.randomNumber = Math.floor(Math.random() * 11)
    console.log(data.randomNumber)
    data.attempts = 3
    data.victory = false
    data.defeat = false
    data.listNumbersTried = []
    logical.getStatus()

}

logical.getStatus = function () {
    var status = {
        attempts: data.attempts,
        victory: data.victory,
        listNumbersTried: data.listNumbersTried,
    }

    return status
}

logical.numberValidation = function (num) {

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
}

interface.showInvalidMessage = function () {
    alert('Invalid answer')
}

interface.askUserGuess = function () {
    var userNumber = prompt('Guess the number: From 0 to 10')
    if (logical.numberValidation(userNumber)) {
        userNumber = Number(userNumber)
        logical.numberComparation(userNumber)
    }

}

logical.numberComparation = function (guess) {
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
}

logical.addNumberTried = function (num) {
    data.listNumbersTried[data.listNumbersTried.length] = num
}


interface.showAttemptsAndNumberTried = function () {
    var status = logical.getStatus()
    var numberAlreadyTry =
        alert('You have ' + status.attempts + ' attempts left.\nNumbers you already try: ' + status.listNumbersTried)
}


logical.isAWin = function () {
    var status = logical.getStatus()
    if (status.victory && status.attempts != 0) {
        interface.isEnd(1)
    }
    else if (status.victory === false && status.attempts === 0) {
        data.defeat = true
        interface.isEnd(0)
    }


}

interface.isEnd = function (result) {
    var status = logical.getStatus()
    if (result === 1) {
        alert('You win')
        interface.keepPlaying()
    }
    else if (result === 0) {
        alert('You lose')
        interface.keepPlaying()
    }
}

interface.keepPlaying = function () {
    var wantToPlay = prompt('Do you want to play again? yes or no ')
    if (wantToPlay === null) {
        throw new Error('Game cancel')
    }
    wantToPlay = wantToPlay.toLowerCase()
    logical.validAnswer(wantToPlay)
}

logical.validAnswer = function (answer) {
    if (answer === 'yes') {
        data.playAgain = true
    } else if (answer === 'no') {
        data.playAgain = false
    }
    else {
        interface.showInvalidMessage()
        interface.keepPlaying()
    }
}

logical.start = function () {
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

console.clear()

logical.start()