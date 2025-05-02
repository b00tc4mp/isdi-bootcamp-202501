const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React;

function App() {
    const [view, setView] = useState('game');
    const [result, setResult] = useState(null);

    const handleStartGameClick = () => {
        setView('game');
    }

    const handlePlayClick = (playerMove) => {
        setResult(logic.startGame(playerMove));
    }

    return <>
        <h1>Rock🪨Paper📋Scissor✂️</h1>
        {view === 'landing' &&
            <section className="landing-section">
                <p>Press start</p>
                <button onClick={handleStartGameClick} id="start">Start</button>
            </section>}

        {view === 'game' && (
            <div className="game-container">
                <div className="game-header">
                    {result && <p className="marker">Player wins {result.playerWins}</p>}
                    <div className="game-content">
                        <h2>Choose rock, paper or scissor</h2>
                        <span className="game-buttons">
                            <button type="button" onClick={() => handlePlayClick('r')}>🪨</button>
                            <button type="button" onClick={() => handlePlayClick('p')}>📄</button>
                            <button type="button" onClick={() => handlePlayClick('s')}>✂️</button>
                        </span>
                        {result !== null && (
                            <p>Result: {result.won === true ? `You win with ${result.playerMove} vs ${result.cpuMove}` : result.draw === true ? 'Draw' : `You lose with ${result.playerMove} vs ${result.cpuMove}`}</p>
                        )}
                    </div>
                    {result && <p className="marker">CPU wins {result.cpuWins}</p>}
                </div>
                <h2>Logs</h2>
                <section className="logs-section">
                    {result !== null && result.logs.map(log =>
                        <p key={log.round}>Round: {log.round} | Player {log.playerMove} vs {log.cpuMove} Machine</p>
                    )}
                </section>
            </div>
        )}
    </>
}

root.render(<App />)