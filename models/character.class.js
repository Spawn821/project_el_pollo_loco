class Character extends MovableObject {
    width = 125;
    height = this.width * 1.97;
    world;
    level = level1;
    end_walking = this.level.end_level + 720 - this.width;
    end_camera = this.level.end_level + 50;
    walking_sound = new Audio('../audio/step_dirt.mp3');
    current_interval;

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
        '../graphics/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_WALKING = [
        '../graphics/2_character_pepe/2_walk/W-21.png',
        '../graphics/2_character_pepe/2_walk/W-22.png',
        '../graphics/2_character_pepe/2_walk/W-23.png',
        '../graphics/2_character_pepe/2_walk/W-24.png',
        '../graphics/2_character_pepe/2_walk/W-25.png',
        '../graphics/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        '../graphics/2_character_pepe/3_jump/J-31.png',
        '../graphics/2_character_pepe/3_jump/J-32.png',
        '../graphics/2_character_pepe/3_jump/J-33.png',
        '../graphics/2_character_pepe/3_jump/J-34.png',
        '../graphics/2_character_pepe/3_jump/J-35.png',
        '../graphics/2_character_pepe/3_jump/J-36.png',
        '../graphics/2_character_pepe/3_jump/J-37.png',
        '../graphics/2_character_pepe/3_jump/J-38.png',
        '../graphics/2_character_pepe/3_jump/J-39.png'
    ];

    constructor() {
        super().loadImage('../graphics/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.animation();
        this.move();
        this.moveCamera();
        this.applyGravity();

        this.x = 50;
        this.y = this.y - this.height;
        this.speed = 5;
    }


    animation() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.animateImages(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.animateImages(this.IMAGES_WALKING);
                    this.walking_sound.play();
                }
            }
        }, 1000 / 9);
    }


    move() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.end_walking) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
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