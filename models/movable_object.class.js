class MovableObject extends DrawableObject {
    speed = 0.05;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5; 
    energy = 100;
    lastHit = 0;

    /**
     * This function controlls the gravity if the character jump.
     * Decreasing speed above the ground and
     * increasing speed to the ground.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else if (this.isOnGround) {
                this.y = 128.75; // The Character always has the same y coordinate after jumping
            }
        }, 1000 / 25);
    }


    /**
     * This function check if the fixed character pos. lower.
     * @returns true or false.
     */
    isAboveGround() {
        return this.y < 128.75;
    }


    /**
     * This function check if the fixed character pos. higher.
     * @returns true or false.
     */
    isOnGround() {
        return this.y > 128.75;
    }


    /**
     * This function reduce the energy and
     * set the current time for the hit.
     */
    hit() {
        if (this.energy > 0) this.energy -= 5;
        this.lastHit = new Date().getTime();
    }


    /**
     * This function check how much time has passed since the last hit.
     * @returns true or false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.25;
    }


    /**
     * This function check if the energy equal zero.
     * @returns true or false.
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * This fucntion load diffrent images in the img value,
     * to animate the figures movements.
     * @param {object} images is the current image from the figure.
     */
    animateImages(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }


    /**
     * This function check if the character collided with an enemy on the ground.
     * @param {object} mO is the current enemy.
     * @returns true or false.
     */
    isColliding(mO) {
        return this.imgRightSite(this) > this.imgLeftSite(mO) &&
            this.imgLeftSite(this) < this.imgRightSite(mO) &&
            this.imgBottom(this) > this.imgTop(mO) &&
            this.imgTop(this) < this.imgBottom(mO);
    }


    /**
     * This function check if the character jumps on an enemy.
     * @param {object} mO is the current enemy.
     * @returns true or false.
     */
    isCollidingOnTop(mO) {
        return this.imgRightSite(this) > this.imgLeftSite(mO) &&
            this.imgLeftSite(this) < this.imgRightSite(mO) &&
            this.imgBottom(this) > this.imgTop(mO) &&
            this.imgBottom(this) != this.imgBottom(mO) &&
            this.speedY < 0;
    }


    /**
     * This function returns the right image site from the collided object.
     * @param {object} object is the character or the enemy.
     * @returns true or false.
     */
    imgRightSite(object) {
        return object.x + object.offsetX + object.width * object.scaleWPercent;
    }


    /**
     * This function returns the left image site from the collided object.
     * @param {object} object is the character or the enemy.
     * @returns true or false.
     */
    imgLeftSite(object) {
        return object.x + object.offsetX;
    }

    /**
     * This function returns the bottom image site from the collided object.
     * @param {object} object is the character or the enemy.
     * @returns true or false.
     */
    imgBottom(object) {
        return object.y + object.offsetY + object.height * object.scaleHPercent;
    }


    /**
     * This function returns the top image site from the collided object.
     * @param {object} object is the character or the enemy.
     * @returns true or false.
     */
    imgTop(object) {
        return object.y + object.offsetY;
    }


    /**
     * This function lets the images move to the right.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * This function lets the imges move to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * This function set the jump height and
     * set the image counter to zero for a clean jump animation.
     */
    jump() {
        this.speedY = 25;
        this.currentImage = 0; // For a clean jump animation
    }
}