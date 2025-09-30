console.clear()

var data = {}
var logic = {}
var interface = {}

//data
data.randomNumber = 0
data.userNumber = 0
data.remainingAttempts = 5
data.usedAttempts = 0
data.isWon = false

// logic
logic.generateNumber = function () {
    data.randomNumber = Math.floor(Math.random() * 11)
    console.log(data.randomNumber)
}

logic.compareNumbers = function(attemptedNumber) {
    data.isWon = attemptedNumber === data.randomNumber
    if (!data.isWon) {
        logic.decreaseRemainingAttempts()
        logic.increaseUsedAttempts()
    }
}

logic.getRemainingAttempts = function() {
    return data.remainingAttempts
}

logic.getUsedAttempts = function() {
    return data.usedAttempts
}

logic.getRandomNumber = function() {
    return data.randomNumber
}

logic.getisWon = function() {
    return data.isWon
}

logic.getStatus = function() {
    console.log(data.randomNumber, data.remainingAttempts, data.isWon)
}

logic.restart = function() {
    data.remainingAttempts = 6
    data.isWon = false
}

logic.integerString = function(attemptedNumber) {
    attemptedNumber = parseInt(attemptedNumber)
    console.log(attemptedNumber)
    if (Number.isNaN(attemptedNumber)) {
        throw new Error('format number invalid')
    } else {
        return attemptedNumber
    }
}

logic.validateInputRang = function(attemptedNumber) {
    if (attemptedNumber < 0 || attemptedNumber > 10) {
        throw new Error('rang number invalid')
    }
}

logic.decreaseRemainingAttempts = function() {
    data.remainingAttempts--
}

logic.increaseUsedAttempts = function() {
    data.usedAttempts++
}

logic.defineArrowDirection = function(attemptedNumber) {
    return attemptedNumber > data.randomNumber ? ' ↓' : ' ↑'
}

// interface
interface.startGame = function() {
    try{
        logic.generateNumber()
        alert("Random number generated. Let's start")
    } catch(error) {
        alert(error.message)
        console.error(error)
    }
}

interface.tryNumber = function() {
    try {
        var attemptedNumber = prompt('number?')
        attemptedNumber = logic.integerString(attemptedNumber)
        logic.validateInputRang(attemptedNumber)
        logic.compareNumbers(attemptedNumber)
    } catch(error) {
        alert(error.message)
        console.error(error)
    }
}

interface.viewStatus = function() {
    return `Remaining attempts: ${logic.getRemainingAttempts()}. ${defineArrowDirection()}.`
}

interface.main = function() {
    try {
        interface.startGame()
        do {
            logic.getStatus()
            interface.tryNumber()
            if (!logic.getisWon()) {
                alert(interface.viewStatus())
            }
            interface.viewStatus()

        } while (!data.isWon && data.remainingAttempts > 0)
        
        if (data.isWon) {
            alert(`Yes! You won in ${logic.getUsedAttempts()} attempts`)
        } else if (data.remainingAttempts <= 0) {
            alert(`You lose. The number was ${logic.getRandomNumber()}`)
        }
        logic.restart()
        

    } catch(error) {
        alert(error.message)
        console.error(error)
    }
}

//interface.main()
/*
genera un numero random
pide por prompt
*/