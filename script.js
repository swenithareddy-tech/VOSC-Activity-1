const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const scoreEls = {
  X: document.getElementById("score-x"),
  O: document.getElementById("score-o"),
  draw: document.getElementById("score-draw"),
};
const modeFriendBtn = document.getElementById("mode-friend");
const modeCpuBtn = document.getElementById("mode-cpu");

let board, current, gameOver, cpuTimer, vsCpu = false;
const scores = { X: 0, O: 0, draw: 0 };

// Build the 9 cells once
const cells = [];
for (let i = 0; i < 9; i++) {
  const btn = document.createElement("button");
  btn.className = "cell";
  btn.type = "button";
  btn.setAttribute("aria-label", `Cell ${i + 1}`);
  btn.addEventListener("click", () => handleMove(i));
  boardEl.appendChild(btn);
  cells.push(btn);
}

function startRound() {
  clearTimeout(cpuTimer);
  board = Array(9).fill(null);
  current = "X";
  gameOver = false;
  cells.forEach((c, i) => {
    c.textContent = "";
    c.className = "cell";
    c.disabled = false;
    c.setAttribute("aria-label", `Cell ${i + 1}`);
  });
  setStatus();
}

function setStatus(text) {
  statusEl.textContent = text || `${current}'s turn`;
}

function getWinner(b) {
  for (const [a, c, d] of WIN_LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return { player: b[a], line: [a, c, d] };
  }
  return null;
}

function handleMove(i) {
  if (gameOver || board[i]) return;
  // In computer mode, the human only plays X
  if (vsCpu && current === "O") return;
  play(i);
}

function play(i) {
  board[i] = current;
  cells[i].textContent = current;
  cells[i].classList.add(current.toLowerCase());
  cells[i].disabled = true;
  cells[i].setAttribute("aria-label", `Cell ${i + 1}, ${current}`);

  const result = getWinner(board);
  if (result) {
    endRound(result);
    return;
  }
  if (board.every(Boolean)) {
    endRound(null);
    return;
  }

  current = current === "X" ? "O" : "X";
  setStatus();

  if (vsCpu && current === "O") {
    setStatus("Computer is thinking...");
    cpuTimer = setTimeout(() => play(bestMove()), 400);
  }
}

function endRound(result) {
  gameOver = true;
  cells.forEach((c) => (c.disabled = true));
  if (result) {
    result.line.forEach((i) => cells[i].classList.add("win"));
    scores[result.player]++;
    scoreEls[result.player].textContent = scores[result.player];
    setStatus(vsCpu && result.player === "O" ? "Computer wins!" : `${result.player} wins!`);
  } else {
    scores.draw++;
    scoreEls.draw.textContent = scores.draw;
    setStatus("It's a draw.");
  }
}

// Minimax: computer (O) never loses
function minimax(b, player) {
  const w = getWinner(b);
  if (w) return w.player === "O" ? 1 : -1;
  if (b.every(Boolean)) return 0;

  const scoresList = [];
  for (let i = 0; i < 9; i++) {
    if (b[i]) continue;
    b[i] = player;
    scoresList.push(minimax(b, player === "O" ? "X" : "O"));
    b[i] = null;
  }
  return player === "O" ? Math.max(...scoresList) : Math.min(...scoresList);
}

function bestMove() {
  let best = -Infinity, move = null;
  for (let i = 0; i < 9; i++) {
    if (board[i]) continue;
    board[i] = "O";
    const s = minimax(board, "X");
    board[i] = null;
    if (s > best) { best = s; move = i; }
  }
  return move;
}

function setMode(cpu) {
  vsCpu = cpu;
  modeCpuBtn.classList.toggle("active", cpu);
  modeFriendBtn.classList.toggle("active", !cpu);
  resetScores();
}

function resetScores() {
  scores.X = scores.O = scores.draw = 0;
  Object.values(scoreEls).forEach((el) => (el.textContent = "0"));
  startRound();
}

modeFriendBtn.addEventListener("click", () => setMode(false));
modeCpuBtn.addEventListener("click", () => setMode(true));
document.getElementById("new-round").addEventListener("click", startRound);
document.getElementById("reset-scores").addEventListener("click", resetScores);

startRound();
