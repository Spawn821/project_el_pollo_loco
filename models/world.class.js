class World {
    level = level1;
    character = new Character();
    statusbar = new Statusbar();
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
        this.checkCollisions();
    }


    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusbar.setHealth(this.character.energy);
                }
            });
        }, 1000 / 3);
    }


    setWorld() {
        this.character.world = this;
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
        this.addObjectToMap(this.statusbar.bottle);
        this.addObjectToMap(this.statusbar.health);
        this.addObjectToMap(this.statusbar.coin);
    }


    afterTheCamera() {
        this.addObjectListToMap(this.level.backgroundObjects);
        this.addObjectListToMap(this.level.enemies);
        this.addObjectToMap(this.character);
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
        movableObject.drawText(this.ctx);

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