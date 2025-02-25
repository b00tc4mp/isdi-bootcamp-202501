var interface = {}

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
interface.showAttemptsAndNumberTried = function () {
    var status = logical.getStatus()
    var numberAlreadyTry =
        alert('You have ' + status.attempts + ' attempts left.\nNumbers you already try: ' + status.listNumbersTried)
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


logical.start()