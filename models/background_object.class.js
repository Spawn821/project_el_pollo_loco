class BackgroundObject extends MovableObject {
    y = 0;

    constructor(imagePath) {
        super().loadImage(imagePath)
        this.x = 0;
    }
}