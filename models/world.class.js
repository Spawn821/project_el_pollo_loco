class World extends Draw {

    // Objects
    character = new Character();
    statusbar = new Statusbar();
    coinsToCollect = new CoinPositions();
    bottlesToCollect = new BottlePositions();
    collisions = new Collisions();

    // Values
    levelBackground = level.background;
    levelEnemies = level.enemies;
    bottles = [];
    canvas;
    ctx; // Context for canvas
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this;
        this.collisions.world = this;
    }


    draw() {
        if (startGame && !pause && !loading) {
            this.clearCanvas();
            this.applyColor();
            console.log('Start game!');
        } else {
            console.log('Pause!');
        }

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }


    applyColor() {
        this.beforeTheCamera();
        this.ctx.translate(this.camera_x, 0);
        this.afterTheCamera();
        this.ctx.translate(-this.camera_x, 0);
    }


    beforeTheCamera() {
        this.addObjectToMap(this.levelBackground.AIR);
        this.addObjectListToMap(this.levelBackground.CLOUDS);
        this.addObjectToMap(this.statusbar.bottleIcon);
        this.addObjectToMap(this.statusbar.healthIcon);
        this.addObjectToMap(this.statusbar.coinIcon);
        if (this.statusbar.endbossHealthIcon) this.addObjectToMap(this.statusbar.endbossHealthIcon);
    }


    afterTheCamera() {
        this.addObjectListToMap(this.levelBackground.BACKGROUNDS);
        this.addObjectListToMap(this.coinsToCollect.COINS);
        this.addObjectListToMap(this.bottlesToCollect.BOTTLES);
        this.addObjectListToMap(this.levelEnemies.ENEMIES);
        this.addObjectToMap(this.character);
        this.addObjectListToMap(this.bottles);
    }


}