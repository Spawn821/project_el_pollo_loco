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
        this.setDimensions();
        this.animation();

        this.x = x;
        this.y = y;
    }


    setDimensions() {
        this.width = 150;                // Default width for the image
        this.height = this.width * 1.03; // Default height for the image

        this.offsetWidth = this.width * 0.50; // Offset width for collision
        this.offsetHight = this.height * 0.50; // Offset height for collision
        this.offsetX = this.x + (this.width - this.offsetWidth) / 2; // Offset x for collision
        this.offsetY = this.y + this.width - this.offsetWidth; // Offset y for collision
    }


    animation() {
        setInterval(() => {
            this.animateImages(this.IMAGES.IMAGES_COINS);
        }, 1000 / 2);
    }
}