const logic = {
    createNumber: () => {
        data.mainNumber = Math.floor(Math.random() * 100 + 1)
    },

    isWon: (number) => { return data.mainNumber === number },

    hint: (number) => {
        var difference = data.mainNumber - number
        if (difference < 5 && difference > -5) {
            alert(`Very hot! Try one more time, you have ${data.turns} turns left`)
        } else if (difference < 10 && difference > -10) {
            alert(`It's hot! Try one more time, you have ${data.turns} turns left`)
        } else if (difference < 20 && difference > -20) {
            alert(`It's warm! Try one more time, you have ${data.turns} turns left`)
        } else if (difference < 30 && difference > -30) {
            alert(`It's tempered! Try one more time, you have ${data.turns} turns left`)
        } else if (difference < 50 && difference > -50) {
            alert(`It's cold! Try one more time, you have ${data.turns} turns left`)
        } else if (difference < 100 && difference > -100) {
            alert(`It's very cold! Try one more time, you have ${data.turns} turns left`)
        }
    },

    userIsAlive: () => {
        return (data.turns > 0)
    },

    guessNumber: (isTurnsLeft, isWon, number) => {
        if (isTurnsLeft && !isWon) {
            data.turns--
            logic.hint(number)
        } else throw new Error("No turns left")
    },



    // makeAGuess: (number) => {
    //     if (turns > 0) {
    //         if (number === mainNumber)

    //     }
    // }
}
logic.gameOver = (number) => {
    let isOver = false
    if (!logic.userIsAlive() || logic.isWon(number)) {
        isOver = true
    }
    return isOver
}