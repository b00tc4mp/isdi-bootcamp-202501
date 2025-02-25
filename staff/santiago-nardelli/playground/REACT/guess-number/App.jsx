function App() {

    const useState = React.useState;
  const [view, setView] =useState("start");


  const handleSelectDifficultyClick = () => setView("select-difficulty");

  const handleSelectNumberClick = () => setView("guess-number");

  const handleGetStatusClick = () => setView("status");

  console.debug("APP--> render", view);

  return (
    <>
      
        {view === "start" && <Start onStartClick={handleSelectDifficultyClick} />}

        {view === "select-difficulty" && <SelectDifficulty onClick={handleSelectNumberClick} />}

        {view === "guess-number" && <GuessNumber onClick={handleGetStatusClick} />}
      
      
    </>
  );
}
