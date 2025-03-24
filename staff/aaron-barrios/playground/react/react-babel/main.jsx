const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)

const useState = React.useState

function Calculator() {
    const [result, setResult] = useState(0)

    const handleSubmit = event => {
        event.preventDefault()

        const doForm = event.target

        const number1Input = doForm.querySelector('input[name=number1]')
        const number2Input = doForm.querySelector('input[name=number2]')

        const number1 = Number(number1Input.value)
        const number2 = Number(number2Input.value)

        const result = number1 + number2

        setResult(result)
    }

    console.log('Calculator render')

    return <>
        <h1>Hello world! 🦽</h1>

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