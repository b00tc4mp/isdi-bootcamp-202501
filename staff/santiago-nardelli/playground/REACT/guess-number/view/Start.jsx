

function Start({ onStartClick }) {
  const handleStartClick = () => {
    try {
      // Llamar a la capa lógica para crear el número a adivinar
      logic.createARandomNumber();
      // Navegar al nivel de dificultad
      onStartClick();
    } catch (error) {
      console.error(error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <h1>Guess the number</h1>
      <button onClick={handleStartClick}>Start</button>
    </div>
  );
}



