(function () {
    const projects = [
        {
            name: 'Multi-Utility Web Platform',
            desc: 'Built and deployed a web platform offering 100+ tools (image processing, PDF utilities, calculators, converters, encryption, SEO tools, etc.) under Vibe Coding. Developed using React (TSX), TypeScript, and Vercel, ensuring responsive UI and smooth performance.',
            tags: ['React', 'TypeScript', 'Vercel', 'Full-Stack'],
            github: 'https://github.com/iam-sandipmaity/SnapTools',
            live: 'https://snaptools.sandipmaity.me'
        },
        {
            name: 'Video Downloader - Android App',
            desc: 'Developed a comprehensive Android video downloading application with full APK deployment. Built using native Android development tools for seamless video processing, multiple format support, and user-friendly download management. Includes efficient background processing and smooth user experience.',
            tags: ['Android', 'Mobile App', 'Video Processing', 'APK'],
            github: 'https://github.com/iam-sandipmaity/video-downloader',
            live: 'https://video.sandipmaity.me'
        },
        {
            name: 'SeriesRating - TV Series Rating Visualizer',
            desc: 'Built an interactive web app to explore IMDb TV series ratings in a clean, visual format. Fetches real-time data from the OMDb API and displays episode-wise ratings using heatmap-style visualizations for quick pattern recognition. Includes fast search, detailed breakdowns, and a responsive UI optimized for performance.',
            tags: ['HTML', 'CSS', 'JavaScript', 'OMDb API', 'Data Visualization'],
            github: 'https://github.com/iam-sandipmaity/seriesrating',
            live: 'https://seriesrating.sandipmaity.me/'
        },
        {
            name: 'AuctionMaker - Online Auction Platform',
            desc: 'Developed a full-stack online auction platform that allows users to create auctions, place real-time bids, and track auction activity. Focused on clean UX, secure bid handling, and smooth state updates. Built with modern web technologies and deployed for public use.',
            tags: ['React', 'TypeScript', 'Full-Stack', 'Web App'],
            github: 'https://github.com/iam-sandipmaity/AuctionMaker',
            live: 'https://auction.sandipmaity.me'
        },
        {
            name: 'WeatherWise - Advanced Weather Forecast App',
            desc: 'Designed and deployed a full-featured weather application delivering real-time and 15-day forecasts using Open-Meteo APIs. Includes dynamic charts, AQI insights, comfort index, UV tracking, hourly and daily breakdowns, and an interactive 3D globe for location visualization. Built with HTML5, Tailwind CSS, and JavaScript for responsive performance.',
            tags: ['HTML', 'Tailwind CSS', 'JavaScript', 'API Integration'],
            github: 'https://github.com/iam-sandipmaity/WeatherWise',
            live: 'https://weather.sandipmaity.me'
        },
        {
            name: 'Crypto Info Dashboard',
            desc: 'Created and deployed a cryptocurrency dashboard that displays real-time market data, price tracking, charts, and coin details using CoinGecko APIs. Focused on performance and interactive UI for a seamless financial data viewing experience.',
            tags: ['React', 'API Integration', 'Real-Time Data', 'Vercel'],
            github: 'https://github.com/iam-sandipmaity/CryptoTracker',
            live: 'https://crypto.sandipmaity.me'
        },
        {
            name: 'DevLog - Automated GitHub Activity Tracker',
            desc: 'Developed and deployed an automated development log platform that aggregates commits, PR merges, releases, issues, and updates from repositories into a unified timeline. Powered by Supabase and GitHub Webhooks with a secure admin panel and responsive UI.',
            tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'GitHub Webhooks'],
            github: 'https://github.com/iam-sandipmaity/log',
            live: 'https://log.sandipmaity.me'
        },
        {
            name: 'Arduino Obstacle Avoiding Car',
            desc: 'Built an autonomous car using Arduino Uno, ultrasonic sensors, and motor drivers to detect and avoid obstacles. Gained hands-on experience in C programming by implementing real-time control logic for sensor integration and navigation.',
            tags: ['Arduino', 'C Programming', 'Embedded Systems', 'Sensors'],
            github: null,
            live: 'https://x.com/iam_sandipmaity/status/1776746344415465719?s=20'
        },
        {
            name: 'MF Tracker - Mutual Fund Portfolio Analyzer',
            desc: 'Developed a smart portfolio analysis tool that categorizes mutual funds, tracks allocation across different fund types, and highlights potential red flags in asset distribution. Built with React (TSX) and TypeScript for fast insights and clean visualizations.',
            tags: ['React', 'TypeScript', 'Finance Tools', 'Frontend'],
            github: 'https://github.com/iam-sandipmaity/mftracker',
            live: 'https://mftracker.sandipmaity.me'
        },
        {
            name: 'Online Code Runner',
            desc: 'Developed and deployed an online code execution platform supporting multiple programming languages with instant output preview. Designed with a secure sandboxed environment for running code in browser with a modern developer-friendly UI.',
            tags: ['React', 'JavaScript', 'Web Compiler', 'Deployment'],
            github: 'https://github.com/iam-sandipmaity/Runr',
            live: 'https://runr.sandipmaity.me/'
        },
        {
            name: 'PN Sequence Generator Device',
            desc: 'Collaborated with faculty to design and assemble 4 hardware circuit boards for generating pseudo-noise (PN) sequences. Gained hands-on experience in circuit design, PCB assembly, and functional testing under lab supervision.',
            tags: ['Circuit Design', 'PCB Assembly', 'Hardware', 'PN Sequence'],
            github: null,
            live: null
        }
    ];

    const quickProjects = [
        { name: 'SnapTools', desc: 'Multi-utility web platform (100+ tools)', tech: 'React, TypeScript, Next.js, API Integrations', github: null, live: 'https://snaptools.sandipmaity.me' },
        { name: 'Video Downloader', desc: 'Android app for downloading videos with APK distribution', tech: 'Android, Kotlin/Java, Networking', github: null, live: 'https://video.sandipmaity.me' },
        { name: 'SeriesRating', desc: 'IMDb TV series rating visualizer', tech: 'React, Charts, REST APIs', github: null, live: 'https://seriesrating.sandipmaity.me' },
        { name: 'AuctionMaker', desc: 'Full-stack online auction platform', tech: 'React, Node.js, Database, Auth', github: null, live: 'https://auction.sandipmaity.me' },
        { name: 'WeatherWise', desc: 'Advanced weather forecast app', tech: 'React, Weather APIs, Geolocation', github: null, live: 'https://weather.sandipmaity.me' },
        { name: 'Crypto Info Dashboard', desc: 'Real-time crypto tracker and dashboard', tech: 'React, Realtime APIs, Data Viz', github: null, live: 'https://crypto.sandipmaity.me' },
        { name: 'DevLog', desc: 'Automated GitHub activity tracker', tech: 'GitHub API, Automation, Frontend Dashboard', github: null, live: 'https://log.sandipmaity.me' },
        { name: 'Arduino Obstacle Avoiding Car', desc: 'Autonomous car with sensors and control logic', tech: 'Arduino, Ultrasonic Sensors, Embedded C', github: null, live: 'https://x.com/iam_sandipmaity/status/1776746344415465719' },
        { name: 'MF Tracker', desc: 'Mutual fund portfolio analyzer', tech: 'React, Finance APIs, Analytics', github: null, live: 'https://mftracker.sandipmaity.me' },
        { name: 'Online Code Runner', desc: 'Code execution platform', tech: 'Web Sandbox, Compiler APIs, Node.js', github: null, live: 'https://runr.sandipmaity.me' }
    ];

    const state = {
        inGameMode: false,
        inMiscMode: false,
        miscSection: 'menu',
        gameName: ''
    };

    function renderProjects() {
        let html = '';
        quickProjects.forEach(function (p, i) {
            html += (i + 1) + '. ' + p.name + ' - ' + p.desc + '\n';
        });
        html += '\nTotal Projects: ' + quickProjects.length + '\nUse: pj [number] for detailed view';
        return html;
    }

    function renderProjectDetails(projectNo) {
        const idx = projectNo - 1;
        if (!Number.isInteger(projectNo) || idx < 0 || idx >= projects.length) return null;
        const p = projects[idx];
        let details = 'Project #' + projectNo + '\n';
        details += 'Name: ' + p.name + '\n';
        details += 'Details: ' + p.desc + '\n';
        if (p.tags && p.tags.length) details += 'Tech Stack: ' + p.tags.join(', ') + '\n';
        if (p.github) details += 'GitHub: <a href="' + p.github + '" target="_blank">' + p.github + '</a>\n';
        if (p.live) details += 'Live: <a href="' + p.live + '" target="_blank">' + p.live + '</a>\n';
        if (!p.github) details += 'GitHub: Not available\n';
        if (!p.live) details += 'Live: Not available\n';
        return details;
    }

    function renderMiscMenu() {
        return `Misc Menu:
[ai] - Open AI tools
[qr <text>] - Generate QR in terminal
[calc <expression>] - Basic calculator
[passgen <length>] - Generate password
[pstrength <password>] - Crack-time estimate
[uuid] - Generate UUID
[b64e <text>] - Base64 encode
[b64d <base64>] - Base64 decode

Search:
[google <query>]
[brave <query>]
[wiki <query>]
[youtube <query>]

Extras:
[hack] or [h] - Hacking mode
[h --bg] - Toggle hacking background

Type exit to return`;
    }

    function renderAiMenu() {
        return `AI Tools:
[chatgpt <query>] - Open ChatGPT
[claude <query>] - Open Claude
[gemini <query>] - Open Gemini
[perplexity <query>] - Open Perplexity
[sarvam <query>] - Open Indus Sarvam

Type exit to go back to misc menu`;
    }

    function updateModeFromGameName(name) {
        state.inGameMode = true;
        state.inMiscMode = false;
        state.gameName = name;
    }

    function stopGameMode() {
        state.inGameMode = false;
        state.gameName = '';
    }

    function startGameByName(name, fullscreen) {
        updateModeFromGameName(name);
        if (name === 'snake') GameEngine.startSnake();
        else if (name === 'guess') GameEngine.startGuess();
        else if (name === 'coin') GameEngine.startCoin();
        else if (name === 'dice') GameEngine.startDice();
        else if (name === 'rps') GameEngine.startRps();
        else if (name === 'tetris') GameEngine.startTetris();
        else if (name === '2048') GameEngine.start2048();
        else if (name === 'flappybird') GameEngine.startFlappyBird();
        if (fullscreen) GameEngine.enterFullscreenForGame(name);
    }

    window.startSnake = function () { startGameByName('snake'); };
    window.closeSnake = function () { GameEngine.closeSnake(); stopGameMode(); };
    window.startGuess = function () { startGameByName('guess'); };
    window.submitGuess = function () { GameEngine.submitGuess(); };
    window.closeGuess = function () { GameEngine.closeGuess(); stopGameMode(); };
    window.startCoin = function () { startGameByName('coin'); };
    window.flipCoin = function () { GameEngine.flipCoin(); };
    window.closeCoin = function () { GameEngine.closeCoin(); stopGameMode(); };
    window.startDice = function () { startGameByName('dice'); };
    window.rollDice = function () { GameEngine.rollDice(); };
    window.closeDice = function () { GameEngine.closeDice(); stopGameMode(); };
    window.startRps = function () { startGameByName('rps'); };
    window.playRps = function (m) { GameEngine.playRps(m); };
    window.closeRps = function () { GameEngine.closeRps(); stopGameMode(); };
    window.startTetris = function () { startGameByName('tetris'); };
    window.closeTetris = function () { GameEngine.closeTetris(); stopGameMode(); };
    window.start2048 = function () { startGameByName('2048'); };
    window.close2048 = function () { GameEngine.close2048(); stopGameMode(); };
    window.move2048 = function (dir) { GameEngine.move2048(dir); };
    window.startFlappyBird = function () { startGameByName('flappybird'); };
    window.closeFlappyBird = function () { GameEngine.closeFlappyBird(); stopGameMode(); };
    window.switchGame = function (name) {
        GameEngine.closeAllGames();
        startGameByName(name);
    };

    ThemeEngine.init();
    GameEngine.init();
    HackEngine.init();

    const commands = {
        'help': `Available Commands:
[who] or [w] - About me
[skills] or [s] - My skills
[projects] or [pj] - My projects
[miscellaneous] or [misc] - Random stuff
[games] or [g] - Play games
[blog] or [b] - My blog
[clear] - Clear screen
[theme] or [t] - List themes / switch theme

Contact:
[email]
[linkedin]
[twitter]
[github]
[profile]`,
        'who': `Hi, I'm Sandip Maity.\n\nECE student building practical web and embedded projects.\nFocused on clean engineering, useful tools, and continuous learning.\n\nCurrently: React/TypeScript apps, Arduino/STM32 experiments, and project-driven growth.`,
        'w': `Hi, I'm Sandip Maity.\n\nECE student building practical web and embedded projects.\nFocused on clean engineering, useful tools, and continuous learning.\n\nCurrently: React/TypeScript apps, Arduino/STM32 experiments, and project-driven growth.`,
        'skills': `Languages: C, C++, Python, JavaScript, HTML, CSS\nFrontend: React, TypeScript, Next.js\nEmbedded: Arduino, STM32, C Programming\nIoT: Sensors, Circuit Design, PCB Assembly\nTools: Git, Vercel, Supabase`,
        's': `Languages: C, C++, Python, JavaScript, HTML, CSS\nFrontend: React, TypeScript, Next.js\nEmbedded: Arduino, STM32, C Programming\nIoT: Sensors, Circuit Design, PCB Assembly\nTools: Git, Vercel, Supabase`,
        'projects': renderProjects(),
        'pj': renderProjects(),
        'miscellaneous': renderMiscMenu(),
        'misc': renderMiscMenu(),
        'games': GameEngine.renderGames(),
        'g': GameEngine.renderGames(),
        'theme': ThemeEngine.renderThemeList(),
        't': ThemeEngine.renderThemeList(),
        'blog': 'Opening blog...',
        'b': 'Opening blog...',
        'email': `Email: maitysandip@proton.me\n<a href="mailto:maitysandip@proton.me" target="_blank">Click to send email</a>`,
        'linkedin': `LinkedIn: linkedin.com/in/iam-sandipmaity\n<a href="https://linkedin.com/in/iam-sandipmaity" target="_blank">Open LinkedIn profile</a>`,
        'twitter': `Twitter: x.com/iam_sandipmaity\n<a href="https://x.com/iam_sandipmaity" target="_blank">Open Twitter profile</a>`,
        'github': `GitHub: github.com/iam-sandipmaity\n<a href="https://github.com/iam-sandipmaity" target="_blank">Open GitHub profile</a>`,
        'profile': `Profile: profile.sandipmaity.me\n<a href="https://profile.sandipmaity.me" target="_blank">Open profile website</a>`
    };

    const history = document.getElementById('history');
    const commandHistory = [];
    let historyIndex = -1;
    let draftCommand = '';

    function colorCommandTokens(text) {
        return text.replace(/\[([^\]]+)\]/g, '<span class="cmd-token" data-cmd="$1" style="color:#3dd6d0;cursor:pointer">[$1]</span>');
    }

    function triggerCommandFromClick(cmd) {
        const inputs = history.querySelectorAll('input.cmd');
        const input = inputs[inputs.length - 1];
        if (!input) return;
        input.value = cmd;
        input.focus();
        input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', bubbles: true }));
    }

    history.addEventListener('click', function (e) {
        const target = e.target.closest('.cmd-token');
        if (!target) return;
        const cmd = target.getAttribute('data-cmd');
        if (!cmd) return;
        triggerCommandFromClick(cmd);
    });

    function createInput(prompt) {
        const p = prompt || 'sandip@profile:~$ ';
        const wrapper = document.createElement('div');
        wrapper.style.marginTop = '10px';
        wrapper.style.marginBottom = '10px';
        wrapper.innerHTML = '<span class="prompt-text">' + p + '</span><input type="text" class="cmd" style="background:transparent;border:none;font-family:monospace;font-size:18px;outline:none;width:300px;opacity:1" autofocus>';
        const input = wrapper.querySelector('input');

        input.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowUp') {
                if (!commandHistory.length) return;
                e.preventDefault();
                if (historyIndex === -1) {
                    draftCommand = input.value;
                    historyIndex = commandHistory.length - 1;
                } else if (historyIndex > 0) {
                    historyIndex -= 1;
                }
                input.value = commandHistory[historyIndex] || '';
                input.setSelectionRange(input.value.length, input.value.length);
            } else if (e.key === 'ArrowDown') {
                if (!commandHistory.length || historyIndex === -1) return;
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex += 1;
                    input.value = commandHistory[historyIndex] || '';
                } else {
                    historyIndex = -1;
                    input.value = draftCommand;
                }
                input.setSelectionRange(input.value.length, input.value.length);
            }
        });

        input.addEventListener('keypress', function (e) {
            if (e.key !== 'Enter') return;

            const rawValue = this.value;
            const trimmedValue = rawValue.trim();
            if (trimmedValue) {
                if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== trimmedValue) {
                    commandHistory.push(trimmedValue);
                }
            }
            historyIndex = -1;
            draftCommand = '';

            const parts = trimmedValue.split(' ');
            const cmd = (parts[0] || '').toLowerCase();
            const args = parts.slice(1).join(' ');
            const argTokens = args ? args.split(/\s+/).filter(Boolean) : [];
            const wantsFullscreen = argTokens.includes('--fs');
            const filteredArgs = argTokens.filter(function (t) { return t !== '--fs'; });
            const gameCommands = ['snake', 'guess', 'coin', 'dice', 'rps', 'tetris', '2048', 'flappybird'];
            const miscCommands = ['ai', 'qr', 'calc', 'passgen', 'pstrength', 'uuid', 'b64e', 'b64d', 'google', 'brave', 'wiki', 'youtube', 'hack', 'h', 'chatgpt', 'claude', 'gemini', 'perplexity', 'sarvam'];
            const aiCommands = ['chatgpt', 'claude', 'gemini', 'perplexity', 'sarvam'];

            const commandColorMap = {
                who: '#7ee787',
                w: '#7ee787',
                skills: '#f2cc60',
                s: '#f2cc60',
                projects: '#58a6ff',
                pj: '#58a6ff'
            };
            if (commandColorMap[cmd]) {
                this.style.color = commandColorMap[cmd];
                this.style.webkitTextFillColor = commandColorMap[cmd];
            }

            if (cmd === 'clear') {
                history.innerHTML = '';
                GameEngine.closeAllGames();
                HackEngine.stopHackMode();
                HackEngine.stopHackBackground();
                stopGameMode();
                state.inMiscMode = false;
                state.miscSection = 'menu';
            } else if (HackEngine.isHackMode() && cmd === 'exit') {
                HackEngine.stopHackMode();
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = 'Exited hacking mode<br>';
                history.appendChild(output);
            } else if (HackEngine.isHackMode()) {
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = 'Hacking mode active. Type exit or press ESC<br>';
                history.appendChild(output);
            } else if (cmd === 'games' || cmd === 'g') {
                state.inMiscMode = false;
                state.inGameMode = true;
                state.gameName = 'menu';
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = colorCommandTokens(GameEngine.renderGames()).replace(/\n/g, '<br>') + '<br>';
                history.appendChild(output);
            } else if (cmd === 'misc' || cmd === 'miscellaneous') {
                GameEngine.closeAllGames();
                stopGameMode();
                state.inMiscMode = true;
                state.miscSection = 'menu';
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = colorCommandTokens(renderMiscMenu()).replace(/\n/g, '<br>') + '<br>';
                history.appendChild(output);
            } else if (state.inMiscMode && cmd === 'ai') {
                state.miscSection = 'ai';
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = colorCommandTokens(renderAiMenu()).replace(/\n/g, '<br>') + '<br>';
                history.appendChild(output);
            } else if (state.inGameMode && state.gameName === 'menu' && gameCommands.includes(cmd)) {
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = 'Playing ' + (cmd === 'rps' ? 'Rock Paper Scissors' : cmd.charAt(0).toUpperCase() + cmd.slice(1)) + (wantsFullscreen ? ' in fullscreen' : '') + '...<br>';
                history.appendChild(output);
                startGameByName(cmd, wantsFullscreen);
                if (cmd === 'rps' && filteredArgs.length) GameEngine.playRps(filteredArgs[0].toLowerCase());
            } else if (!state.inGameMode && gameCommands.includes(cmd)) {
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = 'Type games to enter game mode first (then use ' + cmd + (wantsFullscreen ? ' --fs' : '') + ')<br>';
                history.appendChild(output);
            } else if (!state.inMiscMode && miscCommands.includes(cmd)) {
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = 'Type misc to enter misc mode first<br>';
                history.appendChild(output);
            } else if (state.inMiscMode && state.miscSection !== 'ai' && aiCommands.includes(cmd)) {
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = 'Type ai to enter AI tools under misc first<br>';
                history.appendChild(output);
            } else if ((cmd === 'hack' || cmd === 'h') && args.trim() === '--bg') {
                const enabled = HackEngine.toggleHackBackground();
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = enabled ? 'Hacking background enabled<br>' : 'Hacking background disabled<br>';
                history.appendChild(output);
            } else if (cmd === 'hack' || cmd === 'h') {
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = 'Entering hacking mode...<br>';
                history.appendChild(output);
                GameEngine.closeAllGames();
                stopGameMode();
                HackEngine.startHackMode();
            } else if (cmd === 'chatgpt' || cmd === 'claude' || cmd === 'gemini' || cmd === 'perplexity' || cmd === 'sarvam') {
                const providers = {
                    chatgpt: { name: 'ChatGPT', base: 'https://chatgpt.com/' },
                    claude: { name: 'Claude', base: 'https://claude.ai/new' },
                    gemini: { name: 'Gemini', base: 'https://gemini.google.com/app' },
                    perplexity: { name: 'Perplexity', base: 'https://www.perplexity.ai/search' },
                    sarvam: { name: 'Sarvam', base: 'https://indus.sarvam.ai/' }
                };
                const provider = providers[cmd];
                const output = document.createElement('div');
                output.className = 'output';
                const url = args ? (provider.base + '?q=' + encodeURIComponent(args)) : provider.base;
                window.open(url, '_blank');
                output.innerHTML = 'Opening ' + provider.name + (args ? ' with query: ' + args : '') + '<br><a href="' + url + '" target="_blank">Open link</a><br>';
                history.appendChild(output);
            } else if (cmd === 'theme' || cmd === 't') {
                const output = document.createElement('div');
                output.className = 'output';
                if (!args) {
                    output.innerHTML = ThemeEngine.renderThemeListHtml();
                } else {
                    const themeNo = parseInt(args, 10);
                    if (isNaN(themeNo) || themeNo < 1 || themeNo > ThemeEngine.getThemeCount()) {
                        output.innerHTML = 'Invalid theme number. Use: theme 1-' + ThemeEngine.getThemeCount() + '<br>';
                    } else {
                        ThemeEngine.applyTheme(themeNo - 1);
                        commands.theme = ThemeEngine.renderThemeList();
                        commands.t = commands.theme;
                        output.innerHTML = 'Theme changed to: ' + ThemeEngine.getThemeName(themeNo - 1) + '<br>';
                    }
                }
                history.appendChild(output);
            } else if (cmd === 'projects' || cmd === 'pj') {
                const output = document.createElement('div');
                output.className = 'output';
                if (!args) {
                    output.innerHTML = renderProjects().replace(/\n/g, '<br>') + '<br>';
                } else {
                    const projectNo = parseInt(args.trim(), 10);
                    const details = renderProjectDetails(projectNo);
                    if (!details) {
                        output.innerHTML = 'Invalid project number. Use: pj 1-' + projects.length + '<br>';
                    } else {
                        output.innerHTML = details.replace(/\n/g, '<br>') + '<br>';
                    }
                }
                history.appendChild(output);
            } else if (cmd === 'qr') {
                const output = document.createElement('div');
                output.className = 'output';
                if (!args) {
                    output.innerHTML = 'Usage: qr &lt;text&gt;<br>';
                } else {
                    const qrUrl = window.MiscTools.qrImageUrl(args);
                    output.innerHTML = 'QR for: ' + args + '<br><img src="' + qrUrl + '" alt="QR" width="180" height="180" style="margin-top:8px;border:1px solid var(--accent);background:#fff;padding:6px;">';
                }
                history.appendChild(output);
            } else if (cmd === 'calc') {
                const output = document.createElement('div');
                output.className = 'output';
                const result = window.MiscTools.safeCalc(args);
                output.innerHTML = result === null ? 'Usage: calc &lt;expression&gt; (numbers and + - * / % only)<br>' : 'Result: ' + result + '<br>';
                history.appendChild(output);
            } else if (cmd === 'passgen') {
                const output = document.createElement('div');
                output.className = 'output';
                const length = parseInt(args, 10);
                const password = window.MiscTools.generatePassword(isNaN(length) ? 16 : length);
                output.innerHTML = 'Generated password: ' + password + '<br>';
                history.appendChild(output);
            } else if (cmd === 'pstrength') {
                const output = document.createElement('div');
                output.className = 'output';
                const info = window.MiscTools.passwordStrength(args);
                output.innerHTML = !info ? 'Usage: pstrength &lt;password&gt;<br>' : 'Entropy: ' + info.entropyBits.toFixed(1) + ' bits<br>Estimated crack time: ' + info.estimate + '<br>';
                history.appendChild(output);
            } else if (cmd === 'uuid') {
                const output = document.createElement('div');
                output.className = 'output';
                const id = (window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : 'UUID not supported in this browser';
                output.innerHTML = 'UUID: ' + id + '<br>';
                history.appendChild(output);
            } else if (cmd === 'b64e') {
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = !args ? 'Usage: b64e &lt;text&gt;<br>' : 'Base64: ' + btoa(args) + '<br>';
                history.appendChild(output);
            } else if (cmd === 'b64d') {
                const output = document.createElement('div');
                output.className = 'output';
                if (!args) output.innerHTML = 'Usage: b64d &lt;base64&gt;<br>';
                else {
                    try { output.innerHTML = 'Decoded: ' + atob(args) + '<br>'; }
                    catch (err) { output.innerHTML = 'Invalid base64 input<br>'; }
                }
                history.appendChild(output);
            } else if (cmd === 'exit' && state.inGameMode) {
                GameEngine.closeAllGames();
                stopGameMode();
            } else if (cmd === 'exit' && state.inMiscMode) {
                if (state.miscSection === 'ai') {
                    state.miscSection = 'menu';
                    const output = document.createElement('div');
                    output.className = 'output';
                    output.innerHTML = 'Back to misc menu<br>';
                    history.appendChild(output);
                } else {
                    state.inMiscMode = false;
                    state.miscSection = 'menu';
                    HackEngine.stopHackBackground();
                }
            } else if (state.inGameMode) {
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = 'Type exit to return to main terminal<br>';
                history.appendChild(output);
            } else if (state.inMiscMode) {
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = 'Type exit to return to main terminal<br>';
                history.appendChild(output);
            } else if (cmd === 'blog' || cmd === 'b') {
                window.open('https://sandipmaity.me/blog', '_blank');
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = 'Opening blog...<br>';
                history.appendChild(output);
            } else if (cmd === 'google') {
                if (!args) {
                    const output = document.createElement('div');
                    output.className = 'output';
                    output.innerHTML = 'Usage: google &lt;search query&gt;<br>';
                    history.appendChild(output);
                } else {
                    window.open('https://google.com/search?q=' + encodeURIComponent(args), '_blank');
                    const output = document.createElement('div');
                    output.className = 'output';
                    output.innerHTML = 'Searching Google for: ' + args + '<br>';
                    history.appendChild(output);
                }
            } else if (cmd === 'brave') {
                if (!args) {
                    const output = document.createElement('div');
                    output.className = 'output';
                    output.innerHTML = 'Usage: brave &lt;search query&gt;<br>';
                    history.appendChild(output);
                } else {
                    window.open('https://search.brave.com/search?q=' + encodeURIComponent(args), '_blank');
                    const output = document.createElement('div');
                    output.className = 'output';
                    output.innerHTML = 'Searching Brave for: ' + args + '<br>';
                    history.appendChild(output);
                }
            } else if (cmd === 'wiki') {
                if (!args) {
                    const output = document.createElement('div');
                    output.className = 'output';
                    output.innerHTML = 'Usage: wiki &lt;search query&gt;<br>';
                    history.appendChild(output);
                } else {
                    window.open('https://en.wikipedia.org/wiki/' + encodeURIComponent(args), '_blank');
                    const output = document.createElement('div');
                    output.className = 'output';
                    output.innerHTML = 'Searching Wikipedia for: ' + args + '<br>';
                    history.appendChild(output);
                }
            } else if (cmd === 'youtube') {
                if (!args) {
                    const output = document.createElement('div');
                    output.className = 'output';
                    output.innerHTML = 'Usage: youtube &lt;search query&gt;<br>';
                    history.appendChild(output);
                } else {
                    window.open('https://youtube.com/search?q=' + encodeURIComponent(args), '_blank');
                    const output = document.createElement('div');
                    output.className = 'output';
                    output.innerHTML = 'Searching YouTube for: ' + args + '<br>';
                    history.appendChild(output);
                }
            } else if (commands[cmd]) {
                if (cmd === 'email') window.open('mailto:maitysandip@proton.me', '_blank');
                else if (cmd === 'linkedin') window.open('https://linkedin.com/in/iam-sandipmaity', '_blank');
                else if (cmd === 'twitter') window.open('https://x.com/iam_sandipmaity', '_blank');
                else if (cmd === 'github') window.open('https://github.com/iam-sandipmaity', '_blank');
                else if (cmd === 'profile') window.open('https://profile.sandipmaity.me', '_blank');

                const output = document.createElement('div');
                output.className = 'output';
                const text = colorCommandTokens(commands[cmd]);
                output.innerHTML = text.replace(/\n/g, '<br>');
                history.appendChild(output);
            } else if (cmd !== '') {
                const output = document.createElement('div');
                output.className = 'output';
                output.innerHTML = 'Command not found: ' + cmd + '. Type "help"<br>';
                history.appendChild(output);
            }

            const nextPrompt = HackEngine.isHackMode()
                ? 'sandip@misc/hack:~$ '
                : (state.inGameMode ? 'sandip@games/' + state.gameName + ':~$ ' : (state.inMiscMode ? ('sandip@misc/' + state.miscSection + ':~$ ') : 'sandip@profile:~$ '));
            createInput(nextPrompt);
        });

        history.appendChild(wrapper);
        input.focus();
    }

    createInput();
})();
