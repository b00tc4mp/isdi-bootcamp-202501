const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)

const useState = React.useState

function Calculator() {

    const [fisrtNumber, setFirstNumber] = useState()
    const [secondNumber, setSecondNumber] = useState()
    const [result, setResult] = useState(0)

    const handleSubmit = event => {
        event.preventDefault()

        const domForm = event.target

        const domNumber1Input = domForm.querySelector('input[name=number1]')
        const domNumber2Input = domForm.querySelector('input[name=number2]')

        const number1 = Number(domNumber1Input.value)
        const number2 = Number(domNumber2Input.value)

        const result = number1 + number2

        setResult(result)
    }

    return <>
        <h1>Hello calculator! 🧮</h1>

        <form onSubmit={handleSubmit}>
            <button onClick={handleClick} value="7" name="7">7</button>
            <button onClick={handleClick} value="8" name="8">8</button>
            <button onClick={handleClick} value="9" name="9">9</button>
            <button onClick={handleClick} value="4" name="4">4</button>
            <button onClick={handleClick} value="5" name="5">5</button>
            <button onClick={handleClick} value="6" name="6">6</button>
            <button onClick={handleClick} value="1" name="1">1</button>
            <button onClick={handleClick} value="2" name="2">2</button>
            <button onClick={handleClick} value="3" name="3">3</button>
            <button onClick={handleClick} value="0" name="0">0</button>
            <button onClick={handleClick} value="+" name="+">+</button>
            <button onClick={handleClick} value="-" name="-">-</button>
            <button onClick={handleClick} value="*" name="*">*</button>
            <button onClick={handleClick} value="/" name="/">/</button>

            <button type="submit">Calculate</button>
        </form>

        <p>{result}</p>
    </>
}

root.render(<Calculator />)