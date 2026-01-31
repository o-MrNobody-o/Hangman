import React from 'react';

const HangmanDrawing = ({ wrongGuesses }) => {
  const HEAD = (
    <div
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '100%',
        border: '10px solid black',
        position: 'absolute',
        top: '50px',
        right: '-30px',
      }}
    />
  );

  const BODY = (
    <div
      style={{
        width: '10px',
        height: '100px',
        background: 'black',
        position: 'absolute',
        top: '100px',
        right: 0,
      }}
    />
  );

  const RIGHT_ARM = (
    <div
      style={{
        width: '80px',
        height: '10px',
        background: 'black',
        position: 'absolute',
        top: '130px',
        right: '-80px',
        rotate: '-30deg',
        transformOrigin: 'left bottom',
      }}
    />
  );

  const LEFT_ARM = (
    <div
      style={{
        width: '80px',
        height: '10px',
        background: 'black',
        position: 'absolute',
        top: '130px',
        right: '0px',
        rotate: '30deg',
        transformOrigin: 'right bottom',
      }}
    />
  );

  const RIGHT_LEG = (
    <div
      style={{
        width: '90px',
        height: '10px',
        background: 'black',
        position: 'absolute',
        top: '190px',
        right: '-80px',
        rotate: '60deg',
        transformOrigin: 'left bottom',
      }}
    />
  );

  const LEFT_LEG = (
    <div
      style={{
        width: '90px',
        height: '10px',
        background: 'black',
        position: 'absolute',
        top: '190px',
        right: 0,
        rotate: '-60deg',
        transformOrigin: 'right bottom',
      }}
    />
  );

  const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

  return (
    <div className="hangman-drawing">
      <div style={{ position: 'relative' }}>
        {/* Hangman structure */}
        <div
          style={{
            height: '50px',
            width: '10px',
            background: 'black',
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        />
        <div
          style={{
            height: '10px',
            width: '200px',
            background: 'black',
            marginLeft: '120px',
          }}
        />
        <div
          style={{
            height: '400px',
            width: '10px',
            background: 'black',
            marginLeft: '120px',
          }}
        />
        <div
          style={{
            height: '10px',
            width: '250px',
            background: 'black',
          }}
        />
        
        {/* Body parts based on wrong guesses */}
        {BODY_PARTS.slice(0, wrongGuesses)}
      </div>
      
      <div className="wrong-count">
        Wrong guesses: {wrongGuesses} / 6
      </div>
    </div>
  );
};

export default HangmanDrawing;
