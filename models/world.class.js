class World extends Draw {

    // Objects
    character = new Character();
    statusbar = new Statusbar();
    coinsToCollect = new CoinPositions();
    bottlesToCollect = new BottlePositions();
    collisions = new Collisions();
    gameOverScreen = new GameOverScreen();
    youLostScreen = new YouLostScreen();
    sound = new Sound();
    levelBackground = level.background;
    levelEnemies = level.enemies;
    bottles = [];
    keyboard;

    // HTML elements
    canvas;
    ctx; // Context for canvas

    // Values
    camera_x = 0;

    /**
     * This function set all start conditions for the object.
     * @param {object} canvas is the canvas element.
     * @param {object} keyboard is the keyboard object.
     */
    constructor(canvas, keyboard) {
        super();
        gameEnd = false;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.sound.backgroundSoundPlay();

        this.draw();
        this.setWorld();
    }


    /**
     * This function transfers its values.
     */
    setWorld() {
        this.character.world = this;
        this.collisions.world = this;
        this.statusbar.world = this;
    }


    /**
     * This function draw the world.
     */
    draw() {
        if (gameEnd) {
            this.gameIsEnd();
        } else if (startGame && !pause && !loading) {
            this.clearCanvas();
            this.applyColor();
        }

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }


    /**
     * This function shows the diffrent end screens.
     */
    gameIsEnd() {
        if (this.character.isDead()) {
            this.endScreen();
            this.addObjectToMap(this.youLostScreen);
        } else if (this.levelEnemies.ENEMIES.length == 0) {
            this.endScreen();
            this.addObjectToMap(this.gameOverScreen);
        }
    }


    /**
     * This function set all conditions for the end screen.
     */
    endScreen() {
        this.addObjectToMap(this.levelBackground.AIR);
        this.addObjectListToMap(this.levelBackground.CLOUDS);
        this.addObjectListToMap(this.levelBackground.BACKGROUNDS);
        buttonPause.classList.add('d-none');
    }


    /**
     * This function coordinates the addition of objects.
     */
    applyColor() {
        this.beforeTheCamera();
        this.ctx.translate(this.camera_x, 0);
        this.afterTheCamera();
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * This function add all objects that always move with you.
     */
    beforeTheCamera() {
        this.addObjectToMap(this.levelBackground.AIR);
        this.addObjectListToMap(this.levelBackground.CLOUDS);
        this.addObjectToMap(this.statusbar.bottleIcon);
        this.addObjectToMap(this.statusbar.healthIcon);
        this.addObjectToMap(this.statusbar.coinIcon);
        if (this.statusbar.endbossHealthIcon) this.addObjectToMap(this.statusbar.endbossHealthIcon);
    }


    /**
     * This function add all objects that do not move.
     */
    afterTheCamera() {
        this.addObjectListToMap(this.levelBackground.BACKGROUNDS);
        this.addObjectListToMap(this.coinsToCollect.COINS);
        this.addObjectListToMap(this.bottlesToCollect.BOTTLES);
        this.addObjectListToMap(this.levelEnemies.ENEMIES);
        this.addObjectToMap(this.character);
        this.addObjectListToMap(this.bottles);
    }
}