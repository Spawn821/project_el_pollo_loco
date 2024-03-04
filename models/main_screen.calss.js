class MainScreen extends MovableObject {

    IMAGES = {
        IMAGES_START: [
            '../graphics/9_intro_outro_screens/start/startscreen_1.png',
            '../graphics/9_intro_outro_screens/start/startscreen_2.png'
        ]
    }

    constructor() {
        super().loadImage('../graphics/9_intro_outro_screens/start/startscreen_1.png');
        this.loadImages(this.IMAGES);
        this.setImgCoordinates(0, 0); // coordinates x, y calculate less height
        this.startTheEngine();
    }


    startTheEngine() {
        this.animation();
    }


    animation() {
        setInterval(() => {
            this.animateImages(this.IMAGES.IMAGES_START);
        }, 1000)
    }
}