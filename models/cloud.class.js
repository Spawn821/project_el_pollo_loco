class Cloud extends MovableObject {
    constructor() {
        super().loadImage('../graphics/5_background/layers/4_clouds/1.png')
        this.animation();

        this.y = 0;
        this.x = Math.random() * 500;
    }


    animation() {
        this.moveLeft();
    }
}