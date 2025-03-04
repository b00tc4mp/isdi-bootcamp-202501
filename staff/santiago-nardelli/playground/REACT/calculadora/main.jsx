const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const useState = React.useState;

function Calculator() {
  const [result, setResult] = useState('Ingrese los valores'); // Estado para almacenar el resultado

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)

    // Captura los valores de los inputs
    const domForm = e.target;
    const domNumberOneInput = domForm.querySelector("input[name=number1]");
    const domNumerTwoInput = domForm.querySelector("input[name=number2]");
    const domOperationInput = domForm.querySelector("input[name=operation]");

    const number1 = parseFloat(domNumberOneInput.value); // Convierte el valor del input a número
    const number2 = parseFloat(domNumerTwoInput.value); // Convierte el valor del input a número
    const operation = domOperationInput.value; // Captura el valor de la operación



    try {
      validateInputs(number1, number2, operation); // Validamos los inputs

      const result = calculate(number1, number2, operation); // Calcula el resultado

      setResult(result); // Actualiza el estado con el resultado

    } catch (error) {
        console.error(error);
      setResult(error.message);
    }
  };

  //Funcion para resetear los valores de los inputs
  const handleReset = () => {
    setResult('Ingrese los valores'); // Actualiza el estado con el resultado
    document.querySelector("input[name=number1]").value = "";
    document.querySelector("input[name=number2]").value = "";
    document.querySelector("input[name=operation]").value = "";
  };

  return (
    <>
      <h1>Calculadora 🧮</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="number1"
          placeholder="Entry a number"
          step="any"
        />
        <input
          type="number"
          name="number2"
          placeholder="Entry a number"
          step="any"
        />
        <input
          type="text"
          name="operation"
          placeholder="Operación (+, -, *, /)"
        />
        <button type="submit">=</button>
        <button type='button' onClick={handleReset}>Reset</button>
        <p>
          Resultado:
          {result}
        </p>
        {/* Muestra el resultado */}
      </form>
    </>
  );
}

//Capa Logica
function calculate(number1, number2, operation) {
  let result;
  switch (operation) {
    case "+":
      result = number1 + number2;
      break;
    case "-":
      result = number1 - number2;
      break;
    case "*":
      result = number1 * number2;
      break;
    case "/":
      result = number1 / number2;
      break;
    default:
      result = "Operación no válida";
  }
  return result;
}




//Helpers de validacion
function validateInputs(number1, number2, operation) {
  // Si no ingreso alguno de los valores validos de operación lanzamos un error
  if (
    operation !== "+" &&
    operation !== "-" &&
    operation !== "*" &&
    operation !== "/"
  ) {
    throw new TypeError("El operador no es válido");
  }
  //Si no se cumplen las dos condiciones lanzamos un error, gracias al operador logico de || que obliga que las dos condiciones se cumplan
  if (isNaN(number1) || isNaN(number2)) {
    throw new TypeError("Los valores deben ser números");
  }

  if (operation === "/" && number2 === 0) {
    throw new Error("No se puede dividir por 0");
  }
}

root.render(<Calculator />);
