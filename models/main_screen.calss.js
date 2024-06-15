class MainScreen extends MovableObject {

    // All images for the object
    IMAGES = {
        IMAGES_START: [
            'graphics/9_intro_outro_screens/start/startscreen_1.png',
            'graphics/9_intro_outro_screens/start/startscreen_2.png'
        ]
    }

    /**
     * This function set all start conditions for the object.
     */
    constructor() {
        super().loadImage('graphics/9_intro_outro_screens/start/startscreen_1.png');
        this.loadImages(this.IMAGES);
        this.setImgCoordinates(0, 0); // coordinates x, y calculate less height
        this.startTheEngine();
    }


    /**
     * This function starts all intervals.
     */
    startTheEngine() {
        this.animation();
    }


    /**
     * This function start the animation from the pictures.
     */
    animation() {
        setInterval(() => {
            this.animateImages(this.IMAGES.IMAGES_START);
        }, 1000)
    }
}