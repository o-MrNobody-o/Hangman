import React, { useState, useEffect, useCallback, useRef } from 'react';
import HangmanDrawing from './HangmanDrawing';
import Word from './Word';
import { wordsData, themes } from '../data/wordsData';

const Game = ({ 
  language, 
  theme,
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
  const [hintedLetter, setHintedLetter] = useState(null); // Letter highlighted by hint
  const [hintUsed, setHintUsed] = useState(false); // Track if hint was used this round
  const [showWinOverlay, setShowWinOverlay] = useState(false); // Win celebration overlay
  const [autoProgressCountdown, setAutoProgressCountdown] = useState(null); // Countdown for auto-progress
  
  // Ref to prevent re-initialization after winning
  const justWonRef = useRef(false);

  // Initialize game - only on mount or when theme/difficulty changes manually
  useEffect(() => {
    // Skip re-initialization if we just won (solvedRiddles changed due to win)
    if (justWonRef.current) {
      return;
    }
    
    const allPuzzles = wordsData[language][theme][difficulty];
    const solved = solvedRiddles?.[language]?.[theme]?.[difficulty] || [];
    const availablePuzzles = allPuzzles.filter(puzzle => !solved.includes(puzzle.word));
    
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
    setHintedLetter(null);
    setHintUsed(false);
    setShowWinOverlay(false);
    setAutoProgressCountdown(null);
  }, [language, theme, difficulty, solvedRiddles]); // solvedRiddles included - justWonRef prevents re-init after winning

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
      // Set flag BEFORE calling onSolveRiddle to prevent re-initialization
      justWonRef.current = true;
      setGameStatus('won');
      setShowWinOverlay(true);
      // Delay countdown start to ensure overlay renders first
      setTimeout(() => {
        setAutoProgressCountdown(3);
      }, 100);
      onSolveRiddle(language, theme, difficulty, currentPuzzle.word);
      return;
    }

    // Check if lost
    if (wrongGuesses >= 6) {
      setGameStatus('lost');
    }
  }, [guessedLetters, wrongGuesses, currentPuzzle, gameStatus, language, theme, difficulty, onSolveRiddle]);

  const handleGuess = useCallback((letter) => {
    if (guessedLetters.includes(letter) || gameStatus !== 'playing') return;

    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    // Clear hinted letter once guessed
    if (hintedLetter === letter) {
      setHintedLetter(null);
    }

    // Check if letter is in the word
    const word = currentPuzzle?.word?.toUpperCase();
    if (word && !word.includes(letter)) {
      setWrongGuesses(prev => prev + 1);
    }
  }, [guessedLetters, gameStatus, currentPuzzle, hintedLetter]);

  // Handle keyboard input - block when overlay is visible
  useEffect(() => {
    if (gameStatus !== 'playing' || showWinOverlay) return;

    const handleKeyPress = (e) => {
      const key = e.key.toUpperCase();
      
      if (key.match(/^[A-ZÀÂÄÆÇÉÈÊËÎÏÔŒÙÛÜŸ]$/)) {
        handleGuess(key);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [gameStatus, handleGuess, showWinOverlay]);

  const handleNextPuzzle = useCallback(() => {
    // Reset the justWon flag when moving to next puzzle
    justWonRef.current = false;
    
    const allPuzzles = wordsData[language][theme][difficulty];
    const solved = solvedRiddles?.[language]?.[theme]?.[difficulty] || [];
    const availablePuzzles = allPuzzles.filter(puzzle => !solved.includes(puzzle.word));
    
    if (availablePuzzles.length === 0) {
      setCurrentPuzzle(null);
      setShowWinOverlay(false);
      setAutoProgressCountdown(null);
      return;
    }

    const randomPuzzle = availablePuzzles[Math.floor(Math.random() * availablePuzzles.length)];
    setCurrentPuzzle(randomPuzzle);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus('playing');
    setHintedLetter(null);
    setHintUsed(false);
    setShowWinOverlay(false);
    setAutoProgressCountdown(null);
  }, [language, theme, difficulty, solvedRiddles]);

  // Auto-progress countdown after winning
  useEffect(() => {
    if (autoProgressCountdown === null || autoProgressCountdown <= 0) return;

    const timer = setTimeout(() => {
      if (autoProgressCountdown === 1) {
        handleNextPuzzle();
      } else {
        setAutoProgressCountdown(prev => prev - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [autoProgressCountdown, handleNextPuzzle]);

  const handleHint = () => {
    if (hintUsed || gameStatus !== 'playing' || !currentPuzzle) return;
    
    // Find all letters in the word that haven't been guessed yet
    const word = currentPuzzle.word.toUpperCase();
    const wordLetters = word.split('').filter(letter => letter !== ' ');
    const uniqueWordLetters = [...new Set(wordLetters)];
    const unguessedCorrectLetters = uniqueWordLetters.filter(
      letter => !guessedLetters.includes(letter)
    );
    
    if (unguessedCorrectLetters.length > 0) {
      // Pick a random unguessed letter from the word
      const randomLetter = unguessedCorrectLetters[
        Math.floor(Math.random() * unguessedCorrectLetters.length)
      ];
      setHintedLetter(randomLetter);
      setHintUsed(true);
    }
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
    const themeLabel = themes[theme]?.label[language] || theme;
    return (
      <div className="game-container">
        <div className="completion-message">
          <h2>🎉 {language === 'english' ? 'Congratulations!' : 'Félicitations!'}</h2>
          <p>
            {language === 'english' 
              ? `You've solved all puzzles in ${themeLabel} - ${difficulty} mode!`
              : `Vous avez résolu toutes les énigmes en ${themeLabel} - ${difficulty}!`
            }
          </p>
          <div className="completion-actions">
            <button className="action-btn" onClick={onBack}>
              {language === 'english' ? 'Choose Different Level' : 'Choisir un autre niveau'}
            </button>
            <button className="action-btn" onClick={onShowLeaderboard}>
              {language === 'english' ? 'View Progress' : 'Voir la progression'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <button className="back-btn" onClick={onBack}>← {language === 'english' ? 'Back' : 'Retour'}</button>
        <div className="game-info">
          <span className="language-badge">{language === 'english' ? '🇬🇧' : '🇫🇷'}</span>
          <span className="theme-badge">{themes[theme]?.emoji} {themes[theme]?.label[language]}</span>
          <span className="difficulty-badge">{difficulty.toUpperCase()}</span>
        </div>
        <button className="progress-btn" onClick={onShowLeaderboard}>📊 {language === 'english' ? 'Progress' : 'Progrès'}</button>
      </div>

      <div className="game-content">
        <div className="drawing-section">
          <HangmanDrawing wrongGuesses={wrongGuesses} />
        </div>

        <div className="word-section">
          {/* Always-visible hint from the word object */}
          <div className="word-hint-box">
            <span className="hint-label">💡 {language === 'english' ? 'Hint' : 'Indice'}:</span>
            <span className="hint-text">{currentPuzzle.hint}</span>
          </div>

          <Word 
            word={currentPuzzle.word} 
            guessedLetters={guessedLetters}
            reveal={gameStatus === 'lost'}
          />

          <div className="hint-section">
            <button 
              className={`hint-btn ${hintUsed ? 'used' : ''}`}
              onClick={handleHint}
              disabled={hintUsed || gameStatus !== 'playing'}
            >
              {hintUsed 
                ? (language === 'english' ? '🔤 Letter Hint Used' : '🔤 Indice Lettre Utilisé')
                : (language === 'english' ? '🔤 Reveal a Letter' : '🔤 Révéler une Lettre')
              }
            </button>
            {hintedLetter && (
              <p className="hint-instruction">
                {language === 'english' 
                  ? 'A correct letter is highlighted in blue below!'
                  : 'Une lettre correcte est surlignée en bleu ci-dessous!'
                }
              </p>
            )}
          </div>

          {getIncorrectLetters().length > 0 && (
            <div className="incorrect-letters">
              <p>{language === 'english' ? 'Incorrect guesses:' : 'Erreurs:'}</p>
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
          {getAlphabet().map(letter => {
            const isGuessed = guessedLetters.includes(letter);
            const isCorrect = isGuessed && currentPuzzle.word.toUpperCase().includes(letter);
            const isIncorrect = isGuessed && !currentPuzzle.word.toUpperCase().includes(letter);
            const isHinted = hintedLetter === letter && !isGuessed;
            
            return (
              <button
                key={letter}
                className={`key ${isGuessed ? 'used' : ''} ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'incorrect' : ''} ${isHinted ? 'hinted' : ''}`}
                onClick={() => handleGuess(letter)}
                disabled={isGuessed}
              >
                {letter}
              </button>
            );
          })}
        </div>
      )}

      {/* Win Celebration Overlay */}
      {showWinOverlay && (
        <div className="win-overlay">
          <div className="win-modal">
            <div className="win-confetti">🎉</div>
            <h2>{language === 'english' ? 'Well Done!' : 'Bravo!'}</h2>
            <p className="win-message">
              {language === 'english' 
                ? 'You guessed the word correctly!' 
                : 'Vous avez deviné le mot correctement!'
              }
            </p>
            <div className="win-word">
              <span className="win-word-label">{language === 'english' ? 'The answer was' : 'La réponse était'}:</span>
              <span className="win-word-text">{currentPuzzle.word}</span>
            </div>
            <button className="next-btn" onClick={handleNextPuzzle}>
              {language === 'english' ? 'Next Word →' : 'Mot Suivant →'}
            </button>
            {autoProgressCountdown && (
              <p className="auto-progress-text">
                {language === 'english' 
                  ? `Auto-continuing in ${autoProgressCountdown}s...`
                  : `Continuation auto dans ${autoProgressCountdown}s...`
                }
              </p>
            )}
          </div>
        </div>
      )}

      {gameStatus === 'lost' && (
        <div className="game-result lost">
          <h2>😢 {language === 'english' ? 'Game Over' : 'Partie Terminée'}</h2>
          <p>{language === 'english' ? 'The answer was' : 'La réponse était'}: <strong>{currentPuzzle.word}</strong></p>
          <button className="next-btn" onClick={handleNextPuzzle}>
            {language === 'english' ? 'Try Another →' : 'Essayer un Autre →'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
