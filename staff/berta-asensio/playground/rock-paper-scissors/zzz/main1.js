/* 
FALTA PONER EN LA FUNCION RESETGAME, UNA PREGUNTA PARA SABER
SI QUEREMOS VOLVER A JUGAR O NO 
*/

console.clear()

//Variables globales:
var posibleOptions = ['rock', 'paper', 'scissors']

var pcChoose = ''
var playerChoose = ''

var counterPc = 0
var counterPlayer = 0

//FUNCIONES

/*
función pcOptions: función para que la maquina genere aleatoriamente una de las tres opciones. La opcion 
escogida por la máquina, la guardamos en una variable local llamada pcChoose
*/
function pcOptions() {

    var randomIndex = Math.floor(Math.random() * posibleOptions.length) // randomIndex es una variable que almacena el indice aleatorio que se ha creado de la variable posibleOptions
    pcChoose = posibleOptions[randomIndex]

console.log(pcChoose)
}

/*
function playerOptions: función para que el jugador escoja una opción.
-La opción se almacenará en la variable playerChoose.
-Debe estar bien escrita (minúsculas) ¿o coincidir con alguno de los parametros?
-En el caso que esté mal escrita, retorna a la función playerOptions
-Si está bien escrita, pasará a la función de jugar
*/
function playerOptions() {

    playerChoose = prompt('Please, Insert an option: rock, paper or scissors').toLowerCase()

    if(posibleOptions.includes(playerChoose)) {
        
        return playRound()
        
    } else {

        alert('Wrong word. Try again and write well.')
        return playerOptions()
    
    }
}

/*Función dinámica juego: Esta función controla el flujo del juego.
-Pone las condiciones y compara los resultados de los jugadores.
-Si los dos jugadores coinciden, habrá empate de ronda. Pasaremos a la función de nuevo.
-Cada ronda tendrá un ganador que se acumulará en su marcador. Pasaremos a la función de nuevo.
*/
function playRound() {

    if (pcChoose === playerChoose) {
        alert('Round tie! The two players add one point. \nYou have chosen ' + playerChoose + ', and your opponent ' + pcChoose + '.')
        counterPlayer++
        counterPc++
        
        
    } else if ((pcChoose === posibleOptions[0] && playerChoose === posibleOptions[2]) ||
        (pcChoose === posibleOptions[1] && playerChoose === posibleOptions[0]) ||
        (pcChoose === posibleOptions[2] && playerChoose === posibleOptions[1])) {

        alert ('You lost the round! \nYou have chosen ' + playerChoose + ' and your opponent ' + pcChoose +'.')
        counterPc++
        
        
    } else if ((pcChoose === posibleOptions[0] && playerChoose === posibleOptions[1]) ||
        (pcChoose === posibleOptions[1] && playerChoose === posibleOptions[2]) ||
        (pcChoose === posibleOptions[2] && playerChoose === posibleOptions[0])) {

        alert ('You won the round! \nYou have chosen ' + playerChoose + ' and your opponent '  + pcChoose + '.')
        counterPlayer++
    
    } 
    console.log('Bookmark: Player - ' + counterPlayer + '| Opponent - ' + counterPc + '.')
    winGame()
    pcOptions()
    playerOptions()
    
    
}


/*
Función final: función para las posibilidades de ganar perder o empatar el juego.
-Si el marcador de algún jugador llega a 3: ha ganado. Pararemos el juego.
-Si los dos jugadores coinciden en resultado && su marcador llega a 3: han empatado el juego. Pararemos el juego.
*/
function winGame() {
    
    if (counterPc === 3 && counterPlayer < 3) {
        alert('You lost the game! \njBookmark: Player - ' + counterPlayer + ' | Opponent - ' + counterPc + '.')
        return resetGame()
        
    } else if (counterPlayer === 3 && counterPc < 3) {
        alert('Congratulations! You won the game! \nBookmark: Player - ' + counterPlayer + ' | Opponent - ' + counterPc + '.')
        return resetGame()
        
    } else if ( (counterPlayer === 3 && counterPc === 3)) {
        alert('You have tied the game. Play again to tiebreaker')
        return resetGame()       
    }
    
    pcOptions()
    playerOptions()
}        

/* Función para volver a empezar el juego:
-Marcamos los contadores a 0.
-Llamamos a las funciones necesarias.
*/
        
function resetGame() {
    counterPc = 0
    counterPlayer = 0
    pcOptions()
    playerOptions()
    
}

pcOptions()
playerOptions()
