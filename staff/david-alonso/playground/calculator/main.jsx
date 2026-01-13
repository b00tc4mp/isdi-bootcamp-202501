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

        // Tomamos el valor del selector de operacion
        const domOperationSelect = domForm.querySelector('select[name=operation')

        // Tomamos los datos de los Input
        const domNumber1Input = domForm.querySelector('input[name=number1')
        const domNumber2Input = domForm.querySelector('input[name=number2')

        // guardamos la seleccion de la operacion ha realizar
        const operation = domOperationSelect.value

        // Guardamos los valores de los Input pasandolos de String a Number
        const number1 = Number(domNumber1Input.value)
        const number2 = Number(domNumber2Input.value)

        let result

        switch (operation) {
            case "sum":
                result = number1 + number2
                break
            case "subtract":
                result = number1 - number2
                break
            case "multiply":
                result = number1 * number2
                break
            case "divide":
                result = number1 / number2
                break
        }

        console.log(result)

        setResult(result)
    }

    // Contenido que se muestra por pantalla
    return <>
        <h1>Hello  🧮</h1>

        <form onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <select name="operation"
                style={{ background: "lightgrey", marginBottom: '10px', width: '100px' }} >
                <option value="sum"> ➕ </option>
                <option value="subtract"> ➖ </option>
                <option value="multiply"> ✖️ </option>
                <option value="divide"> ➗ </option>
            </select>

            <label>Number 1</label>
            <input type="number" name="number1" style={{ marginBlock: "10px" }} />

            <label>Number 2</label>
            <input type="number" name="number2" />
            <button type="submit"
                style={{ background: "lightgrey", marginBlockStart: '20px', width: '100px' }}
            >=</button>

        </form >

        <h4>Result : {result}</h4>
    </>
}

// Llamamos a "Calculator" para renderizar todo con los nuevos valores
root.render(<Calculator />)
