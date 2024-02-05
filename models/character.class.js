class Character extends MovableObject {
    world;
    level = level1;
    end_walking;
    end_camera;

    IMAGES = {
        IMAGES_IDLE: [
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
        ],

        IMAGES_WALKING: [
            '../graphics/2_character_pepe/2_walk/W-21.png',
            '../graphics/2_character_pepe/2_walk/W-22.png',
            '../graphics/2_character_pepe/2_walk/W-23.png',
            '../graphics/2_character_pepe/2_walk/W-24.png',
            '../graphics/2_character_pepe/2_walk/W-25.png',
            '../graphics/2_character_pepe/2_walk/W-26.png'
        ],

        IMAGES_JUMPING: [
            '../graphics/2_character_pepe/3_jump/J-31.png',
            '../graphics/2_character_pepe/3_jump/J-32.png',
            '../graphics/2_character_pepe/3_jump/J-33.png',
            '../graphics/2_character_pepe/3_jump/J-34.png',
            '../graphics/2_character_pepe/3_jump/J-35.png',
            '../graphics/2_character_pepe/3_jump/J-36.png',
            '../graphics/2_character_pepe/3_jump/J-37.png',
            '../graphics/2_character_pepe/3_jump/J-38.png',
            '../graphics/2_character_pepe/3_jump/J-39.png'
        ],

        IMAGES_HURT: [
            '../graphics/2_character_pepe/4_hurt/H-41.png',
            '../graphics/2_character_pepe/4_hurt/H-42.png',
            '../graphics/2_character_pepe/4_hurt/H-43.png'
        ],

        IMAGES_DEAD: [
            '../graphics/2_character_pepe/5_dead/D-51.png',
            '../graphics/2_character_pepe/5_dead/D-52.png',
            '../graphics/2_character_pepe/5_dead/D-53.png',
            '../graphics/2_character_pepe/5_dead/D-54.png',
            '../graphics/2_character_pepe/5_dead/D-55.png',
            '../graphics/2_character_pepe/5_dead/D-56.png',
            '../graphics/2_character_pepe/5_dead/D-57.png'
        ]
    };

    constructor() {
        super().loadImage('../graphics/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES);
        this.setImgDimensions(125, 1.97); // width, percent for height = width * height
        this.setImgCoordinates(200); // coordinates x, y calculate less height
        this.setImgScalePercentage(0.65, 0.60) // percentage scale from width and height

        this.end_walking = this.level.sections['section_6_xPos'] + 720 - this.width;
        this.end_camera = this.level.sections['section_6_xPos'] + 200;

        this.animation();
        this.move();
        this.throwBottle();
        this.moveCamera();
        this.applyGravity();

        this.speed = 5;
    }


    animation() {
        setInterval(() => {
            if (this.isDead()) {
                this.animateImages(this.IMAGES.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.animateImages(this.IMAGES.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.animateImages(this.IMAGES.IMAGES_JUMPING);
                this.jumping_sound.play();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.animateImages(this.IMAGES.IMAGES_WALKING);
                this.walking_sound.play();
            } else {
                this.animateImages(this.IMAGES.IMAGES_IDLE);
            }
        }, 1000 / 10);
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


    throwBottle() {
        setInterval(() => {
            if (this.world.keyboard.a) {
                this.createBottle(10);
            } else if (this.world.keyboard.s) {
                this.createBottle(20);
            } else if (this.world.keyboard.d) {
                this.createBottle(30);
            }
        }, 1000 / 10);
    }


    createBottle(distance) {
        let bottle = new Bottle(this.x + this.offsetX, this.y + this.offsetY, distance);
        bottle.otherDirection = this.otherDirection;
        this.world.bottles.push(bottle);
    }


    moveCamera() {
        setInterval(() => {
            if (this.x > 200 && this.x < this.end_camera) {
                this.world.camera_x = -this.x + 200;
            }
        }, 1000 / 60)
    }
}