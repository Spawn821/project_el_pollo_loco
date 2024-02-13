class Endboss extends MovableObject {
    levelBackground = level1Background;
    collisionWhitCharacter = false;
    sinceAlert = new Date().getTime();
    moveIntervall;
    leftSideReached = false;
    rightSideReached = true;
    walkingDistance = 0;
    startPosX = 0;

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

    constructor() {
        super().loadImage('../graphics/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES);
        this.setImgDimensions(300, 1.16); // width, percent for height = width * height
        this.setValues();
        this.setImgCoordinates(this.startPosX); // coordinates x, y calculate less height
        this.setImgScalePercentage(0.50, 0.8) // percentage scale from width and height
        this.animation();
        this.startTheEngine();

    }


    setValues() {
        this.speed = 1.5;
        this.saveSpeed = this.speed;
        this.energy = 30;
        this.walkingDistance = 720;
        this.startPosX = this.levelBackground.sections[this.lastSection()] + 720 - this.width;
    }


    lastSection() {
        let lastSection;
        for (let section in this.levelBackground.sections) {
            lastSection = section;
        }

        return lastSection;
    }


    startTheEngine() {
        this.move();
    }


    animation() {
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


    isAlert() {
        let timepassed = new Date().getTime() - this.sinceAlert;
        timepassed = timepassed / 1000
        return timepassed < 5;
    }


    move() {
        this.moveIntervall = setInterval(() => {
            if (!this.leftSideReached) {
                this.moveLeft();
                this.runningDirectionRight();
            } else if (!this.rightSideReached) {
                this.moveRight();
                this.runningDirectionLeft();
            }
        }, 1000 / 60);
    }


    runningDirectionRight() {
        if (this.x == this.startPosX - this.walkingDistance + this.width) {
            this.leftSideReached = true;
            this.rightSideReached = false;
            this.otherDirection = true;
        }
    }


    runningDirectionLeft() {
        if (this.x == this.startPosX) {
            this.leftSideReached = false;
            this.rightSideReached = true;
            this.otherDirection = false;
        }
    }
}