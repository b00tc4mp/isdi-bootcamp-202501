/*
- generar numero aleatorio entre 1 y 100
- oportunidades maximas (10) y actuales del user
- pedir numero al usuario (explicando que tiene que ser entre 1 y 100 y que tiene 10 oportunities)
- si intento (numero) tiene una diferencia >= 50 con el random, entonces "very cold"
- si intento tiene una diferencia < 50 y >= 30, entonces "cold"
- si intento tiene una diferencia < 30 y >= 20, entonces "tempered"
- si intento tiene una diferencia < 20 y >= 10, entonces "warm"
- si intento tiene una diferencia < 10 y >= 5, entonces "hot"
- si intento tiene una diferencia < 5 y >= 1, entonces "very hot"
- si acierta en menos de 10 intentos, win! por el contrario lost!
*/

// DATA

var randomNumber = generateRandomNumber(0,100)
var maxChances = 10
var userChances = 0
var playerNumber = 0
var chancesLeft = maxChances - userChances
var numberDiference = 0

// LOGIC

function generateRandomNumber(){
    return randomNumber =  Math.floor(Math.random() * (100-0 + 1)) + 0     
}

function differenceNumbers(){
    if (playerNumber === randomNumber){
        winGame()
    } else if (playerNumber > randomNumber){
        numberDiference = playerNumber - randomNumber
    } else if (randomNumber > playerNumber){
        numberDiference = randomNumber - playerNumber
    }
}

// PRESENTATION

function askNumber(){
    playerNumber = 0
    playerNumber = prompt ('What number is it? ' + '\n' + 'You have ' + chancesLeft + ' chances left')
}

function winGame(){
    alert ('Congratulations! YOU WIN! with ' + chancesLeft + ' chances left' + '\n' + 'The number was ' + randomNumber)
}

function checkNumber(){
    if (numberDiference >= 50){

        alert ('Very cold!' + '\n' + 'You have ' + chancesLeft + ' chances left')
        userChances++
        askNumber()

    } else if (numberDiference < 50 && numberDiference >= 30){

        alert ('Cold!' + '\n' + 'You have ' + chancesLeft + ' chances left')
        userChances++
        askNumber()

    } else if (numberDiference < 30 && numberDiference >= 20){

        alert ('Tempered!' + '\n' + 'You have ' + chancesLeft + ' chances left')
        userChances++
        askNumber()

    } else if (numberDiference < 20 && numberDiference >= 10){

        alert ('Warm!' + '\n' + 'You have ' + chancesLeft + ' chances left')
        userChances++
        askNumber()

    } else if (numberDiference < 10 && numberDiference >= 5){

        alert ('Hot!' + '\n' + 'You have ' + chancesLeft + ' chances left')
        userChances++
        askNumber()

    } else if (numberDiference < 5 && numberDiference >= 1){

        alert ('Very hot!' + '\n' + 'You have ' + chancesLeft + ' chances left')
        userChances++
        askNumber()

    }
}