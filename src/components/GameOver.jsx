import './GameOver.css'

const GameOver = ({restartGame, score}) => {
  return (
    <div className="game_over">
      <h1>You Lose!!!!</h1>
      <h2>
        Endgame !!! Your Score is: <span>{score}</span>
      </h2>
      <button onClick={restartGame}> Retry</button>
    </div>
  );
}

export default GameOver