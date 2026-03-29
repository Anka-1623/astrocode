// ===== AY'A İLK TEMAS — GAME ENGINE (Enhanced) =====
(function () {
    'use strict';

    var E = {};
    window.Engine = E;

    E.container = null;
    E.sceneCtn = null;
    E.dialogueCtn = null;
    E.promptCtn = null;
    E.choiceCtn = null;
    E.congratsCtn = null;
    E.overlay = null;
    E.spaceBg = null;
    E.inputHandler = null;
    E._twInterval = null;

    E.init = function () {
        E.container = document.getElementById('game-container');
        E.sceneCtn = document.getElementById('scene-container');
        E.dialogueCtn = document.getElementById('dialogue-container');
        E.promptCtn = document.getElementById('prompt-container');
        E.choiceCtn = document.getElementById('choice-container');
        E.congratsCtn = document.getElementById('congrats-container');
        E.overlay = document.getElementById('overlay');
        E.spaceBg = document.getElementById('space-bg');

        document.addEventListener('keydown', function (e) {
            if (E.inputHandler) E.inputHandler(e);
        });

        E.buildStars();

        var si = document.createElement('div');
        si.className = 'save-indicator';
        si.id = 'save-indicator';
        si.textContent = T('● KAYDEDILDI');
        document.body.appendChild(si);

        // Language Toggle Logic
        var langBtn = document.getElementById('lang-btn');
        if (langBtn) {
            langBtn.addEventListener('click', function() {
                window.Lang.current = window.Lang.current === 'tr' ? 'en' : 'tr';
                langBtn.textContent = window.Lang.current.toUpperCase();
                
                // Instant update function
                if (window.Lang.updateDom) window.Lang.updateDom();
            });
            langBtn.textContent = window.Lang.current.toUpperCase();
        }
    };

    E.buildStars = function () {
        E.spaceBg.innerHTML = '';

        // Video background for all space scenes (loop)
        var vid = document.createElement('video');
        vid.className = 'space-video-bg';
        vid.src = 'photos/gözdeuzayvideo1.mp4';
        vid.autoplay = true;
        vid.loop = true;
        vid.muted = true;
        vid.playsInline = true;
        vid.setAttribute('playsinline', '');
        E.spaceBg.appendChild(vid);

        var layers = [
            { count: 280, size: [0.4, 1.2], speed: 120 },
            { count: 140, size: [1.0, 1.8], speed: 80  },
            { count: 55,  size: [1.8, 3],   speed: 50  }
        ];
        var W = 2500, H = 2500;
        layers.forEach(function (cfg, li) {
            var el = document.createElement('div');
            el.className = 'star-layer layer-' + (li + 1);
            var shadows = [];
            for (var i = 0; i < cfg.count; i++) {
                var x = Math.random() * W;
                var y = Math.random() * H;
                var s = cfg.size[0] + Math.random() * (cfg.size[1] - cfg.size[0]);
                var o = 0.3 + Math.random() * 0.7;
                // Slight blue-white tint for larger stars
                var r = 220 + Math.floor(Math.random() * 35);
                var g = 220 + Math.floor(Math.random() * 35);
                var b = 240 + Math.floor(Math.random() * 15);
                shadows.push(x + 'px ' + y + 'px 0 ' + s + 'px rgba(' + r + ',' + g + ',' + b + ',' + o + ')');
            }
            var dot = document.createElement('div');
            dot.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;box-shadow:' + shadows.join(',') + ';';
            var dot2 = document.createElement('div');
            dot2.style.cssText = 'position:absolute;top:' + H + 'px;left:0;width:1px;height:1px;box-shadow:' + shadows.join(',') + ';';
            el.appendChild(dot);
            el.appendChild(dot2);
            E.spaceBg.appendChild(el);
        });

        // Shooting stars
        for (var s = 0; s < 3; s++) {
            var ss = document.createElement('div');
            ss.className = 'shooting-star';
            ss.style.top = (8 + Math.random() * 40) + '%';
            ss.style.left = (50 + Math.random() * 40) + '%';
            ss.style.setProperty('--ss-dur', (3 + Math.random() * 5) + 's');
            ss.style.setProperty('--ss-delay', (2 + Math.random() * 12) + 's');
            E.spaceBg.appendChild(ss);
        }
    };

    E.setScene = function (sceneFn) {
        E.sceneCtn.innerHTML = '';
        E.hideDialogue();
        E.hidePrompt();
        E.hideChoices();
        E.hideCongrats();
        E.inputHandler = null;
        if (E._twInterval) { clearInterval(E._twInterval); E._twInterval = null; }
        // Clean up body-appended elements from UYKM scenes
        var cleanups = ['.astro-subtitle', '.fail-overlay', '.space-transition', '.astro-popup'];
        cleanups.forEach(function(sel) {
            var els = document.querySelectorAll(sel);
            els.forEach(function(el) { el.remove(); });
        });
        sceneFn();
    };

    E.fadeOut = function (dur) {
        dur = dur || 1500;
        return new Promise(function (res) {
            E.overlay.style.transition = 'opacity ' + dur + 'ms ease';
            E.overlay.style.opacity = '1';
            E.overlay.style.pointerEvents = 'all';
            setTimeout(res, dur);
        });
    };

    E.fadeIn = function (dur) {
        dur = dur || 1500;
        return new Promise(function (res) {
            E.overlay.style.transition = 'opacity ' + dur + 'ms ease';
            E.overlay.style.opacity = '0';
            setTimeout(function () {
                E.overlay.style.pointerEvents = 'none';
                res();
            }, dur);
        });
    };

    E.blackScreen = function () {
        E.overlay.style.transition = 'none';
        E.overlay.style.opacity = '1';
        E.overlay.style.pointerEvents = 'all';
    };

    E.typewriter = function (element, text, speed, callback) {
        speed = speed || 35;
        var i = 0;
        element.textContent = '';
        var cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        cursor.textContent = '|';
        element.appendChild(cursor);

        if (E._twInterval) clearInterval(E._twInterval);
        E._twCallback = callback;
        E._twInterval = setInterval(function () {
            if (i < text.length) {
                element.insertBefore(document.createTextNode(text[i]), cursor);
                i++;
            } else {
                clearInterval(E._twInterval);
                E._twInterval = null;
                cursor.remove();
                if (E._twCallback) {
                    var cb = E._twCallback;
                    E._twCallback = null;
                    cb();
                }
            }
        }, speed);
    };

    E.showDialogue = function (text, callback) {
        E.dialogueCtn.classList.remove('hidden');
        E.dialogueCtn.innerHTML = '';
        var tEl = document.createElement('span');
        tEl.className = 'dialogue-text';
        tEl.setAttribute('data-tr-text', text); // Save original TR string
        E.dialogueCtn.appendChild(tEl);
        E.typewriter(tEl, T(text), 30, callback);
    };

    E.showDialogueInstant = function (text) {
        E.dialogueCtn.classList.remove('hidden');
        E.dialogueCtn.innerHTML = '';
        var tEl = document.createElement('span');
        tEl.className = 'dialogue-text';
        tEl.setAttribute('data-tr-text', text);
        tEl.textContent = T(text);
        E.dialogueCtn.appendChild(tEl);
    };

    E.hideDialogue = function () {
        E.dialogueCtn.classList.add('hidden');
        E.dialogueCtn.innerHTML = '';
        if (E._twInterval) { clearInterval(E._twInterval); E._twInterval = null; }
    };

    E.showPrompt = function (text) {
        E.promptCtn.classList.remove('hidden');
        E.promptCtn.setAttribute('data-tr-text', text);
        E.promptCtn.textContent = T(text);
    };

    E.hidePrompt = function () {
        E.promptCtn.classList.add('hidden');
        E.promptCtn.textContent = '';
    };

    E.showChoices = function (choices) {
        E.choiceCtn.classList.remove('hidden');
        E.choiceCtn.innerHTML = '';
        choices.forEach(function (c) {
            var btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.setAttribute('data-tr-text', c.text);
            btn.textContent = T(c.text);
            btn.addEventListener('click', function () {
                E.hideChoices();
                if (c.action) c.action();
            });
            E.choiceCtn.appendChild(btn);
        });
    };

    E.hideChoices = function () {
        E.choiceCtn.classList.add('hidden');
        E.choiceCtn.innerHTML = '';
    };

    E.showCongrats = function () {
        E.congratsCtn.classList.remove('hidden');
        E.congratsCtn.textContent = T('TEBRİKLER!');
    };

    E.hideCongrats = function () {
        E.congratsCtn.classList.add('hidden');
        E.congratsCtn.textContent = '';
    };

    E.saveGame = function (point, data) {
        var save = { point: point, data: data || {}, ts: Date.now() };
        try {
            localStorage.setItem('ayailktemas_save', JSON.stringify(save));
            var si = document.getElementById('save-indicator');
            if (si) { si.classList.add('show'); setTimeout(function () { si.classList.remove('show'); }, 1500); }
        } catch (e) { }
    };

    E.loadGame = function () {
        try {
            var d = localStorage.getItem('ayailktemas_save');
            return d ? JSON.parse(d) : null;
        } catch (e) { return null; }
    };

    E.deleteSave = function () {
        try { localStorage.removeItem('ayailktemas_save'); } catch (e) { }
    };

    E.waitKey = function (key, callback) {
        E.inputHandler = function (e) {
            if (e.code === key || e.key === key) {
                e.preventDefault();
                E.inputHandler = null;
                callback();
            }
        };
    };

    E.delay = function (ms) {
        return new Promise(function (res) { setTimeout(res, ms); });
    };

    E.showSpaceBg = function () { E.spaceBg.style.display = 'block'; };
    E.hideSpaceBg = function () { E.spaceBg.style.display = 'none'; };

})();
