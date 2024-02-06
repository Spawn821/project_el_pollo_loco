class Chicken extends MovableObject {
    animationIntervall;

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


    constructor() {
        super().loadImage('../graphics/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES);
        this.setImgDimensions(75, 1.02); // width, percent for height = width * height
        this.setImgCoordinates(450 + Math.random() * 500); // coordinates x, y calculate less height
        this.setImgScalePercentage(0.8, 0.8) // percentage scale from width and height
        this.startTheEngine();
        this.setValues();
    }


    /**
     * This function sets all values for the start or the later course of the game.
     */
    setValues() {
        this.speed = 0.25 + Math.random() * 1;
        this.saveSpeed = this.speed;
        this.energy = 10;
    }


    /**
     * This function starts all intervals.
     */
    startTheEngine() {
        this.animation();
        this.move();
    }


    /**
     * This function controlls all animations.
     */
    animation() {
        if (this.energy > 0) {
            this.speed = this.saveSpeed;
            this.animationIntervall = setInterval(() => {
                this.animateImages(this.IMAGES.IMAGES_WALKING);
            }, 1000 / 6);
        }
    }


    /**
     * This function starts an hurt animtion and let the enemy bounces briefly.
     */
    affected() {
        this.speedY = 10;
        this.applyGravity();
    }


    /**
     * This function starts an hurt (dead) animation when jumping on the enemy and
     * stop the walking animation.
     * If the energy not zero the walking animtion restarted.
     */
    flat() {
        this.speed = 0;
        clearInterval(this.animationIntervall);
        this.animateImages(this.IMAGES.IMAGES_DEAD);
        if (this.energy > 0) {
            setTimeout(() => {
                this.animation();
            }, 1000);
        }
    }


    /**
     * This function lets the enemy move.
     */
    move() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

    }
}