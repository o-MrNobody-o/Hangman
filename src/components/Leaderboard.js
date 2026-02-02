import React from 'react';
import { themes } from '../data/wordsData';

const Leaderboard = ({ solvedRiddles, language, theme, difficulty, onClose, onResetProgress }) => {
  const getSolvedCount = () => {
    if (!solvedRiddles || !solvedRiddles[language] || !solvedRiddles[language][theme] || !solvedRiddles[language][theme][difficulty]) {
      return 0;
    }
    return solvedRiddles[language][theme][difficulty].length;
  };

  const getSolvedList = () => {
    if (!solvedRiddles || !solvedRiddles[language] || !solvedRiddles[language][theme] || !solvedRiddles[language][theme][difficulty]) {
      return [];
    }
    return solvedRiddles[language][theme][difficulty];
  };

  const getTotalProgress = () => {
    if (!solvedRiddles) return 0;
    
    let total = 0;
    Object.keys(solvedRiddles).forEach(lang => {
      Object.keys(solvedRiddles[lang]).forEach(thm => {
        Object.keys(solvedRiddles[lang][thm]).forEach(diff => {
          total += solvedRiddles[lang][thm][diff].length;
        });
      });
    });
    return total;
  };

  const getThemeProgress = () => {
    if (!solvedRiddles) return {};
    
    const progress = {};
    Object.keys(themes).forEach(thm => {
      progress[thm] = { total: 0, byDifficulty: {} };
      ['easy', 'medium', 'hard'].forEach(diff => {
        const count = solvedRiddles?.[language]?.[thm]?.[diff]?.length || 0;
        progress[thm].byDifficulty[diff] = count;
        progress[thm].total += count;
      });
    });
    return progress;
  };

  const handleReset = () => {
    const confirmMsg = language === 'english' 
      ? 'Are you sure you want to reset all your progress? This cannot be undone.'
      : 'Êtes-vous sûr de vouloir réinitialiser votre progression? Cette action est irréversible.';
    if (window.confirm(confirmMsg)) {
      onResetProgress();
    }
  };

  const labels = {
    english: {
      progress: 'Your Progress',
      totalSolved: 'Total Riddles Solved',
      solvedIn: 'Solved in',
      solvedRiddles: 'Solved Riddles',
      noRiddles: 'No riddles solved yet in this category. Start playing!',
      resetAll: 'Reset All Progress',
      continue: 'Continue Playing',
      allThemes: 'Progress by Theme',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard'
    },
    french: {
      progress: 'Votre Progression',
      totalSolved: 'Total des Énigmes Résolues',
      solvedIn: 'Résolues en',
      solvedRiddles: 'Énigmes Résolues',
      noRiddles: 'Aucune énigme résolue dans cette catégorie. Commencez à jouer!',
      resetAll: 'Réinitialiser la Progression',
      continue: 'Continuer à Jouer',
      allThemes: 'Progression par Thème',
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile'
    }
  };

  const t = labels[language];
  const themeLabel = themes[theme]?.label[language] || theme;
  const difficultyLabel = t[difficulty] || difficulty;
  const themeProgress = getThemeProgress();

  return (
    <div className="leaderboard-overlay">
      <div className="leaderboard-modal">
        <div className="leaderboard-header">
          <h2>📊 {t.progress}</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="progress-summary">
          <div className="stat-card">
            <div className="stat-number">{getTotalProgress()}</div>
            <div className="stat-label">{t.totalSolved}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{getSolvedCount()}</div>
            <div className="stat-label">
              {t.solvedIn} {themeLabel} - {difficultyLabel}
            </div>
          </div>
        </div>

        <div className="theme-progress-section">
          <h3>{t.allThemes}</h3>
          <div className="theme-progress-grid">
            {Object.entries(themes).map(([thm, info]) => (
              <div key={thm} className={`theme-progress-card ${thm === theme ? 'current' : ''}`}>
                <div className="theme-progress-header">
                  <span className="theme-emoji">{info.emoji}</span>
                  <span className="theme-name">{info.label[language]}</span>
                  <span className="theme-total">{themeProgress[thm]?.total || 0}/90</span>
                </div>
                <div className="theme-progress-bar">
                  <div 
                    className="theme-progress-fill"
                    style={{ width: `${((themeProgress[thm]?.total || 0) / 90) * 100}%` }}
                  ></div>
                </div>
                <div className="theme-difficulty-breakdown">
                  <span className="diff-stat easy">{t.easy}: {themeProgress[thm]?.byDifficulty?.easy || 0}/30</span>
                  <span className="diff-stat medium">{t.medium}: {themeProgress[thm]?.byDifficulty?.medium || 0}/30</span>
                  <span className="diff-stat hard">{t.hard}: {themeProgress[thm]?.byDifficulty?.hard || 0}/30</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="solved-list">
          <h3>{t.solvedRiddles} ({themeLabel} - {difficultyLabel})</h3>
          {getSolvedList().length === 0 ? (
            <p className="no-riddles">{t.noRiddles}</p>
          ) : (
            <div className="riddles-grid">
              {getSolvedList().map((riddle, index) => (
                <div key={index} className="solved-riddle-item">
                  <span className="check-mark">✓</span>
                  <span className="riddle-text">{riddle}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="leaderboard-actions">
          <button className="reset-btn" onClick={handleReset}>
            🔄 {t.resetAll}
          </button>
          <button className="continue-btn" onClick={onClose}>
            {t.continue}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
