class ChickenSmall extends MovableObject {

    IMAGES = {
        IMAGES_WALKING: [
            '../graphics/3_enemies_chicken/chicken_small/1_walk/1_w.png',
            '../graphics/3_enemies_chicken/chicken_small/1_walk/2_w.png',
            '../graphics/3_enemies_chicken/chicken_small/1_walk/3_w.png'
        ],

        IMAGES_DEAD: [
            '../graphics/3_enemies_chicken/chicken_small/2_dead/dead.png',
        ]
    };


    constructor(x, movementNumber) {
        super();
        this.movementNumber = movementNumber;

        this.loadImage('../graphics/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES);
        this.setImgDimensions(75, 1.03); // width, percent for height = width * height
        this.setImgCoordinates(x + Math.random() * 600); // coordinates x, y calculate less height
        this.setImgScalePercentage(0.8, 0.8) // percentage scale from width and height
        this.setValues();
        this.animation();
    }


    setValues() {
        this.speed = 0.25 + Math.random() * 1;
        this.saveSpeed = this.speed;
        this.energy = 5;
        this.walkingDistance = 300;
        this.startPosX = this.x;
    }


    startTheEngine() {
        this.animation();
        this.movement();
    }


    animation() {
        setInterval(() => {
            if (this.isDead() || this.isHurt(1)) {
                this.stopMovement();
                this.animateImages(this.IMAGES.IMAGES_DEAD);
                this.speed = 0;
            } else {
                this.movement();
                this.animateImages(this.IMAGES.IMAGES_WALKING);
                this.speed = this.saveSpeed;
            }
        }, 1000 / 6);
    }


    movement() {
        switch (this.movementNumber) {
            case 0:
                if (!this.runLeftIntervall) this.runLeft();
                break;
            case 1:
                if (!this.runCrazyIntervall) this.runCrazy();
                break;
        };
    }


    stopMovement() {
        switch (this.movementNumber) {
            case 0:
                clearInterval(this.runLeftIntervall);
                break;
            case 1:
                clearInterval(this.runCrazyIntervall);
                break;
        };

        this.resetIntervallValues();
    }
}