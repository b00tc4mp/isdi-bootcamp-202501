const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)

const useState = React.useState

function Calculator() {
    const [result, setResult] = useState(0)
    
    const handleSubmit = event => {
        event.preventDefault()

        const domForm = event.target

        const domFirstNumberInput = domForm.querySelector('input[name=firstNumber]')
        const domSecondNumberInput = domForm.querySelector('input[name=secondNumber]')
        const operationSelected = domForm.querySelector('select[name=operationsSelect]').value

        const firstNumberValue = Number(domFirstNumberInput.value)
        const secondNumberValue = Number(domSecondNumberInput.value)

        let result

        switch (operationSelected) {
            case 'addition': result = firstNumberValue + secondNumberValue
                break
            case 'substraction': result = firstNumberValue - secondNumberValue
                break
            case 'multiplication': result = firstNumberValue * secondNumberValue
                break
            case 'division': result = firstNumberValue / secondNumberValue
                break
        }

        setResult(result)
    }

    return <>
        <h1>Hello calculator</h1>

        <form onSubmit={handleSubmit}>
            <label>1st Number</label>
            <input type='number' name='firstNumber'></input>

            <label>2nd Number</label>
            <input type='number' name='secondNumber'></input>

            <label>Select operation</label>
            <select name='operationsSelect'>
                <option value='addition'>Addition</option>
                <option value='substraction'>Substraction</option>
                <option value='multiplication'>Multiplication</option>
                <option value='division'>Division</option>
            </select>
            <button type='submit'>=</button>

            <p>{result}</p>
        </form>
    </>


}

root.render(<Calculator />)