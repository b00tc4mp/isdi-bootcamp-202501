const title = React.createElement('h1', { children: 'Hello' })

const firstNumberLabel = React.createElement('label', { children: '1st number' })
const firstNumberInput = React.createElement('input', { type: 'number', name: 'firstNumber' })

const secondNumberLabel = React.createElement('label', { children: '2nd number' })
const secondNumberInput = React.createElement('input', { type: 'number', name: 'secondNumber' })

const optionAddition = React.createElement('option', { children: 'Addition', value: 'addition' })
const optionSubstraction = React.createElement('option', { children: 'Substraction', value: 'substraction' })
const optionMultiplication = React.createElement('option', { children: 'Multiplication', value: 'multiplication' })
const optionDivision = React.createElement('option', { children: 'Division', value: 'division' })

const operationLabel = React.createElement('label', { children: 'Select operation' })
const operationSelect = React.createElement('select', {
    name: 'operations',
    children: [
        optionAddition,
        optionSubstraction,
        optionMultiplication,
        optionDivision
    ]
})

const submitButton = React.createElement('button', { type: 'submit', children: '=' })

const form = React.createElement('form', {
    children: [
        firstNumberLabel,
        firstNumberInput,
        secondNumberLabel,
        secondNumberInput,
        operationLabel,
        operationSelect,
        submitButton
    ],
    onSubmit(event) {
        event.preventDefault()

        const domForm = event.target

        const operationSelected = domForm.querySelector('select[name=operations]').value

        const domFirstNumberInput = domForm.querySelector('input[name=firstNumber]')
        const domSecondNumberInput = domForm.querySelector('input[name=secondNumber]')

        const firstNumberValue = Number(domFirstNumberInput.value)
        const secondNumberValue = Number(domSecondNumberInput.value)

        let operationResult

        switch (operationSelected) {
            case 'addition': operationResult = firstNumberValue + secondNumberValue
                break
            case 'substraction': operationResult = firstNumberValue - secondNumberValue
                break
            case 'multiplication': operationResult = firstNumberValue * secondNumberValue
                break
            case 'division': operationResult = firstNumberValue / secondNumberValue
                break
        }

        const resultParagraph = React.createElement('p', { children: operationResult })

        root.render([title, form, resultParagraph])
    }
})

const resultParagraph = React.createElement('p', { children: 0 })

const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)
root.render([title, form, resultParagraph])