class Icon extends DrawableObject {
    constructor(image, x, y, width, factor, numberText) {
        super().loadImage(image);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = this.width * factor;
        this.numberText = numberText;
    }
}