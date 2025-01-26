function ticTacToe() {
    var initialBoard = ' 1️ | 2️ | 3 \n――――\n 4 | 5 | 6 \n――――\n 7 | 8 | 9 '
    var boardToChange = []
    var boardInGame = ''
    var options = ['X', 'O']
    var player1 = ''
    var player2 = ''
    var attempts = 9
    var p1 = 9
    var p2 = 8
    var p3 = 7
    var p4 = 6
    var p5 = 5
    var p6 = 4
    var p7 = 3
    var p8 = 2
    var p9 = 1
    var winPlayer = ''
    
    for (var i = 0; i < initialBoard.length; i++) {
    boardToChange[i] = initialBoard[i]
    }

    function assignPlayer() {
    player1 = prompt('Player one, please select X or O')
    player1 = player1.toUpperCase()
    for (var i = 0; i < options.length; i++) {
        if (!(options[i] === player1)) 
        player2 += options[i]
    }
    }

    function move() {
    //for (let a = attempts; a > 0; a = attempts) {
    var position = prompt('Player, please introduce a position. Choose from 1 to 9')
    for (let i = 0; i < boardToChange.length; i++) {
        if (boardToChange[i] === position) {
            if (attempts % 2 === 0) {
            boardToChange[i] = player2
            break
            } else {
            boardToChange[i] = player1
            break
            }
        }   
    }
    attempts--
    for (var i = 0; i < boardToChange.length; i++) 
    boardInGame += boardToChange[i]
    p1 = boardToChange[1];
    p2 = boardToChange[6];
    p3 = boardToChange[11];
    p4 = boardToChange[20];
    p5 = boardToChange[24];
    p6 = boardToChange[28];
    p7 = boardToChange[37];
    p8 = boardToChange[41];
    p9 = boardToChange[45];

    //console.clear()
    alert(`${boardInGame}`)
    boardInGame = ''
//}
    }
   

    function winner() {
        win = true
        if (p1 === p2 && p2 === p3) {
            win = false
            winPlayer = p1
        }
        if (p4 === p5 && p5 === p6) {
            win = false
            winPlayer = p4
        }    
        if (p7 === p8 && p8 === p9){ 
           win = false
            winPlayer = p7
            }
        if (p1 === p4 && p4 === p7) {
            win = false
            winPlayer = p1
         }   
        if (p2 === p5 && p5 === p8) {
           win = false
            winPlayer = p2
        }
        if (p3 === p6 && p6 === p9) {
            win = false
            winPlayer = p3
        }
        if (p1 === p5 && p5 === p9){ 
            win = false
            winPlayer = p1
        }
        if (p3 === p5 && p5 === p7) {
            win = false
            winPlayer = p3
        }
        return win
    }

    alert(`${initialBoard}`)
    assignPlayer()

    while (winner() && attempts > 0) {
    move()
    winner()
    }

    if (!winner()) {
        if (winPlayer === player1) {
        alert('Congratulations player 1, you won the game!')
        } else {
        alert('Congratulations player 2, you won the game!')
        }
    } else {
        alert('Tie, nobody has lost the game!')
    }
    
}

function hangman() {
var word = prompt('Write here your secret word:')
    var matches = []
    var lives = 6
    var guessCharacter = ''
    var wrongLetter = []

    var one = ''
    var two = ''
    var three = ''
    var four = ''
    var five = ''
    var six = '' 

    for (var i = 0; i < word.length; i++) 
    matches[i] = '_'

    function printMatches() {
        var matchesString = ''
        
            for (var i = 0; i < matches.length; i++) 
            matchesString += matches[i] + ' '
        
        alert('The secret word is   ' + matchesString)
    }

    function askCharacter() {
    guessCharacter = prompt('Let\'s guess a character!')
    }

function checkGuessCharacterMatches() {
    var isFound = false
    
        for (var j = 0; j < word.length; j++) {
            if (guessCharacter.length > 1 && guessCharacter.length < word.length) {
                    alert('Be carefull, you can only introduce one letter. If you want to guess the word, please insert ' + word.length + ' letters.')
                    return false    
            } else if (matches[j] === guessCharacter || wrongLetter[j] === guessCharacter) {
                    alert('Be carefull, this character is already guessed!')
                    return false
                } 
                
            if (guessCharacter === word[j]) {
                matches[j] = word[j]
                isFound = true
            } 
        }
    
    if (!isFound) {
        switch (lives) {
            case 6:
            one += ' ┌──┐'
            break;
            case 5:
            two += ' |     |'
            break;
            case 4:
            three += ' |   ☹'
            break;
            case 3:
            four += ' |  ⌈⌷⌉'
            break;
            case 2:
            five += ' |    ∆'
            break
            case 1:
            six += '⍊  ⌋ ⌊'
        }
        
        lives--
        wrongLetter += guessCharacter + ' ' 
        
        alert(`The character "${guessCharacter}" was not found 
                ${one}
                ${two}
                ${three}
                ${four}
                ${five}
                ${six}
                Attempts left: ${lives}
                Wrong characters: ${wrongLetter}` )
    }
}

function win() {
    let result = false
    
    for (var h = 0; h < word.length; h++) {
        if (matches[h] === word[h]) {
            result = true
        } else {
            result = false
            break
        }
    }
    return result
}
   
printMatches()
while (!(lives > 0 && win())) {
askCharacter()
    
if (guessCharacter.length === word.length) {
    if (guessCharacter === word) {
        lives = 6
        break
    } else {
    lives = 0
    break
    }

}
    
checkGuessCharacterMatches()

if (guessCharacter === null || guessCharacter === '') {
    var ask = prompt('Would you like to stop the game?') 
        if (ask !== 'no') {
            alert('See you next time!')
            lives = 0
            break
        }
    }
printMatches()
}

if (lives > 0) {
    alert('You win, congratulations!')
    
} else {
    alert('You\'ve lost, the secret word was ' + word) 
}

}

function paperScissorsRock() {
var player  
var machine  
var result = 0
var machineWins = 0
var rounds = 0

    function playerChoice() {
    player = prompt(`Please, chose 0, 1 or 2: 
    0 = 📜, 1 = 🪨, 2 = ✂️`)
    }

    function machineChoice() {
    machine = Math.floor(Math.random() * 3)
    }

    function roundWinner() {
    var message
    if (player == machine) {
        result += 0
        machineWins += 0
        message = 'Tie! Nobody loses this round'
    } else {
        switch(player) {
            case '0':
            result += (machine == 1) ? 1 : 0
            machineWins += (machine == 1) ? 0 : 1
            message = (machine == 1) ? 'Excellent, you won this round!' : 'This time you lose'
            break
            case '1':
            result += (machine == 2) ? 1 : 0
            machineWins += (machine == 2) ? 0 : 1
            message = (machine == 2) ? 'Excellent, you won this round!' : 'This time you lose'
            break
            case '2':
            result += (machine == 0) ? 1 : 0
            machineWins += (machine == 0) ? 0 : 1
            message = (machine == 0) ? 'Excellent, you won this round!' : 'This time you lose'
            break
        }
    }
       // result = 0
        //machineWins = 0
        alert(message)
    }

    function askRounds() {
        rounds = prompt('How many rounds do you wish to play?')
    }

    function winner() {
        if (result > machineWins) {
            alert(`Congratulations, you won with ${result} hits!`)
        } else if (result < machineWins) {
            alert(`Oh no, this time you lose with ${machineWins} errors!`)
        } else {
            alert('Tie, this time nobody loses!')
        }
    }

    askRounds()
    for (var i = 0; i < rounds; i++) {
    machineChoice()
    playerChoice()
    roundWinner()
    }
    winner()
}

function playAGame() {
var game
var repeat

    function askForGame() {
        game = prompt(`Which game you\'d like to play?
        Please, choose 1, 2 or 3:
        1 - Tic-Tac-Toe
        2 - Hangman
        3 - Paper Scissors Rock`)
    }

    function playAgain() {
        repeat = prompt('Would you like to play again? Please, anwer yes or no.')
    }

    askForGame()
    if (game == 1) {
        ticTacToe()
    } else if (game == 2) {
        hangman()
    } else if (game == 3) {
        paperScissorsRock()
    }
    playAgain()
    if (repeat === 'yes') {
        location.reload()
    } else {
        alert('See you next time!')
    }
}

console.clear()
playAGame()
