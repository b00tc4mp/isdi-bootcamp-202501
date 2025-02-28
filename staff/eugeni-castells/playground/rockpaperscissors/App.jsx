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
    setError(error.message);
  };

  const handleLandingNavigation = () => {
    setView("landing");
  };

  return (
    <div>
      <h1>Rock, Paper, Scissors!</h1>
      {view === "landing" && (
        <Landing
          onRobotClick={handleRobotClick}
          onPlayerClick={handlePlayerClick}
        />
      )}
      {view === "game/cp" && (
        <GameVsCp
          onError={() => {
            handleError();
          }}
          onLandingNavigation={handleLandingNavigation}
        />
      )}
      {view === "game/player" && (
        <GameVsPlayer
          // onError={() => {
          //   handleError;
          // }}
          onLandingNavigation={handleLandingNavigation}
        />
      )}
      {error !== "" && <Error error={error} />}
    </div>
  );
}
