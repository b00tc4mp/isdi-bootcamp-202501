/* PIEDRA PAPEL O TIJERAS
- Juego de piedra papel o tijeras.
- Modo dos jugadores o de un jugador.

Funcionamiento del juego:
Inputs usuario:
- El usuario elije modo un jugador o dos jugadores.[u1]
- El usuario eligira cuantas rondas quiere jugar. [u2]
- El usuario eligira si saca piedra papel o tijera. [u3a]
- El usuario 2 eligira si saca piedra papel o tijera. [u3b]
Outputs maquina:
- Modo dos jugadores la maquina genera piedra papel o tijera. [m1]
- Despues se revisara el resultado, si ha ganado perdido o empatado. [m2]
- Cuantas rondas quedan. [m3]
- Funcion para revisar quien ha ganado una vez lleguemos al máximo de rondas. [m4]
- Al acabar(llegar a limite de rondas establecidas o que gane uno de los dos) preguntar si quiere volver a jugar.[m5]

-------------------------------------------------------------------------------------------------------------------------------------------------------
*/
// VARIABLES GLOBALES:
var gameMode = '' // Variable para la input single or Multiplayer
var currentRounds = 0 //Acumulador de rondas
var maxRounds  // Variable para saber cuantas rondas quiere jugar
var player1choice = '' // Variable para almacenar la eleccion del jugador 1
var player2choice = ''// Variable para almacenar la eleccion del jugador 2
var machineChoice = '' //Varianle para almacenar la eleccion de la maquina
var counterWinsPlayer1 = 0 //Acumulador de victorias player 1
var counterWinsPlayer2 = 0 //Acumulador de victorias player 2
var counterWinsMachine = 0 //Acumulador de victorias de la maquina
var counterDraws = 0 //Acumulador de empates de la maquina
var checkRounds = false
var reGexChoisePlayer = /[rps]/ // Regex para verificar que poner r p o s

function SingleOrMultiplePlayer (){ //- Funcion para elegir modo un jugador o dos jugadores.[u1]
/* 
Que tiene que hacer esta funcion?
    
Primero preguntaremos al usuario en que modo quiere jugar: [u1.1]
Si juega en solitario, bloquearemos las funciones que permitan jugar a un segunda jugador y habilitaremos que juegue la maquina,[u1.2]
Si juega en  multijugador, bloquearemos las funciones que permiten jugar a la maquina y habilitaremos la que permiten jugar a un segundo usuario.[u1.3]
    
Reglas para esta funcion? 
    
Revisar que las inputs dadas por el usuario sean correctas. Si no lo son avisar y pedirlas de nuevo.[RU1.1]
Esta funcion solo se puede ejecutar si el juego aun no ha empezado.[RU1.2]
*/
gameMode = prompt('Single (s) or Multiplayer (m)? ') //[u1.1]
gameMode = gameMode.toLowerCase() //Pasamos la input a minusculas por si el usuario escribe en mayusculas.
NumberRounds()
var reGexGameMode = /[sm]/i //[RU1.1] regex que coincide con los caracteres s o m.
if(reGexGameMode.test(gameMode)){ //Si coincide entramos en este if
    do{ //Voy a intentar hacer el bucle aqui dentro
    if(gameMode === 's'){
        
        RockPaperScissorsPlayer1()
        generateRockPaperScissors()
        checkPlay()
        roundsRemainingFunction()
        
    }
    else if(gameMode === 'm'){
        RockPaperScissorsPlayer1()
        RockPaperScissorsPlayer2()
        checkPlay()
        roundsRemainingFunction()
        
    }
    }while(checkRounds == false)
    playAgain()
}else {
    alert("Please only characters 's' or 'm'!!") // Avisamos que ha puesto una input incorrecta.
    SingleOrMultiplePlayer() // Reiniciamos Funcion.
}
   
}

function NumberRounds(){ //- El usuario eligira cuantas rondas quiere jugar. [u2]
    /*
    Primero habra que preguntar el numero de rondas a jugar. [u2.1]
    Y establecer eese numero en una variable que despues tendremos que tener en cuenta. [u2.2]
    */
    maxRounds = prompt ('How many rounds do you wanna play? ')
    
}

function RockPaperScissorsPlayer1(){ //- El usuario eligira si saca piedra papel o tijera. [u3a]
    /*
    Primero habra que preguntarle al usuario 1 que quiere sacar y almacenarla en una variable. [u3a.1]
    Reglas de la funcion : Solo poner 'r' 'p' o 's' [ru3a.2]
   
    */

    //[u3a.1]
    player1choice = prompt('Player 1 turn: Rock(r) Paper(p) or Scissors(s) ? ') //Preguntar piedra papel o tijera [u3a.1]
    player1choice = player1choice.toLowerCase() // Pasarlo a minusculas por si lo pone en mayusculas
    
    //[ru3a.2]
   
    if(reGexChoisePlayer.test(player1choice)) return // Si es true salimos de la funcion
    else{
        alert('Please only "r", "p" or "s" ') // Si la regex no coincide avisamos y volvemos a empezar funcion
        RockPaperScissorsPlayer1()
    }
}

function RockPaperScissorsPlayer2() {//- El usuario 2 eligira si saca piedra papel o tijera. [u3b]
      /*
    Primero habra que preguntarle al usuario 2 que quiere sacar y almacenarla en una variable. [u3b.1]
    Reglas de la funcion : Solo poner 'r' 'p' o 's' [ru3b.2]
    */
    
    //[u3b.1]
    player2choice = prompt('Player 2 turn: Rock(r) Paper(p) or Scissors(s) ? ') //Preguntar piedra papel o tijera
    player2choice = player2choice.toLowerCase() // Pasarlo a minusculas por si lo pone en mayusculas
    
    //[ru3b.2] 
      
    if(reGexChoisePlayer.test(player2choice)) return // Si es true salimos de la funcion
    else{
        alert('Please only "r", "p" or "s" ') // Si la regex no coincide avisamos y volvemos a empezar funcion
        RockPaperScissorsPlayer1()
    }
}


function generateRockPaperScissors(){ // - Modo dos jugadores la maquina genera piedra papel o tijera. [m1]
    /*
    Generaremos un numero aleatorio entre 0 y 2. [m1.1]
    Dependiendo del numero que salga le asignaremos a machineChoice 'r' 'p' o 's' [m1.2]s
    */
    
    var randomNumber =  Math.floor(Math.random() * (3)) // [m1.1] math.random genera una funcion decimal aleatoria entre 0 y 1, lo multiplicamos por 3 lo que dara un numero decimal entre 0 y casi 2,con math.flor() arrodondeamos hacia abajo asi casi 1 dara 0 y casi 3 dara 2 
    //[m1.2]
    if(randomNumber == 0) machineChoice = 'r'
    else if(randomNumber == 1) machineChoice = 'p'
    else if (randomNumber == 2) machineChoice = 's'
}

function checkPlay(){ //- Despues se revisara el resultado, si ha ganado perdido o empatado. [m2]
/*
- Primero revisaremos si estamos en modo singlePlayer o multiPlayer.[m2.1]
- Si estamos en singlePlayer, verificaremos resultados entre player 1 y 2. [m2.2]
- Si estamos en multiPlayer, verificamos el resultado entre el player y la maquina.[m2.3]
*/
//[m2.1]
    if(gameMode == 's'){
        //[m2.2] jugador contra la maquina
        if(player1choice == machineChoice){
            alert("It's a draw!!" + "\n" + "Player: " + player1choice + " VS Machine: " + machineChoice)
            currentRounds ++
        }
        else if(player1choice == 'r' && machineChoice == 's'){
            alert("Player Win this round!!" + "\n" + "Player: " + player1choice + " VS Machine: " + machineChoice )
            counterWinsPlayer1++
            currentRounds++
            
        }else if(player1choice == 'p' && machineChoice == 'r'){
            alert("Player Win this round!!" + "\n" + "Player: " + player1choice + " VS Machine: " + machineChoice)
            counterWinsPlayer1++
            currentRounds++
        
        }else if(player1choice == 's' && machineChoice == 'p'){
            alert("Player Win this round!!" + "\n" + "Player: " + player1choice + " VS Machine: " + machineChoice)
            counterWinsPlayer1++
            currentRounds++
            
        }else if(player1choice == 'r' && machineChoice == 'p'){
            alert("Machine Win this round!!" + "\n" + "Player: " + player1choice + " VS Machine: " + machineChoice)
            counterWinsPlayer2++
            currentRounds++
            
        }else if(player1choice == 'p' && machineChoice == 's'){
            alert("MachineWin this round!!" + "\n" + "Player: " + player1choice + " VS Machine: " + machineChoice)
            counterWinsPlayer2++
            currentRounds++
            
        }else if(player1choice == 's' && machineChoice == 'r'){
            alert("Machine Win this round!!" + "\n" + "Player: " + player1choice + " VS Machine: " + machineChoice)
            counterWinsPlayer2++
            currentRounds++
            
        }
        
    }else if(gameMode == 'm'){
        //[m2.3] jugador1 contra jugador2
         if(player1choice == player2choice){
            alert("It's a draw!!"+ "\n" + "Player: " + player1choice + " VS Machine: " + player2choice)
            currentRounds ++
        }
        else if(player1choice == 'r' && player2choice == 's'){
            alert("Player 1 Win this round!!" + "\n" + "Player: " + player1choice + " VS Machine: " + player2choice)
            counterWinsPlayer1++
            currentRounds++
            
        }else if(player1choice == 'p' && player2choice == 'r'){
            alert("Player 1 Win this round!!" + "\n" + "Player: " + player1choice + " VS Machine: " + player2choice)
            counterWinsPlayer1++
            currentRounds++
        
        }else if(player1choice == 's' && player2choice == 'p'){
            alert("Player 1 Win this round!!" + "\n" + "Player: " + player1choice + " VS Machine: " + player2choice)
            counterWinsPlayer1++
            currentRounds++
            
        }else if(player1choice == 'r' && player2choice == 'p'){
            alert("Player 2 Win this round!!" + "\n" + "Player: " + player1choice + " VS Machine: " + player2choice)
            counterWinsPlayer2++
            currentRounds++
            
        }else if(player1choice == 'p' && player2choice == 's'){
            alert("Player 2 Win this round!!" + "\n" + "Player: " + player1choice + " VS Machine: " + player2choice)
            counterWinsPlayer2++
            currentRounds++
            
        }else if(player1choice == 's' && player2choice == 'r'){
            alert("Player 2 Win this round!!"+ "\n" + "Player: " + player1choice + " VS Machine: " + player2choice)
            counterWinsPlayer2++
            currentRounds++
            
        }
        
    }
    
}

function roundsRemainingFunction(){ // Cuantas rondas quedan. [m3]
    //Funcion para saber cuando llegamos al maximo de rondas establecidas por el usuario
    if(currentRounds == maxRounds){
        alert("You have reached the maximum of rounds!!")
        checkRounds = true
        checkWin() 
    }
}

function checkWin(){ //- Funcion para revisar quien ha ganado una vez lleguemos al máximo de rondas. [m4]
    /*
    Calcular quien ha ganado en el modo singlePlayer, jugador o maquina. [m4.1]
    Calcular quien ha ganado en modo multiPlayer, jugador 1 0 2. [m4.2]
    */
    //[m4.1]
    if(gameMode == 's'){
        if(counterWinsPlayer1 > counterWinsMachine){
            alert("Player 1 win the game!")
        }else if(counterWinsPlayer1 < counterWinsMachine){
            alert("Machine win the game!")
        }else if(counterWinsMachine == counterWinsPlayer1){
            alert("It's a draw!")
        }
    }else if(gameMode == 'm'){
        if(counterWinsPlayer1 > counterWinsPlayer2){
            alert("Player 1 win the game!")
        }else if(counterWinsPlayer1 < counterWinsPlayer2){
            alert("Player 2 win the game!")
        }else if(counterWinsPlayer2 == counterWinsPlayer1){
            alert("It's a draw!")
        }
    }
}

function playAgain(){ // - Al acabar (llegar a limite de rondas establecidas o que gane uno de los dos) preguntar si quiere volver a jugar.[m5]
    /*
    Preguntaremos al usuario si quiere volver a jugar [m5.1]
    Si dice que si resetearemos todas las variables a 0 [m5.2]
    si dice que no pues bye [m5.3]
    */
    //[m5.1]
    var WannaPlayAgain = prompt('Do you wanna play again? "y" or "n" ')
        WannaPlayAgain = WannaPlayAgain.toLowerCase()
    var reGexYN = /[yn]/
    if(reGexYN.test(WannaPlayAgain)){
    if(WannaPlayAgain == 'y' ){
         currentRounds = 0   
         counterWinsPlayer1 = 0
         counterWinsPlayer2 = 0 
         counterWinsMachine = 0 
         counterDraws = 0
         maxRounds = 0
         checkRounds = false
         SingleOrMultiplePlayer()
    }else if(WannaPlayAgain == 'n'){
        alert('Thanks for playing!!')
    }
  }else{
        alert('Please only "y" or "n".')
        playAgain()
  }
}

SingleOrMultiplePlayer()