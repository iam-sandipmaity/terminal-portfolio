(function () {
    let inHackMode = false;
    let hackFrameId = null;
    let hackColumns = [];
    let hackBgActive = false;
    let hackBgFrameId = null;
    let hackBgColumns = [];

    function setupHackCanvas() {
        const canvas = document.getElementById('hackCanvas');
        const scale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(window.innerWidth * scale);
        canvas.height = Math.floor(window.innerHeight * scale);
        const ctx = canvas.getContext('2d');
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        const cols = Math.floor(window.innerWidth / 18);
        hackColumns = Array(cols).fill(0).map(function () { return Math.floor(Math.random() * window.innerHeight / 18); });
    }

    function setupHackBgCanvas() {
        const canvas = document.getElementById('hackBgCanvas');
        const scale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(window.innerWidth * scale);
        canvas.height = Math.floor(window.innerHeight * scale);
        const ctx = canvas.getContext('2d');
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        const cols = Math.floor(window.innerWidth / 18);
        hackBgColumns = Array(cols).fill(0).map(function () { return Math.floor(Math.random() * window.innerHeight / 18); });
    }

    function drawHackFrame() {
        const canvas = document.getElementById('hackCanvas');
        const ctx = canvas.getContext('2d');
        const width = window.innerWidth;
        const height = window.innerHeight;
        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*';
        ctx.fillStyle = 'rgba(2, 7, 2, 0.18)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#6dff6d';
        ctx.font = '16px monospace';

        for (let i = 0; i < hackColumns.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * 18;
            const y = hackColumns[i] * 18;
            ctx.fillText(text, x, y);
            if (y > height && Math.random() > 0.975) hackColumns[i] = 0;
            else hackColumns[i] += 1;
        }
        if (inHackMode) hackFrameId = requestAnimationFrame(drawHackFrame);
    }

    function drawHackBgFrame() {
        const canvas = document.getElementById('hackBgCanvas');
        const ctx = canvas.getContext('2d');
        const width = window.innerWidth;
        const height = window.innerHeight;
        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*';
        ctx.fillStyle = 'rgba(2, 7, 2, 0.10)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#6dff6d';
        ctx.font = '16px monospace';

        for (let i = 0; i < hackBgColumns.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * 18;
            const y = hackBgColumns[i] * 18;
            ctx.fillText(text, x, y);
            if (y > height && Math.random() > 0.975) hackBgColumns[i] = 0;
            else hackBgColumns[i] += 1;
        }
        if (hackBgActive) hackBgFrameId = requestAnimationFrame(drawHackBgFrame);
    }

    function startHackMode() {
        inHackMode = true;
        document.getElementById('hackMode').classList.add('show');
        setupHackCanvas();
        if (hackFrameId) cancelAnimationFrame(hackFrameId);
        hackFrameId = requestAnimationFrame(drawHackFrame);
    }

    function stopHackMode() {
        inHackMode = false;
        document.getElementById('hackMode').classList.remove('show');
        if (hackFrameId) cancelAnimationFrame(hackFrameId);
        hackFrameId = null;
    }

    function startHackBackground() {
        if (hackBgActive) return;
        hackBgActive = true;
        document.getElementById('hackBgCanvas').classList.add('show');
        document.body.classList.add('hack-bg-active');
        setupHackBgCanvas();
        if (hackBgFrameId) cancelAnimationFrame(hackBgFrameId);
        hackBgFrameId = requestAnimationFrame(drawHackBgFrame);
    }

    function stopHackBackground() {
        hackBgActive = false;
        document.getElementById('hackBgCanvas').classList.remove('show');
        document.body.classList.remove('hack-bg-active');
        if (hackBgFrameId) cancelAnimationFrame(hackBgFrameId);
        hackBgFrameId = null;
    }

    function toggleHackBackground() {
        if (hackBgActive) {
            stopHackBackground();
            return false;
        }
        startHackBackground();
        return true;
    }

    function init() {
        window.addEventListener('resize', function () {
            if (inHackMode) setupHackCanvas();
            if (hackBgActive) setupHackBgCanvas();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && inHackMode) stopHackMode();
        });
    }

    window.HackEngine = {
        init,
        startHackMode,
        stopHackMode,
        startHackBackground,
        stopHackBackground,
        toggleHackBackground,
        isHackMode: function () { return inHackMode; },
        isHackBackgroundActive: function () { return hackBgActive; }
    };
})();
