class BackgroundObject extends MovableObject {
    y = 0;
    width = 720;
    height = 400;

    constructor(imagePath) {
        super().loadImage(imagePath)
        this.x = 0;
    }
}