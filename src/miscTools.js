(function () {
    function safeCalc(expression) {
        if (!expression || !/^[0-9+\-*/().%\s]+$/.test(expression)) return null;
        try {
            const result = Function('"use strict"; return (' + expression + ')')();
            if (typeof result !== 'number' || !isFinite(result)) return null;
            return result;
        } catch (err) {
            return null;
        }
    }

    function generatePassword(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{};:,.?';
        const pwdLength = Math.max(8, Math.min(64, length || 16));
        let pass = '';
        if (window.crypto && window.crypto.getRandomValues) {
            const bytes = new Uint8Array(pwdLength);
            window.crypto.getRandomValues(bytes);
            for (let i = 0; i < pwdLength; i++) pass += chars[bytes[i] % chars.length];
        } else {
            for (let i = 0; i < pwdLength; i++) pass += chars[Math.floor(Math.random() * chars.length)];
        }
        return pass;
    }

    function formatCrackTime(log10Seconds) {
        const units = [
            { name: 'seconds', sec: 1 },
            { name: 'minutes', sec: 60 },
            { name: 'hours', sec: 3600 },
            { name: 'days', sec: 86400 },
            { name: 'years', sec: 31557600 },
            { name: 'centuries', sec: 3155760000 }
        ];
        if (!isFinite(log10Seconds) || log10Seconds > 60) return 'far beyond centuries';
        if (log10Seconds < 0) return 'less than 1 second';
        let chosen = units[0];
        for (let i = 0; i < units.length; i++) {
            if (log10Seconds >= Math.log10(units[i].sec)) chosen = units[i];
        }
        const valueLog10 = log10Seconds - Math.log10(chosen.sec);
        if (valueLog10 < 6) {
            const value = Math.pow(10, valueLog10);
            return value.toFixed(value < 10 ? 2 : 0) + ' ' + chosen.name;
        }
        return 'about 10^' + valueLog10.toFixed(1) + ' ' + chosen.name;
    }

    function passwordStrength(password) {
        if (!password) return null;
        let charset = 0;
        if (/[a-z]/.test(password)) charset += 26;
        if (/[A-Z]/.test(password)) charset += 26;
        if (/[0-9]/.test(password)) charset += 10;
        if (/[^A-Za-z0-9]/.test(password)) charset += 32;
        charset = Math.max(charset, 1);
        const entropyBits = password.length * Math.log2(charset);
        const log10Seconds = entropyBits * Math.log10(2) - 10;
        return { entropyBits, estimate: formatCrackTime(log10Seconds) };
    }

    function qrImageUrl(text) {
        return 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=' + encodeURIComponent(text);
    }

    window.MiscTools = {
        safeCalc,
        generatePassword,
        passwordStrength,
        qrImageUrl
    };
})();
