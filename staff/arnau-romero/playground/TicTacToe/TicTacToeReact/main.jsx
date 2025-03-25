const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

function App(){
/*
 jugador 1 sera las 'x'
 jugador 2 sera las 'o'
*/
    const [view, setView] = useState('game')
    const [row, setRow] = useState('')
    const [diferrence, setDiferrence] = useState('')
    const [gameOver, setGameOver] = useState(false)

    const handleXclick = () => {


    }
}