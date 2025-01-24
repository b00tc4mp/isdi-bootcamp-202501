console.clear()
console.clear()
var namePlayer1 =''
var namePlayer2 = ''
var optionPlayer1 = ''
var optionPlayer2 = ''
var rock = 'rock'
var paper = 'paper'
var scissors = 'scissors'

function initialStatment() {
    namePlayer1 += prompt('Player 1, enter your name: ')
    namePlayer2 += prompt('Player 2, enter your name: ')
}

function choosingOption() {
    optionPlayer1 += prompt ('Please ' + namePlayer1 + ', choose: rock, paper or scissors')
    optionPlayer2 += prompt ('Please ' + namePlayer2 + ', choose: rock, paper or scissors')

}

function optionsComparation() {
    if (optionPlayer1===optionPlayer2) {
        console.log('Tie')
    }
        else if (optionPlayer1===rock && optionPlayer2===paper) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log(namePlayer2 + ' has choose ' + optionPlayer2)
            console.log(optionPlayer2 + ' wins ' + optionPlayer1 + '.' + namePlayer2 +" WIN!")
        }
        else if (optionPlayer1===rock && optionPlayer2===scissors) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log(namePlayer2 + ' has choose ' + optionPlayer2)
            console.log(optionPlayer1 + ' wins ' + optionPlayer2 + '.' + namePlayer1 + " WIN!")
        }
        else if (optionPlayer1===paper && optionPlayer2===rock) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log(namePlayer2 + ' has choose ' + optionPlayer2)
            console.log(optionPlayer1 + ' wins ' + optionPlayer2 + '.' + namePlayer1 + " WIN!")
        }
        else if (optionPlayer1===paper && optionPlayer2===scissors) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log(namePlayer2 + ' has choose ' + optionPlayer2)
            console.log(optionPlayer2 + ' wins ' + optionPlayer1 + '.' + namePlayer2 + " WIN!")
        }
        else if (optionPlayer1===scissors && optionPlayer2===rock) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log(namePlayer2 + ' has choose ' + optionPlayer2)
            console.log(optionPlayer2 + ' wins ' + optionPlayer1 + '.' + namePlayer2 + " WIN!")
        }
        else if (optionPlayer1===scissors && optionPlayer2===paper) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log(namePlayer2 + ' has choose ' + optionPlayer2)
            console.log(optionPlayer1 + ' wins ' + optionPlayer2 + '.' + namePlayer1 + " WIN!")
        }
    else {
        console.log('This is not a valid answer')
    }
            
}




console.log('...')
