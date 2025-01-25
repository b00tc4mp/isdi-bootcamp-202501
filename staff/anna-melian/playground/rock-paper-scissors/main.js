console.clear()
var namePlayer1 =''
var namePlayer2 = ''
var optionPlayer1 = ''
var optionPlayer2 = ''
var rock = 'ROCK'
var paper = 'PAPER'
var scissors = 'SCISSORS'
var validOption1 = false
var validOption2 = false

function initialStatment() {
    namePlayer1 = prompt('Player 1, enter your name: ')
    namePlayer2 = prompt('Player 2, enter your name: ')
}

function choosingOptionPlayer1() {
    optionPlayer1 = prompt ('Please ' + namePlayer1 + ', choose: ROCK, PAPER or SCISSORS')

}

function choosingOptionPlayer2() {
    optionPlayer2 = prompt ('Please ' + namePlayer2 + ', choose: ROCK, PAPER or SCISSORS')

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

function validOptionPlayer2() {
    if (optionPlayer2 === rock || optionPlayer2 === paper || optionPlayer2 === scissors) {
        validOption2 = true
    }
    else {
        console.log('This is not a valid answer, the options are : ROCK, PAPER or SCISSORS and has to be in uppercase.')
        choosingOptionPlayer2()

    }
}

function optionsComparation() {
    if (optionPlayer1===optionPlayer2) {
        console.log('TIE')
    }
        else if (optionPlayer1===rock && optionPlayer2===paper) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log(namePlayer2 + ' has choose ' + optionPlayer2)
            console.log(optionPlayer2 + ' wins ' + optionPlayer1 + '. ' + namePlayer2 +" WIN!")
        }
        else if (optionPlayer1===rock && optionPlayer2===scissors) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log(namePlayer2 + ' has choose ' + optionPlayer2)
            console.log(optionPlayer1 + ' wins ' + optionPlayer2 + '. ' + namePlayer1 + " WIN!")
        }
        else if (optionPlayer1===paper && optionPlayer2===rock) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log(namePlayer2 + ' has choose ' + optionPlayer2)
            console.log(optionPlayer1 + ' wins ' + optionPlayer2 + '. ' + namePlayer1 + " WIN!")
        }
        else if (optionPlayer1===paper && optionPlayer2===scissors) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log(namePlayer2 + ' has choose ' + optionPlayer2)
            console.log(optionPlayer2 + ' wins ' + optionPlayer1 + '. ' + namePlayer2 + " WIN!")
        }
        else if (optionPlayer1===scissors && optionPlayer2===rock) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log(namePlayer2 + ' has choose ' + optionPlayer2)
            console.log(optionPlayer2 + ' wins ' + optionPlayer1 + '. ' + namePlayer2 + " WIN!")
        }
        else if (optionPlayer1===scissors && optionPlayer2===paper) {
            console.log(namePlayer1 + ' has choose ' + optionPlayer1)
            console.log(namePlayer2 + ' has choose ' + optionPlayer2)
            console.log(optionPlayer1 + ' wins ' + optionPlayer2 + '. ' + namePlayer1 + " WIN!")
        }
            
}


function play() {
    initialStatment()
    choosingOptionPlayer1()
    while (validOption1 === false) {
        validOptionPlayer1()
    }
    choosingOptionPlayer2()
    while (validOption2 === false) {
        validOptionPlayer2()
    }
    optionsComparation()
    
}



console.log('...')