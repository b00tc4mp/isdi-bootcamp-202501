// DATA
var data = {}
var interface = {}
var logic = {}
data.numbers = []
data.numbersTried = []
data.playerNumber = '' // Preguntar numero al usuario
data.attempts = 0 // Acumulador de intentos
data.maxAttempts = 10 // Máximo de intentos
data.randomNumber = generateRandomNumber(0,100) // Variable para almacenar el numero aleatorio generado por la funcion generateRandomNumber()
data.attempsPassed = false // Chivato para saber si hemos llegado al maximo de intentos
data.checkWin= false
data.regexNumber = /\d/
data.regexYN = /[y||n]/

// INTERFACE
interface.askNumber = function (){
    playerNumber = prompt('What number is it? (0 to 100 both included)') //preguntamos numero
    logic.numbersTriedFunction()
    try{
        logic.askNumber(playerNumber)

    }catch(error){
        alert(error.message)
        askNumber(); // Volver a preguntar si no es válido
    }
}

interface.checkAttempts = function(){
try{
    logic.checkAttempts()
    var checkAttempsMaxim = logic.checkAttempts()
    alert(checkAttempsMaxim)
    logic.playAgain()
}catch(error){
    alert(error.message)

    console.error(error)
}
}

interface.checkNumber = function(){
try{
    logic.checkNumber()
    var messageForUsuari = logic.checkNumber()
    alert(messageForUsuari)
}catch(error){
    alert(error.message)

    console.error(error)
}
}

interface.playAgain = function(){
    var wannaPlayAgain = prompt("Wanna play again? y/n") // Preguntar al usuario si quiere volver a jugar
    try{
    logic.playAgain(wannaPlayAgain)
    var thanksForPlaying = logic.playAgain() // Si no quieren  jugar mas capturaremos el valor que retornamos de la logica en esta variable.
    alert(thanksForPlaying) // Y lo mostraremos en un alert.
    }catch(error){
        alert(error.message)
        interface.playAgain() // Volver a preguntar si no es válido
    }
}

// LOGICA
logic.askNumber = function (playerNumber,randomNumber){
    if (!regexNumber.test(playerNumber)) { // Verificar si la entrada es válida
        throw new Error ('Only numbers please! ')
        
   }
    if(randomNumber == playerNumber){
        checkWin = true
        return "¡YOU WIN! you have succeeded in " + attempts + " attempts" //Comprobamos si coinciden los numeros
    }else{ attempts++
         }
}

logic.checkAttempts = function(){
    if (attempts >= maxAttempts){
        attempsPassed = true
        return "You've passed the max attempts, try again." + "\n"+ "The number was: " + randomNumber
    }   
}

logic.checkNumber = function(){
    var number1 = data.numbers[0]
    var number2 = data.numbers[1]
    var substractNumbers = number1 - number2

    //COMPROBAR DIFERENCIA 
    if (number1 == number2){ // Si hemos ganado se felicita
        return "Congrats!"
    }
    else if (substractNumbers >= 50 ){ //- si intento (numero) tiene una diferencia >= 50 con el random, entonces "very cold"
        return "Very Cold! " + "\n" + "you tried: " + numbersTried  
    }
    else if ( substractNumbers < 50 && substractNumbers >= 30 ){ // - si intento tiene una diferencia < 50 y >= 30, entonces "cold"
        return "Cold" + "\n" + "you tried: " + numbersTried
    }
    else if ( substractNumbers < 30 && substractNumbers >= 20 ){ // - si intento tiene una diferencia < 30 y >= 20, entonces "tempered"
        return "tempered" + "\n" + "you tried: " + numbersTried 
    }
    else if ( substractNumbers < 20 && substractNumbers >= 10 ){ // - si intento tiene una diferencia < 20 y >= 10, entonces "warm"
        return "warm" + "\n" + "you tried: " + numbersTried 
    }
    else if ( substractNumbers < 10 && substractNumbers >= 5 ){ // - si intento tiene una diferencia < 10 y >= 5, entonces "hot"
        return "hot" + "\n" + "you tried: " + numbersTried   
    }
    else if ( substractNumbers < 5 && substractNumbers >= 1 ){ // - si intento tiene una diferencia < 5 y >= 1, entonces "very hot"
        return "very hot" + "\n" + "you tried: " + numbersTried
    }
}


logic.playAgain = function(playAgain){

    if (!data.regexYN.test(playAgain)) { // Verificar si la entrada es válida
        throw new Error("Only 'y' or 'n' in lower case please!"); 
    }
    else{
        if(playAgain === 'y'){ // Si marca 'y' reseteamos variables a 0 y activamos funcion en modo auto
            numbersTried = []
            checkWin = false
            attempsPassed = false
            attempts = 0
            randomNumber = logic.generateRandomNumber()
            playerNumber = 0
            gameAutoMode()
    }else if(playAgain === 'n'){ // Si marca 'n' damos las gracias por jugar y salimos del programa.
        return ('thanks for playing!') // Si no quieren retornamos este string a la funcion.
    }
    }
}

logic.numberSort =  function(){
// Funcion para ordenar los numeros de mayor a menor   
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

logic.generateRandomNumber = function (){
    datarandomNumber =  Math.floor(Math.random() * (100 + 1)) /* math.random genera una funcion decimal aleatoria entre 0 y 1, 
                                                                    lo multiplicamos por 101 lo que dara un numero decimal entre 0 y casi 101, 
                                                                    con math.flor() arrodondeamos hacia abajo asi casi 1 dara 0 y casi 101 dara 100 */ 
}

logic.numbersTriedFunction = function (){ // Una funcion para insertar los numeros intentados
if (attempts == 0){
    numbersTried[0] = playerNumber // Ponemos en el indice 0 el primer numero intentado
    }
    if(attempts >= 1){
    numbersTried[attempts] = playerNumber //Aprovechando el contador de intentos vamos insertando los numeros probados en el array.
    }
}

logic.gameAutoMode = function(){ // Funcion para que el juego vaya en automatico.     
    while(attempsPassed == false && checkWin == false ){ // Se ejecutaran las funciones en automatico hasta que el chivato de intentos fallidos marque o el usuario gane. 
        askNumber()
        numberSort() 
       if(checkWin == false) checkNumber()
        checkAttempts()
        
 }
    interface.playAgain()

}

gameAutoMode()