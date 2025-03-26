console.clear()

// DATA

let maxNumber
let randomNumber
let playerAttempts = 0

// LOGIC → recibe parametros y devuelve un return
function validateMaxNumber(input) {
    var num = parseInt(input)
    if (isNaN(num) || num < 1 || num > 1000) {
        throw new Error('num is invalid')
    }
    return num
}

function generateRandomNumber(maxNum) {
    return Math.floor(Math.random() * maxNum + 1)
}

function validateTryNumber(input) {
    var num = parseInt(input)
    if (isNaN(num) | num < 1 | num > maxNumber) {
        throw new Error('num is invalid or mas grande q max num')
    }
    return num
}

function processTry(playerNumber) {
    if (compareNumbers(playerNumber, randomNumber)){ // si son iguales
        victoryMessage()
    } else {
        var difference = calculateDifference(playerNumber, randomNumber)
        var message = selectDifferenceSentence(difference)
        showFeedback(message)
        increaseAttempts()
        introduceGuessingNumber()
    }
}

function compareNumbers(playerNumber, randomNumber) {
    return playerNumber === randomNumber
}

function calculateDifference(playerNumber, randomNumber) {
    return Math.abs(playerNumber - randomNumber)
}

function selectDifferenceSentence(difference) {
    if (difference >= 50) {
        return 'very cold'
    } else if (difference < 50 && difference >= 25) {
        return 'cold'
    } else if (difference < 25 && difference >= 15) {
        return 'tempered'
    } else if (difference < 15 && difference >= 10) {
        return 'warm'
    } else if (difference < 10 && difference >= 5) {
        return 'hot'
    } else if (difference < 5) {
        return 'super hot'
    }
}

function increaseAttempts() {
    playerAttempts++
}

// PRESENTATION
function recieveMaxNumber() {
    try {
        let input = prompt('mete num de 1 a 1000')
        maxNumber = validateMaxNumber(input)
        randomNumber = generateRandomNumber(maxNumber)
        alert('Ya esta, empecemos')
        introduceGuessingNumber()
    } catch (error) {
        alert(error.message)
        console.error(error)
        recieveMaxNumber()
    }
}
function introduceGuessingNumber() {
    try {
        var input = prompt('intenta un numero')
        var playerNumber = validateTryNumber(input)
        processTry(playerNumber)
    } catch (error) {
        alert(error.message)
        console.error(error)
        introduceGuessingNumber()
    } 
}

function victoryMessage() {
    alert('Genial! acertaste')
}

function showFeedback(message) {
    /*try {
        askednumber = prompt y llamar a a funcion con ese player nmber 

    }
    alert(message)*/
}

recieveMaxNumber() //llamada inicial



/* funciones
11 recibir input maxnumber → presentation | try catch a 12 13 14 y llamar a 21
12 validar input maxnumber → logic
13 generar random number entre 0 y maxnumber → logic
14 declarar la variable con ese randomnumber → data
15 alertar al usuario de que se ha generado el numero? → presentation
---
21 pedir input trynumber → presentation | try catch a 22 23 24 25 y llamar a a 26 pasando la frase como objeto
22 validar input trynumber → logic
23 comparar trynumber con randomnumber → logic
24 calcular diferencia → logic
25 elegir frase segun diferencia → logic
26 alertar al usuario con la frase → presentation | depende de si acierta o no, llamar a 21 o 31
27 incrementar playerattempts si falla
28 volver a pedir input trynumber si no se ha acertado → presentation

---
31 alertar al usuario de que ha ganado → presentation
_______________
data global: maxnumber, randomnumber, playerattempts 



*/
/*
function main() {
    recieveMaxNumber()
}

function recieveMaxNumber() {
    maxNumber = prompt('Try to guess the number! The closer you get, the hotter your hint will be.\n\nPlease enter a number. This will be used as the maximum value to generate a random number between 0 and your chosen number.\n\nIntroduce a number:')
    maxNumber = parseInt(maxNumber)
}

//------------
function introduceMaxNumber() {
    maxNumber = prompt('Try to guess the number! The closer you get, the hotter your hint will be.\n\nPlease enter a number. This will be used as the maximum value to generate a random number between 0 and your chosen number.\n\nIntroduce a number:')
    maxNumber = parseInt(maxNumber)

    try {
        isAPositiveNumber()
        generateMaxNumber()
    } catch (error) {
        alert(error.message)
        console.error(error)
    }
}


//

function isPositiveNumber() {
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
 
recieveMaxNumber()*/