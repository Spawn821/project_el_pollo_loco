class BackgroundObject extends MovableObject {
    constructor(image, x) {
        super().loadImage(image);

        this.y = 0;
        this.x = x;
    }
}