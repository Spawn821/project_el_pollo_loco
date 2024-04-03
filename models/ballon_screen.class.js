class BallonScreen extends MovableObject {

    // All images for the object
    IMAGES = [
        'graphics/0_downloads/ballon_row_1.png',
        'graphics/0_downloads/ballon_row_2.png',
        'graphics/0_downloads/ballon_row_3.png'
    ]

    /**
     * This function set all start conditions for the object.
     */
    constructor() {
        super().loadImage('graphics/0_downloads/ballon_row_1.png');
        this.setImgCoordinates(0, 400); // coordinates x, y calculate less height
        this.animation();
    }


    /**
     * This function switch between the pictures.
     */
    animation() {
        let index = 1;

        setInterval(() => {
            if (gameEnd) {
                this.y -= 1;

                if (this.y == -400) {
                    this.y = 400;
                    this.loadImage(this.IMAGES[index]);
                    index++;
                    if (index == this.IMAGES.length) index = 0;
                }
            }
        }, 1000 / 60);
    }
}