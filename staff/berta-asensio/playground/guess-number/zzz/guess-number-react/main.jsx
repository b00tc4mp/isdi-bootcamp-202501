const root = ReactDOM.createRoot(document.getElementById('root'))


function App() {
    const handleNumeroAleatorio = event => {
        event.preventDefault()

        try {
            logic.numeroAleatorio()
            console.log(numeroCreado)       
    
        } catch(error) {
            alert(error.message)
        }
    }

    const handleNumeroJugador = event => {
        event.preventDefault()

        const form = event.target 
        const numberInput = form.number.value

        try {
            logic.preguntarNumero(numberInput)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

        console.log(numberInput)
    }

    return <>
        <h1>GUESS THE NUMBER!</h1>

        <button onClick={handleNumeroAleatorio}>Generar número aleatorio</button>

        <form onSubmit={handleNumeroJugador}>
            <label>Introduce a number</label>
            <input type="number" name="number" />
            <button type="submit">Try!</button>
        </form>

    </>

}



root.render(<App />)