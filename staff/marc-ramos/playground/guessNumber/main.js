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
var numbers = []
var playerNumber = 0
var attempts = 0
var maxAttempts = 10

function numberSort (randomNumber,playerNumber){
        // si devuelve numero negativo random number es mas pequeño que player number
        // si la resta es igual a 0 es que son el mismo numero
        // si devuelve numero positivo random number es mas grande
    if ((randomNumber - playerNumber) < 0){
            numbers = playerNumber[0]
            numbers = randomNumber[1]
            }
    else if ((randomNumber - playerNumber) > 0 ){
        numbers = playerNumber[1]
        numbers = randomNumber[0]
    }
    else if ((randomNumber - playerNumber) == 0 ){
        console.log("Has acertado!")
    }
}

var substractNumbers = numbers[0] - numbers[1]
    
function checkAttempts (){
    if (attempts >= maxAttempts){
        alert ("You've passed the max attempts, try again")
        //poner si desea volver a jugar o no
    }
}

function generateRandomNumber(){
    return randomNumber =  Math.floor(Math.random() * (100-0 + 1)) + 0     
}
var randomNumber = generateRandomNumber(0,100)

function askNumber(){
    playerNumber = prompt('What number is it?')
}

function checkNumber(){
    if ((randomNumber - playerNumber) >= 50){
        alert('Very cold!, try again with another number please')
        attempts ++
        
    } else if ((randomNumber - playerNumber) < 50 && playerNumber >= 30){
        alert('Cold! try again with another number please')
        attempts ++
        
    } else if ((randomNumber - playerNumber) < 30 && playerNumber >= 20){
        alert('Tempered! try again with another number please')
        attempts ++
        
    } else if ((randomNumber - playerNumber) < 20 && playerNumber >= 10){
        alert('Warm! try again with another number please')
        attempts ++
        
    } else if ((randomNumber - playerNumber) < 10 && playerNumber >= 5){
        alert('Hot! try again with another number please')
        attempts ++
        
    } else if ((randomNumber - playerNumber) < 5 && playerNumber >= 1){
        alert('Very hot! try again with another number please')
        attempts ++
    }
}
