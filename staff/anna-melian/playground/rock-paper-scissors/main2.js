console.clear()
var namePlayer1 = prompt('Player 1, enter your name: ')
var optionPlayer1 = ''
var player1Punctuation = 0
var machinePunctuation = 0

var listOptions = ['ROCK','PAPER','SCISSORS']
// Seleccionar un índice aleatorio
var randomIndex = Math.floor(Math.random() * listOptions.length);


// Obtener el elemento aleatorio
var randomOption = listOptions[randomIndex];

var rock = 'ROCK'
var paper = 'PAPER'
var scissors = 'SCISSORS'
var validOption1 = false

function initialStatment() {
// Seleccionar un índice aleatorio
    randomIndex = Math.floor(Math.random() * listOptions.length);

// Obtener el elemento aleatorio
    randomOption = listOptions[randomIndex];
}

function choosingOptionPlayer1() {
    optionPlayer1 = prompt ('Please ' + namePlayer1 + ', choose: ROCK, PAPER or SCISSORS').toUpperCase()

}


function validOptionPlayer1() {
    if (optionPlayer1 === rock || optionPlayer1 === paper || optionPlayer1 === scissors) {
        validOption1 = true
    }
    else {
        console.log('This is not a valid answer, the options are : ROCK, PAPER or SCISSORS and has to be in uppercase.')
        choosingOptionPlayer1()
        validOptionPlayer1()
    }
}

function optionsComparation() {
    if (optionPlayer1===randomOption) {
        console.log('You have choose the same options.\n\TIE')
    }
        else if (optionPlayer1===rock && randomOption===paper) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log('The machine has choose ' + randomOption)
            console.log(randomOption + ' wins ' + optionPlayer1 + '. The machine WIN!')
            machinePunctuation++
        }
        else if (optionPlayer1===rock && randomOption===scissors) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log('The machine has choose ' + randomOption)
            console.log(optionPlayer1 + ' wins ' + randomOption + '. ' + namePlayer1 + " WIN!")
            player1Punctuation++
        }
        else if (optionPlayer1===paper && randomOption===rock) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log('The machine has choose ' + randomOption)
            console.log(optionPlayer1 + ' wins ' + randomOption + '. ' + namePlayer1 + " WIN!")
            player1Punctuation++
        }
        else if (optionPlayer1===paper && randomOption===scissors) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log('The machine has choose ' + randomOption)
            console.log(randomOption + ' wins ' + optionPlayer1 + '. The machine WIN!')
            machinePunctuation++
        }
        else if (optionPlayer1===scissors && randomOption===rock) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log('The machine has choose ' + randomOption)
            console.log(randomOption + ' wins ' + optionPlayer1 + '. The machine WIN!')
            machinePunctuation++
        }
        else if (optionPlayer1===scissors && randomOption===paper) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log('The machine has choose ' + randomOption)
            console.log(optionPlayer1 + ' wins ' + randomOption + '. ' + namePlayer1 + " WIN!")
            player1Punctuation++
        }
            
}

function gameScore() {
    console.log('Game score: ' + namePlayer1 + ': ' + player1Punctuation + '  ' + 'Machine: ' + machinePunctuation)
}


function play() {
    choosingOptionPlayer1()
    validOptionPlayer1()
    while (validOption1 === false) {
        choosingOptionPlayer1()
        validOptionPlayer1()
    }
    optionsComparation()
    gameScore()
    
}

function keepPlaying() {
    var keepPlay = prompt('Do you want to keep playing? YES or NO').toUpperCase()
    while (keepPlay !== 'YES' && keepPlay !== 'NO') {
        console.log('This is not a valid answer, the options are: YES or NO.')
        keepPlay = prompt('Do you want to keep playing? YES or NO').toUpperCase()
    }
    return keepPlay;  
}


console.log('...');
initialStatment(); 

var keepPlay = 'YES'
while (keepPlay === 'YES') {
    initialStatment()
    play()
    keepPlay = keepPlaying()
}

console.log('Thank you for playing!')
