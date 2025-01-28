var numbers = [] // Array para introducir los numeros ordenados
var numbersTried = []
var playerNumber = '' // Preguntar numero al usuario
var attempts = 0 // Acumulador de intentos
var maxAttempts = 10 // Máximo de intentos
var randomNumber = generateRandomNumber(0,100) // Variable para almacenar el numero aleatorio generado por la funcion generateRandomNumber()
var attempsPassed = false // Chivato para saber si hemos llegado al maximo de intentos
var checkWin= false
var regexNumber = /\d/
var regexYN = /[y||n]/

function numberSort (){ // Funcion para ordenar los numeros de mayor a menor   
    var substractNumberSort = randomNumber - playerNumber
    
    if (substractNumberSort < 0){  // si devuelve numero negativo random number es mas pequeño que player number
            numbers[0] = playerNumber
            numbers[1] = randomNumber
            }
    else if (substractNumberSort > 0 ){// si devuelve numero positivo random number es mas grande
        numbers[1] = playerNumber
        numbers[0] = randomNumber
    }
}

function generateRandomNumber(){
    return randomNumber =  Math.floor(Math.random() * (100 + 1)) /* math.random genera una funcion decimal aleatoria entre 0 y 1, 
                                                                    lo multiplicamos por 101 lo que dara un numero decimal entre 0 y casi 101, 
                                                                    con math.flor() arrodondeamos hacia abajo asi casi 1 dara 0 y casi 101 dara 100 */ 
}
function numbersTriedFunction(){ // Una funcion para insertar los numeros intentados
    if (attempts == 0){
    numbersTried[0] = playerNumber // Ponemos en el indice 0 el primer numero intentado
    }
    if(attempts >= 1){
    numbersTried[attempts] = playerNumber //Aprovechando el contador de intentos vamos insertando los numeros probados en el array.
    }
}
function askNumber(){    
    playerNumber = prompt('What number is it? (0 to 100 both included)') //preguntamos numero
    numbersTriedFunction()
     if (!regexNumber.test(playerNumber)) { // Verificar si la entrada es válida
        alert("Only numbers please!");
        askNumber(); // Volver a preguntar si no es válido
   }
    if(randomNumber == playerNumber){
        alert("¡YOU WIN! you have succeeded in " + attempts + " attempts") //Comprobamos si coinciden los numeros
        checkWin = true
    }else{ attempts++
        
         }
}

function checkAttempts(){ //Funcion para comprobar si hemos llegado al maximo de intentos.
     if (attempts >= maxAttempts){
        alert ("You've passed the max attempts, try again." + "\n"+ "The number was: " + randomNumber)
        attempsPassed = true
        playAgain()
    }
}
   
function checkNumber(){  
    var number1 = numbers[0]
    var number2 = numbers[1]
    var substractNumbers = number1 - number2

    //COMPROBAR DIFERENCIA 
    if (number1 == number2){ // Si hemos ganado se felicita
        alert("Congrats!")
    }
    else if (substractNumbers >= 50 ){ //- si intento (numero) tiene una diferencia >= 50 con el random, entonces "very cold"
        alert("Very Cold! " + "\n" + "you tried: " + numbersTried)   
    }
    else if ( substractNumbers < 50 && substractNumbers >= 30 ){ // - si intento tiene una diferencia < 50 y >= 30, entonces "cold"
        alert("Cold" + "\n" + "you tried: " + numbersTried)  
    }
    else if ( substractNumbers < 30 && substractNumbers >= 20 ){ // - si intento tiene una diferencia < 30 y >= 20, entonces "tempered"
        alert("tempered" + "\n" + "you tried: " + numbersTried)   
    }
    else if ( substractNumbers < 20 && substractNumbers >= 10 ){ // - si intento tiene una diferencia < 20 y >= 10, entonces "warm"
        alert("warm" + "\n" + "you tried: " + numbersTried) 
    }
    else if ( substractNumbers < 10 && substractNumbers >= 5 ){ // - si intento tiene una diferencia < 10 y >= 5, entonces "hot"
        alert("hot" + "\n" + "you tried: " + numbersTried)   
    }
    else if ( substractNumbers < 5 && substractNumbers >= 1 ){ // - si intento tiene una diferencia < 5 y >= 1, entonces "very hot"
        alert("very hot" + "\n" + "you tried: " + numbersTried)
    }
}

function playAgain(){
    var playAgain = prompt("Wanna play again? y/n") // Preguntar al usuario si quiere volver a jugar
    if (!regexYN.test(playAgain)) { // Verificar si la entrada es válida
        alert("Only 'y' or 'n' in lower case please!");
        playAgain() // Volver a preguntar si no es válido
    }
    else{
        if(playAgain === 'y'){ // Si marca 'y' reseteamos variables a 0 y activamos funcion en modo auto
            numbersTried = []
            checkWin = false
            attempsPassed = false
            attempts = 0
            randomNumber = 0
            playerNumber = 0
            gameAutoMode()
    }else if(playAgain === 'n'){ // Si marca 'n' damos las gracias por jugar y salimos del programa.
        alert("Thanks for playing")
    }
    }
}

function gameAutoMode(){ // Funcion para que el juego vaya en automatico.     
   while(attempsPassed == false && checkWin == false ){ // Se ejecutaran las funciones en automatico hasta que el chivato de intentos fallidos marque o el usuario gane. 
       askNumber()
       numberSort() 
      if(checkWin == false) checkNumber()
       checkAttempts()
       
}
    playAgain()
}
gameAutoMode()