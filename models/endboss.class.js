class Endboss extends MovableObject {
    height = 350;
    width = this.height * 0.86;

    IMAGES = {
        IMAGES_ALERT: [
            '../graphics/4_enemie_boss_chicken/2_alert/G5.png',
            '../graphics/4_enemie_boss_chicken/2_alert/G6.png',
            '../graphics/4_enemie_boss_chicken/2_alert/G7.png',
            '../graphics/4_enemie_boss_chicken/2_alert/G8.png',
            '../graphics/4_enemie_boss_chicken/2_alert/G9.png',
            '../graphics/4_enemie_boss_chicken/2_alert/G10.png',
            '../graphics/4_enemie_boss_chicken/2_alert/G11.png',
            '../graphics/4_enemie_boss_chicken/2_alert/G12.png'
        ]
    };

    constructor() {
        super().loadImage('../graphics/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES);
        this.animation();
        this.move();

        this.x = 720 - this.width;
        this.y = this.y - this.height + 25;
        this.speed = 1.5;
    }


    animation() {
        setInterval(() => {
            this.animateImages(this.IMAGES.IMAGES_ALERT);
        }, 1000 / 6);
    }


    move() {

    }
}