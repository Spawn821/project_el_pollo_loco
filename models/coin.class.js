class Coin extends DrawableObject {
    width = 65;
    height = this.width * 1.06;

    constructor() {
        super().loadImage('../graphics/7_statusbars/3_icons/icon_coin.png');

        this.y = 10;
        this.x = 270;

        this.numberText = 0;
        this.textOffsetX = 50;
        this.textOffsetY = 50;
    }
}