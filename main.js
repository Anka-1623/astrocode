const { Game, Scene } = Phaser;

// ============================================
// GLOBAL GAME STATE
// ============================================
const GameState = {
    lives: 5,
    maxLives: 5,
    itemsCollected: 0,
    totalItems: 8,
    quizIndex: 0,
    quizScore: 0,
    
    reset() {
        this.lives = 5;
        this.itemsCollected = 0;
        this.quizIndex = 0;
        this.quizScore = 0;
    },
    
    loseLife(amount = 1) {
        this.lives = Math.max(0, this.lives - amount);
    }
};

// Quiz questions
const QuizQuestions = [
    { q: "Ay'ın çapı yaklaşık kaç km?", a: ["3.474 km", "12.742 km", "6.792 km", "4.879 km"], correct: 0 },
    { q: "Işık Ay'dan Dünya'ya kaç saniyede ulaşır?", a: ["1.3 saniye", "8 dakika", "2 saniye", "1 dakika"], correct: 0 },
    { q: "Ay'ın yerçekimi Dünya'nın kaç katı?", a: ["1/6", "1/2", "1/3", "Aynı"], correct: 0 },
    { q: "Ay'da ilk yürüyen astronot kim?", a: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"], correct: 0 },
    { q: "Ay'ın karanlık tarafı ne denir?", a: ["Uzak yüz", "Gölge taraf", "Karanlık yüz", "Gece taraf"], correct: 0 },
    { q: "Ay'ın kaç fazı vardır?", a: ["8", "12", "4", "7"], correct: 0 },
    { q: "Ay tutulmasına ne sebep olur?", a: ["Dünya Güneş'i engeller", "Ay Güneş'i engeller", "Gölge Ay'da", "Meteor çarpması"], correct: 0 },
    { u: "Ay, Dünya'nın tek doğal nedir?", a: ["Uydu", "Gezegen", "Yıldız", "Kuyruklu yıldız"], correct: 0 },
    { q: "Ay yüzeyinde bulunmayan gaz?", a: ["Oksijen", "Helyum-4", "Neon", "Hepsi var"], correct: 3 },
    { q: "Ay yüzey sıcaklık aralığı?", a: ["-173 ile 127°C", "-50 ile 50°C", "-100 ile 100°C", "0 ile 200°C"], correct: 0 }
];

// ============================================
// SCENE 1: ROCKET PUZZLE
// ============================================
class RocketPuzzleScene extends Scene {
    constructor() {
        super({ key: 'RocketPuzzleScene' });
    }

    create() {
        this.completed = false;
        this.correctPieces = 0;
        
        this.add.rectangle(400, 300, 800, 600, 0x8B0000);
        
        this.add.text(400, 40, '🚀 ROKET MONTAJ - Parçaları doğru yerlere sürükle!', {
            fontSize: '16px', color: '#fff'
        }).setOrigin(0.5);
        
        this.slots = [];
        this.pieces = [];
        
        // Slot positions
        const slots = [
            { x: 500, y: 250, w: 60, h: 80, name: 'gövde' },
            { x: 500, y: 380, w: 80, h: 40, name: 'kanat' },
            { x: 500, y: 180, w: 30, h: 40, name: 'uç' }
        ];
        
        slots.forEach(pos => {
            const slot = this.add.rectangle(pos.x, pos.y, pos.w, pos.h, 0x440000)
                .setStrokeStyle(2, 0xff0000);
            slot.targetName = pos.name;
            this.slots.push(slot);
            
            this.add.text(pos.x + pos.w/2 + 10, pos.y, pos.name, { fontSize: '12px', color: '#ff6666' }).setOrigin(0, 0.5);
        });
        
        // Draggable pieces
        const pieces = [
            { x: 150, y: 200, w: 60, h: 80, color: 0xff4444, name: 'gövde' },
            { x: 150, y: 320, w: 80, h: 40, color: 0xff6666, name: 'kanat' },
            { x: 150, y: 420, w: 30, h: 40, color: 0xff8888, name: 'uç' }
        ];
        
        pieces.forEach(data => {
            const piece = this.add.rectangle(data.x, data.y, data.w, data.h, data.color)
                .setStrokeStyle(2, 0xffffff);
            piece.name = data.name;
            piece.setInteractive({ draggable: true });
            piece.startPos = { x: data.x, y: data.y };
            this.pieces.push(piece);
        });
        
        this.input.on('drag', (pointer, obj, dragX, dragY) => {
            obj.x = dragX;
            obj.y = dragY;
        });
        
        this.input.on('dragend', (pointer, obj) => {
            this.checkSnap(obj);
        });
        
        this.continueBtn = this.add.text(400, 550, '>>> DEVAM ET >>>', {
            fontSize: '24px', color: '#00ff00', backgroundColor: '#004400', padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        this.continueBtn.on('pointerdown', () => {
            this.scene.start('RoverPuzzleScene');
        });
        this.continueBtn.setVisible(false);
    }
    
    checkSnap(piece) {
        for (const slot of this.slots) {
            if (piece.name === slot.targetName) {
                const dist = Phaser.Math.Distance.Between(piece.x, piece.y, slot.x, slot.y);
                if (dist < 60) {
                    piece.x = slot.x;
                    piece.y = slot.y;
                    piece.disableInteractive();
                    piece.setStrokeStyle(3, 0x00ff00);
                    this.correctPieces++;
                    
                    if (this.correctPieces === 3 && !this.completed) {
                        this.completed = true;
                        this.continueBtn.setVisible(true);
                        this.add.text(400, 100, '✅ ROKET HAZIR!', { fontSize: '28px', color: '#00ff00' }).setOrigin(0.5);
                    }
                    return;
                }
            }
        }
        piece.x = piece.startPos.x;
        piece.y = piece.startPos.y;
    }
}

// ============================================
// SCENE 2: ROVER PUZZLE (Harder - 5 pieces)
// ============================================
class RoverPuzzleScene extends Scene {
    constructor() {
        super({ key: 'RoverPuzzleScene' });
    }

    create() {
        this.completed = false;
        this.correctPieces = 0;
        
        this.add.rectangle(400, 300, 800, 600, 0x8B0000);
        
        this.add.text(400, 40, '🛞 ROVER MONTAJ - 5 Parça, daha zor!', {
            fontSize: '16px', color: '#fff'
        }).setOrigin(0.5);
        
        this.slots = [];
        
        const slots = [
            { x: 500, y: 350, w: 100, h: 50, name: 'gövde' },
            { x: 450, y: 420, w: 35, h: 35, name: 'teker1' },
            { x: 550, y: 420, w: 35, h: 35, name: 'teker2' },
            { x: 500, y: 280, w: 40, h: 30, name: 'kamera' },
            { x: 500, y: 220, w: 20, h: 40, name: 'anten' }
        ];
        
        slots.forEach(pos => {
            const slot = this.add.rectangle(pos.x, pos.y, pos.w, pos.h, 0x440000)
                .setStrokeStyle(2, 0xff0000);
            slot.targetName = pos.name;
            this.slots.push(slot);
        });
        
        const pieces = [
            { x: 120, y: 200, w: 100, h: 50, color: 0xff4444, name: 'gövde' },
            { x: 120, y: 280, w: 35, h: 35, color: 0xcccccc, name: 'teker1' },
            { x: 170, y: 280, w: 35, h: 35, color: 0xcccccc, name: 'teker2' },
            { x: 120, y: 350, w: 40, h: 30, color: 0xffff00, name: 'kamera' },
            { x: 170, y: 350, w: 20, h: 40, color: 0x888888, name: 'anten' }
        ];
        
        this.pieces = [];
        pieces.forEach(data => {
            const piece = this.add.rectangle(data.x, data.y, data.w, data.h, data.color)
                .setStrokeStyle(2, 0xffffff);
            piece.name = data.name;
            piece.setInteractive({ draggable: true });
            piece.startPos = { x: data.x, y: data.y };
            this.pieces.push(piece);
        });
        
        this.input.on('drag', (pointer, obj, dragX, dragY) => {
            obj.x = dragX;
            obj.y = dragY;
        });
        
        this.input.on('dragend', (pointer, obj) => {
            this.checkSnap(obj);
        });
        
        this.continueBtn = this.add.text(400, 550, '>>> BAŞLAT >>>', {
            fontSize: '24px', color: '#00ff00', backgroundColor: '#004400', padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        this.continueBtn.on('pointerdown', () => {
            this.scene.start('SpaceFlightScene');
        });
        this.continueBtn.setVisible(false);
    }
    
    checkSnap(piece) {
        for (const slot of this.slots) {
            if (piece.name === slot.targetName) {
                const dist = Phaser.Math.Distance.Between(piece.x, piece.y, slot.x, slot.y);
                if (dist < 60) {
                    piece.x = slot.x;
                    piece.y = slot.y;
                    piece.disableInteractive();
                    piece.setStrokeStyle(3, 0x00ff00);
                    this.correctPieces++;
                    
                    if (this.correctPieces === 5 && !this.completed) {
                        this.completed = true;
                        this.continueBtn.setVisible(true);
                        this.add.text(400, 100, '✅ ROVER HAZIR!', { fontSize: '28px', color: '#00ff00' }).setOrigin(0.5);
                    }
                    return;
                }
            }
        }
        piece.x = piece.startPos.x;
        piece.y = piece.startPos.y;
    }
}

// ============================================
// SCENE 3: SPACE FLIGHT
// ============================================
class SpaceFlightScene extends Scene {
    constructor() {
        super({ key: 'SpaceFlightScene' });
    }

    create() {
        this.gameSpeed = 4;
        this.meteors = [];
        this.wormholeSpawned = false;
        
        this.add.rectangle(400, 300, 800, 600, 0x8B0000);
        
        // Stars
        for (let i = 0; i < 50; i++) {
            this.add.circle(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), 2, 0xffffff);
        }
        
        // Player rocket
        this.player = this.add.rectangle(100, 300, 50, 80, 0x222222);
        this.physics.add.existing(this.player);
        this.player.body.setAllowGravity(false);
        
        // UI
        this.livesText = this.add.text(20, 20, '', { fontSize: '20px', color: '#ff4444' });
        this.updateLivesUI();
        
        this.add.text(400, 50, 'UZAY UÇUŞU - Ok tuşları ile hareket et!', { fontSize: '14px', color: '#fff' }).setOrigin(0.5);
        this.add.text(400, 75, 'Meteora yakalanma, soluk deliğe gir!', { fontSize: '14px', color: '#ff8888' }).setOrigin(0.5);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Meteor spawner
        this.time.addEvent({ delay: 600, callback: this.spawnMeteor, callbackScope: this, loop: true });
        
        // Wormhole after 4 seconds
        this.time.delayedCall(4000, () => this.spawnWormhole());
    }
    
    update() {
        // Player movement
        if (this.cursors.up.isDown) this.player.y -= 6;
        if (this.cursors.down.isDown) this.player.y += 6;
        
        this.player.y = Phaser.Math.Clamp(this.player.y, 30, 570);
        
        // Move meteors
        this.meteors.forEach(m => {
            m.x -= this.gameSpeed;
            if (m.x < -50) m.destroy();
        });
        this.meteors = this.meteors.filter(m => m.active);
        
        // Game over check
        if (GameState.lives <= 0) {
            this.scene.start('FinalScene', { success: false });
        }
    }
    
    spawnMeteor() {
        if (this.wormholeSpawned) return;
        
        const meteor = this.add.circle(850, Phaser.Math.Between(50, 550), Phaser.Math.Between(20, 40), 0x666666);
        this.physics.add.existing(meteor);
        this.meteors.push(meteor);
        
        this.physics.add.overlap(this.player, meteor, () => {
            meteor.destroy();
            GameState.loseLife(1);
            this.updateLivesUI();
            this.cameras.main.shake(100, 0.02);
        });
    }
    
    spawnWormhole() {
        this.wormholeSpawned = true;
        
        this.wormhole = this.add.circle(600, 300, 80, 0x440044);
        this.wormhole.setStrokeStyle(15, 0xaa00aa);
        this.physics.add.existing(this.wormhole);
        this.wormhole.body.setAllowGravity(false);
        
        this.tweens.add({
            targets: this.wormhole,
            scaleX: 1.3, scaleY: 1.3,
            duration: 400, yoyo: true, repeat: -1
        });
        
        this.add.text(600, 300, '🌀\nSOLUK DELİĞİ\nBUL!', { fontSize: '14px', color: '#ff00ff' }).setOrigin(0.5);
        
        this.physics.add.overlap(this.player, this.wormhole, () => {
            this.wormhole.destroy();
            this.scene.start('QuizScene');
        });
    }
    
    updateLivesUI() {
        let hearts = '';
        for (let i = 0; i < GameState.lives; i++) hearts += '❤️';
        this.livesText.setText(hearts || '💔');
    }
}

// ============================================
// SCENE: QUIZ
// ============================================
class QuizScene extends Scene {
    constructor() {
        super({ key: 'QuizScene' });
    }

    create() {
        this.add.rectangle(400, 300, 800, 600, 0x440022);
        
        this.add.text(400, 60, '🌀 SOLUK DELİĞİ SORULARI 🌀', {
            fontSize: '24px', color: '#ff00ff'
        }).setOrigin(0.5);
        
        this.add.text(400, 95, 'Yanlış cevap = -2 can!', {
            fontSize: '14px', color: '#ff4444'
        }).setOrigin(0.5);
        
        this.showQuestion();
    }
    
    showQuestion() {
        if (GameState.quizIndex >= QuizQuestions.length) {
            this.scene.start('MoonSurfaceScene');
            return;
        }
        
        const q = QuizQuestions[GameState.quizIndex];
        this.currentQ = q;
        
        // Clear previous
        this.children.list.filter(c => c.isQuestion).forEach(c => c.destroy());
        
        const qText = this.add.text(400, 160, q.q, {
            fontSize: '18px', color: '#fff', backgroundColor: '#222', padding: 15, wordWrap: { width: 600 }
        }).setOrigin(0.5);
        qText.isQuestion = true;
        
        q.a.forEach((answer, i) => {
            const btn = this.add.text(400, 260 + i * 60, answer, {
                fontSize: '16px', color: '#fff', backgroundColor: '#442244', padding: { x: 20, y: 10 }
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });
            btn.isQuestion = true;
            btn.on('pointerdown', () => this.checkAnswer(i));
        });
    }
    
    checkAnswer(selected) {
        if (selected === this.currentQ.correct) {
            GameState.quizScore++;
            this.add.text(400, 520, '✅ DOĞRU!', { fontSize: '24px', color: '#00ff00' }).setOrigin(0.5).isQuestion = true;
        } else {
            GameState.loseLife(2);
            this.add.text(400, 520, '❌ YANLIŞ! -2 can', { fontSize: '24px', color: '#ff0000' }).setOrigin(0.5).isQuestion = true;
            
            if (GameState.lives <= 0) {
                this.time.delayedCall(1000, () => this.scene.start('FinalScene', { success: false }));
                return;
            }
        }
        
        GameState.quizIndex++;
        this.time.delayedCall(1200, () => this.showQuestion());
    }
}

// ============================================
// SCENE 4: MOON SURFACE
// ============================================
class MoonSurfaceScene extends Scene {
    constructor() {
        super({ key: 'MoonSurfaceScene' });
    }

    create() {
        this.physics.world.gravity.y = 400;
        
        this.add.rectangle(400, 300, 800, 600, 0x8B0000);
        
        // Ground
        this.ground = this.add.rectangle(400, 520, 1600, 100, 0x555555);
        this.physics.add.existing(this.ground, true);
        
        // Some platforms
        this.platform1 = this.add.rectangle(300, 420, 120, 20, 0x666666);
        this.physics.add.existing(this.platform1, true);
        
        this.platform2 = this.add.rectangle(700, 380, 100, 20, 0x666666);
        this.physics.add.existing(this.platform2, true);
        
        // Player rover
        this.player = this.add.rectangle(100, 480, 50, 35, 0x22ff22);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setBounce(0.2);
        this.player.body.setDragX(300);
        
        // Collectibles
        this.items = [];
        this.collectedCount = 0;
        
        const positions = [
            { x: 200, y: 480 }, { x: 350, y: 380 }, { x: 500, y: 480 },
            { x: 650, y: 480 }, { x: 750, y: 340 }, { x: 900, y: 480 },
            { x: 1100, y: 480 }, { x: 1300, y: 450 }
        ];
        
        positions.forEach(pos => {
            const item = this.add.circle(pos.x, pos.y, 15, 0xffff00);
            this.physics.add.existing(item);
            item.body.setAllowGravity(false);
            item.body.setImmovable(true);
            this.items.push(item);
        });
        
        this.physics.add.overlap(this.player, this.items, this.collectItem, null, this);
        
        // UI
        this.livesText = this.add.text(20, 20, '', { fontSize: '20px', color: '#ff4444' });
        this.updateLivesUI();
        
        this.altitudeText = this.add.text(780, 20, 'Yükseklik: 0', { fontSize: '14px', color: '#00ff00' }).setOrigin(1, 0);
        this.itemsText = this.add.text(20, 50, 'Toplanan: 0/8', { fontSize: '14px', color: '#ffff00' });
        
        this.add.text(400, 200, '🌙 AY YÜZEYİ\nOk tuşları ile hareket et\n8 item topla!', {
            fontSize: '18px', color: '#fff', backgroundColor: '#000000aa', padding: 15
        }).setOrigin(0.5);
        
        this.time.delayedCall(3000, () => {
            this.children.list.filter(c => c.type === 'Text' && c.y === 200).forEach(c => c.destroy());
        });
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 1600, 600);
        
        this.lastVelocityY = 0;
    }
    
    update() {
        // Movement
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(200);
        } else {
            this.player.body.setVelocityX(this.player.body.velocity.x * 0.9);
        }
        
        // Jump
        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            this.player.body.setVelocityY(-500);
        }
        
        // Fall damage
        if (this.player.body.blocked.down && this.lastVelocityY > 500) {
            GameState.loseLife(3);
            this.updateLivesUI();
            this.cameras.main.shake(200, 0.03);
        }
        
        this.lastVelocityY = this.player.body.velocity.y;
        
        // Altitude
        const altitude = Math.max(0, Math.floor(520 - this.player.y));
        this.altitudeText.setText('Yükseklik: ' + altitude);
        
        // Game over
        if (GameState.lives <= 0) {
            this.scene.start('FinalScene', { success: false });
        }
    }
    
    collectItem(player, item) {
        if (!item.active) return;
        item.destroy();
        this.collectedCount++;
        GameState.itemsCollected = this.collectedCount;
        this.itemsText.setText('Toplanan: ' + this.collectedCount + '/8');
        this.cameras.main.flash(150, 255, 255, 0);
        
        if (this.collectedCount >= 8) {
            this.time.delayedCall(500, () => this.scene.start('FinalScene', { success: true }));
        }
    }
    
    updateLivesUI() {
        let hearts = '';
        for (let i = 0; i < GameState.lives; i++) hearts += '❤️';
        this.livesText.setText(hearts || '💔');
    }
}

// ============================================
// SCENE 5: FINAL SCREEN
// ============================================
class FinalScene extends Scene {
    constructor() {
        super({ key: 'FinalScene' });
    }

    create(data) {
        const success = data && data.success;
        
        this.add.rectangle(400, 300, 800, 600, success ? 0x004400 : 0x440000);
        
        this.add.text(400, 150, success ? '🎉 GÖREV BAŞARILI!' : '💀 GÖREV BAŞARISIZ!', {
            fontSize: '32px', color: success ? '#00ff00' : '#ff0000'
        }).setOrigin(0.5);
        
        this.add.text(400, 240, 'Kalan Canlar:', { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
        
        let hearts = '';
        for (let i = 0; i < GameState.lives; i++) hearts += '❤️';
        this.add.text(400, 290, hearts || '💔', { fontSize: '28px' }).setOrigin(0.5);
        
        this.add.text(400, 350, 'Toplanan Item: ' + GameState.itemsCollected + '/8', {
            fontSize: '18px', color: '#ffff00'
        }).setOrigin(0.5);
        
        this.add.text(400, 390, 'Quiz Skoru: ' + GameState.quizScore + '/10', {
            fontSize: '18px', color: '#00ffff'
        }).setOrigin(0.5);
        
        const restartBtn = this.add.text(400, 500, '>>> TEKRAR OYNA <<<', {
            fontSize: '24px', color: '#fff', backgroundColor: '#333', padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        restartBtn.on('pointerdown', () => {
            GameState.reset();
            this.scene.start('RocketPuzzleScene');
        });
    }
}

// ============================================
// GAME CONFIG
// ============================================
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#8B0000',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 600 }, debug: false }
    },
    scene: [RocketPuzzleScene, RoverPuzzleScene, SpaceFlightScene, QuizScene, MoonSurfaceScene, FinalScene]
};

const game = new Phaser.Game(config);
