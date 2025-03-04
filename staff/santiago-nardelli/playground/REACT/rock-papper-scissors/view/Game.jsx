function Game() {
  const [userEntry, setUserEntry] = React.useState("");
  const [roundWin, setRoundWin] = React.useState(0);
  const [roundLose, setRoundLose] = React.useState(0);
  const [result, setResult] = React.useState("");

  const handleSelectElement = (element) => {
    try {
      const gameResult = logic.takeDesicion(element);
      setUserEntry(element);

      if (gameResult === logic.constants.message.win) {
        setRoundWin(roundWin + 1);
      } else if (gameResult === logic.constants.message.lose) {
        setRoundLose(roundLose + 1);
      }

      setResult(gameResult);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div >
      <h1>Game</h1>
      <h2>Player choose your move 🪨 or 🧻 or ✂️</h2>
      <div className="buttons-container">
        <button onClick={() => handleSelectElement('r')}>🪨</button>
        <button onClick={() => handleSelectElement('p')}>🧻</button>
        <button onClick={() => handleSelectElement('s')}>✂️</button>
      </div>
      <h3>Result: {result}</h3>
      <p>Rounds Won: {roundWin}</p>
      <p>Rounds Lost: {roundLose}</p>
    </div>
  );
}
