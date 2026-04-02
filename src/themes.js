(function () {
    const themes = [
        { name: 'Midnight Terminal', bg: '#000000', text: '#ffffff', accent: '#58a6ff', cat: '#ffcc66', modalBg: '#1a1a2e', modalBorder: '#58a6ff', panelBg: '#0a0a0a', buttonBg: '#58a6ff', buttonText: '#000000', muted: '#888888', good: '#3fb950', bad: '#f85149' },
        { name: 'Forest Code', bg: '#0f1f16', text: '#d7fbe8', accent: '#7ee787', cat: '#baffc9', modalBg: '#1a2b1d', modalBorder: '#7ee787', panelBg: '#132017', buttonBg: '#7ee787', buttonText: '#08120c', muted: '#84a98c', good: '#8ae99b', bad: '#ff8c8c' },
        { name: 'Ocean Breeze', bg: '#061826', text: '#d6f1ff', accent: '#4cc9f0', cat: '#90e0ef', modalBg: '#0b2234', modalBorder: '#4cc9f0', panelBg: '#071a29', buttonBg: '#4cc9f0', buttonText: '#03222d', muted: '#7aa7c7', good: '#6ef3c5', bad: '#ff9f9f' },
        { name: 'Sunset Amber', bg: '#24160f', text: '#ffe9d6', accent: '#ff9f1c', cat: '#ffd166', modalBg: '#362014', modalBorder: '#ff9f1c', panelBg: '#2b1a12', buttonBg: '#ff9f1c', buttonText: '#2c1500', muted: '#c19a6b', good: '#9ef58c', bad: '#ff7b7b' },
        { name: 'Rose Night', bg: '#1b1020', text: '#ffe8f7', accent: '#ff66c4', cat: '#ffb3e6', modalBg: '#2a1530', modalBorder: '#ff66c4', panelBg: '#221226', buttonBg: '#ff66c4', buttonText: '#2a0018', muted: '#b78aa6', good: '#7ef2b8', bad: '#ff8fab' },
        { name: 'Nordic Ice', bg: '#0f172a', text: '#e2e8f0', accent: '#88c0d0', cat: '#bfdbfe', modalBg: '#1e293b', modalBorder: '#88c0d0', panelBg: '#111827', buttonBg: '#88c0d0', buttonText: '#0b1320', muted: '#94a3b8', good: '#86efac', bad: '#fca5a5' },
        { name: 'Retro Green', bg: '#08110a', text: '#9dff9d', accent: '#5cff5c', cat: '#c3ffc3', modalBg: '#0d1a0f', modalBorder: '#5cff5c', panelBg: '#09130b', buttonBg: '#5cff5c', buttonText: '#062006', muted: '#6fb06f', good: '#92ff92', bad: '#ff8e8e' },
        { name: 'Coffee Warmth', bg: '#1a120d', text: '#f5e6d3', accent: '#d4a373', cat: '#e9c46a', modalBg: '#2a1d15', modalBorder: '#d4a373', panelBg: '#221812', buttonBg: '#d4a373', buttonText: '#26180c', muted: '#b08968', good: '#a8e6a3', bad: '#f2a4a4' },
        { name: 'Neon City', bg: '#090814', text: '#f1edff', accent: '#00f5d4', cat: '#7ae7ff', modalBg: '#111024', modalBorder: '#00f5d4', panelBg: '#0c0b1a', buttonBg: '#00f5d4', buttonText: '#021614', muted: '#9aa0c3', good: '#70ffa8', bad: '#ff7aa2' },
        { name: 'Crimson Matrix', bg: '#120709', text: '#ffe5ea', accent: '#ff4d6d', cat: '#ffb3c1', modalBg: '#1f0d12', modalBorder: '#ff4d6d', panelBg: '#180a0e', buttonBg: '#ff4d6d', buttonText: '#2b000a', muted: '#b07d87', good: '#7ef29d', bad: '#ff9aa9' }
    ];

    let currentThemeIndex = 0;

    function applyTheme(index) {
        if (!Number.isInteger(index) || index < 0 || index >= themes.length) return false;
        const theme = themes[index];
        const root = document.documentElement.style;
        root.setProperty('--bg', theme.bg);
        root.setProperty('--text', theme.text);
        root.setProperty('--accent', theme.accent);
        root.setProperty('--cat', theme.cat);
        root.setProperty('--modal-bg', theme.modalBg);
        root.setProperty('--modal-border', theme.modalBorder);
        root.setProperty('--panel-bg', theme.panelBg);
        root.setProperty('--button-bg', theme.buttonBg);
        root.setProperty('--button-text', theme.buttonText);
        root.setProperty('--muted', theme.muted);
        root.setProperty('--good', theme.good);
        root.setProperty('--bad', theme.bad);
        currentThemeIndex = index;
        localStorage.setItem('portfolioThemeIndex', String(index));
        return true;
    }

    function renderThemeList() {
        let list = 'Theme List:\n';
        themes.forEach((theme, i) => {
            const marker = i === currentThemeIndex ? ' [active]' : '';
            list += (i + 1) + '. ' + theme.name + marker + '\n';
        });
        list += '\nUse: theme [number] or t [number]';
        return list;
    }

    function renderThemeListHtml() {
        let html = 'Theme List:<br>';
        themes.forEach((theme, i) => {
            const marker = i === currentThemeIndex
                ? ' <span style="color:#7ee787">[active]</span>'
                : '';
            const swatch = '<span style="display:inline-block;width:16px;height:12px;border:1px solid #6b7280;background:linear-gradient(90deg,' + theme.bg + ' 50%,' + theme.accent + ' 50%);vertical-align:middle;margin-right:8px"></span>';
            html += (i + 1) + '. ' + swatch + theme.name + marker + '<br>';
        });
        html += '<br>Use: theme [number] or t [number]';
        return html;
    }

    function init() {
        const savedThemeIndex = parseInt(localStorage.getItem('portfolioThemeIndex'), 10);
        if (Number.isInteger(savedThemeIndex) && savedThemeIndex >= 0 && savedThemeIndex < themes.length) applyTheme(savedThemeIndex);
        else applyTheme(0);
    }

    window.ThemeEngine = {
        init,
        applyTheme,
        renderThemeList,
        renderThemeListHtml,
        getThemeCount: function () { return themes.length; },
        getThemeName: function (i) { return themes[i] ? themes[i].name : ''; }
    };
})();
