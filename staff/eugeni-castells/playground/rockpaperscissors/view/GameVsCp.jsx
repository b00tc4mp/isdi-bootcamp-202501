const GameVsCp = ({ onError, onLandingNavigation }) => {
  const { useState, useEffect } = React;

  const [p1Turn, setP1Turn] = useState(true);

  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    try {
      const status = logic.getStatus();

      if (!p1Turn) {
        setTimeout(() => {
          setP1Turn(!p1Turn);
          setFeedback(status);
        }, 1500);
      } else setFeedback(status);
    } catch (error) {
      onError(error.message);
    }
  }, [p1Turn]);

  const handleChoiceClick = (move) => {
    try {
      logic.isGameOver();

      logic.updateMove(move, p1Turn);

      setP1Turn(!p1Turn);

      logic.generateMachineMove();

      logic.checkRound();

      logic.checkWinGame();
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
      <h1>
        {p1Turn ? (
          "Player's turn"
        ) : (
          <div className="playerTurn-info">
            <span>Machine's turn</span>
            <div className="loading-animation"></div>
          </div>
        )}
      </h1>
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
      <p style={{ display: "flex", flexDirection: "column" }}>
        <span>Player wins: {feedback.p1Wins}</span>
        <span>Machine: {feedback.p2Wins}</span>
        <span>Draws: {feedback.draws}</span>
        <span>Rounds: {feedback.rounds}</span>
        <span>
          Winner:
          {feedback.winner === 0
            ? "No winner yet, keep playing"
            : `The winner is ${feedback.winner === 1 ? "player" : "machine"}`}
        </span>
      </p>
      {feedback.winner !== 0 && (
        <button onClick={handleRestart}>Restart</button>
      )}
    </div>
  );
};
