<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BrainMove</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

   <!-- First Move Selector Popup -->
    <div id="starter-popup" class="popup">
        <h2>Who plays first?</h2>
        <div class="popup-buttons">
            <button id="human-first">You Play First (X)</button>
            <button id="ai-first">AI Plays First (X)</button>
        </div>
    </div>

    <h1>BrainMove - You Can't Defeat Me!</h1>

    <div class="owner-info">
        <p><strong>Developed by:</strong> Debasish Das</p>
        <p><strong>Email:</strong> debasishdas1708@gmail.com</p>
        <p><strong>Mobile:</strong> +91 7815030574</p>
    </div>

    <div class="game-container">
        <div class="board-wrapper">
            <div class="game">
                <button class="box"></button>
                <button class="box"></button>
                <button class="box"></button>
                <button class="box"></button>
                <button class="box"></button>
                <button class="box"></button>
                <button class="box"></button>
                <button class="box"></button>
                <button class="box"></button>
            </div>
            <button id="reset-btn">Reset Game</button>
        </div>

        <div class="info-panel">
            <h2>Game Info</h2>
            <div class="player-info">
                <div class="player-card" id="player-x-card">
                    <span class="name" id="player-x-name">You</span>
                    <span class="symbol">X</span>
                </div>
                <div class="player-card" id="player-o-card">
                    <span class="name" id="player-o-name">AI</span>
                    <span class="symbol">O</span>
                </div>
            </div>
            <div class="turn-indicator" id="turn-indicator">
                Waiting to start...
            </div>
        </div>
    </div>

    <script src="app.js"></script>
</body>

</html>
