const logic = {
    constant: {
        ROCK: 'r',
        PAPER: 'p',
        SCISSOR: 's',
        moves: ['r', 'p', 's']
    },

    setResult(playerMove) {
        data.draw = false;

        if (playerMove == logic.constant.ROCK) {
            data.won = (data.cpuMove == logic.constant.SCISSOR) ? true : (data.cpuMove == logic.constant.PAPER) ? false : !(data.draw = true);
        } else if (playerMove == logic.constant.SCISSOR) {
            data.won = (data.cpuMove == logic.constant.PAPER) ? true : (data.cpuMove == logic.constant.ROCK) ? false : !(data.draw = true);
        } else if (playerMove == logic.constant.PAPER) {
            data.won = (data.cpuMove == logic.constant.ROCK) ? true : (data.cpuMove == logic.constant.SCISSOR) ? false : !(data.draw = true);
        }

        if (!data.draw) {
            if (data.won) {
                data.playerWins++;
            } else {
                data.cpuWins++;
            }
        }

        data.rounds++;
    },

    setCpuMove() {
        data.cpuMove = logic.constant.moves[Math.floor(Math.random() * 3)];
    },

    saveLog(playerMove) {

        const log = {
            playerMove: playerMove,
            cpuMove: data.cpuMove,
            round: data.rounds
        }

        data.logs.push(log);

    },

    startGame(playerMove) {

        logic.setCpuMove();

        logic.setResult(playerMove);

        logic.saveLog(playerMove);

        return {
            won: data.won,
            draw: data.draw,
            playerMove: playerMove,
            playerWins: data.playerWins,
            cpuMove: data.cpuMove,
            cpuWins: data.cpuWins,
            logs: data.logs
        }
    },
}