const jsx = React.createElement

const title = jsx('h1', { children: 'Hello,Calculator!' })

const number1Label = jsx('label', { children: 'Number 1' })
const number1Input = jsx('input', { type: 'number', name: 'number1' })

const number2Label = jsx('label', { children: 'Number 2' })
const number2Input = jsx('input', { type: 'number', name: 'number2' })

const submitButton = jsx('button', {
    type: 'submit',
    children: '='
})

const form = jsx('form', {
    children: [
        number1Label,
        number1Input,
        '+',
        number2Label,
        number2Input,
        submitButton
    ],
    onSubmit(event) {
        event.preventDefault()

        const domForm = event.target

        const domNumber1Input = domForm.querySelector('input[name=number1]')
        const domNumber2Input = domForm.querySelector('input[name=number2]')

        const number1 = Number(domNumber1Input.value)
        const number2 = Number(domNumber2Input.value)

        const result = number1 + number2

        console.log('result:' + result)

        const resultParagraph = jsx('p', {
            children: result
        })

        root.render([title, form, resultParagraph])
    }
})
const resultParagraph = jsx('p')


const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)
root.render([title, form, resultParagraph])