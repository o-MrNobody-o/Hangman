# Hangman Game

A React-based Hangman game with support for English and French languages, multiple difficulty levels, and progress tracking.

## Features

- **Bilingual Support**: Play in English or French
- **Three Difficulty Levels**: Easy, Medium, and Hard
- **30 Puzzles per Level**: Each difficulty contains 30 unique proverbs and phrases
- **Progress Tracking**: Track solved riddles with localStorage persistence
- **User Profile**: Enter your name and email to personalize the experience
- **Hints System**: Get hints based on difficulty (Easy: 3 hints, Medium: 2 hints, Hard: 1 hint)
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
│   ├── UserForm.js          # User information form
│   ├── DifficultySelector.js # Language and difficulty selection
│   ├── Game.js               # Main game component
│   ├── Word.js               # Word display with underscores
│   ├── HangmanDrawing.js     # Visual hangman drawing
│   └── Leaderboard.js        # Progress tracking modal
├── data/
│   └── wordsData.js          # All puzzles in English and French
├── App.js                    # Main application component
├── App.css                   # Application styles
└── index.js                  # Entry point
```

## Technologies Used

- React 18
- CSS3 with Flexbox and Grid
- LocalStorage API for data persistence
- Functional Components with Hooks (useState, useEffect, useCallback)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner

## License

This project is open source and available for educational purposes.
