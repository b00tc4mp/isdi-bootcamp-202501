var numbers = []
var playerNumber = 90
var attempts = 0
var maxAttempts = 10
var randomNumber = generateRandomNumber(0,100)

function numberSort (){
        // si devuelve numero negativo random number es mas pequeño que player number
        // si la resta es igual a 0 es que son el mismo numero
        // si devuelve numero positivo random number es mas grande
    var substractNumberSort = randomNumber - playerNumber
    if (substractNumberSort < 0){
            numbers[0] = playerNumber
            numbers[1] = randomNumber
            }
    else if (substractNumberSort > 0 ){
        numbers[1] = playerNumber
        numbers[0] = randomNumber
    }
    else if (substractNumberSort == 0 ){
        console.log("Has acertado!")
    }
}

function generateRandomNumber(){
    return randomNumber =  Math.floor(Math.random() * (100-0 + 1)) + 0     
}


function askNumber(){
    playerNumber = prompt('What number is it?')
}


function checkAttempts (){
    if (attempts >= maxAttempts){
        alert ("You've passed the max attempts, try again")
        //poner si desea volver a jugar o no
    }
}

function checkNumber(){  
    var number1 = numbers[0]
    var number2 = numbers[1]
    var substractNumbers = number1 - number2

    //COMPROBAR DIFERENCIA 
    if (substractNumbers >= 50 ){ //- si intento (numero) tiene una diferencia >= 50 con el random, entonces "very cold"
        console.log("Very Cold!")
        attempts++
    }
    else if ( substractNumbers < 50 && substractNumbers >= 30 ){ // - si intento tiene una diferencia < 50 y >= 30, entonces "cold"
        console.log("Cold")
        attempts++
    }
    else if ( substractNumbers < 30 && substractNumbers >= 20 ){ // - si intento tiene una diferencia < 30 y >= 20, entonces "tempered"
        console.log("tempered")
        attempts++
    }
    else if ( substractNumbers < 20 && substractNumbers >= 10 ){ // - si intento tiene una diferencia < 20 y >= 10, entonces "warm"
        console.log("warm")
        attempts++
    }
    else if ( substractNumbers < 10 && substractNumbers >= 5 ){ // - si intento tiene una diferencia < 10 y >= 5, entonces "hot"
        console.log("hot")
        attempts++
    }
    else if ( substractNumbers < 5 && substractNumbers >= 1 ){ // - si intento tiene una diferencia < 5 y >= 1, entonces "very hot"
        console.log("very hot")
        attempts++
    }
}