class ChickenBoss extends MovableObject {

    // Timepassed
    sinceAlert;

    // Intervals
    jumpOnTheCharacterInterval;

    // Boolean
    collisionWhitCharacter = false;
    affectesWithBottle = false;

    // All images for the object
    IMAGES = {
        IMAGES_WALK: [
            'graphics/4_enemie_boss_chicken/1_walk/G1.png',
            'graphics/4_enemie_boss_chicken/1_walk/G2.png',
            'graphics/4_enemie_boss_chicken/1_walk/G3.png',
            'graphics/4_enemie_boss_chicken/1_walk/G4.png'
        ],

        IMAGES_ALERT: [
            'graphics/4_enemie_boss_chicken/2_alert/G5.png',
            'graphics/4_enemie_boss_chicken/2_alert/G6.png',
            'graphics/4_enemie_boss_chicken/2_alert/G7.png',
            'graphics/4_enemie_boss_chicken/2_alert/G8.png',
            'graphics/4_enemie_boss_chicken/2_alert/G9.png',
            'graphics/4_enemie_boss_chicken/2_alert/G10.png',
            'graphics/4_enemie_boss_chicken/2_alert/G11.png',
            'graphics/4_enemie_boss_chicken/2_alert/G12.png'
        ],

        IMAGES_ATTACK: [
            'graphics/4_enemie_boss_chicken/3_attack/G13.png',
            'graphics/4_enemie_boss_chicken/3_attack/G14.png',
            'graphics/4_enemie_boss_chicken/3_attack/G15.png',
            'graphics/4_enemie_boss_chicken/3_attack/G16.png',
            'graphics/4_enemie_boss_chicken/3_attack/G17.png',
            'graphics/4_enemie_boss_chicken/3_attack/G18.png',
            'graphics/4_enemie_boss_chicken/3_attack/G19.png',
            'graphics/4_enemie_boss_chicken/3_attack/G20.png'
        ],

        IMAGES_HURT: [
            'graphics/4_enemie_boss_chicken/4_hurt/G21.png',
            'graphics/4_enemie_boss_chicken/4_hurt/G22.png',
            'graphics/4_enemie_boss_chicken/4_hurt/G23.png'
        ],

        IMAGES_DEAD: [
            'graphics/4_enemie_boss_chicken/5_dead/G24.png',
            'graphics/4_enemie_boss_chicken/5_dead/G25.png',
            'graphics/4_enemie_boss_chicken/5_dead/G26.png'
        ]
    };

    /**
     * This function set all start conditions for the object.
     */
    constructor(x) {
        super().loadImage('graphics/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES);
        this.setImgDimensions(260, 1.16); // width, percent for height = width * height
        this.setImgCoordinates(x - this.width); // coordinates x, y calculate less height
        this.setImgScalePercentage(0.75, 0.9) // percentage scale from width and height
        this.setValues();
    }


    /**
     * This function sets all values for the start or the later course of the game.
     */
    setValues() {
        this.speed = 1.5;
        this.saveSpeed = this.speed;
        this.energy = 50;
        this.walkingDistance = 720 - this.width;
        this.startPosX = this.x;
        this.jumpAttackTime = 1250;
    }


    /**
     * This function starts all intervals.
     */
    startTheEngine() {
        this.animation();
        this.applyGravity();
        this.movement();
        this.lastAlert();
    }


    /**
     * This function controls animation pictures for
     * hurt, alert, walk, dead and attack.
     */
    animation() {
        setInterval(() => {
            if (this.isDead()) {
                this.whichAnimation('dead');
            } else if (this.collisionWhitCharacter) {
                this.whichAnimation('attack');
            } else if (this.isHurt(1)) {
                this.whichAnimation('hurt');
            } else if (this.isAlert() && !this.isDead()) {
                this.whichAnimation('alert');
            } else {
                this.animateImages(this.IMAGES.IMAGES_WALK);
                this.movement();
            }
        }, 1000 / 8);
    }


    /**
     * This function sets the required action.
     * @param {string} action is the requiered action.
     */
    whichAnimation(action) {
        switch (action) {
            case 'attack':
                this.animateImages(this.IMAGES.IMAGES_ATTACK);
                break;
            case 'dead':
                this.animateImages(this.IMAGES.IMAGES_DEAD);
                break;
            case 'hurt':
                this.speed += 0.05;
                this.animateImages(this.IMAGES.IMAGES_HURT);
                break;
            case 'alert':
                this.animateImages(this.IMAGES.IMAGES_ALERT);
                break;
        };

        this.stopMovement();
    }


    /**
     * This function let the boss jump on the character.
     * @param {number} x is the coordinate from the character
     */
    jumpOnTheCharacter(xPosCharacter, jumpingSound) {
        let jump = true;

        this.jumpOnTheCharacterInterval = setInterval(() => {
            if (this.x >= xPosCharacter && !this.otherDirection) {
                this.startJumping(jump, jumpingSound);
                this.x -= 7.5;
            } else if (this.x <= xPosCharacter && this.otherDirection) {
                this.startJumping(jump, jumpingSound);
                this.x += 7.5;
            } else {
                this.affectesWithBottle = false;
                clearInterval(this.jumpOnTheCharacterInterval);
            }

            jump = false;
        }, 1000 / 50);
    }


    /**
     * This function start jumping movement.
     * @param {boolean} jump will jump be executed or not.
     * @param {object} jumpSound is the jumping sound. 
     */
    startJumping(jump, jumpingSound) {
        if (jump) {
            jumpingSound;
            this.jump(27.5);
        }
    }


    /**
     * This function set the current time from the alert.
     */
    lastAlert() {
        this.sinceAlert = new Date().getTime();
    }


    /**
     * This function evaluates the past.
     * @returns true or false.
     */
    isAlert() {
        let timepassed = new Date().getTime() - this.sinceAlert;
        timepassed = timepassed / 1000
        return timepassed < 2;
    }


    /**
     * This function start the diffrent movements.
     */
    movement() {
        if (!this.runCrazyIntervall) this.runCrazy();
        if (!this.jumpAttackIntervall) this.jumpAttack();
    }


    /**
     * This function stops the diffrent movements.
     */
    stopMovement() {
        clearInterval(this.runCrazyIntervall);
        clearInterval(this.jumpAttackIntervall);

        this.resetIntervallValues();
    }
}