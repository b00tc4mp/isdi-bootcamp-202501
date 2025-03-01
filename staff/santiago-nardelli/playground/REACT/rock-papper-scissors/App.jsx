function App() {
  const [view, setView] = React.useState("home");


  const handleSelectClick = () => setView("select");

  const handlePlayClick = () => setView("game");

  const handleResetClick = () => setView("home");

  console.debug("APP--> render", view);

  return (
    <>
      {view === "home" && <Home onSelectClick={ handleSelectClick} />}
      {view === "select" && (
        <SelectionView onPlayGame={handlePlayClick} />
      )}
      {view === "game" && <GameView onResetGame={handleResetClick} />}
    </>
  );
}
