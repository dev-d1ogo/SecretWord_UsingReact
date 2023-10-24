import './StarterScreen.css'

const StarterScreen = ({startGame}) => {
  return (
    <div className="starter">
        <h1>Secret Word</h1>
        <p>Click in the button below</p>
        <button onClick={startGame}> Start the game</button>
    </div>
  )
}

export default StarterScreen