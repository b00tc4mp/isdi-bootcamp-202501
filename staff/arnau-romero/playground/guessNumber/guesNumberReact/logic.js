// LOGICA
const logic = {
   // generar numero aleatorio
    generateRandomNumber (){
        data.randomNumber = Math.floor(Math.random() * (100 + 1)) /* math.random genera una funcion decimal aleatoria entre 0 y 1, 
                                                                    lo multiplicamos por 101 lo que dara un numero decimal entre 0 y casi 101, 
                                                                    con math.flor() arrodondeamos hacia abajo asi casi 1 dara 0 y casi 101 dara 100 */ 
    },
    
    // comprobar numero
    checkNumber(playerNumber){
    
        if (!data.reGexs.regexNumber.test(playerNumber)) { // Verificar si la entrada es válida
            throw new Error ('Only numbers please! ')
        
        }
        //verificar si hemos acertado, sino subir intentos.
        if(data.randomNumber == playerNumber){
            data.booleans.checkWin = true
        }else{ data.constant.attempts++
        }
    },
    
    // Ordenar los numeros para poder restarlos
    numberSort(playerNumber){
        // Funcion para ordenar los numeros de mayor a menor   
        const substractNumberSort = data.randomNumber - playerNumber
            
        if (substractNumberSort < 0){  // si devuelve numero negativo random number es mas pequeño que player number
                data.arrays.numbers[0] = playerNumber
                data.arrays.numbers[1] = data.randomNumber
                }
        else if (substractNumberSort > 0 ){// si devuelve numero positivo random number es mas grande
             data.arrays.numbers[1] = playerNumber
             data.arrays.numbers[0] = data.randomNumber
        }
    },

    // comprobar diferencia en caso de fallo
    checkRest(){
        const number1 = data.arrays.numbers[0]
        const number2 = data.arrays.numbers[1]
        const substractNumbers = number1 - number2

        //COMPROBAR DIFERENCIA 
        if (number1 == number2){ // Si hemos ganado se felicita
            return "Congrats!"
        }
        else if (substractNumbers >= 50 ){ //- si intento (numero) tiene una diferencia >= 50 con el random, entonces "very cold"
            return "Very Cold! 🥶" + "\n" + "you tried: " + data.arrays.numbersTried  
        }
        else if ( substractNumbers < 50 && substractNumbers >= 30 ){ // - si intento tiene una diferencia < 50 y >= 30, entonces "cold"
            return "Cold 🧊" + "\n" + "you tried: " + data.arrays.numbersTried
        }
        else if ( substractNumbers < 30 && substractNumbers >= 20 ){ // - si intento tiene una diferencia < 30 y >= 20, entonces "tempered"
            return "tempered ☀️" + "\n" + "you tried: " + data.arrays.numbersTried 
        }
        else if ( substractNumbers < 20 && substractNumbers >= 10 ){ // - si intento tiene una diferencia < 20 y >= 10, entonces "warm"
            return "warm🤔" + "\n" + "you tried: " + data.arrays.numbersTried 
        }
        else if ( substractNumbers < 10 && substractNumbers >= 5 ){ // - si intento tiene una diferencia < 10 y >= 5, entonces "hot"
            return "hot🔥" + "\n" + "you tried: " + data.arrays.numbersTried   
        }
        else if ( substractNumbers < 5 && substractNumbers >= 1 ){ // - si intento tiene una diferencia < 5 y >= 1, entonces "very hot"
            return "very hot 🫠🔥" + "\n" + "you tried: " + data.arrays.numbersTried
        }
    },

    // Comprobar si hemos pasado los intentos
    checkAttempts(){
        if (data.constant.attempts >= data.constant.maxAttempts){
            data.booleans.attempsPassed = true
            //return "You've passed the max attempts, try again." + "\n"+ "The number was: " + data.randomNumber
            }
        //return 'keep trying'
    },

    // Comprobar si hemos perdido
    isGameOver() {
        return data.booleans.attempsPassed  || data.booleans.checkWin
    },

    // Comprobar si hemos perdido
    isWon() {
        return data.booleans.checkWin
    },

    // resetear juego
    resetGame(){
                //data.arrays.numbersTried = []
                data.booleans.checkWin = false
                data.constant.attempsPassed = false
                data.constant.attempts = 0
            
    },

    numbersTriedFunction (playerNumber){ // Una funcion para insertar los numeros intentados
        if (data.constant.attempts === 1){
        data.arrays.numbersTried[0] = playerNumber // Ponemos en el indice 0 el primer numero intentado
        }
        if(data.constant.attempts > 1){
        data.arrays.numbersTried[data.constant.attempts-1] = playerNumber //Aprovechando el contador de intentos vamos insertando los numeros probados en el array.
        }
    },
}
// logic.gameAutoMode()