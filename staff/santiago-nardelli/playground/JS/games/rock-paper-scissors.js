/*
Juego de piedra papel o tijera 
*/

/*CAPA DE DATOS

Nesito crear un array donde alojar las jugadas de las rondas

*/

var rondas = []; // -1 player, 1 machine, 0 draw
var maxGame = 3;


/*
HELPERS
*/
 var handleError = function(value){
    if ( value !== 'r' &&  value !== 'r' &&  value !== 'r') throw new SyntaxError("Entry the right move");
 }
 var typeError = function(value){
    if (typeof value !== 'string') throw new TypeError('Type error of entry')
 }

 // helper para manejo de errores de juego 
 // si la suma de el array de rondas es mayor a 1 y la suma de las rondas es menor a -1 o mayor a 1
 // o si la suma de el array de rondas es mayor a 2 y la suma de las rondas es menor a 0 o mayor a 0
 // tira un error de que el juego termino
var gameOver = function(){
    if (
        (rondas.length > 1 && (sum < -1 || sum > 1)) ||
        (rondas.length > 2 && (sum < 0 || sum > 0))
      )
        throw new Error("game is over");

}
/*
CAPA LOGICA
dentro de mi logica defino mi funcion de toma de desicion de ganador de rondas, defino mis helpers de manejo de errores
defino una suma que me va a ayudar a contabilizar localmente dentro de la funcion una respuesta numerica de si gana el user sea un 1 si es empate devuelva un 0 y si gana la machine que sea -1
primero defino un for para recorrer el array de rondas que en prinsipio lo defino vacio
y con el for lo recorro y le voy sumando los -1 / 0 / 1 de mis comparaciones de jugadas contra la PC

*/

function takeDesicion(value){
    typeError(value)
    handleError(value)
    

    var sum = 0

    for (i = 0; i < rondas.length ; i++)
        sum += rondas[i]

    gameOver()

    
    //comparaciones de entrada
    var machine
    random = Math.random()

    if(random < 1/3) machine = 'r'
    else if (random < 2/3) machine = 's'
    else machine = 'p'


    //comparaciones de entrada 
    if(value === 'r' && machine === 's' ||
        value === 's' && machine === 'p'||
        value === 'p' && machine === 'r'
    ){
        sum += 1
    } else if(value === machine){
        sum += 0
    } else {
        sum -= 1
    }
        

}


/*
CAPA DE INTERFACE
Defino la interaccion con el user, le pido por un prompt que me ingrese entre tres valor r/p/s
le paso esos valores a la logica de toma de desicion de la jugada del user contra la jugada de la maquina 
atrapo los posibles errores de manejo
*/

function tryGame(){

    try {
        var userEntry = prompt('Entry the move r | s | p')
        //llamada a funcion de logica 
        takeDesicion(userEntry)
        
    } catch (error) {
        alert(error)
        console.error(messsage.error)
        
    }

}