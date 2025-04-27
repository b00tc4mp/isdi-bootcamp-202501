const App = () => {
  const { useState } = React;

  const [view, setView] = useState("landing");

  const handleLevelClick = (level) => {
    try {
      logic.generateRandomNumber(level);

      setView("game");
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleNoRestart = () => {
    setView("end");
  };
  const handleRestart = () => {
    setView("landing");
    logic.reset();
  };
  return (
    <>
      {view === "landing" && (
        <Landing
          onLevelClick={(level) => {
            handleLevelClick(level);
          }}
        />
      )}
      {view === "game" && (
        <Game onGameOver={handleRestart} onNoRestartClick={handleNoRestart} />
      )}
      {view === "end" && <Bye />}
    </>
  );
};
