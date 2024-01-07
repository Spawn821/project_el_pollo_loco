class Cloud extends MovableObject {
    y = 0;
    width = 720;
    height = 400;

    constructor() {
        super().loadImage('../graphics/5_background/layers/4_clouds/1.png')
        this.x = 0;
    }
}