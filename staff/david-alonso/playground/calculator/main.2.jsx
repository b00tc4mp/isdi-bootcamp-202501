// CAMBIOS

// 1* Creamos una variable con el formulario
// 2* Creamos una variable con el comportamiento del Boton


const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)

const title = <h1>Hello Calculator! 🧮</h1>

// 2* Comportamiento del boton
const handleSubmit = event => {
    event.preventDefault()

    const domForm = event.target

    const domNumber1Input = domForm.querySelector('input[name=number1')
    const domNumber2Input = domForm.querySelector('input[name=number2')

    const number1 = Number(domNumber1Input.value)
    const number2 = Number(domNumber2Input.value)

    const result = number1 + number2

    console.log(result)

    const resultParagraph = <p>{result}</p>
    root.render([title, form, resultParagraph])


}

// 1* Reducimos el formulario y llamamos al comportamiento del boton
const form = <form onSubmit={handleSubmit}>
    <label>Number 1</label>
    <input type="number" name="number1" />
    +
    <label>Number 2</label>
    <input type="number" name="number2" />
    <button type="submit">=</button>

</form >

root.render([title, form])
