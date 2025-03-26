console.clear()
/// while. frio frio caliente, automatizar para repetir
let maxNumber = 0
let guessingNumber = 0
let playerAttempts = 0

function recieveMaxNumber() {
    maxNumber = parseInt(prompt('Try to guess the number! The closer you get, the hotter your hint will be.\n\nPlease enter a number. This will be used as the maximum value to generate a random number between 0 and your chosen number.\n\nIntroduce a number:'))
    if (isAPositiveNumber(maxNumber)) {
        guessingNumber = generateRandomNumber(maxNumber)
        introduceGuessingNumber()
    } else {
        alert('Introduce a positive number without decimals')
        recieveMaxNumber()
    }
}

function introduceGuessingNumber() {
    let playerInput = parseInt(prompt(`Introduce your attempt number ${playerAttempts + 1}. Remember:\nDifference >= 50 → Very cold\n25 <= Difference < 50 → Cold\n15 <= Difference < 25 → Tempered\n10 <= Difference < 15 → Warm\n5 <= Difference < 10 → Hot\nDifference < 5 → Super hot`))
    if (isAPositiveNumber(playerInput)) {
        if (playerInput <= maxNumber) {
            playerAttempts++
            evaluateGuessingNumber(playerInput)
        } else {
            alert(`Please enter a number smaller than ${maxNumber + 1}`)
            introduceGuessingNumber()
        }
    } else {
        alert('Please enter a valid number')
        introduceGuessingNumber()
    }
}

function evaluateGuessingNumber(playerNumber) {
    let differenceSentence = sentenceByDifference(playerNumber)
    let directionToGuess = isMoreOrIsLess(playerNumber)
    if (playerNumber != guessingNumber) {
        alert(`Hey friend, you are ${differenceSentence}. Try going ${directionToGuess}`)
        introduceGuessingNumber()
    } else {
        if (confirm('You won!! Wanna replay?')) {
            reiniciateGame()
        } else {
            alert('Ok, bye!!')
        }
    }
}

function sentenceByDifference(playerNumber) {
    let numberDifference = Math.abs(guessingNumber - playerNumber)
    
    if (numberDifference >= 50) {
        return 'very cold'
    } else if (numberDifference < 50 && numberDifference >= 25) {
        return 'cold'
    } else if (numberDifference < 25 && numberDifference >= 15) {
        return 'tempered'
    } else if (numberDifference < 15 && numberDifference >= 10) {
        return 'warm'
    } else if (numberDifference < 10 && numberDifference >= 5) {
        return 'hot'
    } else if (numberDifference < 5) {
        return 'super hot'
    }
}

function isMoreOrIsLess(playerNumber) {
    let numberDifference = guessingNumber - playerNumber // positivo es que ha dicho uno mas pequeño, tiene que subir
    if (numberDifference > 0) {
        return 'up'
    } else if (numberDifference < 0) {
        return 'down'
    }
}

function generateRandomNumber(n) {
    return Math.floor(Math.random() * n + 1)
}

function isAPositiveNumber(input) { // regex para aceptar numeros enteros superiores a 0
    var regex = /(?:[1-9][0-9]{0,3}|0)$/
    if (regex.test(input)){
        return true
    } else {
        return false
    }
}

function reiniciateGame() {
    maxNumber = 0
    guessingNumber = 0
    playerAttempts = 0
    recieveMaxNumber()
}
 
recieveMaxNumber()