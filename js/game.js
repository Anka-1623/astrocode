// ===== AY'A İLK TEMAS — GAME CONTENT (Enhanced Visuals) =====
(function () {
    'use strict';

    var G = {};
    window.GameScenes = G;
    var gameData = { questionChoice: null };

    var SCENE_MAP = {
        'intro1': function () { G.intro1(); },
        'intro2': function () { G.intro2(); },
        'menu': function () { G.menuLanguage(); },
        'step1_wake': function () { G.step1Wake(); },
        'step1_shuttle': function () { G.step1Shuttle(); },
        'step2_door': function () { G.step2Door(); },
        'step2_talk': function () { G.step2Talk(); },
        'step3_mini': function () { G.step3Minigame(); },
        'step3_after': function () { G.step3After(); },
        'step4_mini': function () { G.step4Minigame(); },
        'finale': function () { G.finale(); },
        'uykm_s1': function () { G.uykm_s1Email(); },
        'uykm_s2': function () { G.uykm_s2Orbit(); },
        'uykm_s3': function () { G.uykm_s3Match(); },
        'uykm_s4': function () { G.uykm_s4Score(); },
        'uykm_s5': function () { G.uykm_s5News(); },
        'um_s1': function () { G.um_s1Offer(); },
        'um_s2': function () { G.um_s2Assembly(); },
        'um_s3': function () { G.um_s3Material(); },
        'um_s4': function () { G.um_s4Final(); },
        'um_s5': function () { G.um_s5News(); }
    };

    G.boot = function () {
        Engine.init();
        Engine.blackScreen();
        var save = Engine.loadGame();
        if (save && save.point && SCENE_MAP[save.point]) {
            gameData = save.data || {};
            G.showContinueMenu(save);
        } else {
            Engine.setScene(G.intro1);
        }
    };

    G.showContinueMenu = function (save) {
        Engine.showSpaceBg();
        Engine.sceneCtn.innerHTML = '';
        var title = document.createElement('div');
        title.className = 'menu-title';
        title.textContent = "Ay'a İlk Temas";
        Engine.sceneCtn.appendChild(title);
        var moon = document.createElement('div');
        moon.className = 'menu-moon-deco';
        Engine.sceneCtn.appendChild(moon);
        var btns = document.createElement('div');
        btns.className = 'menu-buttons';
        var btnCont = document.createElement('button');
        btnCont.className = 'menu-btn';
        btnCont.textContent = '▶  DEVAM ET';
        btnCont.addEventListener('click', function () {
            gameData = save.data || {};
            Engine.setScene(SCENE_MAP[save.point]);
        });
        var btnNew = document.createElement('button');
        btnNew.className = 'menu-btn';
        btnNew.textContent = '★  YENİ OYUN';
        btnNew.addEventListener('click', function () {
            Engine.deleteSave();
            gameData = {};
            Engine.setScene(G.intro1);
        });
        btns.appendChild(btnCont);
        btns.appendChild(btnNew);
        Engine.sceneCtn.appendChild(btns);
        Engine.fadeIn(1000);
    };

    // ===== INTRO 1 — AYAP-1 & AYAP-2 =====
    G.intro1 = function () {
        Engine.showSpaceBg();
        Engine.blackScreen();
        var steps = [
            { type: 'title', text: "Ay'a İlk Temas" },
            { type: 'heading', text: 'AYAP-1 (Ay Araştırma Programı 1)' },
            { type: 'para', text: "Türkiye Uzay Ajansı tarafından yürütülen AYAP-1, Türkiye'nin Ay'a ulaşmayı hedefleyen ilk görevidir. Amaç, yerli teknolojileri test etmektir." },
            { type: 'para', text: "Görevde uzay aracı Ay'a gönderilir ve sert iniş yapar. Yani yüzeye çarpar ve bu sırada teknik veriler toplanır." },
            { type: 'para', text: "Bu aşama, Ay'a ulaşma kabiliyeti kazanmak için bir ilk adımdır. Türkiye'nin uzay yolculuğunun başlangıcıdır." },
            { type: 'heading', text: 'AYAP-2 (Ay Araştırma Programı 2)' },
            { type: 'para', text: "AYAP-2, ilk görevin devamıdır ve daha gelişmiştir. Amaç, Ay yüzeyinde aktif çalışan bir sistem kurmaktır." },
            { type: 'para', text: "Bu görevde araç yumuşak iniş yapar. Kontrollü iner ve zarar görmeden çalışmaya devam eder." },
            { type: 'para', text: "Hedef, Ay'da bilimsel veri toplamak ve ileri teknolojileri test etmektir. Türkiye'yi uzayda daha ileri seviyeye taşır." }
        ];
        var idx = 0;
        function showStep() {
            Engine.sceneCtn.innerHTML = '';
            if (idx >= steps.length) {
                Engine.fadeOut(1000).then(function () {
                    Engine.setScene(G.intro2);
                    Engine.fadeIn(1000);
                });
                return;
            }
            var s = steps[idx];
            var el = document.createElement('div');
            if (s.type === 'title') el.className = 'intro-title';
            else if (s.type === 'heading') el.className = 'intro-heading';
            else el.className = 'intro-paragraph';
            el.textContent = s.text;
            Engine.sceneCtn.appendChild(el);
            Engine.showPrompt('SPACE TUŞUNA BASIN');
            idx++;
        }
        Engine.fadeIn(1500).then(function () {
            showStep();
            Engine.inputHandler = function (e) {
                if (e.code === 'Space') { e.preventDefault(); showStep(); }
            };
        });
    };

    // ===== INTRO 2 — AYAP-3 =====
    G.intro2 = function () {
        Engine.showSpaceBg();
        Engine.saveGame('intro2', gameData);
        var steps = [
            { type: 'title', text: 'AYAP-3' },
            { type: 'heading', text: 'AYAP-3 Nedir?' },
            { type: 'para', text: "AYAP-3, başarılı geçen AYAP-1 ve AYAP-2 projelerinden sonra 2038 yılında Ay'a gönderilen üçüncü projeyi konu alan bir oyundur. Oyunun içinde iki farklı dil seçimi ve üç farklı rol seçimi mevcuttur, oyuncuların amacı bir yandan bilgi edinirken bir yandan verilen görevleri yerine getirmektir. Akıcı hikayesi ve zengin bilgi içeriğiyle AYAP-3 şimdi karşınızda!" }
        ];
        var idx = 0;
        function showStep() {
            Engine.sceneCtn.innerHTML = '';
            if (idx >= steps.length) {
                Engine.fadeOut(1000).then(function () {
                    Engine.setScene(G.menuLanguage);
                    Engine.fadeIn(1000);
                });
                return;
            }
            var s = steps[idx];
            var el = document.createElement('div');
            if (s.type === 'title') el.className = 'intro-title';
            else if (s.type === 'heading') el.className = 'intro-heading';
            else el.className = 'intro-paragraph';
            el.textContent = s.text;
            Engine.sceneCtn.appendChild(el);
            Engine.showPrompt('SPACE TUŞUNA BASIN');
            idx++;
        }
        showStep();
        Engine.inputHandler = function (e) {
            if (e.code === 'Space') { e.preventDefault(); showStep(); }
        };
    };

    // ===== MENU — LANGUAGE =====
    G.menuLanguage = function () {
        Engine.showSpaceBg();
        Engine.saveGame('menu', gameData);
        Engine.sceneCtn.innerHTML = '';
        var title = document.createElement('div');
        title.className = 'menu-title';
        title.textContent = "Ay'a İlk Temas";
        Engine.sceneCtn.appendChild(title);
        var moon = document.createElement('div');
        moon.className = 'menu-moon-deco';
        Engine.sceneCtn.appendChild(moon);
        var btns = document.createElement('div');
        btns.className = 'menu-buttons';
        var btnTR = document.createElement('button');
        btnTR.className = 'menu-btn';
        btnTR.textContent = 'TÜRKÇE';
        btnTR.addEventListener('click', function () {
            gameData.lang = 'tr';
            Engine.fadeOut(800).then(function () { Engine.setScene(G.menuRole); Engine.fadeIn(800); });
        });
        var btnEN = document.createElement('button');
        btnEN.className = 'menu-btn';
        btnEN.textContent = 'ENGLISH';
        btnEN.addEventListener('click', function () {
            gameData.lang = 'en';
            Engine.fadeOut(800).then(function () { Engine.setScene(G.menuRole); Engine.fadeIn(800); });
        });
        btns.appendChild(btnTR);
        btns.appendChild(btnEN);
        Engine.sceneCtn.appendChild(btns);
    };

    // ===== MENU — ROLE =====
    G.menuRole = function () {
        Engine.showSpaceBg();
        Engine.sceneCtn.innerHTML = '';
        var title = document.createElement('div');
        title.className = 'menu-title';
        title.textContent = gameData.lang === 'tr' ? 'ROL SEÇİNİZ' : 'SELECT YOUR ROLE';
        Engine.sceneCtn.appendChild(title);
        var moon = document.createElement('div');
        moon.className = 'menu-moon-deco';
        Engine.sceneCtn.appendChild(moon);
        var roles = gameData.lang === 'tr'
            ? ['Uzay Mühendisi', 'Astronot', 'Uzay Yer Kontrol Mühendisi']
            : ['Aerospace Engineer', 'Astronaut', 'Space Ground Control Engineer'];
        var btns = document.createElement('div');
        btns.className = 'menu-buttons';
        roles.forEach(function (r, i) {
            var btn = document.createElement('button');
            btn.className = 'menu-btn';
            btn.textContent = r.toUpperCase();
            btn.addEventListener('click', function () {
                gameData.role = r;
                gameData.roleIdx = i;
                if (i === 0) {
                    Engine.fadeOut(1000).then(function () { Engine.setScene(G.um_s1Offer); });
                } else if (i === 1) {
                    Engine.fadeOut(1000).then(function () { Engine.setScene(G.step1Wake); });
                } else if (i === 2) {
                    Engine.fadeOut(1000).then(function () { Engine.setScene(G.uykm_s1Email); });
                } else {
                    alert(gameData.lang === 'tr' ? 'Bu rol yak\u0131nda eklenecek!' : 'This role is coming soon!');
                }
            });
            btns.appendChild(btn);
        });
        Engine.sceneCtn.appendChild(btns);
    };

    // ===== STEP 1 — WAKE UP (Enhanced bedroom) =====
    G.step1Wake = function () {
        Engine.hideSpaceBg();
        Engine.saveGame('step1_wake', gameData);
        Engine.sceneCtn.innerHTML = '';

        buildBedroom();
        Engine.fadeIn(2500).then(function () {
            // Switch to ringing phone image (telefon2)
            var phoneImg = document.getElementById('phone-img');
            if (phoneImg) {
                phoneImg.src = 'photos/telefon2.jpeg';
                phoneImg.classList.add('ringing');
            }
            Engine.showPrompt('TELEFONU AÇMAK İÇİN SPACE TUŞUNA BASIN');
            Engine.waitKey('Space', function () {
                Engine.hidePrompt();
                // Switch to talking phone image (telefon3)
                if (phoneImg) {
                    phoneImg.src = 'photos/telefon3.jpeg';
                    phoneImg.classList.remove('ringing');
                }
                startPhoneCall();
            });
        });

        function buildBedroom() {
            var room = document.createElement('div');
            room.className = 'bedroom';
            room.style.cssText = 'background:url(photos/oda.jpeg) center/cover no-repeat;';

            // Phone image element (starts with telefon1 = kapalı)
            var phoneImg = document.createElement('img');
            phoneImg.src = 'photos/telefon1.jpeg';
            phoneImg.className = 'phone-photo';
            phoneImg.id = 'phone-img';
            room.appendChild(phoneImg);

            Engine.sceneCtn.appendChild(room);
        }

        function startPhoneCall() {
            var dialogues = [
                'Yetkili: Günaydınlar efendim, Türkiye Uzay Ajansından arıyorum. AYAP-3 projesi için astronot olarak sizi seçtiğimizi mutlulukla bildiriyoruz.',
                'Oyuncu: Çok teşekkür ederim, süreç için daha sonrasında iletişime geçeriz diye düşünüyorum.'
            ];
            var di = 0;
            function nextDialogue() {
                if (di >= dialogues.length) {
                    Engine.hideDialogue();
                    Engine.hidePrompt();
                    Engine.fadeOut(1500).then(function () { Engine.setScene(G.step1TimeSkip); });
                    return;
                }
                Engine.showDialogue(dialogues[di], function () {
                    Engine.showPrompt('DEVAM ETMEK İÇİN SPACE TUŞUNA BASIN');
                    di++;
                    Engine.waitKey('Space', function () { Engine.hidePrompt(); nextDialogue(); });
                });
            }
            nextDialogue();
        }
    };

    // ===== STEP 1 — TIME SKIP =====
    G.step1TimeSkip = function () {
        Engine.hideSpaceBg();
        Engine.blackScreen();
        Engine.sceneCtn.innerHTML = '';
        var txt = document.createElement('div');
        txt.className = 'timeskip-text';
        Engine.sceneCtn.appendChild(txt);
        setTimeout(function () {
            Engine.overlay.style.transition = 'opacity 0.5s ease';
            Engine.overlay.style.opacity = '0';
            Engine.overlay.style.pointerEvents = 'none';
            Engine.typewriter(txt, '2 yıl sonra…', 80, function () {
                setTimeout(function () {
                    Engine.fadeOut(1500).then(function () { Engine.setScene(G.step1Shuttle); });
                }, 2000);
            });
        }, 500);
    };

    // ===== BUILD COCKPIT HELPER (Photo + Video Enhanced) =====
    function buildCockpit(showAstroOnWindow, showAstroInside) {
        Engine.showSpaceBg();
        Engine.sceneCtn.innerHTML = '';

        // Layer 1: Looping video (bottom — visible through white areas)
        var video = document.createElement('video');
        video.className = 'cockpit-video-bg';
        video.src = 'photos/gözdeuzayvideo1.mp4';
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        Engine.sceneCtn.appendChild(video);

        // Layer 2: Cockpit photo — mix-blend-mode:multiply makes white→transparent
        var cockpit = document.createElement('div');
        cockpit.className = 'cockpit';

        var cockpitImg = document.createElement('img');
        cockpitImg.src = 'photos/uzaykokpiti.jpeg';
        cockpitImg.className = 'cockpit-photo-frame';
        cockpit.appendChild(cockpitImg);

        // Astro characters on top
        if (showAstroOnWindow) {
            var astro = document.createElement('div');
            astro.className = 'astro-character astro-window';
            astro.id = 'astro-window';
            astro.style.display = 'none';
            astro.innerHTML = '<img src="photos/astro.png" alt="Astro">';
            cockpit.appendChild(astro);
        }
        if (showAstroInside) {
            var astroIn = document.createElement('div');
            astroIn.className = 'astro-character astro-inside';
            astroIn.innerHTML = '<img src="photos/astro.png" alt="Astro">';
            cockpit.appendChild(astroIn);
        }
        Engine.sceneCtn.appendChild(cockpit);
    }

    // ===== STEP 1 — SHUTTLE + ASTRO =====
    G.step1Shuttle = function () {
        Engine.saveGame('step1_shuttle', gameData);
        buildCockpit(true, false);
        Engine.blackScreen();
        Engine.fadeIn(1500).then(function () {
            Engine.showPrompt('SPACE TUŞUNA BASIN');
            Engine.waitKey('Space', function () {
                Engine.hidePrompt();
                Engine.showDialogue('Oyuncu: Hep bu anı merak etmiştim… düşündüğümden çok daha güzelmiş-', function () {
                    setTimeout(function () {
                        var aw = document.getElementById('astro-window');
                        if (aw) aw.style.display = 'block';
                        Engine.hideDialogue();
                        Engine.showDialogue('?: Lütfen beni içeri al! Ben seni bilgilendirmek için gönderildim.', function () {
                            Engine.showPrompt('SPACE TUŞUNA BASIN');
                            Engine.waitKey('Space', shuttleD1);
                        });
                    }, 3000);
                });
            });
        });

        function shuttleD1() {
            Engine.hidePrompt();
            Engine.showDialogue('Oyuncu: Sana nasıl güvenebilirim ki! Daha ne olduğunu bile bilmiyorum.', function () {
                Engine.showPrompt('SPACE TUŞUNA BASIN');
                Engine.waitKey('Space', shuttleD2);
            });
        }
        function shuttleD2() {
            Engine.hidePrompt();
            Engine.showDialogue("?: Benim adım Astro! Ben bir Tardigrad'ım yani su ayısı. Buralarda bilgi alabileceğin tek kişi benim!", function () {
                Engine.hidePrompt();
                Engine.showChoices([
                    { text: 'Onu içeri al', action: function () { Engine.hideDialogue(); goToStep2(); } },
                    { text: 'Biraz daha soru sor', action: function () { Engine.hideDialogue(); askMore1(); } }
                ]);
            });
        }
        function askMore1() {
            Engine.showDialogue('Oyuncu: Madem o kadar bilgilisin bana Ay ile ilgili üç bilinmedik bilgi ver.', function () {
                Engine.showPrompt('SPACE TUŞUNA BASIN');
                Engine.waitKey('Space', function () {
                    Engine.hidePrompt();
                    Engine.showDialogue("Astro: Hmm….Ayda depremler olduğunu biliyor muydun? Hem de Dünya'ya kıyasla saatler boyu süren depremlerden bahsediyorum.", function () {
                        Engine.showPrompt('SPACE TUŞUNA BASIN');
                        Engine.waitKey('Space', function () {
                            Engine.hidePrompt(); Engine.hideDialogue();
                            Engine.showChoices([
                                { text: 'Onu içeri al', action: function () { Engine.hideDialogue(); goToStep2(); } },
                                { text: 'Biraz daha soru sor', action: function () { Engine.hideDialogue(); askMore2(); } }
                            ]);
                        });
                    });
                });
            });
        }
        function askMore2() {
            Engine.showDialogue('Oyuncu: Gerçekten ilginçmiş fakat yeterli değil.', function () {
                Engine.showPrompt('SPACE TUŞUNA BASIN');
                Engine.waitKey('Space', function () {
                    Engine.hidePrompt();
                    Engine.showDialogue('Astro: Peki sana Ay tozunun akciğerlerin için çok tehlikeli olduğunu söylesem ne derdin?', function () {
                        Engine.showPrompt('SPACE TUŞUNA BASIN');
                        Engine.waitKey('Space', function () {
                            Engine.hidePrompt(); Engine.hideDialogue();
                            Engine.showChoices([
                                { text: 'Onu içeri al', action: function () { Engine.hideDialogue(); goToStep2(); } },
                                { text: 'Biraz daha soru sor', action: function () { Engine.hideDialogue(); askMore3(); } }
                            ]);
                        });
                    });
                });
            });
        }
        function askMore3() {
            Engine.showDialogue('Oyuncu: Gerçekten ilginçmiş fakat yeterli değil.', function () {
                Engine.showPrompt('SPACE TUŞUNA BASIN');
                Engine.waitKey('Space', function () {
                    Engine.hidePrompt();
                    Engine.showDialogue("Astro: Hmmm….Ay'ın yüzeyindeki bazı kayaçlar manyetize olmuş durumdadır.", function () {
                        Engine.showPrompt('SPACE TUŞUNA BASIN');
                        Engine.waitKey('Space', function () {
                            Engine.hidePrompt(); Engine.hideDialogue();
                            Engine.showChoices([
                                { text: 'Onu içeri al', action: function () { Engine.hideDialogue(); goToStep2(); } }
                            ]);
                        });
                    });
                });
            });
        }
        function goToStep2() {
            Engine.showDialogue('Oyuncu: Tamam, kapıya yaklaş seni içeri alacağım.', function () {
                Engine.showPrompt('SPACE TUŞUNA BASIN');
                Engine.waitKey('Space', function () {
                    Engine.hidePrompt();
                    Engine.showDialogue('Astro: Yaşasın!', function () {
                        Engine.showPrompt('SPACE TUŞUNA BASIN');
                        Engine.waitKey('Space', function () {
                            Engine.hidePrompt(); Engine.hideDialogue();
                            Engine.fadeOut(1500).then(function () { Engine.setScene(G.step2Door); });
                        });
                    });
                });
            });
        }
    };

    // ===== STEP 2 — DOOR (Photo-based with kapısonhali.png split) =====
    G.step2Door = function () {
        Engine.hideSpaceBg();
        Engine.blackScreen();
        Engine.saveGame('step2_door', gameData);
        Engine.sceneCtn.innerHTML = '';
        var scene = document.createElement('div');
        scene.className = 'door-scene';
        // Ceiling light
        var ceilingLight = document.createElement('div');
        ceilingLight.className = 'door-ceiling-light';
        scene.appendChild(ceilingLight);
        // Warning stripes
        var warning = document.createElement('div');
        warning.className = 'door-warning';
        scene.appendChild(warning);
        // Door frame
        var frame = document.createElement('div');
        frame.className = 'door-frame';
        var behind = document.createElement('div');
        behind.className = 'door-behind';
        behind.innerHTML = '<div class="door-space-bg"></div>';
        var astroD = document.createElement('div');
        astroD.className = 'astro-character';
        astroD.id = 'door-astro';
        astroD.style.cssText = 'position:relative;z-index:3;transform:scale(0.3);opacity:0.5;transition:transform 1.5s ease-out, opacity 1s ease;';
        astroD.innerHTML = '<img src="photos/astro.png" alt="Astro">';
        behind.appendChild(astroD);
        frame.appendChild(behind);
        // Door panels using kapısonhali.png split in half
        var panelL = document.createElement('div');
        panelL.className = 'door-panel-left door-panel-photo';
        panelL.style.backgroundImage = 'url(photos/kapısonhali.png)';
        panelL.style.backgroundPosition = 'left center';
        panelL.style.backgroundSize = '200% 100%';
        var panelR = document.createElement('div');
        panelR.className = 'door-panel-right door-panel-photo';
        panelR.style.backgroundImage = 'url(photos/kapısonhali.png)';
        panelR.style.backgroundPosition = 'right center';
        panelR.style.backgroundSize = '200% 100%';
        frame.appendChild(panelL);
        frame.appendChild(panelR);
        scene.appendChild(frame);
        // Progress bar
        var progress = document.createElement('div');
        progress.className = 'door-progress';
        var progressFill = document.createElement('div');
        progressFill.className = 'door-progress-fill';
        progress.appendChild(progressFill);
        scene.appendChild(progress);
        Engine.sceneCtn.appendChild(scene);

        var doorPresses = 0;
        var maxPresses = 8;
        Engine.fadeIn(1500).then(function () {
            Engine.showPrompt('KAPIYI AÇMAK İÇİN HIZLICA SPACE TUŞUNA BASIN');
            Engine.inputHandler = function (e) {
                if (e.code === 'Space') {
                    e.preventDefault();
                    doorPresses++;
                    var pct = (doorPresses / maxPresses) * 100;
                    panelL.style.transform = 'translateX(-' + pct + '%)';
                    panelR.style.transform = 'translateX(' + pct + '%)';
                    progressFill.style.width = pct + '%';
                    if (doorPresses >= maxPresses) {
                        Engine.inputHandler = null;
                        Engine.hidePrompt();
                        // Astro approaches the player
                        var doorAstro = document.getElementById('door-astro');
                        if (doorAstro) {
                            doorAstro.style.transform = 'scale(1)';
                            doorAstro.style.opacity = '1';
                        }
                        Engine.showCongrats();
                        setTimeout(function () {
                            Engine.showPrompt('SPACE TUŞUNA BASIN');
                            Engine.waitKey('Space', function () {
                                Engine.hideCongrats(); Engine.hidePrompt();
                                Engine.fadeOut(3000).then(function () { Engine.setScene(G.step2Talk); });
                            });
                        }, 1200);
                    }
                }
            };
        });
    };

    // ===== STEP 2 — TALK WITH ASTRO =====
    G.step2Talk = function () {
        Engine.saveGame('step2_talk', gameData);
        buildCockpit(false, true);
        Engine.blackScreen();
        var icYapiText = "Astro: Aslında Dünya'ya benzer şekilde katmanlıdır ve merkezden yüzeye doğru yoğun metalik bir çekirdek, kalın bir manto ve ince bir kabuktan oluşur. Demir ağırlıklı katı bir iç çekirdek ile onu çevreleyen sıvı dış çekirdeğe sahiptir. Manto yoğun, kabuk ise kayalıktır.";
        var volkanText = "Astro: Ay'da şu an aktif volkan bulunmamaktadır, ancak yüzeydeki karanlık bölgelerin yani mariaların, milyarlarca yıl önce meydana gelen devasa volkanik patlamalarla oluştuğu bilinmektedir. Milyarlarca yıl önce yoğun volkanik faaliyetlerin yaşandığı Ay'da küçük ölçekli volkanik aktivitelerin gerçekleşmiş olabileceğine dair kanıtlar bulunsa da yüzey sönüktür.";

        Engine.fadeIn(1500).then(function () {
            Engine.showPrompt('SPACE TUŞUNA BASIN');
            Engine.waitKey('Space', function () {
                Engine.hidePrompt();
                d1();
            });
        });
        function d1() {
            Engine.showDialogue('Oyuncu: Eee söyle bakalım seni kim gönderdi?', function () {
                Engine.showPrompt('SPACE TUŞUNA BASIN');
                Engine.waitKey('Space', d2);
            });
        }
        function d2() {
            Engine.hidePrompt();
            Engine.showDialogue("Astro: Şey, aslında beni içeri alman için yalan söylemiştim ama lütfen sinirlenme, sana Ay ile ilgili bildiğim her şeyi anlatıp bir yandan Ay'a gitmene yardımcı olacağım!", function () {
                Engine.showPrompt('SPACE TUŞUNA BASIN');
                Engine.waitKey('Space', d3);
            });
        }
        function d3() {
            Engine.hidePrompt();
            Engine.showDialogue('Oyuncu: İyi bakalım o zaman bana şunu anlat…', function () {
                setTimeout(function () {
                    Engine.hideDialogue();
                    Engine.showChoices([
                        { text: "Ay'ın iç yapısı ile ilgili bilgi ver", action: function () { gameData.questionChoice = 'icyapi'; Engine.saveGame('step2_talk', gameData); answerQ(icYapiText); } },
                        { text: "Ay'da volkan var mıydı?", action: function () { gameData.questionChoice = 'volkan'; Engine.saveGame('step2_talk', gameData); answerQ(volkanText); } }
                    ]);
                }, 3000);
            });
        }
        function answerQ(text) {
            Engine.showDialogue(text, function () {
                Engine.showPrompt('SPACE TUŞUNA BASIN');
                Engine.waitKey('Space', function () {
                    Engine.hidePrompt(); Engine.hideDialogue();
                    goToStep3Intro();
                });
            });
        }
        function goToStep3Intro() {
            Engine.showDialogue("Astro: Hadi diğer sorularını cevaplamadan önce Ay'a gidip kendi başına bazı şeyleri görmeni sağlayalım!", function () {
                Engine.showPrompt('UZAY ARACININ KONTROLÜ İÇİN X TUŞUNA BASIN');
                Engine.waitKey('KeyX', function () {
                    Engine.hidePrompt(); Engine.hideDialogue();
                    Engine.fadeOut(1500).then(function () { Engine.setScene(G.step3Minigame); });
                });
            });
        }
    };

    // ===== STEP 3 — ASTEROID MINIGAME (Enhanced with HUD & collision flash) =====
    G.step3Minigame = function () {
        Engine.showSpaceBg();
        Engine.blackScreen();
        Engine.saveGame('step3_mini', gameData);
        Engine.sceneCtn.innerHTML = '';
        var field = document.createElement('div');
        field.className = 'minigame-field';
        field.id = 'mg-field';
        var earth = document.createElement('img');
        earth.src = 'photos/dünya.png';
        earth.className = 'mg-earth mg-earth-photo';
        field.appendChild(earth);
        var moon = document.createElement('img');
        moon.src = 'photos/ay.png';
        moon.className = 'mg-moon mg-moon-photo';
        moon.id = 'mg-moon';
        field.appendChild(moon);

        // HUD
        var hud = document.createElement('div');
        hud.className = 'mg-hud';
        hud.innerHTML = '<div class=\"mg-hud-label\">' + T('MESAFE') + '</div><div class=\"mg-hud-distance\" id=\"mg-dist\">0%</div>';
        field.appendChild(hud);

        var ship = document.createElement('div');
        ship.className = 'mg-ship';
        ship.id = 'mg-ship';
        ship.innerHTML = '<div class="mg-ship-trail"></div><div class="mg-ship-body"></div><div class="mg-ship-flame"></div>';
        ship.style.left = '120px';
        ship.style.top = '50%';
        field.appendChild(ship);

        var meteors = [];
        var fieldW = window.innerWidth;
        var fieldH = window.innerHeight;
        var meteorStartX = fieldW * 0.25;
        var meteorEndX = fieldW * 0.85;
        var shipW = 48, shipH = 24;

        for (var i = 0; i < 15; i++) {
            var mEl = document.createElement('div');
            mEl.className = 'mg-meteor';
            var mSize = 25 + Math.random() * 22;
            var mX = meteorStartX + (i / 15) * (meteorEndX - meteorStartX) + (Math.random() - 0.5) * 60;
            var mY = 50 + Math.random() * (fieldH - 100 - mSize);
            mEl.style.width = mSize + 'px';
            mEl.style.height = mSize + 'px';
            mEl.style.left = mX + 'px';
            mEl.style.top = mY + 'px';
            mEl.style.setProperty('--spin-dur', (3 + Math.random() * 6) + 's');
            field.appendChild(mEl);
            meteors.push({ el: mEl, x: mX, y: mY, w: mSize, h: mSize });
        }
        Engine.sceneCtn.appendChild(field);

        var shipY = fieldH / 2 - shipH / 2;
        var shipX = 120;
        var speed = 4;
        var scrollSpeed = 2;
        var keys = {};
        var running = true;
        var won = false;
        ship.style.top = shipY + 'px';

        Engine.fadeIn(1500).then(function () {
            Engine.showPrompt('W/S TUŞLARI İLE HAREKET EDİN');
            Engine.inputHandler = function (e) {
                if (e.code === 'Space' && won) {
                    e.preventDefault();
                    Engine.inputHandler = null;
                    running = false;
                    Engine.hideCongrats(); Engine.hidePrompt();
                    Engine.fadeOut(3000).then(function () { Engine.setScene(G.step3After); });
                    return;
                }
                if (e.type === 'keydown') keys[e.code] = true;
            };
            document.addEventListener('keyup', function onUp(e) {
                keys[e.code] = false;
                if (!running) document.removeEventListener('keyup', onUp);
            });
            function gameLoop() {
                if (!running) return;
                if (keys['KeyW'] || keys['ArrowUp']) shipY -= speed;
                if (keys['KeyS'] || keys['ArrowDown']) shipY += speed;
                shipY = Math.max(0, Math.min(fieldH - shipH, shipY));
                ship.style.top = shipY + 'px';
                scrollOffset += scrollSpeed;
                shipX = 120 + scrollOffset;
                ship.style.left = shipX + 'px';
                // Update HUD
                var distEl = document.getElementById('mg-dist');
                if (distEl) {
                    var pct = Math.min(100, Math.round((scrollOffset / (fieldW * 0.85 - 120)) * 100));
                    distEl.textContent = pct + '%';
                }
                var shipRect = { x: shipX, y: shipY, w: shipW, h: shipH };
                var hit = false;
                for (var j = 0; j < meteors.length; j++) {
                    var m = meteors[j];
                    if (shipRect.x < m.x + m.w && shipRect.x + shipRect.w > m.x && shipRect.y < m.y + m.h && shipRect.y + shipRect.h > m.y) {
                        hit = true;
                        break;
                    }
                }
                if (hit) {
                    running = false;
                    Engine.hidePrompt();
                    // Collision flash
                    var flash = document.createElement('div');
                    flash.className = 'collision-flash';
                    document.body.appendChild(flash);
                    setTimeout(function () { flash.remove(); }, 500);
                    Engine.showDialogueInstant('Bir meteora çarptınız! Tekrar deneniyor...');
                    setTimeout(function () { Engine.hideDialogue(); Engine.setScene(G.step3Minigame); }, 1500);
                    return;
                }
                if (shipX > fieldW * 0.85) {
                    won = true;
                    var moonEl = document.getElementById('mg-moon');
                    if (moonEl) moonEl.classList.add('visible');
                    Engine.hidePrompt();
                    Engine.showCongrats();
                    Engine.showPrompt('SPACE TUŞUNA BASIN');
                    return;
                }
                requestAnimationFrame(gameLoop);
            }
            var scrollOffset = 0;
            requestAnimationFrame(gameLoop);
        });
    };

    // ===== STEP 3 — AFTER GAME =====
    G.step3After = function () {
        Engine.saveGame('step3_after', gameData);
        buildCockpit(false, true);
        Engine.blackScreen();
        var icYapiText = "Astro: Aslında Dünya'ya benzer şekilde katmanlıdır ve merkezden yüzeye doğru yoğun metalik bir çekirdek, kalın bir manto ve ince bir kabuktan oluşur. Demir ağırlıklı katı bir iç çekirdek ile onu çevreleyen sıvı dış çekirdeğe sahiptir. Manto yoğun, kabuk ise kayalıktır.";
        var volkanText = "Astro: Ay'da şu an aktif volkan bulunmamaktadır, ancak yüzeydeki karanlık bölgelerin yani mariaların, milyarlarca yıl önce meydana gelen devasa volkanik patlamalarla oluştuğu bilinmektedir. Milyarlarca yıl önce yoğun volkanik faaliyetlerin yaşandığı Ay'da küçük ölçekli volkanik aktivitelerin gerçekleşmiş olabileceğine dair kanıtlar bulunsa da yüzey sönüktür.";
        var questionText, answerText;
        if (gameData.questionChoice === 'icyapi') {
            questionText = "Oyuncu: Ay'da volkan var mıydı?";
            answerText = volkanText;
        } else {
            questionText = "Oyuncu: Ay'ın iç yapısıyla ilgili neler biliyorsun?";
            answerText = icYapiText;
        }
        Engine.fadeIn(1500).then(function () {
            Engine.showDialogue(questionText, function () {
                Engine.showPrompt('SPACE TUŞUNA BASIN');
                Engine.waitKey('Space', function () {
                    Engine.hidePrompt();
                    Engine.showDialogue(answerText, function () {
                        Engine.showPrompt('SPACE TUŞUNA BASIN');
                        Engine.waitKey('Space', function () {
                            Engine.hidePrompt(); Engine.hideDialogue();
                            step4Intro();
                        });
                    });
                });
            });
        });
        function step4Intro() {
            Engine.showDialogue("Astro: Hadi, son bir görevin kaldı. Ay üzerinde hali hazırda bulunan AYAP-2'yi uzaktan kontrol edip Ay'dan 1 tane örnek topla. Ben sana toplaman gereken örneklerin ipucunu vereceğim!", function () {
                Engine.showPrompt('SPACE TUŞUNA BASIN');
                Engine.waitKey('Space', function () {
                    Engine.hidePrompt(); Engine.hideDialogue();
                    Engine.fadeOut(1500).then(function () { Engine.setScene(G.step4Minigame); });
                });
            });
        }
    };

    // ===== STEP 4 — ROCK COLLECTION (Enhanced with camera HUD & Earth) =====
    G.step4Minigame = function () {
        Engine.showSpaceBg();
        Engine.blackScreen();
        Engine.saveGame('step4_mini', gameData);
        Engine.sceneCtn.innerHTML = '';
        var scene = document.createElement('div');
        scene.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';

        // Earth in sky
        var skyMoon = document.createElement('img');
        skyMoon.src = 'photos/yarımay.png';
        skyMoon.className = 'sky-moon-photo';
        scene.appendChild(skyMoon);

        // Moon horizon mountains
        var horizon = document.createElement('div');
        horizon.className = 'moon-horizon';
        for (var m = 0; m < 5; m++) {
            var mt = document.createElement('div');
            mt.className = 'moon-mountain';
            mt.style.left = (m * 22) + '%';
            mt.style.width = (15 + Math.random() * 10) + '%';
            mt.style.height = (20 + Math.random() * 35) + 'px';
            scene.appendChild(mt);
        }

        var ground = document.createElement('div');
        ground.className = 'moon-ground';
        ground.innerHTML = '<div class="moon-crater" style="width:45px;height:22px;bottom:60%;left:20%;position:absolute;"></div>' +
            '<div class="moon-crater" style="width:32px;height:16px;bottom:30%;left:60%;position:absolute;"></div>' +
            '<div class="moon-crater" style="width:55px;height:28px;bottom:50%;left:80%;position:absolute;"></div>';
        scene.appendChild(ground);

        // Camera HUD
        scene.innerHTML += '<div class="camera-overlay"></div>' +
            '<div class="camera-hud"><div class="camera-rec">REC</div><div class="camera-timestamp">AYAP-2 // 2038.06.15</div></div>' +
            '<div class="camera-crosshair"></div>' +
            '<div class="camera-crack camera-crack-1"></div>' +
            '<div class="camera-crack camera-crack-2"></div>' +
            '<div class="camera-crack camera-crack-3"></div>';

        var rock1 = document.createElement('div');
        rock1.className = 'rock rock-1';
        rock1.innerHTML = '<img src="photos/deliksiz.png" class="rock-img" alt="Kayaç 1"><div class="rock-label">'+T('KAYAÇ 1')+'</div>';
        scene.appendChild(rock1);
        var rock2 = document.createElement('div');
        rock2.className = 'rock rock-2';
        rock2.innerHTML = '<img src="photos/parlak delikli.png" class="rock-img" alt="Kayaç 2"><div class="rock-label">'+T('KAYAÇ 2')+'</div>';
        scene.appendChild(rock2);
        var rock3 = document.createElement('div');
        rock3.className = 'rock rock-3';
        rock3.innerHTML = '<img src="photos/matdelikli.png" class="rock-img" alt="Kayaç 3"><div class="rock-label">'+T('KAYAÇ 3')+'</div>';
        scene.appendChild(rock3);
        Engine.sceneCtn.appendChild(scene);

        var astroHint = document.createElement('div');
        astroHint.className = 'astro-character astro-corner';
        astroHint.innerHTML = '<img src="photos/astro.png" alt="Astro" style="width:80px;">';
        Engine.sceneCtn.appendChild(astroHint);

        var highlighted = 0;
        var rocks = [rock1, rock2, rock3];
        function updateHighlight() {
            rocks.forEach(function (r, i) { r.classList.toggle('highlighted', i === highlighted); });
        }
        Engine.fadeIn(1500).then(function () {
            Engine.showDialogue("Astro: Parlak ve delikli olan kayacı topla! A/D ile seç, X ile topla.", function () {
                updateHighlight();
                Engine.inputHandler = function (e) {
                    if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
                        e.preventDefault();
                        highlighted = (highlighted - 1 + 3) % 3;
                        updateHighlight();
                    } else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
                        e.preventDefault();
                        highlighted = (highlighted + 1) % 3;
                        updateHighlight();
                    } else if (e.code === 'KeyX') {
                        e.preventDefault();
                        Engine.inputHandler = null;
                        if (highlighted === 1) {
                            Engine.hideDialogue();
                            Engine.showCongrats();
                            Engine.showPrompt('SPACE TUŞUNA BASIN');
                            Engine.waitKey('Space', function () {
                                Engine.hideCongrats(); Engine.hidePrompt();
                                Engine.fadeOut(3000).then(function () { Engine.setScene(G.finale); });
                            });
                        } else {
                            Engine.showDialogueInstant('Yanlış kayaç! Tekrar deneyin...');
                            setTimeout(function () { Engine.hideDialogue(); Engine.setScene(G.step4Minigame); }, 1500);
                        }
                    }
                };
            });
        });
    };

    // ===== FINALE (Enhanced with CRT + ticker) =====
    G.finale = function () {
        Engine.hideSpaceBg();
        Engine.blackScreen();
        Engine.saveGame('finale', gameData);
        Engine.sceneCtn.innerHTML = '';
        var scene = document.createElement('div');
        scene.className = 'news-scene';
        scene.innerHTML =
            '<div class=\"news-title\">' + T('SON DAKİKA') + '</div>' +
            '<div class="news-screen-bg"></div>' +
            '<div class="news-text" id="news-text"></div>' +
            '<div class="news-desk"></div>' +
            "<div class=\"news-banner\"><div class=\"news-banner-text\">T\u00dcRK UZAY AJANSI \u2014 AYAP-3 BA\u015eARIYLA TAMAMLANDI  \u25cf  T\u00dcRK\u0130YE AY'A ULA\u015eTI  \u25cf  AYAP-3 BA\u015eARILI  \u25cf</div></div>";
        Engine.sceneCtn.appendChild(scene);
        var newsTextEl = document.getElementById('news-text');
        var newsContent = "2038 yılı itibariyle Türkiye'nin AYAP-1, AYAP-2 ve şuanlık sonuncusu olan AYAP-3'ün başarıyla bittiğini söylemekten gurur duyarız, umuyoruz ki Türk milletini böyle başarılı görmeye devam ederiz…";
        Engine.fadeIn(1500).then(function () {
            Engine.typewriter(newsTextEl, newsContent, 40, function () {
                Engine.showPrompt('SPACE TUŞUNA BASIN');
                Engine.waitKey('Space', function () {
                    Engine.hidePrompt();
                    Engine.fadeOut(2000).then(function () { showEnd(); });
                });
            });
        });
        function showEnd() {
            Engine.sceneCtn.innerHTML = '';
            Engine.hideSpaceBg();
            // Letterbox bars
            var lbTop = document.createElement('div');
            lbTop.className = 'letterbox-top';
            var lbBot = document.createElement('div');
            lbBot.className = 'letterbox-bottom';
            Engine.sceneCtn.appendChild(lbTop);
            Engine.sceneCtn.appendChild(lbBot);
            var endTxt = document.createElement('div');
            endTxt.className = 'end-text';
            Engine.sceneCtn.appendChild(endTxt);
            Engine.overlay.style.transition = 'opacity 0.5s ease';
            Engine.overlay.style.opacity = '0';
            Engine.overlay.style.pointerEvents = 'none';
            Engine.typewriter(endTxt, T('SON…'), 200, function () {
                Engine.deleteSave();
                setTimeout(function () {
                    Engine.showPrompt(T('OYUN BİTTİ — TEKRAR OYNAMAK İÇİN SPACE TUŞUNA BASIN'));
                    Engine.waitKey('Space', function () { location.reload(); });
                }, 2000);
            });
        }
    };

    // ==========================================================
    // UYKM — UZAY YER KONTROL MUHENDiSi
    // ==========================================================

    var REGIONS = [
        {
            id: 'maria', name: 'Ay Denizleri (Maria)', css: 'region-img-maria',
            desc: "Ay'in yuzeyindeki genis, koyu renkli duzluklerdir. Dev goktaslarinin carpmasi sonucu olusan derin cukurlara bazaltik lavlarin dolmasiyla olusmislardir. Icerdikleri demir ve magnezyum nedeniyle koyu renktedir."
        },
        {
            id: 'highlands', name: 'Ay Daglik Bolgeleri (Highlands)', css: 'region-img-highlands',
            desc: "Ay'in acik renkli, engebeli ve cok eski olan kisimlardir. Aluminyum bakimindan zengin Anortozit taslari nedeniyle acik renklidir. Milyarlarca yil boyunca goktasi bombardimanina tutuldugu icin asiri derecede kraterli ve daglikdir."
        },
        {
            id: 'craters', name: 'Carpma Kraterleri', css: 'region-img-craters',
            desc: "Ay'in neredeyse her yerinde bulunurlar. Atmosfer olmadigi icin goktaslari yanmadan dogrudan yuzeye carpar. Genellikle daireseldir ve bazi genc kraterlerden beyaz isik cizgileri uzanir."
        },
        {
            id: 'poles', name: 'Ay Kutuplari ve Kalici Golge Bolgeleri', css: 'region-img-poles',
            desc: "Gunes isiginin neredeyse hic ulasmadigi, kraterlerin icindeki cok derin bolgelerdir. Sicaklik hicbir zaman yukselmez (yaklasik -230C). Bu soguk tuzaklar icinde su buzu yataklarinin oldugu tespit edilmistir."
        }
    ];

    // ===== SPACE TRANSITION HELPER =====
    G.uykm_spaceTransition = function (nextFn) {
        Engine.fadeOut(800).then(function () {
            Engine.sceneCtn.innerHTML = '';
            Engine.showSpaceBg();
            var st = document.createElement('div');
            st.className = 'space-transition';
            st.innerHTML = '<div class="st-text">AYAP-3</div>';
            document.body.appendChild(st);
            Engine.overlay.style.transition = 'opacity 0.8s ease';
            Engine.overlay.style.opacity = '0';
            Engine.overlay.style.pointerEvents = 'none';
            setTimeout(function () {
                Engine.fadeOut(800).then(function () {
                    st.remove();
                    Engine.setScene(nextFn);
                    Engine.fadeIn(800);
                });
            }, 3000);
        });
    };

    // ===== SAHNE 1 — EMAIL =====
    G.uykm_s1Email = function () {
        Engine.hideSpaceBg();
        Engine.saveGame('uykm_s1', gameData);
        Engine.sceneCtn.innerHTML = '';

        buildEmailRoom();
        Engine.fadeIn(2500).then(function () {
            // Switch to ringing phone (telefon2)
            var phoneImg = document.getElementById('uykm-phone-img');
            if (phoneImg) {
                phoneImg.src = 'photos/telefon2.jpeg';
                phoneImg.classList.add('ringing');
            }
            Engine.showPrompt('TELEFONU KONTROL ETMEK ICIN SPACE TUSUNA BASIN');
            Engine.waitKey('Space', function () {
                Engine.hidePrompt();
                // Switch to open phone (telefon3)
                if (phoneImg) {
                    phoneImg.src = 'photos/telefon3.jpeg';
                    phoneImg.classList.remove('ringing');
                }
                showEmailBubble();
            });
        });

        function buildEmailRoom() {
            var room = document.createElement('div');
            room.className = 'bedroom';
            room.style.cssText = 'background:url(photos/oda.jpeg) center/cover no-repeat;';

            var phoneImg = document.createElement('img');
            phoneImg.src = 'photos/telefon1.jpeg';
            phoneImg.className = 'phone-photo';
            phoneImg.id = 'uykm-phone-img';
            room.appendChild(phoneImg);

            Engine.sceneCtn.appendChild(room);
        }

        function showEmailBubble() {
            var phoneImg = document.getElementById('uykm-phone-img');
            if (!phoneImg) return;
            // Create a wrapper for bubble positioning
            var wrapper = phoneImg.parentElement;
            var bubble = document.createElement('div');
            bubble.className = 'speech-bubble email-bubble';
            var bText = document.createElement('span');
            bubble.appendChild(bText);
            wrapper.appendChild(bubble);
            var emailContent = "AYAP-3'ten gelen Ay yorungesinde bir uyduyu yonetmek ve Ay'daki bolgeleri incelemek icin olan is basvurunuz denenmek icin kabul edilmistir. Sizden elinizden gelenin en iyisini yapmanizi, devletinizi gururlandiracaginizi umit ediyoruz.";
            Engine.typewriter(bText, emailContent, 25, function () {
                Engine.showPrompt('DEVAM ETMEK ICIN SPACE TUSUNA BASIN');
                Engine.waitKey('Space', function () {
                    Engine.hidePrompt();
                    G.uykm_spaceTransition(G.uykm_s2Orbit);
                });
            });
        }
    };

    // ===== SAHNE 2 — UYDU YORUNGE YONETIMI (99sn) =====
    G.uykm_s2Orbit = function () {
        Engine.hideSpaceBg();
        Engine.blackScreen();
        Engine.saveGame('uykm_s2', gameData);
        Engine.sceneCtn.innerHTML = '';

        // Build control room
        var room = document.createElement('div');
        room.className = 'control-room';
        room.innerHTML =
            '<div class="cr-wall"></div><div class="cr-floor"></div>' +
            '<div class="cr-desk"></div><div class="cr-ceiling-light"></div>';

        // Orbit view
        var ov = document.createElement('div');
        ov.className = 'orbit-view';
        ov.innerHTML =
            '<div class="orbit-ring" id="orbit-ring"></div>' +
            '<img src="photos/ay.png" class="orbit-moon orbit-moon-photo" alt="Ay">' +
            '<div class="satellite" id="sat"><div class="satellite-panel-l"></div><div class="satellite-body"></div><div class="satellite-panel-r"></div></div>' +
            '<div class="orbit-fix-counter" id="fix-counter">0/10</div>' +
            '<div class="orbit-warning-text" id="orbit-warn" style="display:none">'+T('! UYDU YORUNGEDEN CIKIYOR !')+'</div>';
        room.appendChild(ov);

        // HUD
        var hud = document.createElement('div');
        hud.className = 'orbit-hud';
        hud.innerHTML = '<div class=\"orbit-timer-label\">' + T('KALAN SURE') + '</div><div class=\"orbit-timer\" id=\"orbit-timer\">99</div>';
        room.appendChild(hud);

        Engine.sceneCtn.appendChild(room);

        // State
        var TOTAL_TIME = 99;
        var BREAK_INTERVAL = 20;
        var FIX_PRESSES = 10;
        var WARN_TIME = 5;
        var FAIL_TIME = 10;
        var elapsed = 0;
        var orbitBroken = false;
        var brokenAt = 0;
        var fixCount = 0;
        var warned = false;
        var failed = false;
        var completed = false;
        var angle = 0;
        var driftOffset = 0;
        var lastBreakTime = 0;
        var astroSubEl = null;

        // Astro dialogues
        var dialogues = [
            { at: 2, text: "Selam dostum, hos geldin. AYAP'in ilk gorevinin 2026'da gerceklestigini biliyorsun degil mi? Ayrica sonraki AYAP-2 ise 2028'de gerceklesti ve biz de simdi 2038'de AYAP-3'u gerceklestiriyoruz. Bence bu cok gurur verici bir sey. Hmm... Dusundum de Turkiye durmadan ilerleyen bir ulke, umarim hep boyle olur." },
            { at: 30, text: "Biliyor musun, Ay yuzeyindeki ayak izleri milyonlarca yil boyunca silinmeyecek. Cunku Ay'da ruzgar ya da yagmur yok!" },
            { at: 55, text: "Ay'in Dunya'dan her yil yaklasik 3.8 cm uzaklastigini da ekleyeyim. Yillar sonra tutulmalar da tamamen farkli gorunecek!" },
            { at: 90, text: "Son olarak Ay'in kokusu oldugunu ve Ay tozlarinin Dunya'ya getirildiginde ise kokunun yok oldugunu bilmeni isterim." }
        ];
        var dialogueIdx = 0;

        function showAstroSub(text) {
            removeAstroSub();
            astroSubEl = document.createElement('div');
            astroSubEl.className = 'astro-subtitle';
            astroSubEl.innerHTML =
                '<img src="photos/astro.png" class="astro-subtitle-img">' +
                '<div class="astro-subtitle-box"><div class="astro-subtitle-name">ASTRO</div><span class="astro-sub-text"></span></div>';
            document.body.appendChild(astroSubEl);
            var tEl = astroSubEl.querySelector('.astro-sub-text');
            Engine.typewriter(tEl, text, 30);
        }

        function removeAstroSub() {
            if (astroSubEl) { astroSubEl.remove(); astroSubEl = null; }
        }

        function showOrbitWarning() {
            var w = document.getElementById('orbit-warn');
            if (w) w.style.display = 'block';
            var ring = document.getElementById('orbit-ring');
            if (ring) ring.classList.add('warning');
            var fc = document.getElementById('fix-counter');
            if (fc) fc.classList.add('active');
        }

        function hideOrbitWarning() {
            var w = document.getElementById('orbit-warn');
            if (w) w.style.display = 'none';
            var ring = document.getElementById('orbit-ring');
            if (ring) ring.classList.remove('warning');
            var fc = document.getElementById('fix-counter');
            if (fc) { fc.classList.remove('active'); fc.textContent = '0/' + FIX_PRESSES; }
        }

        function showFail(msg) {
            failed = true;
            removeAstroSub();
            var fo = document.createElement('div');
            fo.className = 'fail-overlay';
            fo.innerHTML =
                '<div class="astro-popup"><img src="photos/astro.png"><div class="speech-bubble">' + msg + '</div></div>';
            var btn = document.createElement('button');
            btn.className = 'retry-btn';
            btn.textContent = 'TEKRAR OYNA';
            btn.addEventListener('click', function () {
                fo.remove();
                Engine.setScene(G.uykm_s2Orbit);
            });
            fo.appendChild(btn);
            document.body.appendChild(fo);
        }

        // Satellite position update
        var viewW = 420, viewH = 350;
        var cx = viewW / 2, cy = viewH / 2, radius = 140;

        function updateSatellite() {
            var sat = document.getElementById('sat');
            if (!sat) return;
            var x, y;
            if (orbitBroken) {
                driftOffset += 0.3;
                x = cx + (radius + driftOffset) * Math.cos(angle) - 10;
                y = cy + (radius + driftOffset) * Math.sin(angle) - 6;
            } else {
                x = cx + radius * Math.cos(angle) - 10;
                y = cy + radius * Math.sin(angle) - 6;
                driftOffset = 0;
            }
            sat.style.left = x + 'px';
            sat.style.top = y + 'px';
            sat.classList.toggle('drifting', orbitBroken);
        }

        // Main loop
        var loopId;
        var lastTime = Date.now();

        function gameLoop() {
            if (failed || completed) return;
            var now = Date.now();
            var dt = (now - lastTime) / 1000;
            lastTime = now;
            elapsed += dt;
            angle += dt * 0.8;

            // Timer
            var remaining = Math.max(0, Math.ceil(TOTAL_TIME - elapsed));
            var timerEl = document.getElementById('orbit-timer');
            if (timerEl) timerEl.textContent = remaining;

            // Check orbit break
            if (!orbitBroken && elapsed - lastBreakTime >= BREAK_INTERVAL && elapsed < TOTAL_TIME - 5) {
                orbitBroken = true;
                brokenAt = elapsed;
                fixCount = 0;
                warned = false;
                showOrbitWarning();
                var fc2 = document.getElementById('fix-counter');
                if (fc2) fc2.textContent = '0/' + FIX_PRESSES;
            }

            // Check broken time
            if (orbitBroken) {
                var brokenDur = elapsed - brokenAt;
                if (brokenDur >= WARN_TIME && !warned) {
                    warned = true;
                    showAstroSub('Olamaz uydu yorungeden cikiyor daha da dikkat etmelisin dostum!');
                }
                if (brokenDur >= FAIL_TIME) {
                    showFail('Maalesef uyduyu kontrol edemedin tekrar denesene');
                    return;
                }
            }

            // Astro dialogue
            if (dialogueIdx < dialogues.length && elapsed >= dialogues[dialogueIdx].at && !orbitBroken) {
                showAstroSub(dialogues[dialogueIdx].text);
                dialogueIdx++;
            }

            // Completion
            if (elapsed >= TOTAL_TIME) {
                completed = true;
                hideOrbitWarning();
                gameData.orbitScore = 40;
                removeAstroSub();
                showAstroSub(dialogues[dialogues.length - 1].text);
                setTimeout(function () {
                    removeAstroSub();
                    G.uykm_spaceTransition(G.uykm_s3Match);
                }, 4000);
                return;
            }

            updateSatellite();
            loopId = requestAnimationFrame(gameLoop);
        }

        // Input
        Engine.inputHandler = function (e) {
            if (e.code === 'Space' && orbitBroken && !failed && !completed) {
                e.preventDefault();
                fixCount++;
                var fc3 = document.getElementById('fix-counter');
                if (fc3) fc3.textContent = fixCount + '/' + FIX_PRESSES;
                if (fixCount >= FIX_PRESSES) {
                    orbitBroken = false;
                    lastBreakTime = elapsed;
                    hideOrbitWarning();
                    driftOffset = 0;
                }
            }
        };

        Engine.fadeIn(1500).then(function () {
            lastTime = Date.now();
            gameLoop();
        });
    };

    // ===== SAHNE 3 — BOLGE ESLESTIRME =====
    G.uykm_s3Match = function () {
        Engine.showSpaceBg();
        Engine.blackScreen();
        Engine.saveGame('uykm_s3', gameData);
        Engine.sceneCtn.innerHTML = '';

        // Shuffled images (left side)
        var shuffled = REGIONS.slice();
        for (var si = shuffled.length - 1; si > 0; si--) {
            var sj = Math.floor(Math.random() * (si + 1));
            var tmp = shuffled[si]; shuffled[si] = shuffled[sj]; shuffled[sj] = tmp;
        }

        var container = document.createElement('div');
        container.className = 'match-container';

        // Left: images
        var leftDiv = document.createElement('div');
        leftDiv.className = 'match-left';
        shuffled.forEach(function (r) {
            var thumb = document.createElement('div');
            thumb.className = 'region-thumb ' + r.css;
            thumb.dataset.regionId = r.id;
            thumb.addEventListener('click', function () { selectImage(thumb); });
            leftDiv.appendChild(thumb);
        });

        // Right: descriptions
        var rightDiv = document.createElement('div');
        rightDiv.className = 'match-right';
        REGIONS.forEach(function (r) {
            var card = document.createElement('div');
            card.className = 'match-desc-card';
            card.dataset.regionId = r.id;
            card.innerHTML = '<div class="match-desc-title">' + r.name + '</div><div class="match-desc-text">' + r.desc + '</div>';
            card.addEventListener('click', function () { selectDesc(card); });
            rightDiv.appendChild(card);
        });

        container.appendChild(leftDiv);
        container.appendChild(rightDiv);
        Engine.sceneCtn.appendChild(container);

        // Astro intro
        var astroEl = document.createElement('div');
        astroEl.className = 'astro-subtitle';
        astroEl.innerHTML =
            '<img src="photos/astro.png" class="astro-subtitle-img">' +
            '<div class="astro-subtitle-box"><div class="astro-subtitle-name">ASTRO</div>' +
            'Burada ismi ve ozellikleri verilen Ay bolge turlerinin karisik verilmis resimleriyle eslestiricez. Kolay gelsin &lt;3</div>';
        document.body.appendChild(astroEl);

        var selectedImg = null;
        var selectedDesc = null;
        var matchedCount = 0;

        function selectImage(el) {
            if (el.classList.contains('matched')) return;
            leftDiv.querySelectorAll('.region-thumb').forEach(function (t) { t.classList.remove('selected'); });
            el.classList.add('selected');
            selectedImg = el;
            tryMatch();
        }

        function selectDesc(el) {
            if (el.classList.contains('matched')) return;
            rightDiv.querySelectorAll('.match-desc-card').forEach(function (c) { c.classList.remove('selected'); });
            el.classList.add('selected');
            selectedDesc = el;
            tryMatch();
        }

        function tryMatch() {
            if (!selectedImg || !selectedDesc) return;
            var imgId = selectedImg.dataset.regionId;
            var descId = selectedDesc.dataset.regionId;

            if (imgId === descId) {
                // Correct
                selectedImg.classList.remove('selected');
                selectedImg.classList.add('matched');
                selectedDesc.classList.remove('selected');
                selectedDesc.classList.add('matched');
                matchedCount++;
                selectedImg = null;
                selectedDesc = null;

                if (matchedCount === 4) {
                    // All matched!
                    astroEl.remove();
                    var popup = document.createElement('div');
                    popup.className = 'fail-overlay';
                    popup.innerHTML =
                        '<div class="astro-popup"><img src="photos/astro.png"><div class="speech-bubble">'+T('Tebrik ederim! Cok guzel is cikardin!')+'</div></div>';
                    var btn = document.createElement('button');
                    btn.className = 'success-btn';
                    btn.textContent = 'DEVAM ET';
                    btn.addEventListener('click', function () {
                        popup.remove();
                        G.uykm_spaceTransition(G.uykm_s4Score);
                    });
                    popup.appendChild(btn);
                    document.body.appendChild(popup);
                }
            } else {
                // Wrong
                selectedImg.classList.add('wrong');
                selectedDesc.classList.add('wrong');
                setTimeout(function () {
                    astroEl.remove();
                    var popup = document.createElement('div');
                    popup.className = 'fail-overlay';
                    popup.innerHTML =
                        '<div class="astro-popup"><img src="photos/astro.png"><div class="speech-bubble">'+T('Maalesef yanlis eslestirdin, bence tekrar dene')+'</div></div>';
                    var btn = document.createElement('button');
                    btn.className = 'retry-btn';
                    btn.textContent = 'TEKRAR DENE';
                    btn.addEventListener('click', function () {
                        popup.remove();
                        Engine.setScene(G.uykm_s3Match);
                    });
                    popup.appendChild(btn);
                    document.body.appendChild(popup);
                }, 600);
            }
        }

        Engine.fadeIn(1000);
    };

    // ===== SAHNE 4 — PUANLAMA =====
    G.uykm_s4Score = function () {
        Engine.showSpaceBg();
        Engine.blackScreen();
        Engine.saveGame('uykm_s4', gameData);
        Engine.sceneCtn.innerHTML = '';

        var orbitPts = gameData.orbitScore || 0;
        var matchPts = 60; // all 4 matched correctly to reach here
        var total = orbitPts + matchPts;

        var screen = document.createElement('div');
        screen.className = 'score-result-screen';

        var title = document.createElement('div');
        title.className = 'score-result-title';
        title.textContent = 'GOREV SONUCU';
        screen.appendChild(title);

        // Scoreboard
        var sb = document.createElement('div');
        sb.className = 'scoreboard';
        sb.style.cssText = 'position:relative;top:auto;right:auto;';
        sb.innerHTML = '<div class=\"scoreboard-label\">' + T('TOPLAM PUAN') + '</div><div class=\"scoreboard-value\">' + total + '</div>';
        screen.appendChild(sb);

        // Breakdown
        var breakdown = document.createElement('div');
        breakdown.style.cssText = 'text-align:center;margin-top:10px;';
        breakdown.innerHTML =
            '<div style="font-size:13px;color:rgba(255,255,255,0.5);margin-bottom:4px;">Yorunge: ' + orbitPts + '/40</div>' +
            '<div style="font-size:13px;color:rgba(255,255,255,0.5);">Eslestirme: ' + matchPts + '/60</div>';
        screen.appendChild(breakdown);

        var msg = document.createElement('div');
        msg.className = 'score-result-msg';

        if (total >= 70) {
            msg.textContent = 'Tebrikler! Bu etabi da gecerek bizimle calismaya hak kazandiniz!';
            screen.appendChild(msg);
            var btn = document.createElement('button');
            btn.className = 'success-btn';
            btn.textContent = 'DEVAM ET';
            btn.addEventListener('click', function () {
                G.uykm_spaceTransition(G.uykm_s5News);
            });
            screen.appendChild(btn);
        } else {
            msg.textContent = 'Maalesef yeterli puani toplayamadiniz.';
            screen.appendChild(msg);
            var btn2 = document.createElement('button');
            btn2.className = 'retry-btn';
            btn2.textContent = 'GOREVDE BASA DON';
            btn2.addEventListener('click', function () {
                gameData.orbitScore = 0;
                Engine.setScene(G.uykm_s1Email);
            });
            screen.appendChild(btn2);
        }

        Engine.sceneCtn.appendChild(screen);
        Engine.fadeIn(1000);
    };

    // ===== SAHNE 5 — GAZETE + SON =====
    G.uykm_s5News = function () {
        Engine.hideSpaceBg();
        Engine.blackScreen();
        Engine.saveGame('uykm_s5', gameData);
        Engine.sceneCtn.innerHTML = '';

        var np = document.createElement('div');
        np.className = 'newspaper';
        np.innerHTML =
            '<div class="newspaper-header">' +
            '  <div class="newspaper-masthead">Turkiye Uzay Ajansi Bulteni</div>' +
            '  <div class="newspaper-date">15 Haziran 2038 — Ozel Sayi</div>' +
            '</div>' +
            '<div class="newspaper-title">TUA\'nin Gelecegi Genc Muhendise Emanet: Ay Misyonunda Yeni Donem!</div>' +
            '<div class="newspaper-body">' +
            'Turkiye Uzay Ajansi, AYAP-1 ve AYAP-2 gorevlerinin yer kontrol operasyonlarini yonetecek yeni muhendisini, aylar suren teknik bakimlari ve kriz sinav yonetimlerini daha sonra secti. Derin uzay haberlesmes ve ucus mekanigi gibi zorlu asamalardan tam olarak rakiplerini geride birakan genc yetenek, yer kontrol masasindaki yerini resmen aldi. TUA, bu kritik atamanin Ay\'a yapilacak sert ve yumusak cikis stratejilerinde kilit rol oynayacagini belirterek, yeni muhendislerin adim adim hizla ilerledigini duyurdu.' +
            '</div>';
        Engine.sceneCtn.appendChild(np);

        Engine.fadeIn(1500);

        // 20 seconds then end
        setTimeout(function () {
            Engine.fadeOut(2000).then(function () {
                showUykmEnd();
            });
        }, 20000);

        function showUykmEnd() {
            Engine.sceneCtn.innerHTML = '';
            Engine.hideSpaceBg();
            var lbTop = document.createElement('div');
            lbTop.className = 'letterbox-top';
            var lbBot = document.createElement('div');
            lbBot.className = 'letterbox-bottom';
            Engine.sceneCtn.appendChild(lbTop);
            Engine.sceneCtn.appendChild(lbBot);
            var endTxt = document.createElement('div');
            endTxt.className = 'end-text';
            Engine.sceneCtn.appendChild(endTxt);
            Engine.overlay.style.transition = 'opacity 0.5s ease';
            Engine.overlay.style.opacity = '0';
            Engine.overlay.style.pointerEvents = 'none';
            Engine.typewriter(endTxt, 'SON...', 200, function () {
                Engine.deleteSave();
                setTimeout(function () {
                    Engine.showPrompt('OYUN BITTI -- TEKRAR OYNAMAK ICIN SPACE TUSUNA BASIN');
                    Engine.waitKey('Space', function () { location.reload(); });
                }, 2000);
            });
        }
    };

    // ==========================================================
    // UM — UZAY MUHENDiSi
    // ==========================================================

    var ROCKET_PARTS = [
        { id: 'nose', name: 'BURUN KONISI', css: 'rm-nose' },
        { id: 'upper', name: 'UST GOVDE', css: 'rm-upper' },
        { id: 'main', name: 'ANA GOVDE', css: 'rm-main' },
        { id: 'lower', name: 'ALT GOVDE', css: 'rm-lower' },
        { id: 'fins', name: 'KANATCIKLAR', css: 'rm-fins' }
    ];

    var MATERIALS = [
        { id: 'carbon', name: 'Karbon Fiber', pos: 'mat-tl', css: 'mat-carbon' },
        { id: 'aluminum', name: 'Aluminyum Alasim', pos: 'mat-tr', css: 'mat-aluminum' },
        { id: 'steel', name: 'Paslanmaz Celik', pos: 'mat-bl', css: 'mat-steel' },
        { id: 'titanium', name: 'Titanyum Alasim', pos: 'mat-br', css: 'mat-titanium' }
    ];

    // Subtitle helper
    function showSubtitle(speaker, text, callback) {
        var existing = Engine.sceneCtn.querySelector('.subtitle-bar');
        if (existing) existing.remove();
        var bar = document.createElement('div');
        bar.className = 'subtitle-bar';
        bar.innerHTML = '<div class=\"sub-speaker\">' + T(speaker) + '</div>';
        var tEl = document.createElement('span');
        tEl.className = 'sub-text';
        bar.appendChild(tEl);
        Engine.sceneCtn.appendChild(bar);
        Engine.typewriter(tEl, text, 25, callback);
    }

    // ===== SAHNE 1 — IS TEKLIFI =====
    G.um_s1Offer = function () {
        Engine.hideSpaceBg();
        Engine.saveGame('um_s1', gameData);
        Engine.sceneCtn.innerHTML = '';

        buildOffice();
        Engine.fadeIn(2000).then(function () {
            showSubtitle('TUA EKIBI',
                'TUA Ajansindan geliyoruz ve uygun uzay aracini tasarlanmasi icin sana ihtiyacimiz var. Teklifimizi kabul edip calismaya baslamanizi istiyoruz.',
                function () {
                    Engine.showPrompt('DEVAM ETMEK ICIN SPACE TUSUNA BASIN');
                    Engine.waitKey('Space', function () {
                        Engine.hidePrompt();
                        showSubtitle('MUHENDIS',
                            'Evet sizinle calismaktan mutluluk ve gurur duyarim.',
                            function () {
                                Engine.showPrompt('TESISE GECMEK ICIN SPACE TUSUNA BASIN');
                                Engine.waitKey('Space', function () {
                                    Engine.hidePrompt();
                                    G.uykm_spaceTransition(G.um_s2Assembly);
                                });
                            });
                    });
                });
        });

        function buildOffice() {
            var office = document.createElement('div');
            office.className = 'office-scene';
            office.innerHTML =
                '<div class="office-wall"></div>' +
                '<div class="office-floor"></div>' +
                '<div class="office-desk"></div>' +
                '<div class="office-monitor"></div>' +
                '<div class="office-chair"></div>';
            Engine.sceneCtn.appendChild(office);
        }
    };

    // ===== SAHNE 2 — ROKET PARCA BOYUT SECIMI =====
    G.um_s2Assembly = function () {
        Engine.hideSpaceBg();
        Engine.blackScreen();
        Engine.saveGame('um_s2', gameData);
        Engine.sceneCtn.innerHTML = '';

        // State
        var partSizes = {};
        var placedCount = 0;
        var activePopup = null;

        // Build facility
        var facility = document.createElement('div');
        facility.className = 'rocket-facility';
        facility.innerHTML =
            '<div class="rf-wall"></div>' +
            '<div class="rf-light" style="left:30%"></div>' +
            '<div class="rf-light" style="left:65%"></div>';
        Engine.sceneCtn.appendChild(facility);

        // Assembly layout
        var assembly = document.createElement('div');
        assembly.className = 'rocket-assembly';

        // Left: model area
        var modelArea = document.createElement('div');
        modelArea.className = 'rocket-model-area';
        var modelTitle = document.createElement('div');
        modelTitle.className = 'match-desc-title';
        modelTitle.style.cssText = 'margin-bottom:12px;';
        modelTitle.textContent = 'PROTOTIP';
        modelArea.appendChild(modelTitle);
        var model = document.createElement('div');
        model.className = 'rocket-model';
        model.id = 'rocket-model';
        modelArea.appendChild(model);
        assembly.appendChild(modelArea);

        // Right: parts panel
        var panel = document.createElement('div');
        panel.className = 'rocket-parts-panel';
        ROCKET_PARTS.forEach(function (p) {
            var card = document.createElement('div');
            card.className = 'rp-card';
            card.id = 'rp-' + p.id;
            card.innerHTML = '<div class="rp-label">' + p.name + '</div>';
            card.addEventListener('click', function () { showSizePopup(card, p); });
            panel.appendChild(card);
        });
        assembly.appendChild(panel);
        Engine.sceneCtn.appendChild(assembly);

        // Astro intro
        var astroSub = document.createElement('div');
        astroSub.className = 'astro-subtitle';
        astroSub.innerHTML =
            '<img src="photos/astro.png" class="astro-subtitle-img">' +
            '<div class="astro-subtitle-box"><div class="astro-subtitle-name">ASTRO</div>' +
            '<span class="astro-sub-text"></span></div>';
        document.body.appendChild(astroSub);
        var aText = astroSub.querySelector('.astro-sub-text');
        Engine.typewriter(aText, 'Merhaba! Ben tardigrade Astro. Sana oyun boyunca yardim edecegim. Burada prototip roketin icin parcalar ve parcalarin boyutlarini sececeksin. Unutma parcalarin boyutlarinin hepsi ayni olmak zorunda!', 25, function () {
            setTimeout(function () { astroSub.remove(); }, 3000);
        });

        Engine.fadeIn(1500);

        function showSizePopup(card, part) {
            if (activePopup) activePopup.remove();
            var popup = document.createElement('div');
            popup.className = 'size-popup';
            ['sm', 'md', 'lg'].forEach(function (sz) {
                var label = sz === 'sm' ? 'KUCUK' : sz === 'md' ? 'ORTA' : 'BUYUK';
                var btn = document.createElement('button');
                btn.className = 'size-btn';
                btn.textContent = label;
                btn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    selectSize(card, part, sz);
                    popup.remove();
                    activePopup = null;
                });
                popup.appendChild(btn);
            });
            card.appendChild(popup);
            activePopup = popup;
        }

        function selectSize(card, part, size) {
            partSizes[part.id] = size;
            card.classList.add('used');
            placedCount++;

            // Add part to model
            var el = document.createElement('div');
            el.className = 'rm-part ' + part.css + ' rm-' + size;
            el.id = 'model-' + part.id;
            if (part.id === 'fins') {
                el.innerHTML = '<div class="rm-fins-center"></div>';
            }
            var m = document.getElementById('rocket-model');
            // Insert in order
            var order = ['nose', 'upper', 'main', 'lower', 'fins'];
            var idx = order.indexOf(part.id);
            var inserted = false;
            var children = m.children;
            for (var ci = 0; ci < children.length; ci++) {
                var cid = children[ci].id.replace('model-', '');
                var cIdx = order.indexOf(cid);
                if (cIdx > idx) {
                    m.insertBefore(el, children[ci]);
                    inserted = true;
                    break;
                }
            }
            if (!inserted) m.appendChild(el);

            // Check if all placed
            if (placedCount === 5) {
                setTimeout(function () { checkSizes(); }, 500);
            }
        }

        function checkSizes() {
            var vals = Object.values(partSizes);
            var allSame = vals.every(function (v) { return v === vals[0]; });

            if (allSame) {
                gameData.rocketSize = vals[0];
                var popup = document.createElement('div');
                popup.className = 'fail-overlay';
                popup.innerHTML =
                    '<div class="astro-popup"><img src="photos/astro.png"><div class="speech-bubble">'+T('Aferin! Simdi diger etaba gec.')+'</div></div>';
                var btn = document.createElement('button');
                btn.className = 'success-btn';
                btn.textContent = 'DEVAM ET';
                btn.addEventListener('click', function () {
                    popup.remove();
                    G.uykm_spaceTransition(G.um_s3Material);
                });
                popup.appendChild(btn);
                document.body.appendChild(popup);
            } else {
                var popup2 = document.createElement('div');
                popup2.className = 'fail-overlay';
                popup2.innerHTML =
                    '<div class="astro-popup"><img src="photos/astro.png"><div class="speech-bubble">'+T('Parcalar uyumsuz lutfen tekrar dene.')+'</div></div>';
                var btn2 = document.createElement('button');
                btn2.className = 'retry-btn';
                btn2.textContent = 'TEKRAR DENE';
                btn2.addEventListener('click', function () {
                    popup2.remove();
                    Engine.setScene(G.um_s2Assembly);
                });
                popup2.appendChild(btn2);
                document.body.appendChild(popup2);
            }
        }
    };

    // ===== SAHNE 3 — MALZEME SECIMI =====
    G.um_s3Material = function () {
        Engine.hideSpaceBg();
        Engine.blackScreen();
        Engine.saveGame('um_s3', gameData);
        Engine.sceneCtn.innerHTML = '';

        var partMaterials = {};
        var selectedCount = 0;
        var activePopup = null;
        var rocketSize = gameData.rocketSize || 'md';

        // Build facility
        var facility = document.createElement('div');
        facility.className = 'rocket-facility';
        facility.innerHTML =
            '<div class="rf-wall"></div>' +
            '<div class="rf-light" style="left:30%"></div>' +
            '<div class="rf-light" style="left:65%"></div>';
        Engine.sceneCtn.appendChild(facility);

        // Center model
        var modelWrap = document.createElement('div');
        modelWrap.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;z-index:4;';
        var model = document.createElement('div');
        model.className = 'rocket-model';
        model.id = 'rocket-model-mat';
        ROCKET_PARTS.forEach(function (p) {
            var el = document.createElement('div');
            el.className = 'rm-part ' + p.css + ' rm-' + rocketSize;
            el.id = 'mat-' + p.id;
            el.dataset.partId = p.id;
            if (p.id === 'fins') {
                el.innerHTML = '<div class="rm-fins-center"></div>';
            }
            el.addEventListener('click', function (e) { showMaterialPopup(el, p, e); });
            model.appendChild(el);
        });
        modelWrap.appendChild(model);
        Engine.sceneCtn.appendChild(modelWrap);

        // Astro intro
        var astroSub = document.createElement('div');
        astroSub.className = 'astro-subtitle';
        astroSub.innerHTML =
            '<img src="photos/astro.png" class="astro-subtitle-img">' +
            '<div class="astro-subtitle-box"><div class="astro-subtitle-name">ASTRO</div>' +
            '<span class="astro-sub-text"></span></div>';
        document.body.appendChild(astroSub);
        var aText = astroSub.querySelector('.astro-sub-text');
        Engine.typewriter(aText, 'Bu etapta ise parcalarinin ana maddesinin ne olacagini sececeksin ama unutma rokette hep ayni malzemeyi kullanmalisin.', 25, function () {
            setTimeout(function () { astroSub.remove(); }, 3000);
        });

        Engine.fadeIn(1500);

        function showMaterialPopup(partEl, part, e) {
            if (activePopup) activePopup.remove();
            if (partEl.dataset.done === '1') return;

            var popup = document.createElement('div');
            popup.className = 'material-popup';
            popup.style.cssText = 'left:' + (e.clientX - 100) + 'px;top:' + (e.clientY - 60) + 'px;position:fixed;';

            MATERIALS.forEach(function (m) {
                var btn = document.createElement('button');
                btn.className = 'mat-btn ' + m.pos;
                btn.textContent = m.name;
                btn.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    selectMaterial(partEl, part, m);
                    popup.remove();
                    activePopup = null;
                });
                popup.appendChild(btn);
            });

            document.body.appendChild(popup);
            activePopup = popup;

            // Close on outside click
            setTimeout(function () {
                var closer = function (ev) {
                    if (!popup.contains(ev.target)) {
                        popup.remove();
                        activePopup = null;
                        document.removeEventListener('click', closer);
                    }
                };
                document.addEventListener('click', closer);
            }, 100);
        }

        function selectMaterial(partEl, part, material) {
            partMaterials[part.id] = material.id;
            partEl.dataset.done = '1';

            // Apply color
            MATERIALS.forEach(function (m) { partEl.classList.remove(m.css); });
            partEl.classList.add(material.css);
            partEl.classList.add('mat-selected');

            // Also color fins-center
            var fc = partEl.querySelector('.rm-fins-center');
            if (fc) {
                MATERIALS.forEach(function (m2) { fc.classList.remove(m2.css); });
                fc.classList.add(material.css);
            }

            selectedCount++;
            if (selectedCount === 5) {
                setTimeout(function () { checkMaterials(); }, 500);
            }
        }

        function checkMaterials() {
            var vals = Object.values(partMaterials);
            var allSame = vals.every(function (v) { return v === vals[0]; });

            if (allSame) {
                gameData.rocketMaterial = vals[0];
                var popup = document.createElement('div');
                popup.className = 'fail-overlay';
                popup.innerHTML =
                    '<div class="astro-popup"><img src="photos/astro.png"><div class="speech-bubble">'+T('Iste bu! Tebrik ederim. Gercekten cok guzel oldu.')+'</div></div>';
                var btn = document.createElement('button');
                btn.className = 'success-btn';
                btn.textContent = 'DEVAM ET';
                btn.addEventListener('click', function () {
                    popup.remove();
                    G.uykm_spaceTransition(G.um_s4Final);
                });
                popup.appendChild(btn);
                document.body.appendChild(popup);
            } else {
                var popup2 = document.createElement('div');
                popup2.className = 'fail-overlay';
                popup2.innerHTML =
                    '<div class="astro-popup"><img src="photos/astro.png"><div class="speech-bubble">'+T('Maalesef parcalar uyumlu degil tekrar dene.')+'</div></div>';
                var btn2 = document.createElement('button');
                btn2.className = 'retry-btn';
                btn2.textContent = 'TEKRAR DENE';
                btn2.addEventListener('click', function () {
                    popup2.remove();
                    Engine.setScene(G.um_s3Material);
                });
                popup2.appendChild(btn2);
                document.body.appendChild(popup2);
            }
        }
    };

    // ===== SAHNE 4 — FINAL SUNUMU =====
    G.um_s4Final = function () {
        Engine.hideSpaceBg();
        Engine.blackScreen();
        Engine.saveGame('um_s4', gameData);
        Engine.sceneCtn.innerHTML = '';

        var rocketSize = gameData.rocketSize || 'md';
        var rocketMat = gameData.rocketMaterial || 'aluminum';
        var matCss = MATERIALS.find(function (m) { return m.id === rocketMat; });
        var matClass = matCss ? matCss.css : 'mat-aluminum';

        // Build facility
        var facility = document.createElement('div');
        facility.className = 'rocket-facility';
        facility.innerHTML = '<div class="rf-wall"></div><div class="rf-light" style="left:50%"></div>';
        Engine.sceneCtn.appendChild(facility);

        // Center finished rocket
        var modelWrap = document.createElement('div');
        modelWrap.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;z-index:4;';
        var model = document.createElement('div');
        model.className = 'rocket-model';
        ROCKET_PARTS.forEach(function (p) {
            var el = document.createElement('div');
            el.className = 'rm-part ' + p.css + ' rm-' + rocketSize + ' ' + matClass;
            if (p.id === 'fins') {
                var fc = document.createElement('div');
                fc.className = 'rm-fins-center ' + matClass;
                el.appendChild(fc);
            }
            model.appendChild(el);
        });
        modelWrap.appendChild(model);
        Engine.sceneCtn.appendChild(modelWrap);

        Engine.fadeIn(1500).then(function () {
            showSubtitle('MUHENDIS', 'Projemi bitirdim. Test icin hazirim!', function () {
                setTimeout(function () {
                    var popup = document.createElement('div');
                    popup.className = 'fail-overlay';
                    popup.innerHTML =
                        '<div class="astro-popup"><img src="photos/astro.png"><div class="speech-bubble">'+T('Aferin butun asamalari basariyla gectin kendine iyi bak!')+'</div></div>';
                    var btn = document.createElement('button');
                    btn.className = 'success-btn';
                    btn.textContent = 'DEVAM ET';
                    btn.addEventListener('click', function () {
                        popup.remove();
                        G.uykm_spaceTransition(G.um_s5News);
                    });
                    popup.appendChild(btn);
                    document.body.appendChild(popup);
                }, 1500);
            });
        });
    };

    // ===== SAHNE 5 — GAZETE + SON =====
    G.um_s5News = function () {
        Engine.hideSpaceBg();
        Engine.blackScreen();
        Engine.saveGame('um_s5', gameData);
        Engine.sceneCtn.innerHTML = '';

        var np = document.createElement('div');
        np.className = 'newspaper';
        np.innerHTML =
            '<div class="newspaper-header">' +
            '  <div class="newspaper-masthead">Turkiye Uzay Ajansi Bulteni</div>' +
            '  <div class="newspaper-date">22 Haziran 2038 \u2014 Ozel Sayi</div>' +
            '</div>' +
            '<div class="newspaper-title">Genc Muhendis TUA\'nin Yeni Nesil Roket Prototipini Basariyla Tasarladi!</div>' +
            '<div class="newspaper-body">' +
            'Turkiye Uzay Ajansi, AYAP-3 projesi kapsaminda gorevlendirilen genc uzay muhendisinin yeni nesil roket prototipini basariyla tamamladigini duyurdu. ' +
            'Ozenle secilen malzeme ve boyut uyumuyla olusturulan uzay araci, tum teknik testlerden gecerek ucus onayini aldi. TUA yetkilileri, bu basarinin ' +
            'Turkiye\'nin uzay programina onemli bir ivme kazandiracagini ve gelecekte yapilacak Ay gorevleri icin kritik bir adim oldugunu belirtti. ' +
            'Genc muhendisin ozverili calismasi, tum ekip tarafindan takdirle karsilandi.' +
            '</div>';
        Engine.sceneCtn.appendChild(np);

        Engine.fadeIn(1500);

        setTimeout(function () {
            Engine.fadeOut(2000).then(function () {
                showUmEnd();
            });
        }, 20000);

        function showUmEnd() {
            Engine.sceneCtn.innerHTML = '';
            Engine.hideSpaceBg();
            var lbTop = document.createElement('div');
            lbTop.className = 'letterbox-top';
            var lbBot = document.createElement('div');
            lbBot.className = 'letterbox-bottom';
            Engine.sceneCtn.appendChild(lbTop);
            Engine.sceneCtn.appendChild(lbBot);
            var endTxt = document.createElement('div');
            endTxt.className = 'end-text';
            Engine.sceneCtn.appendChild(endTxt);
            Engine.overlay.style.transition = 'opacity 0.5s ease';
            Engine.overlay.style.opacity = '0';
            Engine.overlay.style.pointerEvents = 'none';
            Engine.typewriter(endTxt, 'SON...', 200, function () {
                Engine.deleteSave();
                setTimeout(function () {
                    Engine.showPrompt('OYUN BITTI -- TEKRAR OYNAMAK ICIN SPACE TUSUNA BASIN');
                    Engine.waitKey('Space', function () { location.reload(); });
                }, 2000);
            });
        }
    };

    // ===== AUTO START =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            G.boot();
        });
    } else {
        G.boot();
    }
})();
