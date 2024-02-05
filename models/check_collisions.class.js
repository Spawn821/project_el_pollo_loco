class CheckCollisions {
    world;
    isDead = [];

    constructor() {
        this.throwChicken();
        this.jumpOnChicken();
        this.character();
        this.coins();
    }


    /**
     * This function check whether there is an entry in the array 'isDead'.
     * @param {object} enemy is the current enemy.
     * @returns -1 or the entry.
     */
    checkDeadIndex(enemy) {
        return this.isDead.indexOf(enemy);
    }


    throwChicken() {
        setInterval(() => {
            this.world.level.enemies.forEach((enemy) => {
                this.world.bottles.forEach((bottle) => {
                    if (bottle.isColliding(enemy)) {
                        if (this.checkDeadIndex(enemy) == -1) {
                            console.log('Throw chicken!');
                            enemy.dead();
                        }
                    }
                });
            });
        }, 1000 / 60);
    }


    /**
     * This function check if an enemy colliding with the character and
     * died in the process.
     * The enemy entry is deleted from the enemy array and
     * the enemy death animation is shown.
     * The 'isDead' array become a new entry.
     */
    jumpOnChicken() {
        setInterval(() => {
            this.world.level.enemies.forEach((enemy) => {
                if (this.world.character.isCollidingOnTop(enemy)) {
                    if (this.checkDeadIndex(enemy) == -1) {
                        enemy.dead();
                        this.isDead.push(enemy);
                        setTimeout(() => {
                            this.world.level.enemies.splice(this.world.level.enemies.indexOf(enemy), 1);
                        }, 1000);
                        this.world.character.jump();
                    }
                }
            });
        }, 1000 / 60);
    }


    /**
     * This function check if the character was hited by an enemy.
     * The character lose health points.
     */
    character() {
        setInterval(() => {
            this.world.level.enemies.forEach((enemy) => {
                if (this.world.character.isColliding(enemy)) {
                    if (this.checkDeadIndex(enemy) == -1) {
                        this.world.character.hit();
                        this.world.statusbar.setHealth(this.world.character.energy);
                    }
                }
            });
        }, 1000 / 3);
    }


    /**
     * This function check if the character collided with the coins and
     * collect this in the statusbar from the character.
     */
    coins() {
        setInterval(() => {
            this.world.coins.COINS.forEach((coin) => {
                if (this.world.character.isColliding(coin)) {
                    this.world.coins.COINS.splice(this.world.coins.COINS.indexOf(coin), 1);
                    this.world.statusbar.setCounterCoin();
                }
            })
        }, 1000 / 60);
    }
}