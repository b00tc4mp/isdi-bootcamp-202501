const title = React.createElement('h1', { children: 'Hello, Calculator! 🎲 ' })

const number1Label = React.createElement('label', {
    children: 'Number 1'
})
const number1Input = React.createElement('input', {
    type: 'number',
    name: 'number1'
})

const number2Label = React.createElement('label', {
    children: 'Number 2'
})
const number2Input = React.createElement('input', {
    type: 'number',
    name: 'number2'
})
const submitButton = React.createElement('button', { 
    type: 'submit',
    children: '='
})

const form = React.createElement('form', {
    children: [
        number1Label,
        number1Input,
        number2Label,
        number2Input,
        submitButton
    ],
    onSubmit(event) {
        event.preventDefault()

        const domForm = event.target

        const domNumber1Input = domForm.querySelector('input[name=number1]')
        const domNumber2Input = domForm.querySelector('input[name=number2]')

        const number1 = domNumber1Input.value
        const number2 = domNumber2Input.value

        console.log('hello submit', number1, number2)

    }
})

const resultParagraph = React.createElement('p') // el resultado fuera del form porque no es parte del form

const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement) //aqui es donde React va a pintar la aplicación
root.render([title, form, resultParagraph])
