import React, { useState } from 'react';
import { themes } from '../data/wordsData';

const DifficultySelector = ({ onSelect, language, onLanguageChange, userName }) => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  const handleDifficultySelect = (difficulty) => {
    onSelect(difficulty, selectedTheme);
  };

  const handleBackToThemes = () => {
    setSelectedTheme(null);
  };

  const labels = {
    english: {
      welcome: 'Welcome',
      chooseLanguage: 'Choose your language',
      selectTheme: 'Select a Theme',
      selectDifficulty: 'Select Difficulty',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      phrases: 'phrases',
      moreHints: 'More hints available',
      someHints: 'Some hints available',
      fewerHints: 'Fewer hints available',
      back: '← Back to Themes'
    },
    french: {
      welcome: 'Bienvenue',
      chooseLanguage: 'Choisissez votre langue',
      selectTheme: 'Choisissez un Thème',
      selectDifficulty: 'Choisissez la Difficulté',
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile',
      phrases: 'phrases',
      moreHints: 'Plus d\'indices disponibles',
      someHints: 'Quelques indices disponibles',
      fewerHints: 'Moins d\'indices disponibles',
      back: '← Retour aux Thèmes'
    }
  };

  const t = labels[language];

  return (
    <div className="difficulty-selector">
      <div className="selector-header">
        <h2>{t.welcome}, {userName}! 👋</h2>
        <p>{selectedTheme ? t.selectDifficulty : t.chooseLanguage}</p>
      </div>

      {!selectedTheme && (
        <>
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

          <div className="theme-selector">
            <h3>{t.selectTheme}</h3>
            <div className="theme-cards">
              {Object.entries(themes).map(([key, theme]) => (
                <div 
                  key={key}
                  className={`theme-card ${key}`}
                  onClick={() => handleThemeSelect(key)}
                >
                  <div className="theme-icon">{theme.emoji}</div>
                  <h4>{theme.label[language]}</h4>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedTheme && (
        <>
          <button className="back-btn" onClick={handleBackToThemes}>
            {t.back}
          </button>

          <div className="selected-theme-banner">
            <span className="theme-emoji">{themes[selectedTheme].emoji}</span>
            <span className="theme-name">{themes[selectedTheme].label[language]}</span>
          </div>

          <div className="difficulty-levels">
            <h3>{t.selectDifficulty}</h3>
            <div className="difficulty-cards">
              <div className="difficulty-card easy" onClick={() => handleDifficultySelect('easy')}>
                <div className="difficulty-icon">😊</div>
                <h4>{t.easy}</h4>
                <p>30 {t.phrases}</p>
                <p className="hint-info">{t.moreHints}</p>
              </div>

              <div className="difficulty-card medium" onClick={() => handleDifficultySelect('medium')}>
                <div className="difficulty-icon">🤔</div>
                <h4>{t.medium}</h4>
                <p>30 {t.phrases}</p>
                <p className="hint-info">{t.someHints}</p>
              </div>

              <div className="difficulty-card hard" onClick={() => handleDifficultySelect('hard')}>
                <div className="difficulty-icon">😰</div>
                <h4>{t.hard}</h4>
                <p>30 {t.phrases}</p>
                <p className="hint-info">{t.fewerHints}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DifficultySelector;
