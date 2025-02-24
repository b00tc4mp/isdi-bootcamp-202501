// Seleccionamos el contenedor raíz en el DOM donde se montará la aplicación de React
const rootElement = document.querySelector('div#root')

// Creamos un "root" de React, que es el punto de entrada donde React se encargará de renderizar los componentes
const root = ReactDOM.createRoot(rootElement)

// Extraemos la función `useState` de React, que nos permitirá manejar el estado dentro del componente funcional
const useState = React.useState



function Calculator() {
   // Usamos useState para declarar una variable de estado llamada "result" que se inicializa en 0
    const [result, setResult] = useState(0)

     // Manejador de evento para cuando el formulario es enviado
    const handleSubmit = event => {
        //Prevenimos el comportamiento predeterminado del formulario (no recargar la página)
        event.preventDefault()
     
        
        const domForm = event.target

        const domNumber1Input = domForm.querySelector('input[name=number1]')
        const domNumber2Input = domForm.querySelector('input[name=number2]')

        const number1 = Number(domNumber1Input.value)
        const number2 = Number(domNumber2Input.value)

        const result = number1 + number2

        console.log('hello submit', result)

        setResult(result)
    }

    console.log('Calculator render')

    return <>
        <h1>Hello, World! 🧮</h1>

        <form onSubmit={handleSubmit}>
            <label>Number 1</label>
            <input type="number" name="number1" />
            +
            <label>Number 2</label>
            <input type="number" name="number2" />
            <button type="submit">=</button>
        </form>

        <p>{result}</p>
    </>
}


root.render(<Calculator />)