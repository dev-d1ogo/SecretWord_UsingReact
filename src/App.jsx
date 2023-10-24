// CSS
import "./App.css";

// React
import { useCallback, useEffect, useState } from "react";

// Data import
import { wordsListFinal } from "./data/words";

// Comporents
import StarterScreen from "./components/StarterScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  // States
  const [stage, setStage] = useState(stages[0].name);
  const [words] = useState(wordsListFinal);

  const [selectedWord, setSelectedWord] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [letters, setLetter] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  let [guesses, setGuesses] = useState(5);
  const [score, setScore] = useState(0);

  // Function which selects category and word

  const select = useCallback(() => {
    const categories = Object.keys(words);
    // Using Math.floor to round off the random number obtained from the array lenght and Math.random -> random category
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    // Random Word
    const categoryForWord = words[randomCategory];
    const randomWord =
      categoryForWord[Math.floor(Math.random() * categoryForWord.length)];

    return { randomWord, randomCategory };
  }, [words]);
  
  // Initializing the game

  const startGame = useCallback(() => {
    // Clear all Letters
    
    clearLetterStates()

    // Deconstructing the obeject that is returned in the select() function
    const { randomWord, randomCategory } = select();
    console.log(randomWord);

    // Transform word in letters through split() and put lowercase
    let wordLetter = randomWord.toLowerCase().split("");

    // Fill states
    setSelectedCategory(randomCategory);
    setSelectedWord(randomWord);
    setLetter(wordLetter);

    setStage(stages[1].name);
  }, [select]);

  // Process the letter input

  // process letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    
    // check if letter has already been utilized
    
    
    // push guessed letter or remove a chance
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };  

  const  clearLetterStates = () =>{
    setGuessedLetters([])
    setWrongLetters([])
  }


  // useEffect() have a might of monitor some data

  // Check if guesses ended
  
  useEffect(()=>{
  if(guesses <= 0){
    // reset all states for other game
    clearLetterStates()
    
    setStage(stages[2].name)
    }
  },[guesses])

  // Check win condition

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    // win condition
    if (guessedLetters.length === uniqueLetters.length && stage === stages[1].name) {
      // add score
      setScore((actualScore) => (actualScore += 100));

      // restart game with new word
      startGame()
    }
  }, [letters, startGame, guessedLetters]);


  // Reset the game

  const restartGame = () => {
    setScore(0)
    setGuesses(5)
    setStage(stages[0].name);
  };


  return (
    <div className="App">
      {stage === "start" && <StarterScreen startGame={startGame} />}
      {stage === "game" && (
        <Game
        verifyLetter={verifyLetter}
          selectedWord={selectedWord}
          selectedCategory={selectedCategory}
          wordLetter={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {stage === "end" && <GameOver restartGame={restartGame} score = {score} />}
    </div>
  );
}

export default App;
