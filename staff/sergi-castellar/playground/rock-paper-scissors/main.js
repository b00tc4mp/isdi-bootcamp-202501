console.clear()

var possiblePlays = ['rock', 'paper', 'scissors']

function playTurn() {
    var playerInput = prompt(`Welcome to the classic game of Rock, Paper, Scissors! It's your turn: choose your move by entering one of the following options.\n- r for 'Rock'\n- p for 'Paper'\n- s for 'Scissors'\nReady to play?`).toLowerCase()
    var playerPlay = ''
    var cpuPlay = ''
    var gameResult= ''
    if (isValidPlay(playerInput)){
        playerPlay = possiblePlays[convertPlayerInput(playerInput)] 
        cpuPlay = possiblePlays[generateFromZeroToTwo()]
        gameResult = evaluateResult(playerPlay, cpuPlay)
        alert(selectEndingPhrase(gameResult) + `\n\nYour play: ${playerPlay}\n\nCPU play: ${cpuPlay}\n\nWinner: ${gameResult}`)
        playTurn()
    } else {
        alert("Please, only type 'r', 'p' or 's' in order to play the game")
        playTurn()
    }
}

function selectEndingPhrase(gameResult) {
switch (gameResult) {
    case 'nobody': return "It's a tie! You both chose the same. Try again!"
    case 'player': return "Congratulations, you won! You got lucky this time."
    case 'cpu': return "The CPU wins this round. Don't give up, try again!"
}

}

function evaluateResult(playerPlay, cpuPlay) {
    var result = ''
    if (playerPlay === cpuPlay) {
        result = 'nobody'
    } // empate

    else if (playerPlay === 'rock' && cpuPlay === 'paper' ||
    playerPlay === 'paper' && cpuPlay === 'scissors' ||
    playerPlay === 'scissors' && cpuPlay === 'rock') {
        result = 'cpu'
    } // gana cpu

    else if (playerPlay === 'rock' && cpuPlay === 'scissors' ||
    playerPlay === 'paper' && cpuPlay === 'rock' ||
    playerPlay === 'scissors' && cpuPlay === 'paper') {
        result = 'player'
    } // gana player
    return result
}

function convertPlayerInput(playerInput) { // recoge la letra y devuelve el numero de 0 a 2 que le corresponda
    switch(playerInput) {
        case 'r': return 0
        case 'p': return 1
        case 's': return 2
    }
}

function generateFromZeroToTwo() { // genera un numero de 0 a 2
    return Math.floor(Math.random() * 3)
}

function isValidPlay(input) { // regex para aceptar solo r, p o s
    var regex = /^[rps]$/
    if (regex.test(input)){
        return true
    } else {
        return false
    }
}

playTurn()