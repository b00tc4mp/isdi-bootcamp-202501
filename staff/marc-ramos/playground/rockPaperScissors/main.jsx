const rootElement = document.querySelector ('div#root')

const root = ReactDOM.createRoot(rootElement)

const useState = React.useState

function RockPaperScissors() {
    const [randomAnswer] = useState(Math.floor(Math.random() * 3))
    
    const [chancesLeft, setChancesLeft] = useState(3)

    const [playerAnswer, setPlayerAnswer] = useState('')

    const [message, setMessage] = useState('')

    const [winner, setWinner] = useState(false)

    const result = playerAnswer, cpuPlay

    if (randomAnswer === 0){
        cpuPlay = 'r'
    } else if (randomAnswer === 1){
        cpuPlay = 'p'
    } else if (randomAnswer === 2){
        cpuPlay = 's'
    }
}

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
var checkWin11 = false

function choosePlay(){ //pedimos una jugada al usuario
    userPlay = prompt('Your move please, you can choose "r" rock, "p" paper or "s" scissors' + '\n' + 'The score is:' + '\n' + 'user -> ' + userWins + ' wins' + '\n' + 'cpu -> ' + cpuWins + ' wins')
    filterUserPlay()
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
        alert(userPlay + ' vs ' + cpuPlay + "\n" + "CPU won this round!")
        
    } else if (userPlay === 'r' && cpuPlay === 's'){
        userWins++
        alert( userPlay + ' vs ' + cpuPlay + "\n" + "You won this round!")
        
    } else if (userPlay === 'p' && cpuPlay === 'r'){
        userWins++
        alert( userPlay + ' vs ' + cpuPlay + "\n" + "You won this round!")
        
    } else if (userPlay === 'p' && cpuPlay === 's'){
        cpuWins++
        alert(userPlay + ' vs ' + cpuPlay + "\n" + "CPU won this round!")
        
    } else if (userPlay === 's' && cpuPlay === 'p'){
        userWins++
        alert( userPlay + ' vs ' + cpuPlay + "\n" + "You won this round!")
        
    } else if (userPlay === 's' && cpuPlay === 'r'){
        cpuWins++
        alert(userPlay + ' vs ' + cpuPlay + "\n" + "CPU won this round!")
    }
}

function checkWinningCounter(){ // check si cpu o user han ganado
    
    if (cpuWins >= maxWins){
        alert ('CPU won the game!')
        checkWin11 = true
        
    } else if (userWins >= maxWins){
        alert ('Congratulations, you won the game!')
        checkWin11 = true
    }
}

function askPlayAgain(){ // preguntar si queremos volver a jugar
   var askAnotherGame = prompt('You want to play again? answer "y"(yes) or "n"(no)')
    anotherGame = askAnotherGame.toLowerCase()
    filterPlayAgain()
}

function filterPlayAgain(){ // depende de si el usuario ha respondido yes or no, acabaremos el juego o volveremos a jugar
    var reGexPlayAgain = /[yn]/
    
    if(reGexPlayAgain.test(anotherGame)){
        playAgain()

    } else {
        alert('Not the correct answer, please you can only choose "y"(yes) or "n"(no)')
        askPlayAgain()
    }
}

function playAgain(){
    if (anotherGame === 'y'){
        
    userWins = 0
    cpuWins = 0
    checkWin11 = false
        
       gameAutoMode()
        
    } else if (anotherGame === 'n'){
        alert('Thank you for playing! See you soon!')
    }
}
function gameAutoMode() {
do {
    choosePlay()
    generateCpuPlay()
    comparePlays()
    checkWinningCounter()
    
} while(checkWin11 === false)
askPlayAgain()
}

gameAutoMode()