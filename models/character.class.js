class Character extends MovableObject {

    // The whole class 'world'
    world;

    // Movement range
    levelBackground = level.background;
    lastLevelSection = 0;
    walkingLimitLeft = 0;
    walkingLimitRight = 0;
    end_camera = 0;

    // Object
    movie = new Movie();

    // Timepassed
    lastWalk = 0;
    lastJump = 0;
    fartTime = 35;

    // Boolean
    doubleJump = false;

    // All images for the object
    IMAGES = {
        IMAGES_IDLE: [
            'graphics/2_character_pepe/1_idle/idle/I-1.png',
            'graphics/2_character_pepe/1_idle/idle/I-2.png',
            'graphics/2_character_pepe/1_idle/idle/I-3.png',
            'graphics/2_character_pepe/1_idle/idle/I-4.png',
            'graphics/2_character_pepe/1_idle/idle/I-5.png',
            'graphics/2_character_pepe/1_idle/idle/I-6.png',
            'graphics/2_character_pepe/1_idle/idle/I-7.png',
            'graphics/2_character_pepe/1_idle/idle/I-8.png',
            'graphics/2_character_pepe/1_idle/idle/I-9.png',
            'graphics/2_character_pepe/1_idle/idle/I-10.png'
        ],

        IMAGES_LONG_IDLE: [
            'graphics/2_character_pepe/1_idle/long_idle/I-11.png',
            'graphics/2_character_pepe/1_idle/long_idle/I-12.png',
            'graphics/2_character_pepe/1_idle/long_idle/I-13.png',
            'graphics/2_character_pepe/1_idle/long_idle/I-14.png',
            'graphics/2_character_pepe/1_idle/long_idle/I-15.png',
            'graphics/2_character_pepe/1_idle/long_idle/I-16.png',
            'graphics/2_character_pepe/1_idle/long_idle/I-17.png',
            'graphics/2_character_pepe/1_idle/long_idle/I-18.png',
            'graphics/2_character_pepe/1_idle/long_idle/I-19.png',
            'graphics/2_character_pepe/1_idle/long_idle/I-20.png',
        ],

        IMAGES_WALKING: [
            'graphics/2_character_pepe/2_walk/W-21.png',
            'graphics/2_character_pepe/2_walk/W-22.png',
            'graphics/2_character_pepe/2_walk/W-23.png',
            'graphics/2_character_pepe/2_walk/W-24.png',
            'graphics/2_character_pepe/2_walk/W-25.png',
            'graphics/2_character_pepe/2_walk/W-26.png'
        ],

        IMAGES_JUMPING: [
            'graphics/2_character_pepe/3_jump/J-31.png',
            'graphics/2_character_pepe/3_jump/J-32.png',
            'graphics/2_character_pepe/3_jump/J-33.png',
            'graphics/2_character_pepe/3_jump/J-34.png',
            'graphics/2_character_pepe/3_jump/J-35.png',
            'graphics/2_character_pepe/3_jump/J-36.png',
            'graphics/2_character_pepe/3_jump/J-37.png',
            'graphics/2_character_pepe/3_jump/J-38.png',
            'graphics/2_character_pepe/3_jump/J-39.png'
        ],

        IMAGES_HURT: [
            'graphics/2_character_pepe/4_hurt/H-41.png',
            'graphics/2_character_pepe/4_hurt/H-42.png',
            'graphics/2_character_pepe/4_hurt/H-43.png'
        ],

        IMAGES_DEAD: [
            'graphics/2_character_pepe/5_dead/D-51.png',
            'graphics/2_character_pepe/5_dead/D-52.png',
            'graphics/2_character_pepe/5_dead/D-53.png',
            'graphics/2_character_pepe/5_dead/D-54.png',
            'graphics/2_character_pepe/5_dead/D-55.png',
            'graphics/2_character_pepe/5_dead/D-56.png',
            'graphics/2_character_pepe/5_dead/D-57.png'
        ]
    };

    /**
     * This function set all start conditions for the object.
     */
    constructor() {
        super().loadImage('graphics/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES);
        this.setImgDimensions(125, 1.97); // width, percent for height = width * height
        this.setImgCoordinates(200); // coordinates x, y calculate less height
        this.setImgScalePercentage(0.4, 0.5) // percentage scale from width and height
        this.setValues();
        this.startTheEngine();
    }


    /**
     * This function sets all values for the start or the later course of the game.
     */
    setValues() {
        this.lastLevelSection = this.levelBackground.sections[this.lastSection()];
        this.walkingLimitRight = this.lastLevelSection + 720 - this.width;
        this.end_camera = this.lastLevelSection + 200;
        this.speed = 5;
        this.saveSpeed = this.speed;
        this.energy = 100;
        this.movie.character = this;
    }


    /**
     * This function set the coordinates for
     * the last level section.
     * @returns number.
     */
    lastSection() {
        let lastSection;
        for (let section in this.levelBackground.sections) {
            lastSection = section;
        }

        return lastSection;
    }


    /**
     * This function starts all intervals.
     */
    startTheEngine() {
        this.animation();
        this.animationIdle();
        this.move();
        this.throwBottle();
        this.applyGravity();
        this.resetLastActionIfPause();
    }



    // ### ANIMATION ###

    /**
     * This function controls animation pictures for
     * hurt, jump and walk.
     */
    animation() {
        let runMovie = false;

        setInterval(() => {
            if (!loading && !pause && !gameEnd) {
                if (this.isDead()) {
                    runMovie = this.dead(runMovie);
                } else if (this.isHurt(0.25)) {
                    this.animateImages(this.IMAGES.IMAGES_HURT);
                    this.world.sound.hurtSound();
                } else if (this.isAboveGround()) {
                    this.animateImages(this.IMAGES.IMAGES_JUMPING);
                } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.animateImages(this.IMAGES.IMAGES_WALKING);
                    this.world.sound.walkingSound();
                }
            }
        }, 1000 / 10);
    }


    /**
     * This function controls animation pictures for
     * idle and long idle.
     */
    animationIdle() {
        setInterval(() => {
            if (!loading && !pause && !gameEnd) {
                if (this.isAction(15, this.lastWalk) && this.isAction(15, this.lastJump)) {
                    this.longIdle();
                } else if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                    if (!this.isDead() && !this.isHurt(0.25) && !this.isAboveGround()) {
                        this.animateImages(this.IMAGES.IMAGES_IDLE);
                    }
                }
            }
        }, 1000 / 5)
    }


    /**
     * This function controls animation pictures and
     * movement for dead.
     * @param {boolean} runMovie is the movie start or not.
     * @returns true or false.
     */
    dead(runMovie) {
        this.animateImages(this.IMAGES.IMAGES_DEAD);
        if (!runMovie) runMovie = this.movie.movieJumping();
        setTimeout(() => gameEnd = true, 3000);
        return runMovie;
    }


    /**
     * This function controls animation pictures and
     * sound for long idle.
     */
    longIdle() {
        this.animateImages(this.IMAGES.IMAGES_LONG_IDLE);
        if (this.isAction(this.fartTime)) {
            this.world.sound.fartSound();
            this.fartTime += 20;
        }
    }



    // ### MOVEMENTS ###

    /**
     * This function priorized whether the character
     * walk left or right and jump.
     */
    move() {
        setInterval(() => {
            if (!loading && !pause && !gameEnd) {
                if (this.world.keyboard.RIGHT && this.x < this.walkingLimitRight) {
                    this.walkingMovement(false);
                }

                if (this.world.keyboard.LEFT && this.x > this.walkingLimitLeft) {
                    this.walkingMovement(true);
                }

                this.jumpOrDoubleJump();
            }
        }, 1000 / 60);
    }


    /**
     * This function let the character move left or right.
     * @param {boolean} otherDirection mirror the character images
     * to move left if is true.
     */
    walkingMovement(otherDirection) {
        if (this.world.keyboard.RIGHT) this.moveRight();
        if (this.world.keyboard.LEFT) this.moveLeft();
        this.otherDirection = otherDirection;
        this.setCurrentWalkTime();
        this.resetFartTime();
    }


    /**
     * This function priorized whether the character
     * jump or double jump.
     */
    jumpOrDoubleJump() {
        if (this.isOnGround()) {
            if (this.world.keyboard.SPACE) {
                this.jumpMovement(true);
            }
        } else {
            if (this.world.keyboard.SPACE && this.isAction(0.5, this.lastJump)) {
                if (this.doubleJump) {
                    this.jumpMovement(false);
                }
            }
        }
    }


    /**
     * This function let the character jump and
     * starts all conditions for it.
     * @param {boolean} doubleJump let the character jump
     * twice or not.
     */
    jumpMovement(doubleJump) {
        this.jump();
        this.doubleJump = doubleJump;
        this.world.sound.jumpingSound();
        this.setCurrentJumpTime();
        this.resetFartTime();
    }



    // ### BOTTLE ###

    /**
     * This function starts the various throwing distances.
     */
    throwBottle() {
        setInterval(() => {
            if (!loading && !pause && !gameEnd) {
                if (this.world.statusbar.bottleIcon.numberText > 0) {
                    if (this.world.keyboard.a) {
                        this.setBottle(10)
                    } else if (this.world.keyboard.s) {
                        this.setBottle(15);
                    } else if (this.world.keyboard.d) {
                        this.setBottle(20);
                    }
                }
            }
        }, 1000 / 60);
    }


    /**
     * This function set a new bottle.
     * @param {number} distance is the throw distance.
     */
    setBottle(distance) {
        if (this.world.bottles.length == 0) this.createBottle(distance);
        this.setCurrentWalkTime();
        this.resetFartTime();
    }


    /**
     * This function create a new bottle for throwing.
     * @param {number} distance is the throwing distance.
     */
    createBottle(distance) {
        let bottle = new Bottle(this.x + this.offsetX, this.y + this.offsetY, distance);
        bottle.otherDirection = this.otherDirection;

        this.world.bottles.push(bottle);
        this.world.statusbar.decreaseCounterBottle();
    }



    // ### CONTROL ACTION ###


    /**
     * This function reset the fart time for the long idle.
     */
    resetFartTime() {
        this.fartTime = 35;
    }

    /**
     * This function set the current action time if walk.
     */
    setCurrentWalkTime() {
        this.lastWalk = new Date().getTime();
    }

    /**
     * This function set the current action time if jump.
     */
    setCurrentJumpTime() {
        this.lastJump = new Date().getTime();
    }


    /**
     * This function reset the 'lastAction' variable as long
     * the pause status exist. 
     */
    resetLastActionIfPause() {
        setInterval(() => {
            if (loading || pause) {
                this.setCurrentWalkTime();
                this.setCurrentJumpTime();
            }
        }, 1000 / 10);
    }


    /**
     * This function evaluates the past.
     * @param {number} duration is the pasttime.
     * @returns true or false.
     */
    isAction(duration, lastAction) {
        let timepassed = new Date().getTime() - lastAction;
        timepassed = timepassed / 1000;
        return timepassed > duration;
    }
}