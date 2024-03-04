class LoadingScreen extends MovableObject {

    IMAGES = {
        IMAGES_LONG_IDLE: [
            '../graphics/2_character_pepe/1_idle/long_idle/I-11.png',
            '../graphics/2_character_pepe/1_idle/long_idle/I-12.png',
            '../graphics/2_character_pepe/1_idle/long_idle/I-13.png',
            '../graphics/2_character_pepe/1_idle/long_idle/I-14.png',
            '../graphics/2_character_pepe/1_idle/long_idle/I-15.png',
            '../graphics/2_character_pepe/1_idle/long_idle/I-16.png',
            '../graphics/2_character_pepe/1_idle/long_idle/I-17.png',
            '../graphics/2_character_pepe/1_idle/long_idle/I-18.png',
            '../graphics/2_character_pepe/1_idle/long_idle/I-19.png',
            '../graphics/2_character_pepe/1_idle/long_idle/I-20.png'
        ],
    };

    constructor() {
        super().loadImage('../graphics/2_character_pepe/1_idle/long_idle/I-11.png')
        this.loadImages(this.IMAGES);
        this.setImgDimensions(125, 1.97); // width, percent for height = width * height
        this.setImgCoordinates(720 - this.width); // coordinates x, y calculate less height
        this.startTheEngine();
    }


    startTheEngine() {
        this.animation();
    }


    animation() {
        setInterval(() => {
            this.animateImages(this.IMAGES.IMAGES_LONG_IDLE);
        }, 1000 / 5)
    }
}