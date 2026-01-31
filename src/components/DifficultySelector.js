import React from 'react';

const DifficultySelector = ({ onSelect, language, onLanguageChange, userName }) => {
  return (
    <div className="difficulty-selector">
      <div className="selector-header">
        <h2>Welcome, {userName}! 👋</h2>
        <p>Choose your language and difficulty level</p>
      </div>

      <div className="language-selector">
        <h3>Language / Langue</h3>
        <div className="language-buttons">
          <button
            className={`language-btn ${language === 'english' ? 'active' : ''}`}
            onClick={() => onLanguageChange('english')}
          >
            🇬🇧 English
          </button>
          <button
            className={`language-btn ${language === 'french' ? 'active' : ''}`}
            onClick={() => onLanguageChange('french')}
          >
            🇫🇷 Français
          </button>
        </div>
      </div>

      <div className="difficulty-levels">
        <h3>Select Difficulty</h3>
        <div className="difficulty-cards">
          <div className="difficulty-card easy" onClick={() => onSelect('easy')}>
            <div className="difficulty-icon">😊</div>
            <h4>Easy</h4>
            <p>30 simple phrases</p>
            <p className="hint-info">More hints available</p>
          </div>

          <div className="difficulty-card medium" onClick={() => onSelect('medium')}>
            <div className="difficulty-icon">🤔</div>
            <h4>Medium</h4>
            <p>30 moderate phrases</p>
            <p className="hint-info">Some hints available</p>
          </div>

          <div className="difficulty-card hard" onClick={() => onSelect('hard')}>
            <div className="difficulty-icon">😰</div>
            <h4>Hard</h4>
            <p>30 challenging phrases</p>
            <p className="hint-info">Fewer hints available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifficultySelector;
