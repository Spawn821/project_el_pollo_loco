class Bottle extends MovableObject {
    speedX = 0;
    speedY = 0;
    acceleration = 2.5;

    IMAGES = {
        IMAGES_BOTTLE_ROTATION: [
            '../graphics/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
            '../graphics/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
            '../graphics/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
            '../graphics/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
        ],

        IMAGES_BOTTLE_SPLASH: [
            '../graphics/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
            '../graphics/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
            '../graphics/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
            '../graphics/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
            '../graphics/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
            '../graphics/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
        ]
    };

    constructor() {
        super().loadImage('../graphics/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES);
        this.setImgDimensions(75, 1); // width, percent for height = width * height
        this.setImgCoordinates(200); // coordinates x, y calculate less height
        this.setImgScalePercentage(0.7, 0.7) // percentage scale from width and height

        this.rotation();
        //this.splash();
        this.fly();
    }


    rotation() {
        setInterval(() => {
            this.animateImages(this.IMAGES.IMAGES_BOTTLE_ROTATION);
        }, 1000 / 25);
    }


    splash() {
        setInterval(() => {
            this.animateImages(this.IMAGES.IMAGES_BOTTLE_SPLASH);
        }, 1000 / 25);
    }


    fly() {
        this.speedX = 25;
        this.speedY = 25;
        setInterval(() => {
            this.x += 2.5;
            this.y -= this.speedY;
            this.speedX -= this.acceleration;
            this.speedY -= this.acceleration;
        }, 1000 / 15);
    }
}