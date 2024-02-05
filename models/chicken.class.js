class Chicken extends MovableObject {
    IMAGES = {
        IMAGES_WALKING: [
            '../graphics/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
            '../graphics/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
            '../graphics/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        ],

        IMAGES_DEAD: [
            '../graphics/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        ]
    };

    animationIntervall;


    constructor() {
        super().loadImage('../graphics/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES);
        this.setImgDimensions(75, 1.02); // width, percent for height = width * height
        this.setImgCoordinates(450 + Math.random() * 500); // coordinates x, y calculate less height
        this.setImgScalePercentage(1, 1) // percentage scale from width and height
        this.animation();
        //this.move();

        this.speed = 0.25 + Math.random() * 1;
    }


    animation() {
        this.animationIntervall = setInterval(() => {
            this.animateImages(this.IMAGES.IMAGES_WALKING);
        }, 1000 / 6);
    }


    dead() {
        clearInterval(this.animationIntervall);
        this.animateImages(this.IMAGES.IMAGES_DEAD);
    }


    move() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

    }
}