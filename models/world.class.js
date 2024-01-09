class World {
    backgroundObjects = [
        new BackgroundObject('../graphics/5_background/layers/air.png'),
        new BackgroundObject('../graphics/5_background/layers/3_third_layer/1.png'),
        new BackgroundObject('../graphics/5_background/layers/2_second_layer/1.png'),
        new BackgroundObject('../graphics/5_background/layers/1_first_layer/1.png')
    ]
    clouds = [
        new Cloud()
    ];
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
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

        this.ctx.translate(this.camera_x, 0);

        this.addObjectListToMap(this.backgroundObjects);
        this.addObjectListToMap(this.clouds);
        this.addObjectListToMap(this.enemies);
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
        if (movableObject.otherDirection) {
            this.ctx.save();
            this.ctx.translate(movableObject.width, 0);
            this.ctx.scale(-1, 1);
            movableObject.x = movableObject.x * -1;
        }

        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height)

        if (movableObject.otherDirection) {
            movableObject.x = movableObject.x * -1;
            this.ctx.restore();
        }
    }
}