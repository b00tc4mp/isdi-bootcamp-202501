// Primera iteracion con React sin Jsx
// Calculadora para sumar numeros

// Creo el div
const rootElement = document.querySelector('div#root')
// Creo el root React
const root = ReactDom.createRoot(rootElement)

// Creo label i input para number1
const number1Label = <label>Number 1</label>
const number1Input = <input type="number" name= "number1"/>
// Creo label i input para number 2
const number2Label = <label>Number 2</label>
const number2Input = <input type="number" name= "number2"/>
// Boton tipo submit para realizar la operacion
const submitButton = <button type = "submit">=</button>

const form = <form onSubmit={event =>{
    event.preventDefault() // Evitar que se refresque la pagina
    // Montamos el form en DOM
    const domFomr = event.target
    // Inputs en DOM
    const domNumber1Input = domForm.querySelector('input[name=number1]')
    const domNumber2Input = domForm.querySelector('input[name=number2]')
    // Guardamos valor en number1 y number 2
    const number1 = Number(domNumber1Input.value)
    const number2 = Number(domNumber2Input.value)
    // Result suma de los dos number
    const result = number1 + number2
    console.log('hello submit', result)
    // Mostramos result en un elemento tipo paragraph
    const resultParagraph = <p>{result}</p>
    //Lo anclamos al root
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