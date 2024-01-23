class Chicken extends MovableObject {
    IMAGES = {
        IMAGES_WALKING: [
            '../graphics/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
            '../graphics/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
            '../graphics/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        ],

        IMAGES_Test: [
            '../graphics/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
            '../graphics/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
            '../graphics/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        ]
    };


    constructor() {
        super().loadImage('../graphics/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES);
        this.setDimensions();
        this.animation();
        this.move();

        this.x = 250 + Math.random() * 500;
        this.y = this.y - this.height;
        this.speed = 0.25 + Math.random() * 1;
    }


    setDimensions() {
        this.width = 75;                // Default width for the image
        this.height = this.width * 1.97; // Default height for the image

        this.offsetWidth = this.width * 1; // Offset width for collision
        this.offsetHight = this.height * 1; // Offset height for collision
        this.offsetX = this.x + (this.width - this.offsetWidth) / 2; // Offset x for collision
        this.offsetY = this.y + this.width - this.offsetWidth; // Offset y for collision
    }


    animation() {
        setInterval(() => {
            this.animateImages(this.IMAGES.IMAGES_WALKING);
        }, 1000 / 6);
    }

    move() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

    }
}