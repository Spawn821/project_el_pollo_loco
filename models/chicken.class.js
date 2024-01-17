class Chicken extends MovableObject {
    height = 75;
    width = this.height * 1.02;

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
        this.animation();
        this.move();

        this.x = 250 + Math.random() * 500;
        this.y = this.y - this.height;
        this.speed = 0.25 + Math.random() * 1;
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