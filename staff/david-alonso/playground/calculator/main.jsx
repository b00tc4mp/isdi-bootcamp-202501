const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)

const useState = React.useState

// Creamos una funcion que contiene la calculadora
function Calculator() {

    const [result, setResult] = useState(0)
    // "useState(0)" crea una variable "result" con valor inicial 0 y una función "setResult" para modificarla

    const handleSubmit = event => {
        // Evitamos que la pagina se recargue
        event.preventDefault()

        // Captura el click del boton
        const domForm = event.target

        // Tomamos los datos de los Input
        const domNumber1Input = domForm.querySelector('input[name=number1')
        const domNumber2Input = domForm.querySelector('input[name=number2')

        // Guardamos los valores de los Input pasandolos de String a Number
        const number1 = Number(domNumber1Input.value)
        const number2 = Number(domNumber2Input.value)

        // Sumamos los dos valores de los Input
        const result = number1 + number2

        console.log(result)

        setResult(result)
    }

    // Contenido que se muestra por pantalla
    return <>
        <h1>Hello Calculator! 🧮</h1>

        <form onSubmit={handleSubmit}>
            <label>Number 1</label>
            <input type="number" name="number1" />
            +
            <label>Number 2</label>
            <input type="number" name="number2" />
            <button type="submit">=</button>

        </form >

        <p>{result}</p>
    </>
}

// Llamamos a "Calculator" para renderizar todo con los nuevos valores
root.render(<Calculator />)
