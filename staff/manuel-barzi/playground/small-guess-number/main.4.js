var data = {}
var logic = {}
var interface = {}

data.randomNumber = 0
data.remainingAttempts = 3
data.won = false

logic.generateRandom = function () {
    data.randomNumber = Math.floor(Math.random() * 11)
    console.log(data.randomNumber)
    data.remainingAttempts = 3
    data.won = false
}

logic.attemptNumber = function (number) {
    if (data.remainingAttempts === 0)
        throw new Error('no remaining attemps')
    if (data.won === true)
        throw new Error('player already won')

    data.remainingAttempts--

    data.won = number === data.randomNumber
}

logic.getStatus = function () {
    var status = {
        remainingAttempts: data.remainingAttempts,
        won: data.won
    }

    return status
}

logic.isFinished = function () {
    return data.remainingAttempts !== 0 && data.won === false
}

interface.begin = function () {
    try {
        logic.generateRandom()
    } catch (error) {
        alert(error.message)
    }
}

interface.tryNumber = function () {
    try {
        var intentNumber = prompt('number?')
        //intentNumber = parseInt(intentNumber)
        intentNumber = Number(intentNumber)

        logic.attemptNumber(intentNumber)
    } catch (error) {
        if (error.message === 'no remaining attemps' || error.message === 'already won')
            alert(error.message + ' GAME OVER')
        else
            alert(error.message)
    }
}

interface.viewStatus = function () {
    try {
        var status = logic.getStatus()

        alert('remainingAttempts ' + status.remainingAttempts + ', won ' + status.won + ' ' + (status.remainingAttempts === 0 || status.won === true ? 'GAME OVER' : ''))
    } catch (error) {
        alert(error.message)
    }
}

console.clear()

// automation

interface.automate = function () {
    try {
        interface.begin()
        interface.viewStatus()

        do {
            interface.tryNumber()
            interface.viewStatus()
        } while (logic.isFinished())
    } catch (error) {
        alert(error.message)
    }
}

interface.automate()
