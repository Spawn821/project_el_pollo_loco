class Background extends MovableObject {

    /**
     * This function set all start conditions for the object.
     * @param {string} image is the path from the image.
     * @param {number} x is the start coordinate from the image.
     */
    constructor(image, x, y=0) {
        super().loadImage(image);

        this.y = y;
        this.x = x;
    }
}