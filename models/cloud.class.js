class Cloud extends MovableObject {
    constructor(image, x) {
        super().loadImage(image);
        this.animation();

        this.y = 0;
        this.x = x;
    }


    /**
     * This function controlls all animations.
     */
    animation() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}