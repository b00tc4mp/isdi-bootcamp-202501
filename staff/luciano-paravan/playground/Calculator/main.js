const title = React.createElement('h1', { children: 'Hello Calculator 🧮' })

const number1Label = React.createElement('label', {
    children: 'Number 1'
})
const number1Input = React.createElement('input', {
    type: 'number',
    name: 'nuber1'
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
        submitButton,
    ],
    onSubmit(event) {
        event.preventDefault()

        const domForm = event.target

        const domNumber1Input = domForm.querySelector('input[name=number1')
        const domNumer2Input = domForm.querySelector('input[name=number2')

        const number1 = domNumber1Input.value
        const number2 = domNumer2Input.value
    }
})

const resultParagraph = React.createElement('p')

const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)
root.render([title, form, resultParagraph])

