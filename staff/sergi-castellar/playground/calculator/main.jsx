const { useState } = require("react")

const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)

// const useState = React.useState

const title = <h1>Hello calculator</h1>

// const resultState = useState(0)
// const result = resultState[0]
// const setResult = resultState[1]
const [result, setResult] = useState(0)

const form = <form>
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
    <button></button>
</form>

root.render([title, form])