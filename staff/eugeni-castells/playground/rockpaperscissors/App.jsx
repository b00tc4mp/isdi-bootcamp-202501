function App() {
  const { useState } = React;

  const [view, setView] = useState("landing");

  const [error, setError] = useState("");

  const handleRobotClick = () => {
    setView("game/cp");
  };

  const handlePlayerClick = () => {
    setView("game/player");
  };

  const handleError = (error) => {
    console.error(error);
    setError(error);
  };

  const handleLandingNavigation = () => {
    setView("landing");
  };

  return (
    <div>
      <h1>Rock, Paper, Scissors!</h1>
      {view === "landing" && (
        <Landing
          onRobotCLick={handleRobotClick}
          onPlayerClick={handlePlayerClick}
        />
      )}
      {view === "game/cp" && (
        <Game
          onError={() => {
            handleError();
          }}
        />
      )}
      {view === "game/player" && (
        <Game
          onError={() => {
            handleError;
          }}
          onLandingNavigation={handleLandingNavigation}
        />
      )}
      {error !== "" && <Error error={error} />}
    </div>
  );
}
