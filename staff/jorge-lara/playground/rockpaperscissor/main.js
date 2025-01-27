
//p = paper
//r = rock
//s = scissor
//Variables for the ia
let ia = true;
let moves = ['p', 'r', 's'];

let player1 = '';
let player2 = '';
let won = false;
let draw = false;

function checkwin() {
    if (player1 == 'r') {
        won = (player2 == 's') ? true : (player2 == 'p') ? false : !(draw = true);
    } else if (player1 == 's') {
        won = (player2 == 'p') ? true : (player2 == 'r') ? false : !(draw = true);
    } else if (player1 == 'p') {
        won = (player2 == 'r') ? true : (player2 == 's') ? false : !(draw = true);
    }
}

function startGame() {
    do {
        draw = false;
        player1 = prompt('Player 1: Choose rock (r) paper (p) scissor(s)');
        if (ia) {
            player2 = moves[Math.floor(Math.random() * 3)];
        } else {
            player2 = prompt('Player 2: Choose rock (r) paper (p) scissor(s)');
        }
        checkwin();

        if (draw) {
            console.log('Draw!');
        }
    } while (draw)
    if (won) {
        console.log('Player 1 won with ' + player1 + ' against ' + player2);
    } else {
        console.log('Player 2 won with ' + player2 + ' against ' + player1);
    }
}

function mainMenu() {
    let answer = ''
    let mode = prompt('Choose the gamemode by typing the number: \n 1 for ia (agains machine) or 2 for pvp (player vs player)');
    if (mode == 2) {
        ia = false
    }
    do {
        startGame();
        do {
            answer = prompt('Play again? yes/no').toLowerCase();
        } while (answer !== 'yes' && answer !== 'no')

    } while (answer == 'yes')
    return 'Game finished';
}

mainMenu();
