/*
player
- adivinar numero random que sólo conoce la maquina (entre 0 y 100)
- tiene 10 intentos
- si intento (numero) tiene una diferencia >= 50 con el random, entonces "very cold"
- si intento tiene una diferencia < 50 y >= 30, entonces "cold"
- si intento tiene una diferencia < 30 y >= 20, entonces "tempered"
- si intento tiene una diferencia < 20 y >= 10, entonces "warm"
- si intento tiene una diferencia < 10 y >= 5, entonces "hot"
- si intento tiene una diferencia < 5 y >= 1, entonces "very hot"
- si acierta en menos de 10 intentos, win! por el contrario lost!
*/
console.clear()
var randomNumber
var interval = []
var guessNumber
var attemps = 0
var maxAttemps = 10
var maxNumber = 100
var win = false
var charactersTried = []

interval = []
for (var i = 0; i <= maxNumber; i++) {
     interval[interval.length] = i
}
function getRandomNumber() {
    var randomIndex = Math.floor(Math.random() * interval.length)
    randomNumber = interval[randomIndex]
    return randomNumber
}

function askGuessNumber() {
    var numAlreadyTried = false
    guessNumber = prompt('Choose a number between 0 and '+ maxNumber + ': ')
    if (Number(guessNumber) >= 0 && Number(guessNumber) <= maxNumber ) {
        for (var i = 0; i < charactersTried.length; i++) {
            if (Number(guessNumber) === Number(charactersTried[i])) {
                numAlreadyTried = true
            }      
        }
        if (numAlreadyTried) {
            console.log('This number is not valid because you already tried.')
            askGuessNumber() //només funciona amb numeros d'una sola xifra
        }
        else {
            guessNumber = Number(guessNumber)
        }
        
    }
    else {
        console.log('This number is not valid, the number has to be between 0 and '+ maxNumber + '. ')
        askGuessNumber()
    }

}

function numberComparation() {
    var difference = 0
    win = false
    if (guessNumber === randomNumber ) {
        console.log('Is correct, congratulations!')
        win = true
    } else if (guessNumber < randomNumber) {
        difference = (randomNumber - guessNumber)
        if (difference >= 50 ) {
            console.log('You are very cold. It is 50 or more from this number.')
            attemps++
            charactersTried += guessNumber + ','
            console.log('You tried the next numbers: ' + charactersTried)
        } else if (difference < 50 && difference >= 30) {
            console.log('You are cold. It is between 50 and 30 of this number.')
            attemps++
            charactersTried += guessNumber + ','
            console.log('You tried the next numbers: ' + charactersTried)
        } else if (difference < 30 && difference >= 20) {
            console.log('You are tempered. It is between 30 and 20 of this number.')
            attemps++
            charactersTried += guessNumber + ','
            console.log('You tried the next numbers: ' + charactersTried)
        } else if (difference < 20 && difference >= 10) {
            console.log('You are warm. It is between 20 and 10 of this number.')
            attemps++
            charactersTried += guessNumber + ','
            console.log('You tried the next numbers: ' + charactersTried)
        } else if (difference < 10 && difference >= 5) {
            console.log('You are hot. It is between 10 and 5 of this number.')
            attemps++
            charactersTried += guessNumber + ','
            console.log('You tried the next numbers: ' + charactersTried)
        } else if (difference < 5 && difference >= 1) {
            console.log('You are very hot. It is between 5 and 1 of this number.')
            attemps++
            charactersTried += guessNumber + ','
            console.log('You tried the next numbers: ' + charactersTried)
        }
        
    } else if (guessNumber > randomNumber) {
        difference = (guessNumber - randomNumber)
        if (difference >= 50 ) {
            console.log('You are very cold. It is 50 or more from this number.')
            attemps++
            charactersTried += guessNumber + ','
            console.log('You tried the next numbers: ' + charactersTried)
        } else if (difference < 50 && difference >= 30) {
            console.log('You are cold. It is between 50 and 30 of this number.')
            attemps++
            charactersTried += guessNumber + ','
            console.log('You tried the next numbers: ' + charactersTried)
        } else if (difference < 30 && difference >= 20) {
            console.log('You are tempered. It is between 30 and 20 of this number.')
            attemps++
            charactersTried += guessNumber + ','
            console.log('You tried the next numbers: ' + charactersTried)
        } else if (difference < 20 && difference >= 10) {
            console.log('You are warm. It is between 20 and 10 of this number.')
            attemps++
            charactersTried += guessNumber + ','
            console.log('You tried the next numbers: ' + charactersTried)
        } else if (difference < 10 && difference >= 5) {
            console.log('You are hot. It is between 10 and 5 of this number.')
            attemps++
            charactersTried += guessNumber + ','
            console.log('You tried the next numbers: ' + charactersTried)
        } else if (difference < 5 && difference >= 1) {
            console.log('You are very hot. It is between 5 and 1 of this number.')
            attemps++
            charactersTried += guessNumber + ','
            console.log('You tried the next numbers: ' + charactersTried)
        }
    }
}

function showAttempsLeft() {
    console.log('You have ' + (maxAttemps - attemps) + ' left.')
}

console.log('...')
getRandomNumber()
console.log(randomNumber)
while (attemps < maxAttemps && win === false) {
    askGuessNumber()
    numberComparation()
    if (win != true) {
        showAttempsLeft()
    }
}
if (attemps === 10)
    console.log('You have no attempts left, you lose.')