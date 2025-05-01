const rootElement = document.querySelector('div#root')

const root = ReactDOM.createRoot(rootElement)

const useState = React.useState

function GuessNumber() {
    const [numberToGuess, setNumberToGuess] = useState(Math.floor(Math.random() * 101))
    const [chancesLeft, setChancesLeft] = useState(10)
    const [number, setNumber] = useState([])
    const [message, setMessage] = useState('')
    const [winner, setWinner] = useState(false)

    

    
}