console.clear()
var namePlayer1 =''
var optionPlayer1 = ''

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
    namePlayer1 = prompt('Player 1, enter your name: ')
}

function choosingOptionPlayer1() {
    optionPlayer1 = prompt ('Please ' + namePlayer1 + ', choose: ROCK, PAPER or SCISSORS')

}


function validOptionPlayer1() {
    if (optionPlayer1 === rock || optionPlayer1 === paper || optionPlayer1 === scissors) {
        validOption1 = true
    }
    else {
        console.log('This is not a valid answer, the options are : ROCK, PAPER or SCISSORS and has to be in uppercase.')
        choosingOptionPlayer1()
    }
}

function optionsComparation() {
    if (optionPlayer1===randomOption) {
        console.log('TIE')
    }
        else if (optionPlayer1===rock && randomOption===paper) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log('The machine has choose ' + randomOption)
            console.log(randomOption + ' wins ' + optionPlayer1 + '. The machine WIN!')
        }
        else if (optionPlayer1===rock && randomOption===scissors) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log('The machine has choose ' + randomOption)
            console.log(optionPlayer1 + ' wins ' + randomOption + '. ' + namePlayer1 + " WIN!")
        }
        else if (optionPlayer1===paper && randomOption===rock) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log('The machine has choose ' + randomOption)
            console.log(optionPlayer1 + ' wins ' + randomOption + '. ' + namePlayer1 + " WIN!")
        }
        else if (optionPlayer1===paper && randomOption===scissors) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log('The machine has choose ' + randomOption)
            console.log(randomOption + ' wins ' + optionPlayer1 + '. The machine WIN!')
        }
        else if (optionPlayer1===scissors && randomOption===rock) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log('The machine has choose ' + randomOption)
            console.log(randomOption + ' wins ' + optionPlayer1 + '. The machine WIN!')
        }
        else if (optionPlayer1===scissors && randomOption===paper) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log('The machine has choose ' + randomOption)
            console.log(optionPlayer1 + ' wins ' + randomOption + '. ' + namePlayer1 + " WIN!")
        }
            
}


function play() {
    initialStatment()
    choosingOptionPlayer1()
    while (validOption1 === false) {
        validOptionPlayer1()
    }
    optionsComparation()
    
}



console.log('...')
