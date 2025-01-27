var player1 = ''
var player2 = ''

function askPlayer1 () {
    player1 = prompt('Options: \n 1. Rock \n 2. Paper \n 3. Scissors \n Player 1 please choose an option.')
    
    if (player1 !== '1' && player1 !== '2' && player1 !== '3') {
        return askPlayer1()
    }
}

function askPlayer2 () {
    player2 = prompt('Options: \n 1. Rock \n 2. Paper \n 3. Scissors \n Player 2 please choose an option')

    if (player2 !== '1' && player2 !== '2' && player2 !== '3') {
        return askPlayer2()
    }
}
    
function winOrLose () {
    if (player1 === player2) {
        console.log('Draw.')
    }
    
    if (player1 === '1' && player2 === '3') {
        console.log('Player 1 wins.')
    }
    
    if (player2 === '1' && player1 === '3') {
        console.log('Player 2 wins.')
    }
    
    if (player1 === '2' && player2 === '1') {
        console.log('Player 1 wins.')
    }
    
    if (player2 === '2' && player1 === '1') {
        console.log('Player 2 wins.')
    }
    
    if (player1 === '3' && player2 === '2') {
        console.log('Player 1 wins.')
    }

    if (player2 === '3' && player1 === '2') {
        console.log('Player 2 wins.')
    }
}

