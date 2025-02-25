function SelectDifficulty({onClick}) {
  const handleSelect = (level) => {
    try {
      logic.selectDifficulty(level);
      onClick();
    } catch (error) {
      console.error(error.message);

      alert("Ha ocurrido un error. Por favor, vuelva a intentarlo.");
    }
  };
//CUANDO QUIERO CAPTURAR UN VALOR DE UN MEOTODO LO DECLARO () =>  
  return (
    <>
   
      <h2>Select your difficulty:</h2>
      
      <button onClick={() => handleSelect("1")}>Easy (10 attempts)</button>
      <button onClick={() => handleSelect("2")}>Medium (7 attempts)</button>
      <button onClick={() => handleSelect("3")}>Hard (4 attempts)</button>
    
    </>
)
}
