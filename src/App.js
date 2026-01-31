import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import DifficultySelector from './components/DifficultySelector';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [language, setLanguage] = useState('english');
  const [difficulty, setDifficulty] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [solvedRiddles, setSolvedRiddles] = useState({});
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Load user info and solved riddles from localStorage on mount
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('hangman_user_info');
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }

    const savedSolvedRiddles = localStorage.getItem('hangman_solved_riddles');
    if (savedSolvedRiddles) {
      setSolvedRiddles(JSON.parse(savedSolvedRiddles));
    }

    const savedLanguage = localStorage.getItem('hangman_language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save user info to localStorage whenever it changes
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('hangman_user_info', JSON.stringify(userInfo));
    }
  }, [userInfo]);

  // Save solved riddles to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(solvedRiddles).length > 0) {
      localStorage.setItem('hangman_solved_riddles', JSON.stringify(solvedRiddles));
    }
  }, [solvedRiddles]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('hangman_language', language);
  }, [language]);

  const handleUserSubmit = (info) => {
    setUserInfo(info);
  };

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleBackToMenu = () => {
    setGameStarted(false);
    setDifficulty(null);
  };

  const handleSolveRiddle = (lang, diff, word) => {
    setSolvedRiddles(prev => {
      const updated = { ...prev };
      
      if (!updated[lang]) {
        updated[lang] = {};
      }
      
      if (!updated[lang][diff]) {
        updated[lang][diff] = [];
      }
      
      if (!updated[lang][diff].includes(word)) {
        updated[lang][diff] = [...updated[lang][diff], word];
      }
      
      return updated;
    });
  };

  const handleResetProgress = () => {
    setSolvedRiddles({});
    localStorage.removeItem('hangman_solved_riddles');
    setShowLeaderboard(false);
  };

  const handleShowLeaderboard = () => {
    setShowLeaderboard(true);
  };

  const handleCloseLeaderboard = () => {
    setShowLeaderboard(false);
  };

  // Show user form if no user info
  if (!userInfo) {
    return <UserForm onSubmit={handleUserSubmit} />;
  }

  return (
    <div className="App">
      {!gameStarted ? (
        <DifficultySelector
          onSelect={handleDifficultySelect}
          language={language}
          onLanguageChange={handleLanguageChange}
          userName={userInfo.name}
        />
      ) : (
        <Game
          language={language}
          difficulty={difficulty}
          onBack={handleBackToMenu}
          solvedRiddles={solvedRiddles}
          onSolveRiddle={handleSolveRiddle}
          onShowLeaderboard={handleShowLeaderboard}
        />
      )}

      {showLeaderboard && (
        <Leaderboard
          solvedRiddles={solvedRiddles}
          language={language}
          difficulty={difficulty}
          onClose={handleCloseLeaderboard}
          onResetProgress={handleResetProgress}
        />
      )}
    </div>
  );
}

export default App;
