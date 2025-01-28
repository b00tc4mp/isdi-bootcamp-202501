/*
- Introducir 'r', 'p' o 's' para jugar vs la cpu
- Pasar prompt a minuscula y filtrar para que la respuesta introducida solo sea 'r' || 'p' || 's'
- Generar jugada de la cpu y almacenarla en una variable para luego compararla con la jugada del usuario
- Ver el resultado al comparar nuestra jugada vs la de la cpu
- Contador de partidas, el primero que llegue a 3 ganadas, win
- Ver si deseas volver a jugar o no
*/

var userPlay = ''
var cpuPlay = ''
var userWins = 0
var cpuWins = 0
var maxWins = 3
var anotherGame = ''

function choosePlay(){ //pedimos una jugada al usuario
    userPlay = prompt('Your move please, you can choose "r" rock, "p" paper or "s" scissors')
}

function filterUserPlay(){ //filtramos la jugada del usuario para ver si ha introducido 'r' || 'p' || 's'
    userPlay = userPlay.toLowerCase()
    
    var reGexUserPlay = /[rps]/
    
    if(reGexUserPlay.test(userPlay)){
        return

    } else {
        alert('Not the correct letter, please you can only choose "r" (rock), "p" (paper), or "s" (scissors)')
        choosePlay()
    }
}

function generateCpuPlay(){ //genera una jugada de la cpu, generar un numero del 0 al 2 (0 = 'r', 1 = 'p', 2 = 's') y pasarlo al string correcto
    var machine = Math.floor(Math.random() * 3)
    
    if (machine === 0){
        cpuPlay = 'r'
    } else if (machine === 1){
        cpuPlay = 'p'
    } else if (machine === 2){
        cpuPlay = 's'
    }
}

function comparePlays(){ //compara las jugadas para ver quien ha ganado    
    if (userPlay === cpuPlay){
        alert("It's a draw!")
        
    } else if (userPlay === 'r' && cpuPlay === 'p'){
        cpuWins++
        alert("CPU won this round!")
        
    } else if (userPlay === 'r' && cpuPlay === 's'){
        userWins++
        alert("You won this round!")
        
    } else if (userPlay === 'p' && cpuPlay === 'r'){
        userWins++
        alert("You won this round!")
        
    } else if (userPlay === 'p' && cpuPlay === 's'){
        cpuWins++
        alert("CPU won this round!")
        
    } else if (userPlay === 's' && cpuPlay === 'p'){
        userWins++
        alert("You won this round!")
        
    } else if (userPlay === 's' && cpuPlay === 'r'){
        cpuWins++
        alert("CPU won this round!")
    }
}

function checkWinningCounter(){ // check si cpu o user han ganado
    if (cpuWins >= maxWins){
        alert ('CPU won the game!')
    } else if (userWins >= maxWins){
        alert ('Congratulations, you won the game!')
    }
}

function askPlayAgain(){ // preguntar si queremos volver a jugar
   var askAnotherGame = prompt('You want to play again? answer "y"(yes) or "n"(no)')
    anotherGame = askAnotherGame.toLowerCase()
}

function filterPlayAgain(){ // depende de si el usuario ha respondido yes or no, acabaremos el juego o volveremos a jugar
    var reGexPlayAgain = /[yn]/
    
    if(reGexPlayAgain.test(anotherGame)){
        return

    } else {
        alert('Not the correct answer, please you can only choose "y"(yes) or "n"(no)')
    }
}

function playAgain(){
    if (anotherGame === y){
        // poner el reiniciador del juego
    } else if (anotherGame === n){
        alert('Thank you for playing! See you soon!')
    }
}

//while () {}