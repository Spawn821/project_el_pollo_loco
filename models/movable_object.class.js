class MovableObject extends DrawableObject {

    // Movement speed
    speed = 0.05;

    // Character or enemy health
    energy = 0;

    // Current time for the current hit
    lastHit = 0;

    // For jumping
    speedY = 0;
    acceleration = 2.5;
    applyGravityInterval;

    // Move right or left
    otherDirection = false;

    // Diffrent movements
    runLeftIntervall;
    runCrazyIntervall;
    jumpAttackIntervall;
    jumpAttackTime = 0;
    movementNumber = 0;
    walkingDistance = 0;
    leftSideReached = false;
    rightSideReached = true;

    /**
     * This function controlls the gravity if the character jump.
     * Decreasing speed above the ground and
     * increasing speed to the ground.
     */
    applyGravity() {
        this.applyGravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else if (this.isOnGround()) {
                this.y = this.startPosY; // The Character always has the same y coordinate after jumping
            }
        }, 1000 / 25);
    }


    /**
     * This function checks the start position in y against the is position and
     * ensures that thrown objects simply fall.
     * @returns true or false.
     */
    isAboveGround() {
        if (this instanceof Bottle) {
            return true;
        } else {
            return this.y < this.startPosY;
        }
    }


    /**
     * This function check if the fixed character pos. higher.
     * @returns true or false.
     */
    isOnGround() {
        return this.y >= this.startPosY;
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
    isHurt(duration) {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < duration; // 0.25
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
            this.imgTop(this) < this.imgTop(mO) &&
            this.imgBottom(this) < this.imgBottom(mO) &&
            this.isAboveGround() &&
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


    resetIntervallValues() {
        this.runLeftIntervall = undefined;
        this.runCrazyIntervall = undefined;
        this.jumpAttackIntervall = undefined;
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


    runLeft() {
        this.runLeftIntervall = setInterval(() => {
            if (startGame && pause) this.moveLeft();
        }, 1000 / 60);
    }


    runCrazy() {
        this.runCrazyIntervall = setInterval(() => {
            if (startGame && pause) {
                if (!this.leftSideReached) {
                    this.moveLeft();
                    this.runningDirectionRight();
                } else if (!this.rightSideReached) {
                    this.moveRight();
                    this.runningDirectionLeft();
                }
            }
        }, 1000 / 60);
    }


    runningDirectionRight() {
        if (this.x <= this.startPosX - this.walkingDistance) {
            this.leftSideReached = true;
            this.rightSideReached = false;
            this.otherDirection = true;

            if (this instanceof ChickenBoss) {
                this.lastAlert();
            }
        }
    }


    runningDirectionLeft() {
        if (this.x >= this.startPosX) {
            this.leftSideReached = false;
            this.rightSideReached = true;
            this.otherDirection = false;

            if (this instanceof ChickenBoss) {
                this.lastAlert();
            }
        }
    }


    /**
     * This function set the jump height and
     * set the image counter to zero for a clean jump animation.
     */
    jump(speedY = 22.5) {
        this.speedY = speedY;
        this.currentImage = 0; // For a clean jump animation
    }


    jumpAttack() {
        this.jumpAttackIntervall = setInterval(() => {
            if (startGame && pause) this.jump(27.5);
        }, this.jumpAttackTime);
    }
}