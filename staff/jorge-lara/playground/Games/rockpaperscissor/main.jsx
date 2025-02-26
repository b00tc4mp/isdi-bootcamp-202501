const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React;

function App() {
    const [view, setView] = useState('gamemode');
    const [gamemode, setGamemode] = useState(null);
    const [result, setResult] = useState(null);

    const handleGamemodeClick = (mode) => {
        setGamemode(mode);
        
        setView('game');
    }

    const handlePlaySubmit = event =>{
        event.preventDefault();

        setResult(logic.startGame(gamemode,'r'));
    }

    return <>
        <h1>Rock-paper-scissor</h1>
        {view === 'gamemode' && <section>
            <p>Select gamemode</p>
            <button onClick={() => handleGamemodeClick('machine')} id="machine">Vs Machine</button>
            <button onClick={() => handleGamemodeClick('player')} id="player">Vs Player</button>
        </section>}

        {view === 'game' && <> <form onSubmit={handlePlaySubmit}>
            <label htmlFor="move">Choose rock (r) paper (p) scissor(s) </label>
            <input type="text" id="move" />
            <button type="submit">Play</button>
        </form>
        {result !== null && (<p>Result: {result === 'true' ? 'You won' : result === 'false' ? 'You lose': 'Draw'}</p>)}
        </>}
    </>
}

root.render(<App/>)