class World {
    level = level1;
    character = new Character();
    statusbar = new Statusbar();
    coins = new CoinPositions();
    bottlesToCollect = new BottlePositions();
    check_collisions = new CheckCollisions();
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
        this.check_collisions.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.beforTheCamera();
        this.ctx.translate(this.camera_x, 0);
        this.afterTheCamera();
        this.ctx.translate(-this.camera_x, 0);

       // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }


    beforTheCamera() {
        this.addObjectToMap(this.level.air);
        this.addObjectListToMap(this.level.clouds);
        this.addObjectToMap(this.statusbar.bottleIcon);
        this.addObjectToMap(this.statusbar.healthIcon);
        this.addObjectToMap(this.statusbar.coinIcon);
        this.addObjectToMap(this.statusbar.endbossHealthIcon);
    }


    afterTheCamera() {
        this.addObjectListToMap(this.level.backgroundObjects);
        this.addObjectListToMap(this.coins.COINS);
        this.addObjectListToMap(this.bottlesToCollect.BOTTLES);
        this.addObjectListToMap(this.level.enemies);
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