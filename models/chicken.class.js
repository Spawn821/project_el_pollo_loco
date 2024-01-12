class Chicken extends MovableObject {
    height = 75;
    width = this.height * 1.02;

    imgCacheWalking = {};
    IMAGES_WALKING = [
        '../graphics/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../graphics/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../graphics/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImage('../graphics/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.imgCacheWalking = this.loadImages(this.IMAGES_WALKING);
        this.animation();

        this.x = 250 + Math.random() * 500;
        this.y = this.y - this.height;
        this.speed = 0.25 + Math.random() * 1;
    }


    animation() {
        this.moveLeft();

        setInterval(() => {
            this.animateImages(this.IMAGES_WALKING, this.imgCacheWalking);
        }, 150);
    }
}