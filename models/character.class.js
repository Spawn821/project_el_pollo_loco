class Character extends MovableObject {
    width = 125;
    height = this.width * 1.97;
    world;
    level = level1;
    end_walking = this.level.end_level + 720 - this.width;
    end_camera = this.level.end_level + 50;
    walking_sound = new Audio('../audio/step_dirt.mp3');

    imgCachWalking = {};
    IMAGES_WALKING = [
        '../graphics/2_character_pepe/2_walk/W-21.png',
        '../graphics/2_character_pepe/2_walk/W-22.png',
        '../graphics/2_character_pepe/2_walk/W-23.png',
        '../graphics/2_character_pepe/2_walk/W-24.png',
        '../graphics/2_character_pepe/2_walk/W-25.png',
        '../graphics/2_character_pepe/2_walk/W-26.png'
    ];

    imgCacheIdle = {};
    IMAGES_IDLE = [
        '../graphics/2_character_pepe/1_idle/idle/I-1.png',
        '../graphics/2_character_pepe/1_idle/idle/I-2.png',
        '../graphics/2_character_pepe/1_idle/idle/I-3.png',
        '../graphics/2_character_pepe/1_idle/idle/I-4.png',
        '../graphics/2_character_pepe/1_idle/idle/I-5.png',
        '../graphics/2_character_pepe/1_idle/idle/I-6.png',
        '../graphics/2_character_pepe/1_idle/idle/I-7.png',
        '../graphics/2_character_pepe/1_idle/idle/I-8.png',
        '../graphics/2_character_pepe/1_idle/idle/I-9.png',
        '../graphics/2_character_pepe/1_idle/idle/I-10.png',
    ];

    constructor() {
        super().loadImage('../graphics/2_character_pepe/1_idle/idle/I-1.png');
        this.imgCacheIdle = this.loadImages(this.IMAGES_IDLE);
        this.imgCachWalking = this.loadImages(this.IMAGES_WALKING);
        this.idle();
        this.walking();
        this.moveRight();
        this.moveLeft();
        this.moveCamera();

        this.x = 50;
        this.y = this.y - this.height;
        this.speed = 5;
    }


    walking() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.animateImages(this.IMAGES_WALKING, this.imgCachWalking);
                this.walking_sound.play();
            }
        }, 150);
    }


    idle() {
        setInterval(() => {
            if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT
                && !this.world.keyboard.UP && !this.world.keyboard.DOWN
                && !this.world.keyboard.SPACE) {
                this.animateImages(this.IMAGES_IDLE, this.imgCacheIdle);
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
}