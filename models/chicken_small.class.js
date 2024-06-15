class ChickenSmall extends MovableObject {

    // All images for the object
    IMAGES = {
        IMAGES_WALKING: [
            'graphics/3_enemies_chicken/chicken_small/1_walk/1_w.png',
            'graphics/3_enemies_chicken/chicken_small/1_walk/2_w.png',
            'graphics/3_enemies_chicken/chicken_small/1_walk/3_w.png'
        ],

        IMAGES_DEAD: [
            'graphics/3_enemies_chicken/chicken_small/2_dead/dead.png',
        ]
    };

    /**
     * This function set all start conditions for the object.
     */
    constructor(x, movementNumber) {
        super();
        this.movementNumber = movementNumber;

        this.loadImage('graphics/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES);
        this.setImgDimensions(75, 1.03); // width, percent for height = width * height
        this.setImgCoordinates(x + Math.random() * 200); // coordinates x, y calculate less height
        this.setImgScalePercentage(0.6, 0.6) // percentage scale from width and height
        this.setValues();
        this.startTheEngine()
    }


    /**
     * This function sets all values for the start or the later course of the game.
     */
    setValues() {
        this.speed = 0.25 + Math.random() * 1.5;
        this.energy = 5;
        this.walkingDistance = 400;
        this.startPosX = this.x;
    }


    /**
     * This function starts all intervals.
     */
    startTheEngine() {
        this.animation();
        this.movement();
    }


    /**
     * This function controls animation pictures for
     * walk and dead.
     */
    animation() {
        setInterval(() => {
            if (this.isDead() || this.isHurt(1)) {
                this.stopMovement();
                this.animateImages(this.IMAGES.IMAGES_DEAD);
            } else {
                this.movement();
                this.animateImages(this.IMAGES.IMAGES_WALKING);
            }
        }, 1000 / 6);
    }


    /**
     * This function start the diffrent movements.
     */
    movement() {
        switch (this.movementNumber) {
            case 0:
                if (!this.runLeftIntervall) this.runLeft();
                break;
            case 1:
                if (!this.runCrazyIntervall) this.runCrazy();
                break;
        };
    }


    /**
     * This function stops the diffrent movements.
     */
    stopMovement() {
        switch (this.movementNumber) {
            case 0:
                clearInterval(this.runLeftIntervall);
                break;
            case 1:
                clearInterval(this.runCrazyIntervall);
                break;
        };

        this.resetIntervallValues();
    }
}