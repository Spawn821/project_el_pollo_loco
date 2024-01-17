class COIN extends MovableObject {
    width = 65;
    height = this.width * 1.06;

    constructor() {
        super().loadImage('../graphics/7_statusbars/3_icons/icon_coin.png');

        this.y = 10;
        this.x = 180;
    }
}