function Home({ onSelectionClick }) {
 const handleStartClick = () => {
    try {
      onSelectionClick();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Rock Paper Scissors</h1>
      <p>Start Selections Rules-Games</p>
      <button onClick={handleStartClick}>Start</button>
    </>
  );
}
