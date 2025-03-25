// DATA
const data = {
    constant:{
        maxAttempts : 10, // Máximo de intentos
        attempts : 0 ,// Acumulador de intentos
    },
    arrays:{
        numbers : [], //array para ordenar los numeros
        numbersTried : [], 
    },
    booleans:{
        checkWin: false,
        attempsPassed : false,
    },
    reGexs:{
        regexNumber : /\d/,
        regexYN : /[y||n]/
    },
    temperature: ' ',
    randomNumber : 0 , // variable para almacenar el numero aleatorio generado por la funcion generateRandomNumber()
    playerNumber : '' ,// Preguntar numero al usuario
}
