const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)

const title = <h1>Hello, World! 🧮</h1>

const handleSubmit = event => {
    event.preventDefault()

    const domForm = event.target

    const domNumber1Input = domForm.querySelector('input[name=number1]')
    const domNumber2Input = domForm.querySelector('input[name=number2]')

    const number1 = Number(domNumber1Input.value)
    const number2 = Number(domNumber2Input.value)

    const result = number1 + number2

    console.log('hello submit', result)

    const resultParagraph = <p>{result}</p>
    root.render([title, form, resultParagraph])
}

const form = <form onSubmit={handleSubmit}>
    <label>Number 1</label>
    <input type="number" name="number1" />
    +
    <label>Number 2</label>
    <input type="number" name="number2" />
    <button type="submit">=</button>
</form>

root.render([title, form])