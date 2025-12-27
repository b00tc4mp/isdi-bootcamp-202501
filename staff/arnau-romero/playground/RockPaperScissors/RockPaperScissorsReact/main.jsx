const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

function App(){
 /*
    - usuario selecciona numero de rondas a jugar
    - usuario selecciona si piedra papel tijera (tres buttons distintos)
    - CPU genera piedra papel o tijera
    - Se comprueba jugada y se acumula resultado
    - Se comprueba si ya hay ganador
    - Se imprime por pantalla el ganador
    - Aparece boton de restart para volver a jugar
    
 */
    const [view, setView] = useState('intro')
    const [status, setStatus] = useState(null)

    const handleRoundsSubmit = event => {
        /*
        - Recibo numero de rondas del usuario
        - Paso ese dato a la data 
        - Monto la view game
        */
        event.preventDefault()

        const { target: form } = event // const form = event.target
        const { rounds: {value: numberRounds}} = form  // const numberRounds = form.rounds.value 
        const status = logic.getStatus()
        setStatus(status) 

        data.rounds.maxRounds = numberRounds
        logic.remainingRounds()

        form.reset()

        setView('game')

    }

    const handleClickRock = () => {
            /*
            1- Generamos una eleccion aleatoria de la maquina (generateRockPaperScissors)
            2- Le pasamos a la funcion la seleccion del usuario
            3- comparamos resultados, sumamos ronda y sumamos resultado
            4- Mostramos las rondas que quedan
            5- Mostramos resultado por paragraph
            6- Comprobamos si ha ganado alguien cuando lleguemos al maximo de rondas
            */
           try{
            //1
            logic.generateRockPaperScissors()
            //2 y 3
            logic.checkPlay('r', data.choices.machineChoice)
            // 4
            const status = logic.getStatus()
            setStatus(status) 
            // 6
            logic.checkWin()
           }catch(error){
            alert(error.message)
            console.error(error)
           }
        }
    
    const handleClickPaper = () => {
        try{
        //1
        logic.generateRockPaperScissors()
        //2 y 3
        logic.checkPlay('p', data.choices.machineChoice)
        // 4
        const status = logic.getStatus()
        setStatus(status)
        // 6
        logic.checkWin()
        }catch(error){
            alert(error.message)
            console.error(error)
        }
    }

    const handleClickScissors = () => {
        try{
        //1
        logic.generateRockPaperScissors()
        //2 y 3
        logic.checkPlay('s', data.choices.machineChoice)
        // 4
        const status = logic.getStatus()
        setStatus(status)
        // 6
        logic.checkWin()
        }catch(error){
            alert(error.message)
            console.error(error)
        }

    }

    const handleRestartClick = () => {
        try{
            logic.resetGame()

            setView('intro')
        }catch (error){
            console.error(error)
        }
    }

    /*  QUE MOSTRAR EN DOM REAL
        SI GANA JUGADOR LA RONDA
        {status.playerWinRound === true && machineWinRound === false && <p>{`Player win with ${playerChoice} vs ${machineChoice} cpu `}</p>}
        SI GANA LA MAQUINA LA RONDA
        {status.playerWinRound === false && machineWinRound === true && <p>{`Player win with ${playerChoice} vs ${machineChoice} cpu `}</p>}
        SI EMPATAN
        {status.playerWinRound === false && machineWinRound === false && attempts != 0 <p>{`Player win with ${playerChoice} vs ${machineChoice} cpu `}</p>}
        
        SI LA PARTIDA LA GANA EL JUGADOR
        {playerWinGame === true && machineWinRound === false && remainingRounds === 0 && <p>{`Player win the GAME!`}</p>}
        SI LA PARTIDA LA GANA LA MAQUINA
        {playerWinGame === false && machineWinRound === true && remainingRounds === 0 && <p>{`Player machine the GAME!`}</p>}
        SI LA PARTIDA QUEDA EN EMPATE
        {playerWinGame === false && machineWinRound === false && remainingRounds === 0 && <p>{`ITS A DRAW!!`}</p>}


    */

    return<>
        <h1>Rock 🪨 Paper 📋 Scissors ✂️!</h1>

        {view === 'intro' && <form onSubmit ={handleRoundsSubmit}>
            <label htmlFor="rounds">Number of Rounds? </label>
            <input type= "number" name="rounds" id="rounds"/>
            <button type = "submit">GO!</button>
            </form>}

        {view=== 'game'&& <>
            {status.remainingRounds !== 0 && <p> {status.remainingRounds}</p>}

            <button type="button" onClick={handleClickRock}>ROCK🪨</button> <button type="button" onClick={handleClickPaper}>PAPER📋</button> <button type="button" onClick={handleClickScissors}>SCISSORS ✂️</button>
            
            {status.playerWinRound === true && status.machineWinRound === false && status.currentRounds !== 0 && <p>{`Player win with ${status.playerChoice} vs ${status.machineChoice} `}</p>}

            {status.playerWinRound === false && status.machineWinRound === true && status.currentRounds !== 0 && <p>{`Machine win with ${status.machineChoice} vs ${status.playerChoice} `}</p>}

            {status.playerWinRound === false && status.machineWinRound === false && status.currentRounds !== 0 && <p>{`It's a draw, player: ${status.playerChoice} vs ${status.machineChoice} cpu `}</p>}

            {status.currentRounds !== 0 && <p>{ ` Player wins: ${status.playerWins} Machine wins: ${status.machineWins} Draws: ${status.draws} ` }</p>}

            {status.playerWinGame === true && status.machineWinGame === false && status.currentRounds !== 0 && status.remainingRounds === 0 &&<p>{'Player win the GAME!'}</p>}

            {status.playerWinGame === false && status.machineWinGame === true && status.currentRounds !== 0 && status.remainingRounds === 0 && <p>{`Machine the GAME!`}</p>}

            {status.playerWinGame === false && status.machineWinGame === false && status.currentRounds !== 0 && status.remainingRounds === 0 &&<p>{`ITS A DRAW!!`}</p>}

            {status.remainingRounds === 0 && status.currentRounds !== 0 && <button onClick={handleRestartClick}>RESTART</button>}
        </>}
    </>
}
root.render(<App />)