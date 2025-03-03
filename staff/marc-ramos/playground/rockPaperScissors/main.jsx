const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

/*
- generar jugada aleatoria
- preguntar jugada al user con 3 botones
- comprobar quien ha ganado
- sumar victoria, comprobar rondas y mostrar marcador
- si ninguno de los dos ha llegado a 3, generar jugada aleatoria, preguntar jugada user...
- cuando gane o pierda el usuario, mostrarlo y aparece boton restart
*/

function App() {
    const [view, setView] = useState('start') // Inicializamos en pantalla de inicio
    const [status, setStatus] = useState(null)
    const [feedback, setFeedback] = useState('')

    const handleStartClick = () => {
        try {
            setView('play')

        } catch (error) {
                console.error(error)
    
                alert(error.message)
        }
    }

    const handleClickRock= () => {
        /*
        - generamos jugada cpu (logic.generateCpuPlay)
        - comparamos jugada user y jugada cpu (logic.comparePlays)
        - mostramos quien ha ganado
        - comprobamos si wins de cpu o user han llegado a 3
        - volver a mostrar view 'play'
        */
        try{
            logic.generateCpuPlay()
            data.result.winner = logic.comparePlays('r', data.plays.cpuPlay)
            setFeedback(data.result.winner) 
            logic.checkWinningCounter()

        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleClickPaper= () => {
         /*
        - generamos jugada cpu (logic.generateCpuPlay)
        - comparamos jugada user y jugada cpu (logic.comparePlays)
        - mostramos quien ha ganado
        - comprobamos si wins de cpu o user han llegado a 3
        - volver a mostrar view 'play'
        */

        try{
            logic.generateCpuPlay()
            data.result.winner = logic.comparePlays('p', data.plays.cpuPlay)
            setFeedback(data.result.winner) 
            logic.checkWinningCounter()

        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleClickScissors= () => {
         /*
        - generamos jugada cpu (logic.generateCpuPlay)
        - comparamos jugada user y jugada cpu (logic.comparePlays)
        - mostramos quien ha ganado
        - comprobamos si wins de cpu o user han llegado a 3
        - volver a mostrar view 'play'
        */

        try{
            logic.generateCpuPlay()
            data.result.winner = logic.comparePlays('s', data.plays.cpuPlay)
            setFeedback(data.result.winner) 
            logic.checkWinningCounter()

        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleRestartClick = () => { // boton volver a jugar
        logic.resetGame()
        setFeedback('')
        setView('start')
    }

    return <>
        <h1>Rock🪨 Paper🧻 Scissors✂️</h1>
    
        {view === 'start' && <button onClick={handleStartClick}>Start</button>}

        {view === 'play' && <> 

            <button onClick={() => handleClickRock('r')}>Rock</button>
            <button onClick={() => handleClickPaper('p')}>Paper</button>
            <button onClick={() => handleClickScissors('s')}>Scissors</button>

           <p>{feedback}</p>

           <button onClick={handleRestartClick}>Reset</button>

        </>}
    </>
}
    
root.render(<App />)