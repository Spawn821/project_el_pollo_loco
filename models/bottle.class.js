class Bottle extends MovableObject {
    width = 75;
    height = this.width * 0.98;

    constructor() {
        super().loadImage('../graphics/7_statusbars/3_icons/icon_salsa_bottle.png');

        this.y = 10;
        this.x = 10;
    }
}