const root = ReactDOM.createRoot(document.getElementById('root'));

const { useState } = React;

const RockPaperScissors = () => {
    
  const [userWins, setUserWins] = useState(0);
  const [cpuWins, setCpuWins] = useState(0);
  const [result, setResult] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const handlePlay = (userPlay) => {
    try {
      if (gameOver) return;
      const cpuPlay = generateCpuPlay();
      const winner = determineWinner(userPlay, cpuPlay);
      
      if (winner === 'user') setUserWins((prev) => prev + 1);
      if (winner === 'cpu') setCpuWins((prev) => prev + 1);
  
      setResult(`You chose ${userPlay}, CPU chose ${cpuPlay}. ${winner === 'draw' ? "It's a draw!" : winner === 'user' ? 'You win!' : 'CPU wins!'}`);
  
      if (userWins + 1 >= maxWins || cpuWins + 1 >= maxWins) {
        setGameOver(true);
        setResult((prev) => prev + `\n${userWins + 1 >= maxWins ? 'You won the game!' : 'CPU won the game!'}`);
      }
    } catch (error) {
      console.error("An error occurred during gameplay:", error);
    }
  };

  const resetGame = () => {
    try {
      setUserWins(0);
      setCpuWins(0);
      setResult('');
      setGameOver(false);
    } catch (error) {
      console.error("An error occurred while resetting the game:", error);
    }
  };

  return (
    <div className="game-container">
      <h1>Rock, Paper, Scissors</h1>
      <p>Score: You {userWins} - {cpuWins} CPU</p>
      <p>{result}</p>
      <div className="buttons">
        <button onClick={() => handlePlay('r')}>Rock</button>
        <button onClick={() => handlePlay('p')}>Paper</button>
        <button onClick={() => handlePlay('s')}>Scissors</button>
      </div>
      {gameOver && <button onClick={resetGame}>Play Again</button>}
    </div>
  )
}

root.render(<RockPaperScissors />)