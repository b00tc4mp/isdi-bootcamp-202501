const rootElement = document.querySelector('div#root')

const root = ReactDOM.createRoot(rootElement)

const useState = React.useState

function GuessNumber() {
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 101))
    const [chancesLeft, setChancesLeft] = useState(10)
    const [playerNumber, setPlayerNumber] = useState('')
    const [message, setMessage] = useState('')
    const [winner, setWinner] = useState(false)

    const handleInputChange = (event) => {
        setPlayerNumber(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const num = Number(playerNumber)
        if (isNaN(num) || num < 0 || num > 100) {
            setMessage('Please enter a number between 0 and 100')
            return
        }

        const difference = Math.abs(randomNumber - num)
        let feedback = ''

        if (difference === 0) {
            setWinner(true)
            setMessage(`Congratulations! YOU WIN! The number was ${randomNumber}`)
            return
        } else if (difference >= 50) {
            feedback = 'Very cold!'
        } else if (difference >= 30) {
            feedback = 'Cold!'
        } else if (difference >= 20) {
            feedback = 'Tempered!'
        } else if (difference >= 10) {
            feedback = 'Warm!'
        } else if (difference >= 5) {
            feedback = 'Hot!'
        } else {
            feedback = 'Very hot!'
        }

        setChancesLeft(prev => prev - 1)
        setMessage(`${feedback} You have ${chancesLeft - 1} chances left`)

        if (chancesLeft - 1 === 0) {
            setMessage(`You lost! The number was ${randomNumber}`)
        }
    }

    return (
        <>
            <h1>Guess the Number Game 🎯</h1>
            <p>You have {chancesLeft} chances left.</p>
            {winner || chancesLeft === 0 ? (
                <p>{message}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>Enter a number (0-100):</label>
                    <input type="number" value={playerNumber} onChange={handleInputChange} min="0" max="100" />
                    <button type="submit">Guess</button>
                </form>
            )}
            <p>{message}</p>
        </>
    )
}

root.render(<GuessNumber />)

/*
const rootElement = document.querySelector('div#root') 
const root = ReactDOM.createRoot(rootElement) 
const useState = React.useState 


var data = {}
var logic = {}
var interface = {}

// DATA

data.randomNumber = 0
data.maxChances = 10
data.userChances = 0
data.playerNumber = 0
data.chancesLeft = 10
data.numberDiference = 0
data.winner = false

// LOGIC

logic.calculateChances = function (){
    if(data.maxChances != 0)
     data.chancesLeft--
}

logic.addRandomNumber = function (){
    data.randomNumber = logic.generateRandomNumber(0,100)
}

logic.generateRandomNumber = function (){
    
    return data.randomNumber =  Math.floor(Math.random() * (101))    
}

logic.differenceNumbers = function (){
    if (data.playerNumber > data.randomNumber){
        data.numberDiference = data.playerNumber - data.randomNumber
    } else if (data.randomNumber > data.playerNumber){
        data.numberDiference = data.randomNumber - data.playerNumber
    }
}

logic.checkNumber = function (){
    if (data.numberDiference >= 50){

        alert ('Very cold!' + '\n' + 'You have ' + data.chancesLeft + ' chances left')

    } else if (data.numberDiference < 50 && data.numberDiference >= 30){

        alert ('Cold!' + '\n' + 'You have ' + data.chancesLeft + ' chances left')

    } else if (data.numberDiference < 30 && data.numberDiference >= 20){

        alert ('Tempered!' + '\n' + 'You have ' + data.chancesLeft + ' chances left')

    } else if (data.numberDiference < 20 && data.numberDiference >= 10){

        alert ('Warm!' + '\n' + 'You have ' + data.chancesLeft + ' chances left')

    } else if (data.numberDiference < 10 && data.numberDiference >= 5){

        alert ('Hot!' + '\n' + 'You have ' + data.chancesLeft + ' chances left')

    } else if (data.numberDiference < 5 && data.numberDiference >= 1){

        alert ('Very hot!' + '\n' + 'You have ' + data.chancesLeft + ' chances left')

    }
}

logic.winGame = function (){
    if (data.playerNumber === data.randomNumber){
    data.winner = true
    alert ('Congratulations! YOU WIN! with ' + data.chancesLeft + ' chances left' + '\n' + 'The number was ' + data.randomNumber)
 
    } else {
        data.maxChances--
    }
}

// PRESENTATION

interface.askNumber = function (){
    data.playerNumber = Number(prompt ('What number is it? ' + '\n' + 'You have ' + data.chancesLeft + ' chances left'))
}

interface.gameAuto = function (){
    logic.addRandomNumber()
    console.log(data.randomNumber)
    do {
        interface.askNumber()
        logic.differenceNumbers()
        logic.winGame()
        logic.calculateChances()
        logic.checkNumber()
        
    } while (data.winner === false && data.maxChances != 0) {

        alert ('You lost!')
    }
}

interface.gameAuto()

*/