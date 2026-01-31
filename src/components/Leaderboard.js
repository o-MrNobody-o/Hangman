import React from 'react';

const Leaderboard = ({ solvedRiddles, language, difficulty, onClose, onResetProgress }) => {
  const getSolvedCount = () => {
    if (!solvedRiddles || !solvedRiddles[language] || !solvedRiddles[language][difficulty]) {
      return 0;
    }
    return solvedRiddles[language][difficulty].length;
  };

  const getSolvedList = () => {
    if (!solvedRiddles || !solvedRiddles[language] || !solvedRiddles[language][difficulty]) {
      return [];
    }
    return solvedRiddles[language][difficulty];
  };

  const getTotalProgress = () => {
    if (!solvedRiddles) return 0;
    
    let total = 0;
    Object.keys(solvedRiddles).forEach(lang => {
      Object.keys(solvedRiddles[lang]).forEach(diff => {
        total += solvedRiddles[lang][diff].length;
      });
    });
    return total;
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
      onResetProgress();
    }
  };

  return (
    <div className="leaderboard-overlay">
      <div className="leaderboard-modal">
        <div className="leaderboard-header">
          <h2>📊 Your Progress</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="progress-summary">
          <div className="stat-card">
            <div className="stat-number">{getTotalProgress()}</div>
            <div className="stat-label">Total Riddles Solved</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{getSolvedCount()}</div>
            <div className="stat-label">
              Solved in {language.charAt(0).toUpperCase() + language.slice(1)} - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </div>
          </div>
        </div>

        <div className="solved-list">
          <h3>Solved Riddles ({language} - {difficulty})</h3>
          {getSolvedList().length === 0 ? (
            <p className="no-riddles">No riddles solved yet in this category. Start playing!</p>
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
            🔄 Reset All Progress
          </button>
          <button className="continue-btn" onClick={onClose}>
            Continue Playing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
