class Chicken extends MovableObject {
    constructor() {
        super().loadImage('../graphics/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.width = 76.5;
        this.height = 75;
        this.x = 250 + Math.random() * 500;
        this.y = 375 - this.height;
    }
}