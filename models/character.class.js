class Character extends MovableObject {
    width = 125;
    height = this.width * 1.97;
    imagesWalking = [
        '../graphics/2_character_pepe/2_walk/W-21.png',
        '../graphics/2_character_pepe/2_walk/W-22.png',
        '../graphics/2_character_pepe/2_walk/W-23.png',
        '../graphics/2_character_pepe/2_walk/W-24.png',
        '../graphics/2_character_pepe/2_walk/W-25.png',
        '../graphics/2_character_pepe/2_walk/W-26.png'
    ]

    constructor() {
        super().loadImage('../graphics/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.imagesWalking);
        this.animate();

        this.x = 50;
        this.y = this.y - this.height;
        this.speed = 1.5;
    }

    animate() {
        this.moveRight();

        setInterval(() => {
            let i = this.currentImage % this.imagesWalking.length;
            let path = this.imagesWalking[i];
            this.img = this.imgCache[path];
            this.currentImage++;
        }, 150);
    }

    jump() {

    }
}