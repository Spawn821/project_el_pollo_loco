class BottleToCollect extends MovableObject {
    constructor(x, bottle) {
        super().loadImage(bottle);
        this.setImgDimensions(75, 1.2); // width, percent for height = width * height
        this.setImgCoordinates(x + Math.random() * 500); // coordinates x, y calculate less height
        this.setImgScalePercentage(0.3, 0.7) // percentage scale from width and height
    }
}