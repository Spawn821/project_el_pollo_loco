class Icon extends DrawableObject {
    constructor(image, x, y, width, factor, numberText) {
        super().loadImage(image);
        this.setImgDimensions(width, factor); // width, percent for height = width * height
        this.setImgCoordinates(x, y); // coordinates x, y calculate less height

        this.numberText = numberText;
    }
}