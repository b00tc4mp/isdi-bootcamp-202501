const GameVsPlayer = ({ onError, onLandingNavigation }) => {
  const { useState, useEffect } = React;

  const [p1Turn, setP1Turn] = useState(true);

  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    try {
      const status = logic.getStatus();

      setFeedback(status);
    } catch (error) {
      onError(error.message);
    }
  }, [p1Turn]);

  const handleChoiceClick = (move) => {
    try {
      logic.isGameOver();

      logic.updateMove(move, p1Turn);

      if (!p1Turn) {
        logic.checkRound();

        logic.checkWinGame();
      }

      setP1Turn(!p1Turn);
    } catch (error) {
      alert(error.message);

      console.error(error);
      // onError(error);
    }
  };

  const handleRestart = () => {
    try {
      logic.restart();

      onLandingNavigation();
    } catch (error) {
      onError(error);
    }
  };
  return (
    <div>
      <h1>Player's {p1Turn ? "1" : "2"} turn</h1>
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={() => {
            handleChoiceClick(0);
          }}
          style={{ fontSize: "36px" }}
        >
          🪨
        </button>
        <button
          onClick={() => {
            handleChoiceClick(1);
          }}
          style={{ fontSize: "36px" }}
        >
          📄
        </button>
        <button
          onClick={() => {
            handleChoiceClick(2);
          }}
          style={{ fontSize: "36px" }}
        >
          ✂️
        </button>
      </div>
      <p>
        <span>Player 1 wins: {feedback.p1Wins}</span>
        <span>Player 2 wins: {feedback.p2Wins}</span>
        <span>Draws: {feedback.draws}</span>
        <span>Rounds: {feedback.rounds}</span>
        <span>
          Winner:
          {feedback.winner === 0
            ? "No winner yet, keep playing"
            : `The winner is ${
                feedback.winner === 1 ? "player 1" : "player 2"
              }`}
        </span>
      </p>
      {feedback.winner !== 0 && (
        <button onClick={handleRestart}>Restart</button>
      )}
    </div>
  );
};
