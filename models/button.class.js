class Button extends DrawableObject {
    text;
    fillColor;
    textColor;

    constructor(text, fillColor, textColor) {
        super();
        this.text = text;
        this.fillColor = fillColor;
        this.textColor = textColor;

        this.setImgDimensions(30, 30); // width, percent for height = width * height
        this.setImgCoordinates(650, 300); // coordinates x, y calculate less height
    }
}