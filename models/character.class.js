class Character extends MovableObject {
    width = 125;
    height = this.width * 1.97;
    world;
    level = level1;
    end_walking = level1.end_level + 720 - this.width;
    end_camera = level1.end_level + 50;
    walking_sound = new Audio('../audio/step_dirt.mp3');

    IMAGES_WALKING = [
        '../graphics/2_character_pepe/2_walk/W-21.png',
        '../graphics/2_character_pepe/2_walk/W-22.png',
        '../graphics/2_character_pepe/2_walk/W-23.png',
        '../graphics/2_character_pepe/2_walk/W-24.png',
        '../graphics/2_character_pepe/2_walk/W-25.png',
        '../graphics/2_character_pepe/2_walk/W-26.png'
    ]

    constructor() {
        super().loadImage('../graphics/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.moveRight();
        this.moveLeft();
        this.moveCamera();

        this.x = 25;
        this.y = this.y - this.height;
        this.speed = 5;
    }


    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imgCache[path];
                this.currentImage++;
                this.walking_sound.play();
            } else {
                this.loadImage('../graphics/2_character_pepe/1_idle/idle/I-1.png');
            }
        }, 150);
    }


    moveRight() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.end_walking) {
                this.x += this.speed;
                this.otherDirection = false;
            }
        }, 1000 / 60);
    }


    moveLeft() {
        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
        }, 1000 / 60);
    }


    moveCamera() {
        setInterval(() => {
            if (this.x > 50 && this.x < this.end_camera) {
                this.world.camera_x = -this.x + 50;
            }
        }, 1000 / 60)
    }


    jump() {

    }
}