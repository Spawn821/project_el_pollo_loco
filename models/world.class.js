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

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectListToMap(this.backgroundObjects);
        this.addObjectListToMap(this.clouds);
        this.addObjectListToMap(this.enemies);
        this.addObjectToMap(this.character);

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
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height)
    }
}