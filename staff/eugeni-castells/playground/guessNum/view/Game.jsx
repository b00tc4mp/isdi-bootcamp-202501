const Game = ({ onGameOver, onNoRestartClick }) => {
  const { useState, useEffect } = React;

  const [maximumLevelValue, setMaximumLevelValue] = useState(null);

  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    let maxValue = logic.getMaximumLevelValue();

    setMaximumLevelValue(maxValue);
  }, []);

  const handleTry = (event) => {
    event.preventDefault();

    try {
      const { target: form } = event;

      const {
        number: { value: number },
      } = form;

      logic.validateNumber(number);

      logic.checkNumber(number);

      let over = logic.isGameOver();

      setIsGameOver(over);

      form.reset();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  return (
    <>
      {!isGameOver && (
        <>
          <h1>Good luck! 🔥</h1>
          <h3>Write a number between 0 and {maximumLevelValue}</h3>
          <form onSubmit={handleTry}>
            <label htmlFor="number">Try a number</label>
            <input type="number" id="number" />
            <button type="submit">Try</button>
          </form>
        </>
      )}
      {isGameOver && (
        <>
          <h1>The game is over!</h1>
          <p>Do you want to play again?</p>
          <button type="button" onClick={onGameOver}>
            Yes
          </button>{" "}
          &nbsp;
          <button type="button" onClick={onNoRestartClick}>
            No
          </button>
        </>
      )}
    </>
  );
};
