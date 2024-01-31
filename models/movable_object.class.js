class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 128.75;
    }


    hit() {
        if (this.energy > 0) this.energy -= 5;
        this.lastHit = new Date().getTime();
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.25;
    }


    isDead() {
        return this.energy == 0;
    }


    animateImages(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }


    isColliding(mO) {
        return this.imgTopRightCorner(this) > this.imgTopLeftCorner(mO) && 
               this.imgTopLeftCorner(this) < this.imgTopRightCorner(mO) &&
               this.imgBottomRightCorner(this) > this.imgBottomLeftCorner(mO) && 
               this.imgBottomLeftCorner(this) < this.imgBottomRightCorner(mO);
        //return this.x + this.width > mO.x && 
        //       this.x < mO.x + mO.width &&
        //       this.y + this.height > mO.y && 
        //       this.y < mO.y + mO.height;
    }


    imgTopRightCorner(object) {
        return object.x + object.offsetX + object.width * object.scaleWPercent;
    }


    imgTopLeftCorner(object) {
        return object.x + object.offsetX;
    }


    imgBottomRightCorner(object) {
        return object.y + object.offsetY + object.height * object.scaleHPercent;
    }


    imgBottomLeftCorner(object) {
        return object.y + object.offsetY;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 25;
        this.currentImage = 0; // For a clean jump animation
    }
}