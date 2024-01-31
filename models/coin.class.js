class Coin extends MovableObject {
    IMAGES = {
        IMAGES_COINS: [
            'graphics/8_coin/coin_1.png',
            'graphics/8_coin/coin_2.png'
        ]
    }

    constructor(x, y) {
        super().loadImage('graphics/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.setImgDimensions(150, 1.03); // width, percent for height = width * height
        this.setImgCoordinates(x, y); // coordinates x, y calculate less height
        this.setImgScalePercentage(0.3, 0.3) // percentage scale from width and height
        this.animation();
        this.rotate();
    }


    animation() {
        setInterval(() => {
            this.animateImages(this.IMAGES.IMAGES_COINS);
        }, 1000 / 2);
    }


    rotate() {
        setInterval(() => {
            if (!this.otherDirection) {
                this.otherDirection = true;
            } else {
                this.otherDirection = false;
            }
        }, 1000 / 1);
    }
}