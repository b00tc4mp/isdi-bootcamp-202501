const { useState, useEffect } = React

function App() {
    const [view, setView] = useState('start-game')
    const [rounds, setRounds] = useState(0)

    const handleStartGameClick = () => {
        setView('in-game')
    }

    const handlePlayerChoiceClick = event => {

        const playerChoice = event.target
        data.player = Number(playerChoice.value)
        data.rounds++
        setRounds(data.rounds)
        console.log(data.player)
    }

    useEffect(() => {
        console.log('hello')
        logic.generateMachineChoice()

        logic.findRoundWinner()

        console.log(data.machine, data.player, data.result, data.rounds)
    }, [data.player])

    // try {

    // } catch (error) {
    //     console.error(error)

    //     alert(error.message)
    // }

    return <>
        <h1>Rock, paper, scissors!</h1>

        {view === 'start-game' && <section>
            <p>A classic game - Rock, Paper, Scissors! Choose one of the three choices - and see if you can beat the computer.
                Will you win? The chance is random!</p>
            <button onClick={handleStartGameClick}>Start game</button>
        </section>}

        {view === 'in-game' && <section>
            <p>Choose one of the following options to play against your computer</p>

            <button onClick={handlePlayerChoiceClick} id="rock" value="1">🪨</button> <button onClick={handlePlayerChoiceClick} id="paper" value="0">📄</button> <button onClick={handlePlayerChoiceClick} id="scissors" value="2">✂️</button>

        </section>}
    </>
}