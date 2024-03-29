class Icon extends DrawableObject {

    /**
     * This function set all start conditions for the object.
     * @param {string} image is the image path.
     * @param {number} x is the image coordinate.
     * @param {number} y is the image coordinate.
     * @param {number} width is image width.
     * @param {number} factor is the size factor.
     * @param {string} numberText is the text shown.
     */
    constructor(image, x, y, width, factor, numberText) {
        super().loadImage(image);
        this.setImgDimensions(width, factor); // width, percent for height = width * height
        this.setImgCoordinates(x, y); // coordinates x, y calculate less height

        this.numberText = numberText;
    }
}