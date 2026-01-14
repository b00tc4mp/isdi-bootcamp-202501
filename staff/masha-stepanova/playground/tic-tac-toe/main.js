var initialBoard = ' 1 | 2 | 3 \n―――――――――――\n 4 | 5 | 6 \n―――――――――――\n 7 | 8 | 9 '
var boardToChange = []
var boardInGame = ''

var p1 = 1
var p2 = 2
var p3 = 3
var p4 = 4
var p5 = 5
var p6 = 6
var p7 = 7
var p8 = 8
var p9 = 9

for (var i = 0; i < initialBoard.length; i++) {
    boardToChange[i] = initialBoard[i]
}

var options = ['X', 'O']
var player1 = prompt('Player 1, please select X or O')
player1 = player1.toUpperCase()
var player2 = ''
for (var i = 0; i < options.length; i++) {
    if (!(options[i] === player1)) {
    player2 += options[i]
    }
}
var attempts = 9

function move() {
    boardInGame = ''
    var position = prompt('Player, please introduce a position. Choose from 1 to 9')
    for (let i = 0; i < boardToChange.length; i++) {
        if (boardToChange[i] === position) {
            if (attempts % 2 === 0) {
            boardToChange[i] = player2
            } else {
            boardToChange[i] = player1
            }
    }   
    }

    attempts--
    for (var i = 0; i < boardToChange.length; i++) 
        boardInGame += boardToChange[i];

    p1 = boardToChange[1];
    p2 = boardToChange[5];
    p3 = boardToChange[9];
    p4 = boardToChange[25];
    p5 = boardToChange[29];
    p6 = boardToChange[33];
    p7 = boardToChange[49];
    p8 = boardToChange[53];
    p9 = boardToChange[57];
    console.clear()
    return console.log('%c' + boardInGame, 'color: chocolate; background-color: beige; font-size: 25; font-weight: bold')
}





var winPlayer = ''

function getWinner() {
    var win = false
if (p1 === p2 && p2 === p3) {
    win = true
    winPlayer = p1
}
if (p4 === p5 && p5 === p6) {
    win = true
    winPlayer = p4
}    
if (p7 === p8 && p8 === p9){ 
   win = true
    winPlayer = p7
    }
if (p1 === p4 && p4 === p7) {
    win = true
    winPlayer = p1
 }   
if (p2 === p5 && p5 === p8) {
   win = true
    winPlayer = p2
}
if (p3 === p6 && p6 === p9) {
    win = true
    winPlayer = p3
}
if (p1 === p5 && p5 === p9){ 
    win = true
    winPlayer = p1
}
if (p3 === p5 && p5 === p7) {
    win = true
    winPlayer = p3
}
return win
}

console.log('%c' + initialBoard, 'color: chocolate; background-color: beige; font-size: 25; font-weight: bold')
while (!getWinner() && attempts > 0) {
    move()
}

if (win) {
    if (winPlayer === player1) {
    console.log('Congratulations player 1, you won the game!')
    } else {
    console.log('Congratulations player 2, you won the game!')
    }
} else {
    console.log('Tie, nobody has lost the game!')
}
