// implement guess-number game (orienting player with temperature: 'very cold', 'cold', 'mild', 'warm', 'hot', 'super hot')

/*
player
- adivinar numero random que sólo conoce la maquina (entre 0 y 100)
- tiene 10 intentos
- si intento (numero) tiene una diferencia >= 50 con el random, entonces "very cold"
- si intento tiene una diferencia < 50 y >= 30, entonces "cold"
- si intento tiene una diferencia < 30 y >= 20, entonces "mild"
- si intento tiene una diferencia < 20 y >= 10, entonces "warm"
- si intento tiene una diferencia < 10 y >= 5, entonces "hot"
- si intento tiene una diferencia < 5 y >= 1, entonces "very hot"
- si acierta en menos de 10 intentos, win! por el contrario lost!
*/

var randomNumber = 0
var attempts = 0
var maxAttempts = 10
var winner = false
var playerNumber = 0

function makeRandomNumber () {
    randomNumber = Math.floor((Math.random() * 100 + 1))
    console.log(randomNumber)
}

function askNumber () {
    playerNumber = prompt('Write a number between 0 and 100')

    if (playerNumber === null) {
        console.log('The play was cancelled')
        return null
    }

    if (playerNumber > 100 || playerNumber < 0) {
        askNumber()    
    }

    attempts++
    
    return playerNumber
}

function guessNumber () {
    var difference = 0

    if (playerNumber > randomNumber) {
        difference = playerNumber - randomNumber
    } else if (randomNumber > playerNumber) {
        difference = randomNumber - playerNumber
    }

    if (difference === 0) {
        console.log('Good luck, you won!')
        winner = true
        return playerNumber
    } else if (difference >= 1 && difference < 5) {
        console.log('Very hot')
        return playerNumber
    } else if (difference < 10) {
        console.log('Hot')
        return playerNumber
    } else if (difference < 20) {
        console.log('Warm')
        return playerNumber
    } else if (difference < 30) {
        console.log('Mild')
        return playerNumber
    } else if (difference < 50) {
        console.log('Cold')
        return playerNumber
    } else {
        console.log('Very cold')
        return playerNumber
    }
}

makeRandomNumber()

while (attempts < maxAttempts && winner === false) {
    askNumber()
    guessNumber()
}

if (attempts === maxAttempts && winner === false) {
    console.log('You re a LOOSER!')
}
