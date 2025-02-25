const interface = {
    start() {
        try {
            logic.initializeNumberToGuess()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    },

    askNumber() {
        try {
            const number = Number(prompt('Number?'))

            logic.tryNumber(number)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    },

    viewStatus() {
        try {
            const { attempts, temperature, attemptedNumbers, won, lost, gameOver } = logic.getStatus()

            alert(`temperature ${temperature}, attempts ${attempts}, attempted numbers ${attemptedNumbers}, won ${won}, lost ${lost}, gameOver ${gameOver}`)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    },

    restart() {
        try {
            logic.reset()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
}