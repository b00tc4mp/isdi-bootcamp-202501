const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)

const title = <h1>Hello, World! 🧮</h1>
const number1Label = <label>Number 1</label>
const number1Input = <input type="number" name= "number1" /> 
const number2Label = <label>Number 2</label>
const number2Input = <input type="number" name= "number2"/>
const submitButton = <button type="submit">=</button>

const form = <form onSubmit={event => {
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
    
}}>
    {number1Label}
    {number1Input}
    +
    {number2Label}
    {number2Input}
    {submitButton}
 </form>

 root.render([title, form])