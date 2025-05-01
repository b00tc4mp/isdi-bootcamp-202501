const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)

const useState = React.useState

function Calculator () {
    const [result, setResult] = useState(0)

    const handleSubmit = event => {
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
        <h1>Hello Calculator 🧮</h1>
        
        <form onSubmit={handleSubmit}>
            <label>Number 1</label>
            <input type="number" name="number1" />
            +
            <label>Number 2</label>                <input type="number" name="number2" />
            <button type="submit">=</button>
        </form>
        
        <p>{result}</p>
    </>
}

root.render(<Calculator />)

