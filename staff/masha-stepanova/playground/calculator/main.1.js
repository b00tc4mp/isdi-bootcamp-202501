//import { useState } from 'react'

const title = React.createElement('h1', { children: 'Welcome to your calculator! 🧮' })

const number1Label = React.createElement('label', { children: 'Number 1' })
const number1Input = React.createElement('input', { type: 'number', name: 'number1' })

const number2Label = React.createElement('label', { children: 'Number 2' })
const number2Input = React.createElement('input', { type: 'number', name: 'number2' })

const sum = React.createElement('option', { name: 'sum', id: 'sum', children: 'sum' })
const substract = React.createElement('option', { name: 'substract', id: 'substract', children: 'substract' })
const multiply = React.createElement('option', { name: 'multiply', id: 'multiply', children: 'multiply' })
const divide = React.createElement('option', { name: 'divide', id: 'divide', children: 'divide' })

const selectorLabel = React.createElement('label', { for: 'selector' })
const selector = React.createElement('select', { name: 'selector', id: 'selector', children: [sum, substract, multiply, divide] })

const submitButton = React.createElement('button', { type: 'submit', children: '=' })

let result = 'sum result'

const form = React.createElement('form', {
    id: 'sumForm',
    children: [
        number1Label,
        number1Input,
        number2Label,
        number2Input,
        selectorLabel,
        selector,
        submitButton
    ],
    onSubmit(event) {
        //const [result, setResult] = useState(0)

        event.preventDefault()

        const domForm = event.target

        const domNumber1Input = domForm.querySelector('input[name=number1]')
        const domNumber2Input = domForm.querySelector('input[name=number2]')
        const domSelector = domForm.querySelector('select[name=selector]').value

        const number1 = Number(domNumber1Input.value)
        const number2 = Number(domNumber2Input.value)

        console.log('hello submit', number1, number2)

        switch (domSelector) {
            case 'sum': result = number1 + number2
                break
            case 'substract': result = number1 - number2
                break
            case 'multiply': result = number1 * number2
                break
            case 'divide': result = number1 / number2
                break
        }


        console.log(result)

        const resultParagraph = React.createElement('p', { children: result })

        //setResult(resultSum)

        root.render([title, form, resultParagraph])
    }
})

// const sumForm = document.getElementById('sumForm')
// let result = sumForm.elements['result']

const resultParagraph = React.createElement('p', { children: result })


const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)
root.render([title, form, resultParagraph])
