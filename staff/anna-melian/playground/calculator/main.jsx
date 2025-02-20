const rootElement = document.querySelector('div#root')
const root = ReactDOM.createRoot(rootElement)

const Component = React.Component

class Calculator extends Component {
    constructor() {
        console.log('Calculator constructor')

        super()

        this.state = { result: 0 }

    }

    handleSubmit = event => {
        event.preventDefault()

        const domForm = event.target

        const domNumber1Input = domForm.querySelector('input[name=number1]')
        const domNumber2Input = domForm.querySelector('input[name=number2]')

        const number1 = Number(domNumber1Input.value)
        const number2 = Number(domNumber2Input.value)

        const result = number1 + number2

        console.log('result: ', result)

        this.setState({ result })
    }


    render() {
        console.log('calculator render')
        const formStyle = {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '300px'
        }

        return <>
            <h1>Hello, Calculator! 🧮</h1>

            <form onSubmit={this.handleSubmit} style={formStyle}>
                <label >Number 1 </label>
                <input type="number" name="number1" />
                +
                <label >Number 2</label>
                <input type="number" name="number2" />
                <button type="submit">=</button>
            </form>

            <p>{this.state.result}</p>
        </>
    }

}



root.render(<Calculator />) // new Calculator()