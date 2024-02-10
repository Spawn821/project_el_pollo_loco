class Bottle extends MovableObject {
    acceleration = 2.5;
    throwDistance = 0;
    rotationInterval;
    throwDistanceInterval;

    IMAGES = {
        IMAGES_BOTTLE_ROTATION: [
            '../graphics/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
            '../graphics/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
            '../graphics/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
            '../graphics/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
        ],

        IMAGES_BOTTLE_SPLASH: [
            '../graphics/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
            '../graphics/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
            '../graphics/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
            '../graphics/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
            '../graphics/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
            '../graphics/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
        ]
    };

    constructor(x, y, distance) {
        super().loadImage('../graphics/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES);
        this.setImgDimensions(75, 1); // width, percent for height = width * height
        this.setImgCoordinates(x, y); // coordinates x, y calculate less height
        this.setImgScalePercentage(0.5, 0.5) // percentage scale from width and height
        this.setValues(distance);
        this.startTheEngine();
    }


    /**
     * This function sets all values for the start or the later course of the game.
     */
    setValues(distance) {
        this.throwDistance = distance;
    }


    /**
     * This function starts all intervals.
     */
    startTheEngine() {
        this.throw();
        this.rotation();
    }


    /**
     * This function shows the rotations animation when the bottle has been thrown.
     */
    rotation() {
        this.rotationInterval = setInterval(() => {
                this.animateImages(this.IMAGES.IMAGES_BOTTLE_ROTATION);
        }, 1000 / 10);
    }


    /**
     * This function shows the splash animation when the bottle collided with an enemy.
     */
    splash() {
        this.currentImage = 0;
        setInterval(() => {
            this.animateImages(this.IMAGES.IMAGES_BOTTLE_SPLASH);
        }, 1000 / 8);
    }


    /**
     * This function generates the trajectory of the bottle.
     */
    throw() {
        this.speedY = 20;
        this.applyGravity();

        this.throwDistanceInterval = setInterval(() => {
            if (this.otherDirection) {
                this.x -= this.throwDistance;
            } else {
                this.x += this.throwDistance;
            }
        }, 1000 / 25);
    }


    /**
     * This function stop all throw animations.
     */
    stopThrow() {
        clearInterval(this.applyGravityInterval);
        clearInterval(this.throwDistanceInterval);
        clearInterval(this.rotationInterval);
    }
}