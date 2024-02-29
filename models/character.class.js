class Character extends MovableObject {

    levelBackground = level.background;
    lastLevelSection = 0;
    world;
    end_camera;
    chickenBossAppears = false;
    walkingLimitLeft = 0;
    walkingLimitRight = 0;
    bossFightStarted = false;
    doubleJumpe = false;
    lastAction;

    IMAGES = {
        IMAGES_IDLE: [
            '../graphics/2_character_pepe/1_idle/idle/I-1.png',
            '../graphics/2_character_pepe/1_idle/idle/I-2.png',
            '../graphics/2_character_pepe/1_idle/idle/I-3.png',
            '../graphics/2_character_pepe/1_idle/idle/I-4.png',
            '../graphics/2_character_pepe/1_idle/idle/I-5.png',
            '../graphics/2_character_pepe/1_idle/idle/I-6.png',
            '../graphics/2_character_pepe/1_idle/idle/I-7.png',
            '../graphics/2_character_pepe/1_idle/idle/I-8.png',
            '../graphics/2_character_pepe/1_idle/idle/I-9.png',
            '../graphics/2_character_pepe/1_idle/idle/I-10.png'
        ],

        IMAGES_WALKING: [
            '../graphics/2_character_pepe/2_walk/W-21.png',
            '../graphics/2_character_pepe/2_walk/W-22.png',
            '../graphics/2_character_pepe/2_walk/W-23.png',
            '../graphics/2_character_pepe/2_walk/W-24.png',
            '../graphics/2_character_pepe/2_walk/W-25.png',
            '../graphics/2_character_pepe/2_walk/W-26.png'
        ],

        IMAGES_JUMPING: [
            '../graphics/2_character_pepe/3_jump/J-31.png',
            '../graphics/2_character_pepe/3_jump/J-32.png',
            '../graphics/2_character_pepe/3_jump/J-33.png',
            '../graphics/2_character_pepe/3_jump/J-34.png',
            '../graphics/2_character_pepe/3_jump/J-35.png',
            '../graphics/2_character_pepe/3_jump/J-36.png',
            '../graphics/2_character_pepe/3_jump/J-37.png',
            '../graphics/2_character_pepe/3_jump/J-38.png',
            '../graphics/2_character_pepe/3_jump/J-39.png'
        ],

        IMAGES_HURT: [
            '../graphics/2_character_pepe/4_hurt/H-41.png',
            '../graphics/2_character_pepe/4_hurt/H-42.png',
            '../graphics/2_character_pepe/4_hurt/H-43.png'
        ],

        IMAGES_DEAD: [
            '../graphics/2_character_pepe/5_dead/D-51.png',
            '../graphics/2_character_pepe/5_dead/D-52.png',
            '../graphics/2_character_pepe/5_dead/D-53.png',
            '../graphics/2_character_pepe/5_dead/D-54.png',
            '../graphics/2_character_pepe/5_dead/D-55.png',
            '../graphics/2_character_pepe/5_dead/D-56.png',
            '../graphics/2_character_pepe/5_dead/D-57.png'
        ]
    };

    constructor() {
        super().loadImage('../graphics/2_character_pepe/1_idle/idle/I-1.png');
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
    }


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
        this.move();
        this.throwBottle();
        this.moveCamera();
        this.applyGravity();
    }


    /**
     * This function controlls all animations from walk, to jump ...
     */
    animation() {
        setInterval(() => {
            if (this.isDead()) {
                this.animateImages(this.IMAGES.IMAGES_DEAD);
            } else if (this.isHurt(0.25)) {
                this.animateImages(this.IMAGES.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.animateImages(this.IMAGES.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.animateImages(this.IMAGES.IMAGES_WALKING);
                this.walkingSound();
            } else {
                this.animateImages(this.IMAGES.IMAGES_IDLE);
            }
        }, 1000 / 10);
    }


    /**
     * This function lets the character move.
     */
    move() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.walkingLimitRight) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > this.walkingLimitLeft) {
                this.moveLeft();
                this.otherDirection = true;
            }

            this.doubleJump();
        }, 1000 / 60);
    }


    doubleJump() {
        if (this.isOnGround()) {
            if (this.world.keyboard.SPACE) {
                this.jump();
                this.doubleJumpe = true;
                this.lastAction = new Date().getTime();
                this.jumpingSound();
            }
        } else {
            if (this.world.keyboard.SPACE && this.isAction(0.5)) {
                if (this.doubleJumpe) {
                    this.jump();
                    this.doubleJumpe = false;
                    this.jumpingSound();
                }
            }
        }
    }


    /**
     * This function starts the various throwing distances.
     */
    throwBottle() {
        this.lastAction = new Date().getTime();
        setInterval(() => {
            if (this.world.statusbar.bottleIcon.numberText > 0) {
                if (this.world.keyboard.a) {
                    if (this.isAction(1)) this.createBottle(10);
                } else if (this.world.keyboard.s) {
                    if (this.isAction(1)) this.createBottle(15);
                } else if (this.world.keyboard.d) {
                    if (this.isAction(1)) this.createBottle(20);
                }
            }
        }, 1000 / 60);
    }


    isAction(duration) {
        let timepassed = new Date().getTime() - this.lastAction;
        timepassed = timepassed / 1000;
        return timepassed > duration;
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

        this.lastAction = new Date().getTime();
    }


    /**
     * This function controlls the camera movement.
     */
    moveCamera() {
        setInterval(() => {
            if (this.x + 300 > this.end_camera) {
                this.moveCameraToTheBoss();
            } else if (this.x > 200 && this.x < this.end_camera && !this.chickenBossAppears) {
                this.world.camera_x = -this.x + 200;
            }
        }, 1000 / 60)
    }


    moveCameraToTheBoss() {
        this.chickenBossAppears = true;
        this.walkingLimitLeft = this.lastLevelSection;

        if (this.world.camera_x > -this.end_camera + 200) {
            this.world.camera_x -= 2;

            this.moveCharacterToTheBoss();
        }
    }


    moveCharacterToTheBoss() {
        this.speed = 1;

        if (this.world.camera_x > -this.end_camera + 250) {
            this.world.keyboard.RIGHT = true;
        } else {
            this.world.keyboard.RIGHT = false;
            this.speed = this.saveSpeed;
            this.startTheBossFight();
        }
    }


    startTheBossFight() {
        if (!this.bossFightStarted) {
            this.world.levelEnemies.ENEMIES[this.world.levelEnemies.ENEMIES.length - 1].startTheEngine();
            this.world.statusbar.createChickenBossStatus();
            this.bossFightStarted = true;
        }
    }
}