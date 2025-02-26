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
/**
 * Dudas al respecto de mi select:
 * el onClick que recibo por parametro es el que traigo desde app?
 * lo tengo que llamar dentro de mi handleSelect, para poder navegar al momento de elegir la dificultad ?
 * y mis onClick de los botones solo estan relacionados con mi handleSelect?
 */