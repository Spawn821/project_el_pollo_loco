class Bottle extends MovableObject {

    // For the runway
    acceleration = 2.5;
    throwDistance = 0;

    // All images for the object
    IMAGES = {
        IMAGES_BOTTLE_ROTATION: [
            'graphics/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
            'graphics/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
            'graphics/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
            'graphics/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
        ],

        IMAGES_BOTTLE_SPLASH: [
            'graphics/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
            'graphics/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
            'graphics/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
            'graphics/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
            'graphics/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
            'graphics/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
        ]
    };

    /**
     * This function set all start conditions for the object.
     * @param {number} x is the start coordinate from the image.
     * @param {number} y is the start coordinate from the image.
     * @param {number} distance is throw dinstance from the bottle.
     */
    constructor(x, y, distance) {
        super().loadImage('graphics/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
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
        this.animation();
    }


    /**
     * This function controlls all animations from walk, to jump ...
     */
    animation() {
        setInterval(() => {
            if (this.isOnGround() || this.colliding) {
                this.animateImages(this.IMAGES.IMAGES_BOTTLE_SPLASH);
            } else {
                this.animateImages(this.IMAGES.IMAGES_BOTTLE_ROTATION);
            }
        }, 1000 / 8);
    }


    /**
     * This function generates the trajectory of the bottle.
     */
    throw() {
        this.speedY = 20;
        this.applyGravity();

        setInterval(() => {
            if (!pause && !this.isOnGround() && !this.colliding) {
                if (this.otherDirection) {
                    this.x -= this.throwDistance;
                } else {
                    this.x += this.throwDistance;
                }
            }
        }, 1000 / 25);
    }
}