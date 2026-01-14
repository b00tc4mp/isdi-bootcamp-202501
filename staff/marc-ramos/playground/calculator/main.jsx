const rootElement = document.querySelector('div#root') //seleccionamos el div con id='root' en el documento html
const root = ReactDOM.createRoot(rootElement) //creamos un 'root' de React en este elemento para renderizar la aplicacion

const useState = React.useState //almacenamos React.usestate en una variable useState que es un hook de React que permite manejar el estado dentro de un componente funcional.

function Calculator() {
    const [result, setResult] = useState(0) 

    const handleSubmit = event => {
        event.preventDefault() //evitamos que el formulario recargue pagina

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
        <h1>Welcome to Calculator 3000 🧮</h1>

        <form onSubmit = {handleSubmit}>
            <label>Number 1</label>
            <input type='number' name='number1' />
            +
            <label>Number 2</label>
            <input type='number' name='number2' />
            <button type='submit'> = </button>
        </form>

        <p>{result}</p>
    </>
}

root.render(<Calculator/>)