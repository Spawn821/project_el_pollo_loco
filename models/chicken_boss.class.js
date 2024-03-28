class ChickenBoss extends MovableObject {

    collisionWhitCharacter = false;
    sinceAlert;
    jumpOnTheCharacterInterval;
    xPosCharacter;

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

    constructor(x) {
        super().loadImage('graphics/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES);
        this.setImgDimensions(260, 1.16); // width, percent for height = width * height
        this.setImgCoordinates(x - this.width); // coordinates x, y calculate less height
        this.setImgScalePercentage(0.5, 0.8) // percentage scale from width and height
        this.setValues();
    }


    setValues() {
        this.speed = 1.5;
        this.saveSpeed = this.speed;
        this.energy = 50;
        this.walkingDistance = 720 - this.width;
        this.startPosX = this.x;
        this.jumpAttackTime = 1250;
    }


    startTheEngine() {
        this.animation();
        this.applyGravity();
        this.movement();
        this.lastAlert();
    }


    animation() {
        setInterval(() => {
            if (this.collisionWhitCharacter) {
                this.stopMovement()
                this.animateImages(this.IMAGES.IMAGES_ATTACK);
            } else if (this.isDead()) {
                this.stopMovement()
                this.animateImages(this.IMAGES.IMAGES_DEAD);
            } else if (this.isHurt(1)) {
                this.speed += 0.05;
                this.stopMovement()
                this.animateImages(this.IMAGES.IMAGES_HURT);
            } else if (this.isAlert() && !this.isDead()) {
                this.stopMovement()
                this.animateImages(this.IMAGES.IMAGES_ALERT);
            } else {
                this.animateImages(this.IMAGES.IMAGES_WALK);
                this.movement();
            }
        }, 1000 / 8);
    }


    jumpOnTheCharacter(x) {
        this.jump(27.5);

        this.jumpOnTheCharacterInterval = setInterval(() => {
            if (this.x >= x && !this.otherDirection) {
                this.x -= 15;
            } else if (this.x <= x && this.otherDirection) {
                this.x += 15;
            } else {
                clearInterval(this.jumpOnTheCharacterInterval);
            }
        }, 1000 / 25);
    }


    lastAlert() {
        this.sinceAlert = new Date().getTime();
    }


    isAlert() {
        let timepassed = new Date().getTime() - this.sinceAlert;
        timepassed = timepassed / 1000
        return timepassed < 2;
    }


    movement() {
        if (!this.runCrazyIntervall) this.runCrazy();
        if (!this.jumpAttackIntervall) this.jumpAttack();
    }


    stopMovement() {
        clearInterval(this.runCrazyIntervall);
        clearInterval(this.jumpAttackIntervall);

        this.resetIntervallValues();
    }
}