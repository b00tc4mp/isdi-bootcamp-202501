logic = {
  getStatus() {
    const status = {
      p1Wins: data.p1Wins,
      p2Wins: data.p2Wins,
      draws: data.rounds - (data.p1Wins + data.p2Wins),
      rounds: data.rounds,
      winner: data.winner,
    };
    //TODO add error casuistic
    return status;
  },
  checkRound() {
    const p1Move = data.lastMove[0];

    const p2Move = data.lastMove[1];

    const { rock, paper, scissors } = data.constants.VALUES;

    if (
      (p1Move === rock.value && p2Move === scissors.value) ||
      (p1Move === paper.value && p2Move === rock.value) ||
      (p1Move === scissors.value && p2Move === paper.value)
    ) {
      data.p1Wins++;

      data.rounds++;
    } else if (p1Move === p2Move) {
      data.rounds++;
    } else {
      data.p2Wins++;

      data.rounds++;
    }
  },
  checkWinGame() {
    let { p1Wins, constants, p2Wins, winner } = data;

    const { NEEDED_ROUNDS } = constants;

    if (p2Wins === NEEDED_ROUNDS) data.winner = 2;
    if (p1Wins === NEEDED_ROUNDS) data.winner = 1;
  },
  isGameOver() {
    if (data.winner !== 0) throw new Error("Game is already over");
  },
  updateMove(move, p1Turn) {
    this.isGameOver();

    p1Turn ? (data.lastMove[0] = move) : (data.lastMove[1] = move);
  },
  generateMachineMove() {
    const { lastMove } = data;

    const choiceNum = Math.floor(Math.random() * 3);

    lastMove[1] = choiceNum;
  },
  restart() {
    data.lastMove = [];
    data.p1Wins = 0;
    data.p2Wins = 0;
    data.rounds = 0;
    data.winner = 0;
  },
};
