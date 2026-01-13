
// Creamos el Titulo 
const title = React.createElement('h1', { children: 'Hello, Calculator! 🧮' })

// Creamos el contenido del formulario del Numero 1
const number1Label = React.createElement('label', { children: 'Number 1' })

const number1Input = React.createElement('input', { type: 'number', name: 'number1' })

// Creamos el contenido del formulario del Numero 2
const number2Label = React.createElement('label', { children: ' + Number 2' })

const number2Input = React.createElement('input', { type: 'number', name: 'number2' })

// Cereamos el Boton tipo Submit y se le da valores
const submitButton = React.createElement('button', {
    type: 'submit',
    children: '='
})

// creamos una variable de Resultado con valor inicial 0
let result = 0

// Damos forma al Formulario
const form = React.createElement('form', {
    children: [
        number1Label,
        number1Input,
        number2Label,
        number2Input,
        submitButton
    ],

    // Parametros del Boton Submit
    onSubmit(event) {
        event.preventDefault()

        const domForm = event.target

        // Busca valores dentro de los Input
        const domNumber1Input = domForm.querySelector('input[name=number1]')
        const domNumber2Input = domForm.querySelector('input[name=number2]')

        // Conseguimos los valores introducidos en los Input convertidos a number
        const number1 = parseFloat(domNumber1Input.value)
        const number2 = parseFloat(domNumber2Input.value)

        result = number1 + number2
        console.log(result)

        // Llamamos a renderApp
        renderApp()

    }

})

// Cada vez que se llama actualiza el codigo
const renderApp = () => {

    // Creamos un nuevo Parrafo donde se muestre el resultado
    const resultParagraph = React.createElement('h3', {
        // Si el valor de Result no es 0 lo muestra, si no muestra 0
        children: result !== 0 ? result : 0
    })

    // Vuelve a cargar la pagina añadiendo el resultado
    root.render([title, form, resultParagraph])
}


const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)
// root.render([title, form])
//Añadimos los parametros que creamos arriba 

renderApp()