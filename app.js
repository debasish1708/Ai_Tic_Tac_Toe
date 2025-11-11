let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");

let turnX = true; // Human
let gameOver = false;
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
        if (winner.player === human) return { score: - 1 };
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
        setTimeout(() => alert("AI (O) WINS!"), 50);
        gameOver = true;
        return;
    }

    if (totalCount === 9) {
        alert("DRAW!");
        gameOver = true;
        return;
    }

    turnX = true; // back to human
}

// ✅ Human plays
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (gameOver || !turnX || board[index] !== null) return;

        board[index] = human;
        box.innerText = human;
        box.disabled = true;

        let win = makeMove(human, index);

        if (win) {
            setTimeout(() => alert("You (X) WIN!"), 50);
            gameOver = true;
            return;
        }

        if (totalCount === 9) {
            setTimeout(() => alert("DRAW!"), 50);
            gameOver = true;
            return;
        }

        turnX = false;

        // ✅ AI plays after slight delay
        setTimeout(aiPlay, 300);
    });
});

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

    X = { row: [0, 0, 0], col: [0, 0, 0], diag: 0, antiDiag: 0 };
    O = { row: [0, 0, 0], col: [0, 0, 0], diag: 0, antiDiag: 0 };
});
