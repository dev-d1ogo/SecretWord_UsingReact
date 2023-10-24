import React, { useRef, useState } from 'react'
import "./Game.css"

const Game = ({
  verifyLetter,
  selectedWord,
  selectedCategory,
  wordLetter,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  // Using another hook -> useRef(), in short it's a hook that uses a reference to apply something an element
  const letterInputRef = useRef(null)
  
  // Treating submission
  const handleSubmit = (e) =>{
    e.preventDefault()
    
    verifyLetter(letter)
    console.log(letter);
    setLetter('')

    // Apply a focus for our reference, thus the user doesn't have to click  in the input field again
    letterInputRef.current.focus()
  }

  return (
    <div className="game">
      
      <p className="points">
        <span>Score: {score}</span>
      </p>

      <h1>Guess the word: </h1>
      
      <h3 className="tip">
        Tip about the word: <span>{selectedCategory}</span>
      </h3>

      <p>You still have {guesses} attempts</p>

      <div className="wordContainer">
        {wordLetter.map((letter, index) => {
          // If the letter already has been guessed, so the letter is shown in the painel
          return guessedLetters.includes(letter) ? (
            <span key={index} className="letter">
              {letter}
            </span>
          ) : (
            <span key={index} className="blankSquare"></span>
          );
        })}
      </div>

      <div className="letterContainer">
        <p> Try to guess a one letter of the word</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            // Set the reference for useRef
            ref={letterInputRef}
          />
          <button>Play</button>
        </form>
        <div className="wrongLetters">
          <p>Letters already used: </p>
          <span>
            {wrongLetters.map((letter, index) => (
              <span key={index}>{letter},</span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Game;