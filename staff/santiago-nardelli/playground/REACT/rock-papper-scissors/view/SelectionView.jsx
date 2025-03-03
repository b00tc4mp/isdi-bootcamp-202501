function SelectionView({ onPlayGame }) {

 const [mode, setMode] = React.useState('');
  const [rounds, setRounds] = React.useState('');

  const handleSelectMode = (mode) => {
    try {
      logic.selectMode(mode);
      setMode(mode);
    } catch (error) {
      console.error(error.message);
      alert("Ha ocurrido un error. Por favor, vuelva a intentarlo.");
    }
  };

  const handleSelectRounds = (rounds) => {
    try {
      logic.selectRounds(rounds);
      setRounds(rounds);
    } catch (error) {
      console.error(error.message);
      alert("Ha ocurrido un error. Por favor, vuelva a intentarlo.");
    }
  };

  const handlePlayGame = () => {
    try {
      onPlayGame();
    } catch (error) {
      console.error(error.message);
      alert("Ha ocurrido un error. Por favor, vuelva a intentarlo.");
    }
  }

  return (
    <>
      <h1>Select your mode</h1>
      <button onClick={() => handleSelectMode("IA")}>player vs IA</button>
      <button onClick={() => handleSelectMode("VS")}> player vs player</button>
      <h2>Select your max rounds</h2>
      <button onClick={() => handleSelectRounds("1")}>1</button>
      <button onClick={() => handleSelectRounds("3")}>3</button>
      <button onClick={() => handleSelectRounds("5")}>5</button>
      <button onClick={handlePlayGame} disabled={!mode || !rounds}>Play</button>
    </>
  );
}
