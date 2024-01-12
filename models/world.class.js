class World {
    level = level1;
    character = new Character();
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
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectToMap(this.level.air);
        this.addObjectListToMap(this.level.clouds);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectListToMap(this.level.backgroundObjects);
        this.addObjectListToMap(this.level.enemies);
        this.addObjectToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }


    addObjectListToMap(movableObjectList) {
        movableObjectList.forEach(movableObject => {
            this.addObjectToMap(movableObject);
        });
    }


    addObjectToMap(movableObject) {
        this.mirrorObject(movableObject);

        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height)

        this.removeMirrorObject(movableObject);
    }


    mirrorObject(movableObject) {
        if (movableObject.otherDirection) {
            this.ctx.save();
            this.ctx.translate(movableObject.width, 0);
            this.ctx.scale(-1, 1);
            movableObject.x = movableObject.x * -1;
        }
    }


    removeMirrorObject(movableObject) {
        if (movableObject.otherDirection) {
            movableObject.x = movableObject.x * -1;
            this.ctx.restore();
        }
    }
}