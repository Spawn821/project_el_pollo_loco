class World {

    // Objects
    mainScreen = new MainScreen();
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
        if (pause) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.isGameStarted();
        }

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }


    isGameStarted() {
        if (!startGame) {
            this.addObjectToMap(this.mainScreen)
        } else {
            this.beforeTheCamera();
            this.ctx.translate(this.camera_x, 0);
            this.afterTheCamera();
            this.ctx.translate(-this.camera_x, 0);
        }
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


    addObjectListToMap(movableObjectList) {
        movableObjectList.forEach(movableObject => {
            this.addObjectToMap(movableObject);
        });
    }


    addObjectToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.mirrorImage(movableObject);
        }

        movableObject.draw(this.ctx);
        movableObject.drawRectBounding(this.ctx);
        movableObject.drawRectBounding2(this.ctx);
        movableObject.drawText(this.ctx);
        movableObject.drawEnergyBar(this.ctx);

        if (movableObject.otherDirection) {
            this.removeMirrorImage(movableObject);
        }
    }


    mirrorImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }


    removeMirrorImage(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}