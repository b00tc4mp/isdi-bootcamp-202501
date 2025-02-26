
//p = paper
//r = rock
//s = scissor

const logic = {
    checkwin(player1, player2) {
        let won = '';
        if (player1 == 'r') {
            won = (player2 == 's') ? 'true' : (player2 == 'p') ? 'false' : 'draw';
        } else if (player1 == 's') {
            won = (player2 == 'p') ? 'true' : (player2 == 'r') ? 'false' : 'draw';
        } else if (player1 == 'p') {
            won = (player2 == 'r') ? 'true' : (player2 == 's') ? 'false' : 'draw';
        }

        return won
    },

    startGame(mode, player1, player2) {
        let moves = ['p', 'r', 's'];
        
        if (mode === 'machine') {
            player2 = moves[Math.floor(Math.random() * 3)];
        }
        return logic.checkwin(player1, player2);

    },
}