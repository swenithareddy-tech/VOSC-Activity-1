# Tic-Tac-Toe

A simple, fully playable Tic-Tac-Toe game built with plain **HTML, CSS, and JavaScript**. No frameworks, no build step, no dependencies.

Play against a friend on the same screen, or against an unbeatable computer opponent.

## Features

- Two modes: **Two players** and **Vs computer**
- Unbeatable computer opponent using the minimax algorithm
- Win and draw detection, with the winning line highlighted
- Session scoreboard (X wins, O wins, draws)
- Responsive layout that works on desktop and mobile
- Keyboard accessible, with screen reader status updates

## Project structure

```
tic-tac-toe/
├── index.html   # Page structure
├── style.css    # Layout, colors, responsive styling
├── script.js    # Game logic, scoring, computer opponent
└── README.md
```

## Getting started

1. Clone the repository:

```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
```

2. Open `index.html` in any modern browser.

That's it. The game runs entirely in the browser and works offline.

Alternatively, serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Host it on GitHub Pages (optional)

1. Go to **Settings → Pages** in your repository.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose the `main` branch and the `/ (root)` folder, then save.
4. Your game will be live at `https://<your-username>.github.io/<your-repo>/`.

## How to play

1. Choose a mode at the top: **Two players** or **Vs computer** (you play X, the computer plays O).
2. Click an empty cell to place your mark. X always goes first.
3. Get three in a row (horizontally, vertically, or diagonally) to win.
4. If all nine cells fill up with no winner, the round is a draw.

| Button | What it does |
| --- | --- |
| **New round** | Clears the board and keeps the scores |
| **Reset scores** | Clears the board and sets all scores to 0 |
| **Two players / Vs computer** | Switches mode (this also resets the scores) |

Scores last for the current session only and are not saved when you refresh the page.

## How it works

- **Board state:** a 9-element array (`null`, `"X"`, or `"O"`) represents the grid.
- **Win detection:** after each move, the board is checked against the 8 possible winning lines.
- **Computer opponent:** uses minimax, which explores every possible future move and picks the best one. The best a human can do is draw.

## Customizing

- **Make the computer easier:** in `script.js`, edit `bestMove()` so it sometimes returns a random empty cell instead of the best move.
- **Change the colors:** edit the CSS variables at the top of `style.css` (`--x`, `--o`, `--paper`, `--ink`, and so on).

## License

This project is open source and free to use. Add a license of your choice (for example, [MIT](https://choosealicense.com/licenses/mit/)) if you plan to share it publicly.
