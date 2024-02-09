class BottleToCollect extends MovableObject {
    IMAGES = {
        IMAGES_BOTTLE: [
            '../graphics/6_salsa_bottle/1_salsa_bottle_on_ground.png',
            '../graphics/6_salsa_bottle/2_salsa_bottle_on_ground.png'
        ]
    }

    constructor() {
        super().loadImage('../graphics/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.setImgDimensions(75, 1.2); // width, percent for height = width * height
        this.setImgCoordinates(0 + (Math.random() * 2) * 2000); // coordinates x, y calculate less height
        this.setImgScalePercentage(0.3, 0.7) // percentage scale from width and height
    }
}