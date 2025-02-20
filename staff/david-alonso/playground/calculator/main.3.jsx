const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)

const useState = React.useState


function Calculator() {
    const title = <h1>Hello Calculator! 🧮</h1>

    const resultState = useState(0)
    const result = resultState[0]
    const setResult = resultState[1]

    const handleSubmit = event => {
        event.preventDefault()

        const domForm = event.target

        const domNumber1Input = domForm.querySelector('input[name=number1')
        const domNumber2Input = domForm.querySelector('input[name=number2')

        const number1 = Number(domNumber1Input.value)
        const number2 = Number(domNumber2Input.value)

        const result = number1 + number2

        console.log(result)

        setResult(result)
    }

    const form = <form onSubmit={handleSubmit}>
        <label>Number 1</label>
        <input type="number" name="number1" />
        +
        <label>Number 2</label>
        <input type="number" name="number2" />
        <button type="submit">=</button>

    </form >

    const resultParagraph = <p>{result}</p>

    return [title, form, resultParagraph]
}

root.render(<Calculator />)
