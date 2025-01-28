/* 
player:
- guess number from 0 to 100
- 10 tries
- difference < 50 >= 30, 'cold'
- difference < 30 >= 20, 'tempered'
- < 20 >= 10, 'warm'
- < 10 >=  
 */

var turns = 10
var mainNumber 
var playerGuess 

console.log(turns)

function createNumber() {
mainNumber = Math.floor(Math.random() * 100 + 1)
}

function chooseNumber() {
playerGuess = prompt('Please, write a number from 0 to 100')
}

function win() {return mainNumber === +playerGuess}

function hint() {
    var difference = mainNumber - playerGuess
    if (difference < 5 && difference > -5) {
        alert(`Very hot! Try one more time, you have ${turns} turns left`)
    } else if (difference < 10 && difference > -10) {
        alert(`It's hot! Try one more time, you have ${turns} turns left`)
    } else if (difference < 20 && difference > -20) {
        alert(`It's warm! Try one more time, you have ${turns} turns left`)
    } else if (difference < 30 && difference > -30) {
        alert(`It's tempered! Try one more time, you have ${turns} turns left`)
    } else if (difference < 50 && difference > -50) {
        alert(`It's cold! Try one more time, you have ${turns} turns left`)
    } else if (difference < 100 && difference > -100) {
        alert(`It's very cold! Try one more time, you have ${turns} turns left`)
    }
}

createNumber()
while  (turns > 0) {
chooseNumber()
    if (win()) {
        console.log(`Super! You win this game! The number was ${mainNumber}`)
        break
    }
turns--
hint()
}

if (!win()) 
    console.log('Oh no, you\'ve lost :(')