console.clear()
var randomNumber
var interval = []
var guessNumber
var attemps = 0
var maxAttemps = 10
var maxNumber = 100
var win = false

interval = []
for (var i = 0; i <= maxNumber; i++) {
     interval[interval.length] = i
}
function getRandomNumber() {
    var randomIndex = Math.floor(Math.random() * interval.length)
    randomNumber = interval[randomIndex]
    //return randomNumber
}


function askGuessNumber() {
    var numAlreadyTried = false
    guessNumber = prompt('Choose a number between 0 and '+ maxNumber + ': ')
    if (Number(guessNumber) >= 0 && Number(guessNumber) <= maxNumber ) {
        guessNumber = Number(guessNumber)
        
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
            console.log('You are very cold. Your guess was ' + guessNumber + '. Your number is 50 or more from the secret number.')
            actualAttemp++
            attemps++
        } else if (difference < 50 && difference >= 30) {
            console.log('You are cold. Your guess was ' + guessNumber +'. Your number is between 50 and 30 far away from the secret number.')
            attemps++
        } else if (difference < 30 && difference >= 20) {
            console.log('You are tempered. Your guess was ' + guessNumber +'. Your number is between 30 and 20 far away from the secret number.')
            attemps++
        } else if (difference < 20 && difference >= 10) {
            console.log('You are warm. Your guess was ' + guessNumber +'. Your number is between 20 and 10 far away from the secret number.')
            attemps++
        } else if (difference < 10 && difference >= 5) {
            console.log('You are hot. Your guess was ' + guessNumber +'. Your number is between 10 and 5 far away from the secret number.')
            attemps++
        } else if (difference < 5 && difference >= 1) {
            console.log('You are very hot. Your guess was ' + guessNumber +'. Your number is between 5 and 1 far away from the secret number.')
            attemps++
        }
        
    } else if (guessNumber > randomNumber) {
        difference = (guessNumber - randomNumber)
        if (difference >= 50 ) {
            console.log('You are very cold. Your guess was ' + guessNumber +'. Your number is 50 or more from the secret number.')
            attemps++
        } else if (difference < 50 && difference >= 30) {
            console.log('You are cold. Your guess was ' + guessNumber +'. Your number is between 50 and 30 far away from the secret number.')
            attemps++
        } else if (difference < 30 && difference >= 20) {
            console.log('You are tempered. Your guess was ' + guessNumber +'. Your number is between 30 and 20 far away from the secret number.')
            attemps++
        } else if (difference < 20 && difference >= 10) {
            console.log('You are warm. Your guess was ' + guessNumber +'. Your number is between 20 and 10 far away from the secret number.')
            attemps++
        } else if (difference < 10 && difference >= 5) {
            console.log('You are hot. Your guess was ' + guessNumber +'. Your number is between 10 and 5 far away from the secret number.')
            attemps++
        } else if (difference < 5 && difference >= 1) {
            console.log('You are very hot. Your guess was ' + guessNumber +'. Your number is between 5 and 1 far away from the secret number.')
            attemps++
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