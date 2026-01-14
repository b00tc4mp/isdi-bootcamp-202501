console.clear()
var number = 0
var num = 0

var attempts = 10

function randomNumber() {
    number = Math.floor(Math.random() * (100 - 1 + 1))
    guessNumber()
}

function guessNumber() {
    num = prompt(`Try to guess a Number (1-100)
                attempts: ${attempts}`)

    if (num === null) {
        alert('Try again')
        guessNumber()
    } else {
        sentNumber()
    }
}

function sentNumber() {
    var difference = Math.abs(number - num)

    if (number == num)
        alert(`Congratulations, you guessed correctly the ${number} number`)
    else if (difference > 30) {
        alert('Soooo cold')
        attempts--
        totalAttempts()
    }
    else if (difference > 20 && difference <= 30) {
        alert('Cold...')
        attempts--
        totalAttempts()
    }
    else if (difference > 10 && difference <= 20) {
        alert('hot, hot')
        attempts--
        totalAttempts()
    }
    else if (difference <= 10) {
        alert('It burns!!!')
        attempts--
        totalAttempts()
    }
}

function totalAttempts() {
    if (attempts <= 0) {
        alert(`You have lost, number was ${number}`)
    } else {
        guessNumber()
    }
}

randomNumber()