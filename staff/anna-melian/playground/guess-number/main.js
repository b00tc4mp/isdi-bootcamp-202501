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
var attemps = 5
var maxNumber = 25
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
    guessNumber = prompt('Choose a number between 0 and '+ maxNumber + ': ')
    if (Number(guessNumber) >= 0 && Number(guessNumber) <= maxNumber ) {
        guessNumber = Number(guessNumber)
    }
    else {
        console.log('This number is not valid, the number has to be between 0 and '+ maxNumber + ': ')
        askGuessNumber()
    }

}

function numberComparation() {
    if (guessNumber === randomNumber ) {
        console.log('Is correct, congratulations!')
    } else if (guessNumber < randomNumber) {
        console.log('cold')
    } else if (guessNumber > randomNumber) {
        console.log('hot')
    }

}
