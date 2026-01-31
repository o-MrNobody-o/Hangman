import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    
    onSubmit({ name: name.trim(), email: email.trim() });
  };

  return (
    <div className="user-form-container">
      <div className="user-form-card">
        <h1>🎮 Hangman Game</h1>
        <p className="welcome-text">Welcome! Please enter your details to start playing</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Enter your name"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Enter your email"
              className="form-input"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="submit-button">
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
