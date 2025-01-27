console.clear()
var namePlayer1 = ''
var namePlayer2 = ''
var optionPlayer1 = ''
var optionPlayer2 = ''
var rock = 'ROCK'
var paper = 'PAPER'
var scissors = 'SCISSORS'
var player1Punctuation = 0
var player2Punctuation = 0

function initialStatment() {
    namePlayer1 = prompt('Player 1, enter your name: ')
    namePlayer2 = prompt('Player 2, enter your name: ')
}

function choosingOption(playerName) {
    return prompt('Please ' + playerName + ', choose: ROCK, PAPER or SCISSORS').toUpperCase()
}

function validOption(option) {
    return option === rock || option === paper || option === scissors
}

function choosingOptions() {
    optionPlayer1 = choosingOption(namePlayer1)
    while (!validOption(optionPlayer1)) {
        console.log('This is not a valid answer, the options are : ROCK, PAPER or SCISSORS.')
        optionPlayer1 = choosingOption(namePlayer1)
    }

    optionPlayer2 = choosingOption(namePlayer2)
    while (!validOption(optionPlayer2)) {
        console.log('This is not a valid answer, the options are : ROCK, PAPER or SCISSORS.')
        optionPlayer2 = choosingOption(namePlayer2)
    }
}

function optionsComparation() {
    console.log(namePlayer1 + ' has chosen ' + optionPlayer1)
    console.log(namePlayer2 + ' has chosen ' + optionPlayer2)

    if (optionPlayer1 === optionPlayer2) {
        console.log('TIE')
    } else if (
        (optionPlayer1 === rock && optionPlayer2 === scissors) ||
        (optionPlayer1 === paper && optionPlayer2 === rock) ||
        (optionPlayer1 === scissors && optionPlayer2 === paper)
    ) {
        console.log(optionPlayer1 + ' wins ' + optionPlayer2 + '. ' + namePlayer1 + " WIN!")
        player1Punctuation++;
    } else {
        console.log(optionPlayer2 + ' wins ' + optionPlayer1 + '. ' + namePlayer2 + " WIN!")
        player2Punctuation++
    }
}

function gameScore() {
    console.log('Game score: ' + namePlayer1 + ': ' + player1Punctuation + '  ' + namePlayer2 + ': ' + player2Punctuation)
}

function play() {
    choosingOptions()
    optionsComparation()
    gameScore()
}

function keepPlaying() {
        var keepPlay = prompt('Do you want to keep playing? YES or NO').toUpperCase()
    while (keepPlay !== 'YES' && keepPlay !== 'NO') {
        console.log('This is not a valid answer, the options are: YES or NO.')
        keepPlay = prompt('Do you want to keep playing? YES or NO').toUpperCase()
    }
    return keepPlay
}

console.log('...')
initialStatment()

var keepPlay = 'YES'
while (keepPlay === 'YES') {
    play()
    keepPlay = keepPlaying() 
}

console.log('Thank you for playing!')
