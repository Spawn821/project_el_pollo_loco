class Endboss extends MovableObject {
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
        this.setImgCoordinates(720 - this.width); // coordinates x, y calculate less height
        this.setImgScalePercentage(0.65, 0.8) // percentage scale from width and height
        this.setValues();
        this.startTheEngine();

    }

    setValues() {
        this.speed = 1.5;
    }


    startTheEngine() {
        this.animation();
        //this.move();
    }


    animation() {
        setInterval(() => {
            this.animateImages(this.IMAGES.IMAGES_WALK);
            //this.animateImages(this.IMAGES.IMAGES_ALERT);
        }, 1000 / 8);
    }


    move() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}