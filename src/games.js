(function () {
    let snakeInterval = null;
    let snakeKeyHandler = null;
    let targetNum = 0;
    let attempts = 0;
    let guessPlaying = false;

    let tetrisInterval = null;
    let tetrisKeyHandler = null;
    let tetrisState = null;

    let g2048State = null;
    let g2048KeyHandler = null;

    let flappyAnim = null;
    let flappyState = null;
    let flappyKeyHandler = null;
    let flappyClickHandler = null;
    let basicGameKeyHandler = null;

    let activeGame = '';
    let snakePaused = false;
    let tetrisPaused = false;

    const SCORE_KEY = 'portfolioGameBestScores';
    const bestScores = loadBestScores();

    const GAME_MODAL_IDS = {
        snake: 'snakeModal',
        guess: 'guessModal',
        coin: 'coinModal',
        dice: 'diceModal',
        rps: 'rpsModal',
        tetris: 'tetrisModal',
        '2048': 'g2048Modal',
        flappybird: 'flappyModal'
    };

    function loadBestScores() {
        try {
            const raw = localStorage.getItem(SCORE_KEY);
            if (!raw) return {};
            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === 'object' ? parsed : {};
        } catch (err) {
            return {};
        }
    }

    function saveBestScores() {
        try {
            localStorage.setItem(SCORE_KEY, JSON.stringify(bestScores));
        } catch (err) {
            // Ignore storage failures in private mode or blocked storage.
        }
    }

    function getBestScore(gameName) {
        const val = bestScores[gameName];
        return typeof val === 'number' ? val : 0;
    }

    function updateBestScore(gameName, score) {
        if (typeof score !== 'number' || score <= getBestScore(gameName)) return;
        bestScores[gameName] = score;
        saveBestScores();
    }

    function getBestGuessAttempts() {
        const val = bestScores.guessAttempts;
        return typeof val === 'number' && val > 0 ? val : 0;
    }

    function updateBestGuessAttempts(attemptCount) {
        if (typeof attemptCount !== 'number' || attemptCount <= 0) return;
        const current = getBestGuessAttempts();
        if (current !== 0 && attemptCount >= current) return;
        bestScores.guessAttempts = attemptCount;
        saveBestScores();
    }

    function scaleActiveGameLayout() {
        if (!activeGame || !document.fullscreenElement) return;
        if (activeGame === 'snake') {
            const canvas = document.getElementById('snakeCanvas');
            const side = Math.min(window.innerWidth * 0.7, window.innerHeight * 0.65, 700);
            canvas.style.width = Math.max(280, Math.floor(side)) + 'px';
            canvas.style.height = Math.max(280, Math.floor(side)) + 'px';
        } else if (activeGame === 'tetris') {
            const canvas = document.getElementById('tetrisCanvas');
            const h = Math.min(window.innerHeight * 0.72, 820);
            const w = h * 0.6;
            canvas.style.height = Math.max(400, Math.floor(h)) + 'px';
            canvas.style.width = Math.max(240, Math.floor(w)) + 'px';
        } else if (activeGame === 'flappybird') {
            const canvas = document.getElementById('flappyCanvas');
            const h = Math.min(window.innerHeight * 0.72, 860);
            const w = h * 0.75;
            canvas.style.height = Math.max(480, Math.floor(h)) + 'px';
            canvas.style.width = Math.max(360, Math.floor(w)) + 'px';
        } else if (activeGame === '2048') {
            const board = document.getElementById('g2048Board');
            const side = Math.min(window.innerWidth * 0.6, window.innerHeight * 0.6, 700);
            board.style.width = Math.max(320, Math.floor(side)) + 'px';
            board.style.height = Math.max(320, Math.floor(side)) + 'px';
        }
    }

    function resetGameScale() {
        ['snakeCanvas', 'tetrisCanvas', 'flappyCanvas'].forEach(function (id) {
            const el = document.getElementById(id);
            if (el) {
                el.style.width = '';
                el.style.height = '';
            }
        });
        const board = document.getElementById('g2048Board');
        if (board) {
            board.style.width = '';
            board.style.height = '';
        }
    }

    function toggleFullscreenForActiveGame() {
        if (!activeGame) return;
        if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
            exitFullscreenIfAny();
        } else {
            enterFullscreenForGame(activeGame);
        }
    }

    function renderGames() {
        return 'Available Games:\n[snake] - Snake game\n[guess] - Number guessing game\n[coin] - Flip a coin\n[dice] - Roll a dice\n[rps <rock|paper|scissors>] - Rock Paper Scissors\n[tetris] - Play Tetris Game\n[2048] - Play 2048 Game\n[flappybird] - Play Flappy Bird Game\n\nTips: add --fs to open fullscreen (example: tetris --fs)\nHotkeys: P pause, R restart, F fullscreen, ESC exit\nType any game command to play';
    }

    function enterFullscreenForGame(gameName) {
        activeGame = gameName;
        const modalId = GAME_MODAL_IDS[gameName];
        if (!modalId) return;
        const el = document.getElementById(modalId);
        if (!el) return;
        const requestFs = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
        if (!requestFs) return;
        try {
            const ret = requestFs.call(el);
            if (ret && typeof ret.catch === 'function') ret.catch(function () {});
            setTimeout(scaleActiveGameLayout, 40);
        } catch (err) {
            // Ignore browser/user gesture fullscreen errors.
        }
    }

    function exitFullscreenIfAny() {
        if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen();
            return;
        }
        if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            return;
        }
        if (document.msFullscreenElement && document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        resetGameScale();
    }

    function startSnake() {
        activeGame = 'snake';
        snakePaused = false;
        document.getElementById('overlay').classList.add('show');
        document.getElementById('snakeModal').classList.add('show');
        const canvas = document.getElementById('snakeCanvas');
        const ctx = canvas.getContext('2d');
        const gridSize = 15;
        const tileSize = canvas.width / gridSize;
        let snake = [{ x: 7, y: 7 }];
        let food = { x: 3, y: 3 };
        let direction = { x: 1, y: 0 };
        let score = 0;
        let isPlaying = true;

        function render() {
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#3fb950';
            snake.forEach(function (s) {
                ctx.fillRect(s.x * tileSize, s.y * tileSize, tileSize - 2, tileSize - 2);
            });
            ctx.fillStyle = '#f85149';
            ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize - 2, tileSize - 2);
            document.getElementById('snakeScore').textContent = 'Score: ' + score + ' | Best: ' + getBestScore('snake') + (snakePaused ? ' | Paused' : '');
        }

        function move() {
            if (!isPlaying || snakePaused) return;
            const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
            if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || snake.some(function (s) { return s.x === head.x && s.y === head.y; })) {
                isPlaying = false;
                if (snakeInterval) clearInterval(snakeInterval);
                updateBestScore('snake', score);
                document.getElementById('snakeScore').textContent = 'Game Over! Score: ' + score + ' | Best: ' + getBestScore('snake');
                return;
            }
            snake.unshift(head);
            if (head.x === food.x && head.y === food.y) {
                score += 10;
                food = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
                while (snake.some(function (s) { return s.x === food.x && s.y === food.y; })) {
                    food = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
                }
            } else {
                snake.pop();
            }
            render();
        }

        if (snakeKeyHandler) document.removeEventListener('keydown', snakeKeyHandler);
        snakeKeyHandler = function (e) {
            if (!isPlaying) return;
            if (e.key === 'ArrowUp' && direction.y !== 1) direction = { x: 0, y: -1 };
            else if (e.key === 'ArrowDown' && direction.y !== -1) direction = { x: 0, y: 1 };
            else if (e.key === 'ArrowLeft' && direction.x !== 1) direction = { x: -1, y: 0 };
            else if (e.key === 'ArrowRight' && direction.x !== -1) direction = { x: 1, y: 0 };
            else if (e.key.toLowerCase() === 'p') {
                snakePaused = !snakePaused;
                render();
            }
            else if (e.key.toLowerCase() === 'r') startSnake();
            else if (e.key.toLowerCase() === 'f') toggleFullscreenForActiveGame();
            else if (e.key === 'Escape') closeSnake();
        };
        document.addEventListener('keydown', snakeKeyHandler);

        render();
        if (snakeInterval) clearInterval(snakeInterval);
        snakeInterval = setInterval(move, 150);
    }

    function closeSnake() {
        if (snakeInterval) clearInterval(snakeInterval);
        snakeInterval = null;
        if (snakeKeyHandler) {
            document.removeEventListener('keydown', snakeKeyHandler);
            snakeKeyHandler = null;
        }
        document.getElementById('overlay').classList.remove('show');
        document.getElementById('snakeModal').classList.remove('show');
        activeGame = '';
        exitFullscreenIfAny();
    }

    function startGuess() {
        activeGame = 'guess';
        targetNum = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        guessPlaying = true;
        document.getElementById('overlay').classList.add('show');
        document.getElementById('guessModal').classList.add('show');
        document.getElementById('guessNum').value = '';
        document.getElementById('guessMsg').textContent = '';
        const best = getBestGuessAttempts();
        document.getElementById('attempts').textContent = '0' + (best ? ' (Best: ' + best + ')' : '');
        document.getElementById('guessNum').focus();
    }

    function submitGuess() {
        if (!guessPlaying) return;
        const num = parseInt(document.getElementById('guessNum').value, 10);
        if (isNaN(num) || num < 1 || num > 100) {
            document.getElementById('guessMsg').textContent = 'Please enter a number between 1-100';
            document.getElementById('guessMsg').className = 'guess-message wrong';
            return;
        }
        attempts += 1;
        const best = getBestGuessAttempts();
        document.getElementById('attempts').textContent = attempts + (best ? ' (Best: ' + best + ')' : '');
        if (num === targetNum) {
            updateBestGuessAttempts(attempts);
            document.getElementById('guessMsg').textContent = 'Correct! You won in ' + attempts + ' attempts!';
            document.getElementById('guessMsg').className = 'guess-message correct';
            guessPlaying = false;
            const newBest = getBestGuessAttempts();
            document.getElementById('attempts').textContent = attempts + (newBest ? ' (Best: ' + newBest + ')' : '');
        } else if (num < targetNum) {
            document.getElementById('guessMsg').textContent = 'Too low! Try a higher number';
            document.getElementById('guessMsg').className = 'guess-message wrong';
        } else {
            document.getElementById('guessMsg').textContent = 'Too high! Try a lower number';
            document.getElementById('guessMsg').className = 'guess-message wrong';
        }
        document.getElementById('guessNum').value = '';
        document.getElementById('guessNum').focus();
    }

    function closeGuess() {
        guessPlaying = false;
        document.getElementById('overlay').classList.remove('show');
        document.getElementById('guessModal').classList.remove('show');
        activeGame = '';
        exitFullscreenIfAny();
    }

    function startCoin() {
        activeGame = 'coin';
        document.getElementById('overlay').classList.add('show');
        document.getElementById('coinModal').classList.add('show');
        document.getElementById('coinChoice').value = 'heads';
        document.getElementById('coinResult').textContent = 'Pick a side and press Flip';
    }

    function flipCoin() {
        const choice = document.getElementById('coinChoice').value;
        if (choice !== 'heads' && choice !== 'tails') {
            document.getElementById('coinResult').textContent = 'Choose Heads or Tails first';
            return;
        }
        const result = Math.random() < 0.5 ? 'heads' : 'tails';
        const win = choice === result;
        document.getElementById('coinResult').textContent = 'You chose ' + choice + ' | Result: ' + result + ' | ' + (win ? 'You win!' : 'You lose!');
    }

    function closeCoin() {
        document.getElementById('overlay').classList.remove('show');
        document.getElementById('coinModal').classList.remove('show');
        activeGame = '';
        exitFullscreenIfAny();
    }

    function startDice() {
        activeGame = 'dice';
        document.getElementById('overlay').classList.add('show');
        document.getElementById('diceModal').classList.add('show');
        document.getElementById('diceGuess').value = '';
        document.getElementById('diceResult').textContent = 'Enter a guess and press Roll';
        document.getElementById('diceGuess').focus();
    }

    function rollDice() {
        const guess = parseInt(document.getElementById('diceGuess').value, 10);
        if (isNaN(guess) || guess < 1 || guess > 6) {
            document.getElementById('diceResult').textContent = 'Enter a valid number from 1 to 6';
            return;
        }
        const roll = Math.floor(Math.random() * 6) + 1;
        document.getElementById('diceResult').textContent = 'You guessed ' + guess + ' | Rolled ' + roll + ' | ' + (guess === roll ? 'You win!' : 'Try again!');
    }

    function closeDice() {
        document.getElementById('overlay').classList.remove('show');
        document.getElementById('diceModal').classList.remove('show');
        activeGame = '';
        exitFullscreenIfAny();
    }

    function startRps() {
        activeGame = 'rps';
        document.getElementById('overlay').classList.add('show');
        document.getElementById('rpsModal').classList.add('show');
        document.getElementById('rpsResult').textContent = 'Make a move';
    }

    function playRps(userMove) {
        const validMoves = ['rock', 'paper', 'scissors'];
        if (!validMoves.includes(userMove)) return;
        const cpuMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        let result = 'Draw';
        if ((userMove === 'rock' && cpuMove === 'scissors') || (userMove === 'paper' && cpuMove === 'rock') || (userMove === 'scissors' && cpuMove === 'paper')) result = 'You win!';
        else if (userMove !== cpuMove) result = 'You lose!';
        document.getElementById('rpsResult').textContent = 'You: ' + userMove + ' | CPU: ' + cpuMove + ' | ' + result;
    }

    function closeRps() {
        document.getElementById('overlay').classList.remove('show');
        document.getElementById('rpsModal').classList.remove('show');
        activeGame = '';
        exitFullscreenIfAny();
    }

    const TETROMINOS = [
        [[1, 1, 1, 1]],
        [[1, 0, 0], [1, 1, 1]],
        [[0, 0, 1], [1, 1, 1]],
        [[1, 1], [1, 1]],
        [[0, 1, 1], [1, 1, 0]],
        [[0, 1, 0], [1, 1, 1]],
        [[1, 1, 0], [0, 1, 1]]
    ];
    const TETRIS_COLORS = ['#34d399', '#f59e0b', '#60a5fa', '#fbbf24', '#f472b6', '#a78bfa', '#f87171'];

    function cloneMatrix(m) {
        return m.map(function (r) { return r.slice(); });
    }

    function rotateMatrix(m) {
        const rows = m.length;
        const cols = m[0].length;
        const out = [];
        for (let x = 0; x < cols; x++) {
            const row = [];
            for (let y = rows - 1; y >= 0; y--) row.push(m[y][x]);
            out.push(row);
        }
        return out;
    }

    function startTetris() {
        activeGame = 'tetris';
        tetrisPaused = false;
        document.getElementById('overlay').classList.add('show');
        document.getElementById('tetrisModal').classList.add('show');
        tetrisState = {
            board: Array.from({ length: 20 }, function () { return Array(10).fill(0); }),
            piece: null,
            x: 0,
            y: 0,
            score: 0,
            lines: 0,
            level: 1,
            speed: 550,
            gameOver: false,
            paused: false
        };

        spawnPiece();
        drawTetris();
        if (tetrisInterval) clearInterval(tetrisInterval);
        tetrisInterval = setInterval(stepTetris, tetrisState.speed);

        if (tetrisKeyHandler) document.removeEventListener('keydown', tetrisKeyHandler);
        tetrisKeyHandler = function (e) {
            if (!tetrisState || tetrisState.gameOver) return;
            if (e.key === 'ArrowLeft') moveTetris(-1, 0);
            else if (e.key === 'ArrowRight') moveTetris(1, 0);
            else if (e.key === 'ArrowDown') moveTetris(0, 1);
            else if (e.key === 'ArrowUp') rotateTetris();
            else if (e.key === ' ') hardDropTetris();
            else if (e.key.toLowerCase() === 'p') {
                tetrisPaused = !tetrisPaused;
                tetrisState.paused = tetrisPaused;
                drawTetris();
            }
            else if (e.key.toLowerCase() === 'r') startTetris();
            else if (e.key.toLowerCase() === 'f') toggleFullscreenForActiveGame();
            else if (e.key === 'Escape') closeTetris();
        };
        document.addEventListener('keydown', tetrisKeyHandler);
    }

    function spawnPiece() {
        const idx = Math.floor(Math.random() * TETROMINOS.length);
        tetrisState.piece = { shape: cloneMatrix(TETROMINOS[idx]), color: TETRIS_COLORS[idx] };
        tetrisState.x = Math.floor((10 - tetrisState.piece.shape[0].length) / 2);
        tetrisState.y = 0;
        if (collides(tetrisState.x, tetrisState.y, tetrisState.piece.shape)) {
            tetrisState.gameOver = true;
            if (tetrisInterval) clearInterval(tetrisInterval);
        }
    }

    function collides(px, py, shape) {
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (!shape[y][x]) continue;
                const bx = px + x;
                const by = py + y;
                if (bx < 0 || bx >= 10 || by >= 20) return true;
                if (by >= 0 && tetrisState.board[by][bx]) return true;
            }
        }
        return false;
    }

    function lockPiece() {
        const shape = tetrisState.piece.shape;
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (!shape[y][x]) continue;
                const by = tetrisState.y + y;
                const bx = tetrisState.x + x;
                if (by >= 0) tetrisState.board[by][bx] = tetrisState.piece.color;
            }
        }
        clearLines();
        updateBestScore('tetris', tetrisState.score);
        spawnPiece();
    }

    function clearLines() {
        let cleared = 0;
        for (let y = 19; y >= 0; y--) {
            if (tetrisState.board[y].every(function (c) { return c; })) {
                tetrisState.board.splice(y, 1);
                tetrisState.board.unshift(Array(10).fill(0));
                cleared += 1;
                y += 1;
            }
        }
        if (cleared > 0) {
            tetrisState.lines += cleared;
            tetrisState.score += cleared * 100 * tetrisState.level;
            tetrisState.level = Math.floor(tetrisState.lines / 10) + 1;
            const newSpeed = Math.max(120, 550 - (tetrisState.level - 1) * 40);
            if (newSpeed !== tetrisState.speed) {
                tetrisState.speed = newSpeed;
                clearInterval(tetrisInterval);
                tetrisInterval = setInterval(stepTetris, tetrisState.speed);
            }
        }
    }

    function moveTetris(dx, dy) {
        if (!tetrisState || tetrisState.gameOver) return;
        const nx = tetrisState.x + dx;
        const ny = tetrisState.y + dy;
        if (!collides(nx, ny, tetrisState.piece.shape)) {
            tetrisState.x = nx;
            tetrisState.y = ny;
            drawTetris();
            return true;
        }
        if (dy === 1) {
            lockPiece();
            drawTetris();
        }
        return false;
    }

    function rotateTetris() {
        const rotated = rotateMatrix(tetrisState.piece.shape);
        if (!collides(tetrisState.x, tetrisState.y, rotated)) {
            tetrisState.piece.shape = rotated;
            drawTetris();
        }
    }

    function hardDropTetris() {
        while (moveTetris(0, 1)) {}
    }

    function stepTetris() {
        if (!tetrisState || tetrisState.gameOver || tetrisPaused) {
            drawTetris();
            return;
        }
        moveTetris(0, 1);
    }

    function drawTetris() {
        const canvas = document.getElementById('tetrisCanvas');
        const ctx = canvas.getContext('2d');
        const cell = 20;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 10; x++) {
                const c = tetrisState.board[y][x];
                if (c) {
                    ctx.fillStyle = c;
                    ctx.fillRect(x * cell + 1, y * cell + 1, cell - 2, cell - 2);
                }
            }
        }

        if (tetrisState.piece) {
            const shape = tetrisState.piece.shape;
            for (let y = 0; y < shape.length; y++) {
                for (let x = 0; x < shape[y].length; x++) {
                    if (!shape[y][x]) continue;
                    ctx.fillStyle = tetrisState.piece.color;
                    ctx.fillRect((tetrisState.x + x) * cell + 1, (tetrisState.y + y) * cell + 1, cell - 2, cell - 2);
                }
            }
        }

        if (tetrisState.gameOver) {
            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(0, 170, canvas.width, 60);
            ctx.fillStyle = '#f87171';
            ctx.font = 'bold 24px monospace';
            ctx.fillText('GAME OVER', 42, 207);
        } else if (tetrisPaused) {
            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(0, 170, canvas.width, 60);
            ctx.fillStyle = '#58a6ff';
            ctx.font = 'bold 24px monospace';
            ctx.fillText('PAUSED', 70, 207);
        }

        document.getElementById('tetrisScore').textContent = 'Score: ' + tetrisState.score + ' | Best: ' + getBestScore('tetris');
        document.getElementById('tetrisLines').textContent = 'Lines: ' + tetrisState.lines;
        document.getElementById('tetrisLevel').textContent = 'Level: ' + tetrisState.level;
    }

    function closeTetris() {
        if (tetrisInterval) clearInterval(tetrisInterval);
        tetrisInterval = null;
        if (tetrisKeyHandler) {
            document.removeEventListener('keydown', tetrisKeyHandler);
            tetrisKeyHandler = null;
        }
        document.getElementById('overlay').classList.remove('show');
        document.getElementById('tetrisModal').classList.remove('show');
        activeGame = '';
        exitFullscreenIfAny();
    }

    function addRandom2048(board) {
        const empty = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) if (board[r][c] === 0) empty.push([r, c]);
        }
        if (!empty.length) return;
        const pos = empty[Math.floor(Math.random() * empty.length)];
        board[pos[0]][pos[1]] = Math.random() < 0.9 ? 2 : 4;
    }

    function tileColor(v) {
        const map = {
            0: '#2a2a2a',
            2: '#3a4b5c',
            4: '#4a6c8c',
            8: '#5b7c3a',
            16: '#7b6f2a',
            32: '#9a5f2a',
            64: '#b54a2a',
            128: '#9055d3',
            256: '#7e6af5',
            512: '#5d9cf0',
            1024: '#37b5a5',
            2048: '#f0c94a'
        };
        return map[v] || '#f87171';
    }

    function render2048() {
        const boardEl = document.getElementById('g2048Board');
        boardEl.innerHTML = '';
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                const v = g2048State.board[r][c];
                const tile = document.createElement('div');
                tile.className = 'g2048-tile';
                tile.style.background = tileColor(v);
                tile.textContent = v === 0 ? '' : String(v);
                boardEl.appendChild(tile);
            }
        }
        document.getElementById('g2048Score').textContent = 'Score: ' + g2048State.score + ' | Best: ' + getBestScore('2048') + (g2048State.paused ? ' | Paused' : '');
    }

    function compressLine(line) {
        const arr = line.filter(function (v) { return v !== 0; });
        let score = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] !== 0 && arr[i] === arr[i + 1]) {
                arr[i] *= 2;
                score += arr[i];
                arr[i + 1] = 0;
            }
        }
        const out = arr.filter(function (v) { return v !== 0; });
        while (out.length < 4) out.push(0);
        return { line: out, score: score };
    }

    function move2048(dir) {
        if (!g2048State || g2048State.over || g2048State.paused) return;
        const before = JSON.stringify(g2048State.board);
        let gained = 0;

        if (dir === 'left' || dir === 'right') {
            for (let r = 0; r < 4; r++) {
                let line = g2048State.board[r].slice();
                if (dir === 'right') line.reverse();
                const merged = compressLine(line);
                gained += merged.score;
                let out = merged.line;
                if (dir === 'right') out = out.reverse();
                g2048State.board[r] = out;
            }
        } else {
            for (let c = 0; c < 4; c++) {
                let line = [g2048State.board[0][c], g2048State.board[1][c], g2048State.board[2][c], g2048State.board[3][c]];
                if (dir === 'down') line.reverse();
                const merged = compressLine(line);
                gained += merged.score;
                let out = merged.line;
                if (dir === 'down') out = out.reverse();
                for (let r = 0; r < 4; r++) g2048State.board[r][c] = out[r];
            }
        }

        const after = JSON.stringify(g2048State.board);
        if (before !== after) {
            g2048State.score += gained;
            updateBestScore('2048', g2048State.score);
            addRandom2048(g2048State.board);
        }

        g2048State.over = !canMove2048();
        render2048();
        if (g2048State.over) {
            document.getElementById('g2048Score').textContent += ' | Game Over';
        }
    }

    function canMove2048() {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                const v = g2048State.board[r][c];
                if (v === 0) return true;
                if (r < 3 && g2048State.board[r + 1][c] === v) return true;
                if (c < 3 && g2048State.board[r][c + 1] === v) return true;
            }
        }
        return false;
    }

    function start2048() {
        activeGame = '2048';
        document.getElementById('overlay').classList.add('show');
        document.getElementById('g2048Modal').classList.add('show');
        g2048State = { board: Array.from({ length: 4 }, function () { return Array(4).fill(0); }), score: 0, over: false, paused: false };
        addRandom2048(g2048State.board);
        addRandom2048(g2048State.board);
        render2048();

        if (g2048KeyHandler) document.removeEventListener('keydown', g2048KeyHandler);
        g2048KeyHandler = function (e) {
            if (!g2048State) return;
            if (e.key === 'ArrowLeft') move2048('left');
            else if (e.key === 'ArrowRight') move2048('right');
            else if (e.key === 'ArrowUp') move2048('up');
            else if (e.key === 'ArrowDown') move2048('down');
            else if (e.key.toLowerCase() === 'p') {
                g2048State.paused = !g2048State.paused;
                render2048();
            }
            else if (e.key.toLowerCase() === 'r') start2048();
            else if (e.key.toLowerCase() === 'f') toggleFullscreenForActiveGame();
            else if (e.key === 'Escape') close2048();
        };
        document.addEventListener('keydown', g2048KeyHandler);
    }

    function close2048() {
        if (g2048KeyHandler) {
            document.removeEventListener('keydown', g2048KeyHandler);
            g2048KeyHandler = null;
        }
        document.getElementById('overlay').classList.remove('show');
        document.getElementById('g2048Modal').classList.remove('show');
        activeGame = '';
        exitFullscreenIfAny();
    }

    function startFlappyBird() {
        activeGame = 'flappybird';
        document.getElementById('overlay').classList.add('show');
        document.getElementById('flappyModal').classList.add('show');
        const canvas = document.getElementById('flappyCanvas');
        const ctx = canvas.getContext('2d');

        flappyState = {
            birdY: canvas.height / 2,
            birdX: 70,
            birdV: 0,
            gravity: 0.38,
            jump: -7,
            pipes: [],
            frame: 0,
            score: 0,
            alive: true,
            paused: false
        };

        function flap() {
            if (!flappyState || !flappyState.alive) return;
            flappyState.birdV = flappyState.jump;
        }

        if (flappyKeyHandler) document.removeEventListener('keydown', flappyKeyHandler);
        flappyKeyHandler = function (e) {
            if (e.key === ' ' || e.key === 'ArrowUp') {
                e.preventDefault();
                flap();
            } else if (e.key.toLowerCase() === 'p') {
                flappyState.paused = !flappyState.paused;
            } else if (e.key.toLowerCase() === 'r') {
                startFlappyBird();
            } else if (e.key.toLowerCase() === 'f') {
                toggleFullscreenForActiveGame();
            } else if (e.key === 'Escape') {
                closeFlappyBird();
            }
        };
        document.addEventListener('keydown', flappyKeyHandler);

        if (flappyClickHandler) canvas.removeEventListener('click', flappyClickHandler);
        flappyClickHandler = flap;
        canvas.addEventListener('click', flappyClickHandler);

        function spawnPipe() {
            const gap = 130;
            const top = Math.floor(Math.random() * (canvas.height - gap - 120)) + 60;
            flappyState.pipes.push({ x: canvas.width, top: top, gap: gap, passed: false });
        }

        function update() {
            if (!flappyState || !flappyState.alive || flappyState.paused) return;
            flappyState.frame += 1;
            if (flappyState.frame % 90 === 0) spawnPipe();

            flappyState.birdV += flappyState.gravity;
            flappyState.birdY += flappyState.birdV;

            if (flappyState.birdY < 0 || flappyState.birdY > canvas.height) flappyState.alive = false;

            flappyState.pipes.forEach(function (p) {
                p.x -= 2.6;
                if (!p.passed && p.x + 48 < flappyState.birdX) {
                    p.passed = true;
                    flappyState.score += 1;
                    updateBestScore('flappybird', flappyState.score);
                }
                const bx = flappyState.birdX;
                const by = flappyState.birdY;
                if (bx + 16 > p.x && bx - 16 < p.x + 48) {
                    if (by - 16 < p.top || by + 16 > p.top + p.gap) flappyState.alive = false;
                }
            });
            flappyState.pipes = flappyState.pipes.filter(function (p) { return p.x > -60; });
        }

        function draw() {
            ctx.fillStyle = '#0b1626';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            flappyState.pipes.forEach(function (p) {
                ctx.fillStyle = '#2fbf71';
                ctx.fillRect(p.x, 0, 48, p.top);
                ctx.fillRect(p.x, p.top + p.gap, 48, canvas.height - (p.top + p.gap));
            });

            ctx.beginPath();
            ctx.arc(flappyState.birdX, flappyState.birdY, 16, 0, Math.PI * 2);
            ctx.fillStyle = '#ffd166';
            ctx.fill();
            ctx.closePath();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 22px monospace';
            ctx.fillText('' + flappyState.score, 14, 30);

            if (!flappyState.alive) {
                ctx.fillStyle = 'rgba(0,0,0,0.55)';
                ctx.fillRect(70, 190, 220, 80);
                ctx.fillStyle = '#f87171';
                ctx.font = 'bold 24px monospace';
                ctx.fillText('Game Over', 110, 235);
            } else if (flappyState.paused) {
                ctx.fillStyle = 'rgba(0,0,0,0.55)';
                ctx.fillRect(70, 190, 220, 80);
                ctx.fillStyle = '#58a6ff';
                ctx.font = 'bold 24px monospace';
                ctx.fillText('Paused', 130, 235);
            }

            document.getElementById('flappyScore').textContent = 'Score: ' + flappyState.score + ' | Best: ' + getBestScore('flappybird') + (flappyState.paused ? ' | Paused' : '');
        }

        function loop() {
            if (!flappyState) return;
            update();
            draw();
            flappyAnim = requestAnimationFrame(loop);
        }

        if (flappyAnim) cancelAnimationFrame(flappyAnim);
        loop();
    }

    function closeFlappyBird() {
        if (flappyAnim) cancelAnimationFrame(flappyAnim);
        flappyAnim = null;
        const canvas = document.getElementById('flappyCanvas');
        if (flappyKeyHandler) {
            document.removeEventListener('keydown', flappyKeyHandler);
            flappyKeyHandler = null;
        }
        if (canvas && flappyClickHandler) {
            canvas.removeEventListener('click', flappyClickHandler);
            flappyClickHandler = null;
        }
        document.getElementById('overlay').classList.remove('show');
        document.getElementById('flappyModal').classList.remove('show');
        activeGame = '';
        exitFullscreenIfAny();
    }

    function closeAllGames() {
        closeSnake();
        closeGuess();
        closeCoin();
        closeDice();
        closeRps();
        closeTetris();
        close2048();
        closeFlappyBird();
    }

    function switchGame(game) {
        closeAllGames();
        if (game === 'snake') startSnake();
        else if (game === 'guess') startGuess();
        else if (game === 'coin') startCoin();
        else if (game === 'dice') startDice();
        else if (game === 'rps') startRps();
        else if (game === 'tetris') startTetris();
        else if (game === '2048') start2048();
        else if (game === 'flappybird') startFlappyBird();
    }

    function init() {
        document.getElementById('guessNum').addEventListener('keypress', function (e) { if (e.key === 'Enter') submitGuess(); });
        document.getElementById('diceGuess').addEventListener('keypress', function (e) { if (e.key === 'Enter') rollDice(); });

        if (basicGameKeyHandler) document.removeEventListener('keydown', basicGameKeyHandler);
        basicGameKeyHandler = function (e) {
            if (!activeGame) return;
            const key = e.key.toLowerCase();
            if (key === 'f' && (activeGame === 'guess' || activeGame === 'coin' || activeGame === 'dice' || activeGame === 'rps')) {
                toggleFullscreenForActiveGame();
            } else if (key === 'r' && activeGame === 'guess') {
                startGuess();
            } else if (key === 'r' && activeGame === 'coin') {
                startCoin();
            } else if (key === 'r' && activeGame === 'dice') {
                startDice();
            } else if (key === 'r' && activeGame === 'rps') {
                startRps();
            }
        };
        document.addEventListener('keydown', basicGameKeyHandler);

        document.addEventListener('fullscreenchange', function () {
            if (document.fullscreenElement) scaleActiveGameLayout();
            else resetGameScale();
        });
        window.addEventListener('resize', scaleActiveGameLayout);
    }

    window.GameEngine = {
        init,
        renderGames,
        startSnake,
        closeSnake,
        startGuess,
        submitGuess,
        closeGuess,
        startCoin,
        flipCoin,
        closeCoin,
        startDice,
        rollDice,
        closeDice,
        startRps,
        playRps,
        closeRps,
        startTetris,
        closeTetris,
        start2048,
        close2048,
        move2048,
        startFlappyBird,
        closeFlappyBird,
        enterFullscreenForGame,
        exitFullscreenIfAny,
        closeAllGames,
        switchGame
    };
})();
