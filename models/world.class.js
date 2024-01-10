class World {
    backgroundObjects = [];

    IMAGES_BACKGROUND = [
        '../graphics/5_background/layers/3_third_layer/1.png',
        '../graphics/5_background/layers/2_second_layer/1.png',
        '../graphics/5_background/layers/1_first_layer/1.png',
        '../graphics/5_background/layers/3_third_layer/2.png',
        '../graphics/5_background/layers/2_second_layer/2.png',
        '../graphics/5_background/layers/1_first_layer/2.png'
    ]

    air = new BackgroundObject('../graphics/5_background/layers/air.png', 0);

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

        this.loadBackgrounds();
        this.draw();
        this.setWorld();
    }


    loadBackgrounds() {
        let posX1 = 0;
        let posX2 = 720;

        for (let i = 0; i < 3; i++) {

            for (let j = 0; j < this.IMAGES_BACKGROUND.length; j++) {
                let image = this.IMAGES_BACKGROUND[j];
                console.log(image);

                if (j < 3) this.backgroundObjects.push(new BackgroundObject(image, posX1));
                else this.backgroundObjects.push(new BackgroundObject(image, posX2));
            }

            posX1 = posX2 + 720;
            posX2 = posX2 + 720 * 2;
        }
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectToMap(this.air);

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