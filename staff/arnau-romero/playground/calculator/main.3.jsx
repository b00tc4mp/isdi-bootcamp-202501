// Tercera iteracion con React

const rootElement = document.querySelector('div#root')
const root = reactDOM.createrRoot(rootElement)

const title = <h1>Hello, World! 🧮</h1>

const useState = React.useState

function Calculator(){
    const title = <h1>Hello, World!</h1>

    const resultState = useState(0)
    const result =  resultState[0]
    const setResult = resultState[1]

    const handelSubmit = event => {
        event.preventDefault()

        const domForm = event.target

        const domNumber1Input = domForm.querySelector('input[name=number1]')
        const domNumber2Input = domForm.querySelector('input[name=number2]')

        const number1 = Number(domNumber1Input.value)
        const 
    }
}