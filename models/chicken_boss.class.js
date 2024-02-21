class ChickenBoss extends MovableObject {

    collisionWhitCharacter = false;
    sinceAlert;

    currentSpeed = 0;
    speeds = [
        2.5,
        7.5,
        5
    ]

    IMAGES = {
        IMAGES_WALK: [
            '../graphics/4_enemie_boss_chicken/1_walk/G1.png',
            '../graphics/4_enemie_boss_chicken/1_walk/G2.png',
            '../graphics/4_enemie_boss_chicken/1_walk/G3.png',
            '../graphics/4_enemie_boss_chicken/1_walk/G4.png'
        ],

        IMAGES_ALERT: [
            '../graphics/4_enemie_boss_chicken/2_alert/G5.png',
            '../graphics/4_enemie_boss_chicken/2_alert/G6.png',
            '../graphics/4_enemie_boss_chicken/2_alert/G7.png',
            '../graphics/4_enemie_boss_chicken/2_alert/G8.png',
            '../graphics/4_enemie_boss_chicken/2_alert/G9.png',
            '../graphics/4_enemie_boss_chicken/2_alert/G10.png',
            '../graphics/4_enemie_boss_chicken/2_alert/G11.png',
            '../graphics/4_enemie_boss_chicken/2_alert/G12.png'
        ],

        IMAGES_ATTACK: [
            '../graphics/4_enemie_boss_chicken/3_attack/G13.png',
            '../graphics/4_enemie_boss_chicken/3_attack/G14.png',
            '../graphics/4_enemie_boss_chicken/3_attack/G15.png',
            '../graphics/4_enemie_boss_chicken/3_attack/G16.png',
            '../graphics/4_enemie_boss_chicken/3_attack/G17.png',
            '../graphics/4_enemie_boss_chicken/3_attack/G18.png',
            '../graphics/4_enemie_boss_chicken/3_attack/G19.png',
            '../graphics/4_enemie_boss_chicken/3_attack/G20.png'
        ],

        IMAGES_HURT: [
            '../graphics/4_enemie_boss_chicken/4_hurt/G21.png',
            '../graphics/4_enemie_boss_chicken/4_hurt/G22.png',
            '../graphics/4_enemie_boss_chicken/4_hurt/G23.png'
        ],

        IMAGES_DEAD: [
            '../graphics/4_enemie_boss_chicken/5_dead/G24.png',
            '../graphics/4_enemie_boss_chicken/5_dead/G25.png',
            '../graphics/4_enemie_boss_chicken/5_dead/G26.png'
        ]
    };

    constructor(x) {
        super().loadImage('../graphics/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES);
        this.setImgDimensions(260, 1.16); // width, percent for height = width * height
        this.setImgCoordinates(x - this.width); // coordinates x, y calculate less height
        this.setImgScalePercentage(0.5, 1) // percentage scale from width and height
        this.setValues();
    }


    setValues() {
        this.speed = this.speeds[0];
        this.saveSpeed = this.speed;
        this.energy = 50;
        this.walkingDistance = 720 - this.width;
        this.startPosX = this.x;
    }


    startTheEngine() {
        this.animation();
        this.movement();
    }


    animation() {
        this.lastAlert();

        setInterval(() => {
            if (this.isAlert()) {
                this.animateImages(this.IMAGES.IMAGES_ALERT);
                this.speed = 0;
            } else if (this.collisionWhitCharacter) {
                this.animateImages(this.IMAGES.IMAGES_ATTACK);
                this.speed = 0;
            } else if (this.isDead()) {
                this.animateImages(this.IMAGES.IMAGES_DEAD);
                this.speed = 0;
            } else if (this.isHurt(1)) {
                this.animateImages(this.IMAGES.IMAGES_HURT);
                this.speed = 0;
            } else {
                this.animateImages(this.IMAGES.IMAGES_WALK);
                this.speed = this.saveSpeed;
            }
        }, 1000 / 8);
    }


    lastAlert() {
        this.sinceAlert = new Date().getTime();
    }


    isAlert() {
        let timepassed = new Date().getTime() - this.sinceAlert;
        timepassed = timepassed / 1000
        return timepassed < 2;
    }


    runCrazy() {
        this.runCrazyIntervall = setInterval(() => {
            if (!this.leftSideReached) {
                this.moveLeft();
                this.runningDirectionRight();
            } else if (!this.rightSideReached) {
                this.moveRight();
                this.runningDirectionLeft();
            }
            console.log(this.speed);
        }, 1000 / 60);
    }


    runningDirectionRight() {
        if (this.x <= this.startPosX - this.walkingDistance) {
            this.leftSideReached = true;
            this.rightSideReached = false;
            this.otherDirection = true;
            this.lastAlert();
            this.currentSpeed++;
            this.speed = this.speeds[this.currentSpeed % this.speeds.length];
            this.saveSpeed = this.speed;
        }
    }


    runningDirectionLeft() {
        if (this.x >= this.startPosX) {
            this.leftSideReached = false;
            this.rightSideReached = true;
            this.otherDirection = false;
            this.lastAlert();
            this.currentSpeed++;
            this.speed = this.speeds[this.currentSpeed % this.speeds.length];
            this.saveSpeed = this.speed;
        }
    }


    movement() {
        if (!this.runCrazyIntervall) this.runCrazy();
    }


    stopMovement() {
        clearInterval(this.runCrazyIntervall);

        this.resetIntervallValues();
    }
}