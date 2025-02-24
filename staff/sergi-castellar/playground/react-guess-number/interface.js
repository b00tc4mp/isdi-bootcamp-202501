var interface = {}

interface.begin = function () {
    try {
        logic.generateRandom()
    } catch (error) {
        console.error(error)

        alert(error.message)
    }
}

interface.tryNumber = function () {
    try {
        var intentNumber = parseInt(prompt('number?'))

        logic.attemptNumber(intentNumber)
    } catch (error) {
        console.error(error)

        if (error.message === 'no remaining attemps' || error.message === 'already won')
            alert(error.message + ' GAME OVER')
        else
            alert(error.message)
    }
}

interface.viewStatus = function () {
    try {
        var status = logic.getStatus()

        alert('remainingAttempts ' + status.remainingAttempts + ', won ' + status.won + ' ' + (status.remainingAttempts === 0 || status.won ? 'GAME OVER' : ''))
    } catch (error) {
        console.error(error)

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
        console.error(error)

        alert(error.message)
    }
}

interface.automate()
