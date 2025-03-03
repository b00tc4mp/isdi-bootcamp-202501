function Home({ onSelectClick }) {
 const handleStartClick = () => {
    try {
      onSelectClick();
    } catch (error) {
      console.error(error.message);
      alert("Error");
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
