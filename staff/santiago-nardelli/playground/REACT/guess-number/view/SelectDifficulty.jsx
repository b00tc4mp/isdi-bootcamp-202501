function SelectDifficulty({onSelectClick}) {
  const handleSelect = (level) => {
    try {
      logic.selectDifficulty(level);
      onSelectClick();
    } catch (error) {
      console.error(error.message);

      alert("Ha ocurrido un error. Por favor, vuelva a intentarlo.");
    }
  };
  
  return (
    <>
   
      <h2>Select your difficulty:</h2>
      
      <button onClick={() => handleSelect("1")}>Easy (10 attempts)</button>
      <button onClick={() => handleSelect("2")}>Medium (7 attempts)</button>
      <button onClick={() => handleSelect("3")}>Hard (4 attempts)</button>
    
    </>
)
}
