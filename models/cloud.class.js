class Cloud extends MovableObject {

    /**
     * This function set all start conditions for the object.
     * @param {string} image is the path from the image.
     * @param {number} x is the start coordinate from the image.
     */
    constructor(image, x) {
        super().loadImage(image);
        this.animation();

        this.y = 0;
        this.x = x;
    }


    /**
     * This function controlls animation pictures.
     */
    animation() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}