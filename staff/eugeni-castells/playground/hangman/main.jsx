const rootElement = document.querySelector("div#root");

const root = ReactDOM.createRoot(rootElement);

function App() {
  const { useState } = React;

  const [view, setView] = useState("start");

  const [status, setStatus] = useState("");

  const [feedback, setFeedback] = useState("");

  const [gameOver, setGameOver] = useState(false);

  const handleStart = (event) => {
    event.preventDefault();
    try {
      const form = event.target;

      const word = form.word.value;

      logic.introduceWord(word);

      const status = logic.getStatus();
      setView("game");
      setStatus(status);
    } catch (error) {}
  };

  const handleCharOrWordSubmit = (event) => {
    event.preventDefault();

    try {
      const { target: form } = event;

      const {
        charOrWord: { value: charOrWord },
      } = form;

      if (charOrWord.length === 1) logic.attemptCharacter(charOrWord);
      else if (charOrWord.length > 1) logic.attemptWord(charOrWord);

      const status = logic.getStatus();

      setStatus(status);

      form.reset();

      const gameOver = logic.isGameOver();

      setFeedback(
        gameOver ? (logic.isWon() ? "You win!" : "You lose") : "Keep going!"
      );

      setGameOver(gameOver);
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleRestartClick = () => {
    try {
      logic.resetGame();

      setView("start");

      setStatus("");

      setFeedback("");

      setGameOver(false);
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  return (
    <>
      {view === "start" && (
        <div>
          <h1>Welcome to Hangman!</h1>
          <form onSubmit={handleStart}>
            <label htmlFor="word">Word to guess?</label>
            <input name="word" id="word" />
            <button type="submit">Start</button>
          </form>
        </div>
      )}
      {view === "game" && (
        <div>
          <p style={{ fontSize: "40px" }}>{status.status}</p>

          <p>Remaining attempts: {status.remainingAttemps}</p>

          <form onSubmit={handleCharOrWordSubmit}>
            <label htmlFor="charOrWord">Char or Word to guess</label>
            <input id="charOrWord" name="charOrWord" />
            <button type="submit">Try</button>
          </form>

          <p>{feedback}</p>

          {gameOver && (
            <button type="button" onClick={handleRestartClick}>
              Restart
            </button>
          )}
        </div>
      )}
    </>
  );
}
root.render(<App />);
