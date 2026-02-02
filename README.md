# Hangman Game

[![Version](https://img.shields.io/badge/version-v1.1.0-blue.svg)](https://github.com/)
[![Release Date](https://img.shields.io/badge/release-2026--02--02-green.svg)](https://github.com/)
[![Maintained](https://img.shields.io/badge/maintained-yes-brightgreen.svg)](https://github.com/)

A React-based Hangman game with support for English and French languages, multiple themes, difficulty levels, and progress tracking.

> 🎮 **Professionally maintained** — This project follows best practices and receives regular updates.

---

## 📋 Version Info

| Version | Release Date | Status |
|---------|--------------|--------|
| v1.1.0  | 2026-02-02   | Latest |

---

## 📝 Changelog / Patch Notes

### v1.1.0 (2026-02-02)
#### ✨ New Features
- **Theme Selection**: Choose from 4 exciting themes:
  - 🎬 Movies
  - ⚽ Football
  - 🐾 Animals
  - 📜 Proverbs
- **720 Puzzles**: 30 puzzles per theme × 3 difficulties × 2 languages
- **Win Celebration Overlay**: Beautiful modal with confetti animation when you win
- **Auto-Progress**: Automatic countdown (3s) to the next puzzle after winning

#### 🔧 Improvements
- **Redesigned Hint System**:
  - Always-visible contextual hint for each word
  - "Reveal a Letter" button highlights a correct letter on the keyboard (blue glow)
- **Enhanced Keyboard Blocking**: Input disabled during win overlay
- **Improved State Management**: Fixed race conditions with `useRef` guards

#### 🐛 Bug Fixes
- Fixed win overlay not appearing reliably
- Fixed ESLint warnings for Vercel deployment
- Fixed re-initialization issues after winning a round

### v1.0.0 (Initial Release)
- Bilingual support (English/French)
- Three difficulty levels
- Progress tracking with localStorage
- Visual hangman drawing
- Responsive design

---

## Features

- **Bilingual Support**: Play in English or French
- **Four Exciting Themes**: Movies, Football, Animals, and Proverbs
- **Three Difficulty Levels**: Easy, Medium, and Hard
- **720 Total Puzzles**: Rich content across all themes and difficulties
- **Progress Tracking**: Track solved riddles with localStorage persistence
- **User Profile**: Enter your name and email to personalize the experience
- **Smart Hint System**: 
  - Always-visible word hint
  - Letter reveal button that highlights on keyboard
- **Win Celebration**: Animated overlay with auto-progress countdown
- **Visual Hangman**: Classic hangman drawing that updates with wrong guesses
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How to Play

1. Enter your name and email on the welcome screen
2. Select your preferred language (English/French)
3. Choose a difficulty level (Easy/Medium/Hard)
4. Guess letters by clicking on the keyboard or typing on your keyboard
5. Use hints when needed (limited per difficulty)
6. Solve the puzzle before making 6 wrong guesses!

## Project Structure

```
src/
├── components/
│   ├── UserForm.js           # User information form
│   ├── DifficultySelector.js # Theme and difficulty selection
│   ├── Game.js               # Main game component with win overlay
│   ├── Word.js               # Word display with underscores
│   ├── HangmanDrawing.js     # Visual hangman drawing (SVG)
│   └── Leaderboard.js        # Progress tracking modal by theme
├── data/
│   └── wordsData.js          # 720 puzzles (4 themes × 3 difficulties × 2 languages)
├── App.js                    # Main application component
├── App.css                   # Application styles
└── index.js                  # Entry point
```

## Technologies Used

- React 18
- CSS3 with Flexbox and Grid
- LocalStorage API for data persistence
- Functional Components with Hooks (useState, useEffect, useCallback, useRef)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner

## Deployment

This project is optimized for deployment on **Vercel**:

```bash
npm run build
```

## License

This project is open source and available for educational purposes.

---

<p align="center">
  Made with ❤️ using React
</p>
