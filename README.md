# Terminal Portfolio

A terminal-style personal portfolio web app built with Vite, featuring command-driven navigation, themed UI, mini-games, and utility tools.

## Features

- Terminal-like interface with command prompt experience
- Multiple themes with quick switching
- Game hub with playable mini-games:
  - Snake
  - Number Guess
  - Coin Flip
  - Dice
  - Rock Paper Scissors
  - Tetris
  - 2048
  - Flappy Bird
- Misc tools:
  - QR generator
  - Calculator
  - Password generator and strength check
  - UUID generator
  - Base64 encode/decode
- AI quick links (ChatGPT, Claude, Gemini, Perplexity, Sarvam)
- Keyboard command history and clickable command tokens

## Tech Stack

- HTML, CSS, JavaScript
- Vite

## Project Structure

- `index.html` - Main shell and modal markup
- `src/app.js` - Command parser and app routing
- `src/games.js` - Game logic and game lifecycle
- `src/themes.js` - Theme definitions and switching
- `src/miscTools.js` - Utility tool functions
- `src/hack.js` - Hacking mode/background effects
- `src/styles/main.css` - Base styles
- `public/favicon.svg` - Site favicon

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## GitHub Repository

https://github.com/iam-sandipmaity/terminal-portfolio

## Notes

- This project is command-first. Type `help` in the terminal UI to explore all available commands.
- Some game commands support fullscreen mode with `--fs` from game menu context.
