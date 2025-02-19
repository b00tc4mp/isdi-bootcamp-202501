/*
player
- adivinar numero random que sólo conoce la maquina (entre 0 y 100)
- tiene 10 intentos
- si intento (numero) tiene una diferencia >= 50 con el random, entonces 'very cold'
- si intento tiene una diferencia < 50 y >= 30, entonces 'cold'
- si intento tiene una diferencia < 30 y >= 20, entonces 'tempered'
- si intento tiene una diferencia < 20 y >= 10, entonces 'warm'
- si intento tiene una diferencia < 10 y >= 5, entonces 'hot'
- si intento tiene una diferencia < 5 y >= 1, entonces 'very hot'
- si acierta en menos de 10 intentos, win! por el contrario lost!
*/

let attempts = 0;
let won = false;
let hiddennumber = '';
let guessnumber = '';
let records = [];

let temperatures = ['Very cold', 'Cold', 'Tempered', 'Warm', 'Hot', 'Very hot']

//Logic
function printLog() {
    let log = '';
    if (attempts != 0) {
        log = 'Number     Distance\n'
        for (let i = 0; i < records.length; i++) {
            log += records[i] + '\n';
        }
        return log;
    }
    return '';
}

//Logic
function checkNumber(guessnumber) {
    let difference = Math.abs(guessnumber - hiddennumber);
    if (difference >= 50) {
        //very cold
        records[attempts] = guessnumber + '     ' + temperatures[0];
        attempts++;
    } else if (difference < 50 && difference >= 30) {
        //Cold
        records[attempts] = guessnumber + '     ' + temperatures[1];
        attempts++;
    } else if (difference < 30 && difference >= 20) {
        //Tempered
        records[attempts] = guessnumber + '     ' + temperatures[2];
        attempts++;
    } else if (difference < 20 && difference >= 10) {
        //Warm
        records[attempts] = guessnumber + '     ' + temperatures[3];
        attempts++;
    } else if (difference < 10 && difference >= 5) {
        //Hot
        records[attempts] = guessnumber + '     ' + temperatures[4];
        attempts++
    } else if (difference < 5 && difference >= 1) {
        //Very hot
        records[attempts] = guessnumber + '     ' + temperatures[5];
        attempts++;
    } else {
        won = true;
    }
}

//logic
function generateNumber(num) {

    if (num == undefined) {
        hiddennumber = Math.floor(Math.random() * 101);
    } else {
        hiddennumber = num;
    }
    console.log(hiddennumber)
}

//Logic
function validInput(input) {
    if (input === null) {
        throw new Error('Game cancelled')
    } else if (isNaN(input)) {
        throw new Error('Wrong character')
    }
}
//Logic
function checkWin() {
    let status = {
        attempts: attempts,
        won: won
    }

    return status;

}

//Logic
function restartGame() {
    attempts = 0;
    won = false;
    log = '';
}

//View
function tryGuessNumber() {
    let guessnumber = parseInt(prompt('Pick a number between 0-100'))
    try {
        validInput(guessnumber);
        checkNumber(guessnumber);
    } catch (error) {
        alert(error.message);
    }

}


//View
function coreGame() {
    let option = prompt('Choose the gamemode by typing the number: \n 1 for ia (agains machine) or 2 for pvp (player vs player)');
    try {
        validInput(option);

        if (option == '1') {
            generateNumber();
        } else if (option == '2') {
            generateNumber(parseInt(prompt('Enter number to guess')));
        }
        let gamestatus = '';

        do {
            tryGuessNumber();
            alert(printLog());
            gamestatus = checkWin();
        } while (gamestatus.attempts <= 10 && gamestatus.won == false)
        if (gamestatus.won) {
            alert('You won')
        } else {
            alert('You lose')
        }

        let playagain = confirm('Play again?');
        if (playagain) {
            restartGame();
            coreGame();
        } else {
            alert('Program ended')
        }
    } catch (error) {
        alert('Game cancelled');
    }

}


coreGame();
