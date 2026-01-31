import React from 'react';

const Word = ({ word, guessedLetters, reveal = false }) => {
  return (
    <div className="word-display">
      {word.split('').map((letter, index) => (
        <span key={index} className="letter-box">
          <span
            style={{
              visibility:
                guessedLetters.includes(letter.toUpperCase()) || letter === ' ' || reveal
                  ? 'visible'
                  : 'hidden',
              color: !guessedLetters.includes(letter.toUpperCase()) && reveal && letter !== ' '
                ? '#ff4444'
                : 'black',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Word;
