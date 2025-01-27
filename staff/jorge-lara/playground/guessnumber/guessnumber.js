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

let ia = false;
let attempts = 0;
let won = false;
let hiddennumber = '';
let guessnumber = '';
let difference = 0;
let records = [];
let log = '';
let temperatures = ['Very cold', 'Cold', 'Tempered', 'Warm', 'Hot', 'Very hot']

function printLog() {
    if (attempts != 0) {
        log = 'Number     Distance\n'
        for (let i = 0; i < records.length; i++) {
            log += records[i] + '\n';
        }
        return log;
    }
    return '';
}
function checkWin() {
    difference = Math.abs(guessnumber - hiddennumber);
    if (difference >= 50) {
        //very cold
        console.log(temperatures[0]);
        records[attempts] = guessnumber + '     ' + temperatures[0];
        attempts++;
    } else if (difference < 50 && difference >= 30) {
        //Cold
        console.log(temperatures[1])
        records[attempts] = guessnumber + '     ' + temperatures[1];
        attempts++;
    } else if (difference < 30 && difference >= 20) {
        //Tempered
        console.log(temperatures[2])
        records[attempts] = guessnumber + '     ' + temperatures[2];
        attempts++;
    } else if (difference < 20 && difference >= 10) {
        //Warm
        console.log(temperatures[3]);
        records[attempts] = guessnumber + '     ' + temperatures[3];
        attempts++;
    } else if (difference < 10 && difference >= 5) {
        //Hot
        console.log(temperatures[4]);
        records[attempts] = guessnumber + '     ' + temperatures[4];
        attempts++
    } else if (difference < 5 && difference >= 1) {
        //Very hot
        console.log(temperatures[5]);
        records[attempts] = guessnumber + '     ' + temperatures[5];
        attempts++;
    } else {
        won = true;
    }
}
let cancelgame = false;
function guessPlayer() {

    do {
        guessnumber = prompt('Pick a number between 0-100 \n' + printLog());
        if (guessnumber == null) {
            guessnumber = 0;
            cancelgame = true
        } else {
            parseInt(guessnumber);
        }
        //parseInt returns Nan if is not a character number
    } while (isNaN(guessnumber) || guessnumber < 0 || guessnumber > 101)if (!cancelgame) {
        checkWin();
    }
}

function coreGame() {
    ia = (prompt('Choose the gamemode by typing the number: \n 1 for ia (agains machine) or 2 for pvp (player vs player)') == 1) ? true : false;
    if (ia) {
        hiddennumber = parseInt(Math.floor(Math.random() * 101));
    } else {
        hiddennumber = parseInt(prompt('Enter number to guess'));
    }
    do {
        guessPlayer();
    } while (attempts <= 10 && won == false && !cancelgame)
    if (cancelgame) {
         return console.log('The game was cancelled');
    } else if (won) {
         console.log('Congratulations, you won!');
    } else {
         console.log('Sorry, you lose');
    }
    restartGame();
}
function restartGame() {
    let answer = '';
    do {
        answer = prompt('Play again? yes/no').toLowerCase();
    } while (answer !== 'yes' && answer !== 'no')

    if (answer == 'yes'){
        attempts = 0;
        won = false;
        log = '';
        coreGame();
    }else{
        return console.log("Game ended")
    }

}
coreGame();
