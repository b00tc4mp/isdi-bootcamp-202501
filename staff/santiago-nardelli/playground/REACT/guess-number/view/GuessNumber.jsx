function GuessNumber({onResetGame}) {
  const useEffect = React.useEffect;
  const [userEntry, setUserEntry] = React.useState("");
  const [attempts, setAttempts] = React.useState(logic.getStatus());
  const [message , setMessage] = React.useState("");  



  //Capturo el valor del input
  const handleChange = (event) => {
    setUserEntry(event.target.value);
  };

  const handleSubmitNumber = (event) => {
    event.preventDefault();

    try {
      const result = logic.tryNumber(userEntry);
      setAttempts(result.attempts);
      setMessage(result.message)
      setUserEntry(""); 
    } catch (error) {
      console.error(error.message);
      alert("Error: " + error.message);
    }
  };

  const handleResetGame = () => {
    try {
      logic.playAgain();
      
      setAttempts(logic.getStatus());
      setUserEntry("");
      onResetGame();
    } catch (error) {
      console.error(error.message);
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    setAttempts(logic.getStatus());
  }, []);

  return (
    <div>
      <h1>Try a Number</h1>
      <form onSubmit={handleSubmitNumber}>
        <input
          type="text"
          placeholder="Enter a NUMBER"
          value={userEntry}
          //este evento me permite capturar el valor del input
          onChange={handleChange}
        />
        <button type="submit">Try your luck</button>
      </form>
      <p>Attempts: {attempts}</p>
      <p>{message}</p>
      <br />
      <button onClick={handleResetGame}>Reset Game</button>
    </div>
  );
}
