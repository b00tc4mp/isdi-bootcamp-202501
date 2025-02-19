let cells = [[], [], []]
let table = '';

//This values count if there are 3 signs in the same direction
let contx = 0;
let conto = 0;

let won = false;
//This value functions as a switch, indicating whose turn it is.
let isplayerx = false;

for (let i = 0; i < cells.length; i++) {
    for (let k = 0; k < cells.length; k++) {
        cells[i][k] = '_'
    }
}

//Print the table with the moves done
function printTable() {
    console.clear();
    table = '';
    for (let i = 0; i < cells.length; i++) {

        for (let k = 0; k < 3; k++) {
            table += cells[i][k] + ' '
        }
        table += '\n'

    }
    console.log(table);
}

//Write the symbols into the table
function placeMove() {
    let col = Number(playermove.charAt(0));
    let row = Number(playermove.charAt(1));
    if (cells[col - 1][row - 1] == '_') {
        cells[col - 1][row - 1] = (isplayerx) ? 'X' : 'O'
        printTable();
    } else {
        isplayerx ? askPlayerX() : askPlayerO();
    }

}

//Ask the player X to promt a value
function askPlayerX() {
    if (!won) {
        playermove = prompt('Player X: Enter Column and row (Ex. 11 or 23)');
        isplayerx = true;
        placeMove();
        checkWin();
    }
}
//Ask the player O to promt a value
function askPlayerO() {
    if (!won) {
        playermove = prompt('Player O: Enter Column and row (Ex. 11 or 23)');
        isplayerx = false;
        placeMove();
        checkWin();
    }

}

//Checking if there are 3 equal symbols and calling functions that check for each possibility
function checkWin() {
    return won = (checkRows() == true) ? true : (checkColumns() == true) ? true : (checkDiagonals() == true) ? true : false;
}

//Checking the rows
function checkRows() {
    for (let i = 0; i < cells.length && won == false; i++) {
        for (let k = 0; k < 3; k++) {
            if (cells[i][k] == 'X') {
                contx++;
            } else if (cells[i][k] == 'O') {
                conto++;
            }
        }
        if (contx == 3 || conto == 3) {
            won = true;
        } else {
            contx = 0;
            conto = 0;
        }
    }

    return won;
}

//Checking the columns
function checkColumns() {
    for (let i = 0; i < cells.length && !won; i++) {
        for (let k = 0; k < 3; k++) {
            if (cells[k][i] == 'X') {
                contx++;
            } else if (cells[k][i] == 'O') {
                conto++;
            }
        }
        if (contx == 3 || conto == 3) {
            won = true;
        } else {
            contx = 0;
            conto = 0;
        }
    }

    return won;
}

//Checking the diagonals
function checkDiagonals() {

    for (let k = 0; k < cells.length; k++) {
        if (cells[k][k] == 'X') {
            contx++;
        } else if (cells[k][k] == 'O') {
            conto++;
        }
    }
    if (contx == 3 || conto == 3) {
        won = true;
    } else {
        contx = 0;
        conto = 0;
        let aux = 2;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i][aux] == 'X') {
                contx++;
            } else if (cells[i][aux] == 'O') {
                conto++;
            }
            aux--
        }

        if (contx == 3 || conto == 3) {
            won = true;
        } else {
            contx = 0;
            conto = 0;
        }
    }
    return won;
}

function coreGame() {
    let turns = 9
    do {
        askPlayerX();
        turns--;
        //This if is needed because player O has less movement than player X
        if (turns != 0) {
            askPlayerO();
            turns--;
        }
    } while (won == false && turns != 0)return console.log((contx == 3) ? 'X won' : (conto == 3) ? 'O won' : 'Draw')
}

coreGame();
