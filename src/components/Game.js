import React, { useState, useEffect, useCallback } from 'react';
import HangmanDrawing from './HangmanDrawing';
import Word from './Word';
import { wordsData } from '../data/wordsData';

const Game = ({ 
  language, 
  difficulty, 
  onBack, 
  solvedRiddles, 
  onSolveRiddle,
  onShowLeaderboard 
}) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [showHint, setShowHint] = useState(false);
  const [availableHints, setAvailableHints] = useState(0);

  // Get available puzzles that haven't been solved yet
  const getAvailablePuzzles = useCallback(() => {
    const allPuzzles = wordsData[language][difficulty];
    const solved = solvedRiddles?.[language]?.[difficulty] || [];
    return allPuzzles.filter(puzzle => !solved.includes(puzzle.word));
  }, [language, difficulty, solvedRiddles]);

  // Initialize game
  useEffect(() => {
    const availablePuzzles = getAvailablePuzzles();
    
    if (availablePuzzles.length === 0) {
      // All puzzles solved
      setCurrentPuzzle(null);
      return;
    }

    const randomPuzzle = availablePuzzles[Math.floor(Math.random() * availablePuzzles.length)];
    setCurrentPuzzle(randomPuzzle);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus('playing');
    setShowHint(false);

    // Set available hints based on difficulty
    const hints = {
      easy: 3,
      medium: 2,
      hard: 1
    };
    setAvailableHints(hints[difficulty] || 1);
  }, [language, difficulty, getAvailablePuzzles]);

  // Check win/loss conditions
  useEffect(() => {
    if (!currentPuzzle || gameStatus !== 'playing') return;

    const word = currentPuzzle.word.toUpperCase();
    const wordLetters = word.split('').filter(letter => letter !== ' ');
    const uniqueLetters = [...new Set(wordLetters)];
    
    // Check if won
    const isWinner = uniqueLetters.every(letter => 
      guessedLetters.includes(letter)
    );

    if (isWinner) {
      setGameStatus('won');
      onSolveRiddle(language, difficulty, currentPuzzle.word);
      return;
    }

    // Check if lost
    if (wrongGuesses >= 6) {
      setGameStatus('lost');
    }
  }, [guessedLetters, wrongGuesses, currentPuzzle, gameStatus, language, difficulty, onSolveRiddle]);

  // Handle keyboard input
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const handleKeyPress = (e) => {
      const key = e.key.toUpperCase();
      
      if (key.match(/^[A-ZÀÂÄÆÇÉÈÊËÎÏÔŒÙÛÜŸ]$/)) {
        handleGuess(key);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [gameStatus, handleGuess]);

  const handleGuess = useCallback((letter) => {
    if (guessedLetters.includes(letter) || gameStatus !== 'playing') return;

    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    // Check if letter is in the word
    const word = currentPuzzle?.word?.toUpperCase();
    if (word && !word.includes(letter)) {
      setWrongGuesses(prev => prev + 1);
    }
  }, [guessedLetters, gameStatus, currentPuzzle]);

  const handleHint = () => {
    if (availableHints <= 0 || showHint || gameStatus !== 'playing') return;
    setShowHint(true);
    setAvailableHints(prev => prev - 1);
  };

  const handleNextPuzzle = () => {
    const availablePuzzles = getAvailablePuzzles();
    
    if (availablePuzzles.length === 0) {
      setCurrentPuzzle(null);
      return;
    }

    const randomPuzzle = availablePuzzles[Math.floor(Math.random() * availablePuzzles.length)];
    setCurrentPuzzle(randomPuzzle);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus('playing');
    setShowHint(false);
    
    const hints = {
      easy: 3,
      medium: 2,
      hard: 1
    };
    setAvailableHints(hints[difficulty] || 1);
  };

  const getAlphabet = () => {
    if (language === 'french') {
      return 'ABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÄÆÇÉÈÊËÎÏÔŒÙÛÜŸ'.split('');
    }
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  };

  const getIncorrectLetters = () => {
    return guessedLetters.filter(letter => 
      !currentPuzzle.word.toUpperCase().includes(letter)
    );
  };

  if (!currentPuzzle) {
    return (
      <div className="game-container">
        <div className="completion-message">
          <h2>🎉 Congratulations!</h2>
          <p>You've solved all puzzles in {language} - {difficulty} mode!</p>
          <div className="completion-actions">
            <button className="action-btn" onClick={onBack}>
              Choose Different Level
            </button>
            <button className="action-btn" onClick={onShowLeaderboard}>
              View Progress
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="game-info">
          <span className="language-badge">{language === 'english' ? '🇬🇧' : '🇫🇷'} {language.toUpperCase()}</span>
          <span className="difficulty-badge">{difficulty.toUpperCase()}</span>
        </div>
        <button className="progress-btn" onClick={onShowLeaderboard}>📊 Progress</button>
      </div>

      <div className="game-content">
        <div className="drawing-section">
          <HangmanDrawing wrongGuesses={wrongGuesses} />
        </div>

        <div className="word-section">
          <Word 
            word={currentPuzzle.word} 
            guessedLetters={guessedLetters}
            reveal={gameStatus === 'lost'}
          />
          
          {showHint && (
            <div className="hint-box">
              💡 Hint: {currentPuzzle.hint}
            </div>
          )}

          <div className="hint-section">
            <button 
              className="hint-btn" 
              onClick={handleHint}
              disabled={availableHints <= 0 || showHint || gameStatus !== 'playing'}
            >
              💡 Hint ({availableHints} left)
            </button>
          </div>

          {getIncorrectLetters().length > 0 && (
            <div className="incorrect-letters">
              <p>Incorrect guesses:</p>
              <div className="incorrect-list">
                {getIncorrectLetters().map((letter, index) => (
                  <span key={index} className="incorrect-letter">{letter}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {gameStatus === 'playing' && (
        <div className="keyboard">
          {getAlphabet().map(letter => (
            <button
              key={letter}
              className={`key ${guessedLetters.includes(letter) ? 'used' : ''} ${
                guessedLetters.includes(letter) && currentPuzzle.word.toUpperCase().includes(letter)
                  ? 'correct'
                  : guessedLetters.includes(letter)
                  ? 'incorrect'
                  : ''
              }`}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      )}

      {gameStatus === 'won' && (
        <div className="game-result won">
          <h2>🎉 You Won!</h2>
          <p>Congratulations! You solved the puzzle!</p>
          <button className="next-btn" onClick={handleNextPuzzle}>
            Next Puzzle →
          </button>
        </div>
      )}

      {gameStatus === 'lost' && (
        <div className="game-result lost">
          <h2>😢 Game Over</h2>
          <p>The answer was: <strong>{currentPuzzle.word}</strong></p>
          <button className="next-btn" onClick={handleNextPuzzle}>
            Try Another →
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
