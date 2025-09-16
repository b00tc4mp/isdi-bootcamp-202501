function App() {

    const useState = React.useState;
  const [view, setView] =useState("start");


  const handleSelectDifficultyClick = () => setView("select-difficulty");

  const handleSelectNumberClick = () => setView("guess-number");

  const handleResetClick = () => setView("start");

  console.debug("APP--> render", view);

  return (
    <>
      
        {view === "start" && <Start onStartClick={handleSelectDifficultyClick} />}

        {view === "select-difficulty" && <SelectDifficulty onSelectClick={handleSelectNumberClick} />}

        {view === "guess-number" && <GuessNumber onResetGame={handleResetClick}  />}
      
      
    </>
  );
}
/**
 * Dudas al respecto de mi guess number:
 * en mi app manejo las vistas con un estado, y en cada vista tengo un boton que me permite cambiar de vista, mi pregunta es que desde mi app tengo que pasarle por props a cada vista el metodo que me permite cambiar de vista, o puedo hacerlo de otra manera?
 */