function SelectionView({ onPlayGame }) {
  const handleSelectMode = (mode) => {
    try {
      logic.selectMode(mode);
    } catch (error) {
      console.error(error.message);
      alert("Ha ocurrido un error. Por favor, vuelva a intentarlo.");
    }
  };

  const handleSelectRounds = (rounds) => {
    try {
      logic.selectRounds(rounds);
    } catch (error) {
      console.error(error.message);
      alert("Ha ocurrido un error. Por favor, vuelva a intentarlo.");
    }
  };

  return (
    <>
      <h1>Select your mode</h1>
      <button onClick={() => handleSelectMode("IA")}>player vs IA</button>
      <button onClick={() => handleSelectMode("VS")}> player vs player</button>
      <h2>Select your max rounds</h2>
      <button onClick={() => handleSelectRounds("1")}>1</button>
      <button onClick={() => handleSelectRounds("3")}>3</button>
      <button onClick={() => handleSelectRounds("5")}>5</button>
      {/* boton que se habilita cuando ya tengo el mode y el level select */}
      //TODO
      <button onClick={onPlayGame}>Play</button>
    </>
  );
}
