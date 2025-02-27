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
    const [feedback, setFeedback] = useState('')
    const [rounds, setRounds] = useState('')
    const [gameStatus, setGameStatus] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    const handleRoundsSubmit = event => {
        /*
        - Recibo numero de rondas del usuario
        - Paso ese dato a la data 
        - Monto la view game
        */
         event.preventDefault()

        const { target: form } = event // const form = event.target
        const { rounds: {value: numberRounds}} = form  // const numberRounds = form.rounds.value 

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
          const play = logic.checkPlay('r', data.choices.machineChoice)
          // 4
          const remainingRounds = logic.remainingRounds()
          setGameStatus(remainingRounds)
          // 5
          setFeedback(play)
          // 6
          if(data.rounds.remainingRounds === 0) {
              const winner = logic.checkWin()
              setGameOver(winner)
  
          }
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
        const play = logic.checkPlay('p', data.choices.machineChoice)
        // 4
        const remainingRounds = logic.remainingRounds()
        setGameStatus(remainingRounds)
        // 5
        setFeedback(play)
        // 6
        if(data.rounds.remainingRounds === 0) {
            const winner = logic.checkWin()
            setGameOver(winner)

        }
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
        const play = logic.checkPlay('s', data.choices.machineChoice)
        // 4
        const remainingRounds = logic.remainingRounds()
        setGameStatus(remainingRounds)
        // 5
        setFeedback(play)
        // 6
        if(data.rounds.remainingRounds === 0) {
            const winner = logic.checkWin()
            setGameOver(winner)

        }
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


    return<>
        <h1>Rock 🪨 Paper 📋 Scissors ✂️!</h1>

        {view === 'intro' && <form onSubmit ={handleRoundsSubmit}>
            <label htmlFor="rounds">Number of Rounds? </label>
            <input type= "number" name="rounds" id="rounds"/>
            <button type = "submit">GO!</button>
            </form>}

        {view=== 'game'&& <>
            <p>Remaining rounds: {data.rounds.remainingRounds}</p>

            <button type="button" onClick={handleClickRock}>ROCK🪨</button> <button type="button" onClick={handleClickPaper}>PAPER📋</button> <button type="button" onClick={handleClickScissors}>SCISSORS ✂️</button>
            
            <p>{feedback}</p>
            
            <p>{gameOver}</p>

            {data.rounds.remainingRounds === 0 && <button onClick={handleRestartClick}>RESTART</button>}
        </>}
    </>
}
root.render(<App />)