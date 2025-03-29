const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React
//TODO ponerlo bonito
//TODO no poder repetir número
//TODO fallo en el mensaje del perdedor


//INPUT:

 function App() {

    const [view, setView] = useState('start')
    const [status, setStatus] = useState(null)
    const [numeroCreado, setNumeroCreado] = useState(null)
    const [temperatura, setTemperatura] = useState('')
    
    const handleStartClick = () => {
        try {
            logic.crearNumeroAleatorio()

            setNumeroCreado(data.numeroCreado)
            setView('play')
 
        } catch (error) {
            console.error(error)

            alert(error.message) 
        }
    }

    const handlePutNumberSubmit = event => {
        event.preventDefault()

        try {

            const { target: form } = event
            const numeroJugador = form.numeroJugador.value

            logic.crearNumeroJugador(Number(numeroJugador))

            const status = logic.getStatus()
            setStatus(status)

            setTemperatura(status.temperatura)

            event.target.numeroJugador.value = ""

            if (logic.helper.ganado() || logic.helper.perdido())
                setView('game-over')

            
        } catch (error) {
            console.error(error)

            alert('Número erróneo. Porfabor, introduzca un nuevo número.') 
        }
    }

    const handleReiniciarClick = () => {
        try {
            logic.reiniciarJuego()

            setView('start')
            setStatus(null)
            
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

     //OUTPUT:

    return <>
        {view === 'start' && <button onClick= {handleStartClick}>CREAR NÚMERO ALEATORIO</button>}
        {view === 'play' && <>
            <form onSubmit={handlePutNumberSubmit}>
                <label htmlFor="number">Introduzca un número</label>
                <input type="number" id="number" name="numeroJugador"/>
 
                <button type="submit">Enter</button>
            </form>
 
            {status && <>
                <p>{`${status.temperatura}, te quedan ${status.oportunidadesRestantes} oportunidades. Números dichos: ${status.numerosDichos}.`}</p>
   
            </>}
 
            <button onClick={handleReiniciarClick}>Reiniciar Juego</button>
         </>}

        {view === 'game-over' && <>
            <p>
                {status.hasGanado && <h2>FELICIDADES, HAS GANADO!</h2>}
                {status.hasPerdido && <h2>HAS PERDIDO, EL NÚMERO ERA ${numeroCreado}.</h2>}
            </p>
            <button onClick={handleReiniciarClick}>Reiniciar Juego</button>
        </>}
     </>
}
 

 root.render(<App />)
