let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let popup = document.getElementById("starter-popup");
let humanFirstBtn = document.getElementById("human-first");
let aiFirstBtn = document.getElementById("ai-first");
let turnIndicator = document.getElementById("turn-indicator");
let playerXCard = document.getElementById("player-x-card");
let playerOCard = document.getElementById("player-o-card");
let playerXName = document.getElementById("player-x-name");
let playerOName = document.getElementById("player-o-name");

let turnX = true; // Human
let gameOver = false;
let gameStarted = false;
let totalCount = 0;
let board = Array(9).fill(null);
let human = "X";
let ai = "O";

let X = {
    row: [0, 0, 0],
    col: [0, 0, 0],
    diag: 0,
    antiDiag: 0
};

let O = {
    row: [0, 0, 0],
    col: [0, 0, 0],
    diag: 0,
    antiDiag: 0
};

// Show popup on load
popup.classList.remove("hidden");

humanFirstBtn.addEventListener("click", () => {
    human = "X";
    ai = "O";
    turnX = true;

    playerXName.textContent = "You";
    playerOName.textContent = "AI";

    startGame();
});

aiFirstBtn.addEventListener("click", () => {
    human = "O";
    ai = "X";
    turnX = false;

    playerXName.textContent = "AI";
    playerOName.textContent = "You";

    startGame();
    setTimeout(aiPlay, 500);
});

function startGame() {
    popup.classList.add("hidden");
    gameStarted = true;
    updateTurnIndicator();
}

function updateTurnIndicator() {
    if (gameOver) return;

    playerXCard.classList.remove("active");
    playerOCard.classList.remove("active");

    if (turnX) {
        if (human === "X") {
            playerXCard.classList.add("active");
            turnIndicator.textContent = `${playerXName.textContent}'s Turn`;
        } else {
            playerOCard.classList.add("active");
            turnIndicator.textContent = `${playerOName.textContent}'s Turn`;
        }
    } else {
        if (ai === "X") {
            playerXCard.classList.add("active");
            turnIndicator.textContent = `${playerXName.textContent}'s Turn`;
        } else {
            playerOCard.classList.add("active");
            turnIndicator.textContent = `${playerOName.textContent}'s Turn`;
        }
    }
}

// ✅ Update row/col/diagonal counters
function makeMove(symbol, index) {
    const player = symbol === "X" ? X : O;

    let row = Math.floor(index / 3);
    let col = index % 3;

    totalCount++;

    player.row[row]++;
    player.col[col]++;

    if (row === col) player.diag++;
    if (row + col === 2) player.antiDiag++;

    return (
        player.row[row] === 3 ||
        player.col[col] === 3 ||
        player.diag === 3 ||
        player.antiDiag === 3
    );
}

function getWinner(state) {
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const [a, b, c] of wins) {
        if (state[a] && state[a] === state[b] && state[b] === state[c]) {
            return { player: state[a] };
        }
    }

    if (state.every(v => v !== null)) return { player: "draw" };

    return null;
}

function minMax(state, player, depth = 0) {
    const winner = getWinner(state);

    if (winner) {
        if (winner.player === ai) return { score: 1 };
        if (winner.player === human) return { score: -1 };
        return { score: 0 }; // draw
    }

    const avail = state
        .map((v, i) => (v ? null : i))
        .filter(v => v !== null);

    let moves = [];

    for (const i of avail) {
        let newState = state.slice();
        newState[i] = player;

        const result = minMax(
            newState,
            player === "X" ? "O" : "X",
            depth + 1
        );

        moves.push({ index: i, score: result.score });
    }

    if (player === ai) {
        return moves.reduce((best, m) => (m.score > best.score ? m : best));
    } else {
        return moves.reduce((best, m) => (m.score < best.score ? m : best));
    }
}

function aiPlay() {
    if (gameOver) return;

    let best = minMax(board, ai, 0);
    let index = best.index;

    board[index] = ai;
    boxes[index].innerText = ai;
    boxes[index].disabled = true;

    let win = makeMove(ai, index);
    if (win) {
        endGame(ai);
        return;
    }

    if (totalCount === 9) {
        endGame("draw");
        return;
    }

    turnX = true; // back to human
    updateTurnIndicator();
}

// ✅ Human plays
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (gameOver || !turnX || board[index] !== null || !gameStarted) return;

        board[index] = human;
        box.innerText = human;
        box.disabled = true;

        let win = makeMove(human, index);

        if (win) {
            endGame(human);
            return;
        }

        if (totalCount === 9) {
            endGame("draw");
            return;
        }

        turnX = false;
        updateTurnIndicator();

        // ✅ AI plays after slight delay
        setTimeout(aiPlay, 300);
    });
});

function endGame(winner) {
    gameOver = true;
    playerXCard.classList.remove("active");
    playerOCard.classList.remove("active");

    if (winner === "draw") {
        turnIndicator.textContent = "It's a Draw!";
        setTimeout(() => alert("It's a Draw!"), 100);
    } else if (winner === human) {
        turnIndicator.textContent = "You Win! 🎉";
        setTimeout(() => alert(`You (${human}) WIN!`), 100);
    } else {
        turnIndicator.textContent = "AI Wins! 🤖";
        setTimeout(() => alert(`AI (${ai}) WINS!`), 100);
    }
}

// ✅ Reset everything
resetBtn.addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });

    board = Array(9).fill(null);
    totalCount = 0;
    turnX = true;
    gameOver = false;
    gameStarted = false;

    X = { row: [0, 0, 0], col: [0, 0, 0], diag: 0, antiDiag: 0 };
    O = { row: [0, 0, 0], col: [0, 0, 0], diag: 0, antiDiag: 0 };

    playerXCard.classList.remove("active");
    playerOCard.classList.remove("active");
    turnIndicator.textContent = "Waiting to start...";

    popup.classList.remove("hidden");
});
