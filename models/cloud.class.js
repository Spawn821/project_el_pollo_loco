class Cloud extends MovableObject {
    constructor(image, x) {
        super().loadImage(image);
        this.animation();

        this.y = 0;
        this.x = x;
    }


    animation() {
        this.moveLeft();
    }
}