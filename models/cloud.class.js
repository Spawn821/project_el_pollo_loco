class Cloud extends MovableObject {
    y = 0;

    constructor() {
        super().loadImage('../graphics/5_background/layers/4_clouds/1.png')
        this.animation();

        this.x = Math.random() * 500;
    }

    animation() {
        this.moveLeft();
    }
}