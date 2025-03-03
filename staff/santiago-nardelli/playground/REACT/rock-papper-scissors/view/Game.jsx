function game() {


    const [userEntry, setUserEntry] = useState("");


    //Capturo el valor del input
    const handleChange = (e) => {
      setUserEntry(e.target.value);
    };

  const handleSubmitGame = (e) => {
    e.preventDefault();
    console.log("Game");
    logic.takeDesicion(userEntry)
    setUserEntry("");
    try {
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Game</h1>
      <form onSubmit={handleSubmitGame}>
        <label htmlFor="player">Player choose your move 🪨 or 🧻 or ✂️</label>
        <input
          type="text"
          name="player"
          id="player"
          placeholder="Entry your move"
          value={userEntry}
          onChange={handleChange}
        />
        <button type="submit" >
          Play
        </button>
        <p>Round win{}</p>
      </form>
    </div>
  );
}
