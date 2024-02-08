class CheckCollisions {
    world;
    isDead = [];
    thrownBottles = [];

    constructor() {
        this.throwChicken();
        this.jumpOnChicken();
        this.character();
        this.coins();
    }


    /**
     * This function start a dead animation and delete the enemy from the game.
     * @param {object} enemy is the current enemy.
     */
    enemyIsDead(enemy) {
        if (enemy.isDead()) {
            enemy.flat();
            this.isDead.push(enemy);
            setTimeout(() => {
                this.world.level.enemies.splice(this.world.level.enemies.indexOf(enemy), 1);
            }, 1000);
        }
    }


    /**
     * This function check whether there is an entry in the array 'isDead'.
     * @param {object} enemy is the current enemy.
     * @returns -1 or the entry.
     */
    checkDeadIndex(enemy) {
        return this.isDead.indexOf(enemy);
    }


    /**
     * This function check whether there is an entry in the array 'thrownBottles'.
     * @param {object} bottle is the current bottle.
     * @returns -1 or the entry.
     */
    checkThrownBottles(bottle) {
        return this.thrownBottles.indexOf(bottle);
    }


    /**
     * This function check if an enemy affected with a bottle.
     */
    throwChicken() {
        setInterval(() => {
            this.world.level.enemies.forEach((enemy) => {
                this.world.bottles.forEach((bottle) => {
                    if (bottle.isColliding(enemy) && this.checkThrownBottles(bottle) == -1) {
                        this.affectedWithBottle(bottle, enemy);
                    }
                });
            });
        }, 1000 / 60);
    }


    /**
     * This function start the hurt animation from the affected enemy and reduce the energy.
     * The affected bottle added to the already thrown bottles.
     * @param {object} bottle is the current bottle.
     * @param {object} enemy is the current enemy.
     */
    affectedWithBottle(bottle, enemy) {
        this.thrownBottles.push(bottle);
        if (this.checkDeadIndex(enemy) == -1) {
            enemy.hit();
            enemy.affected();
            this.enemyIsDead(enemy);
        }
    }


    /**
     * This function check if the character jumped on an enemy.
     */
    jumpOnChicken() {
        setInterval(() => {
            this.world.level.enemies.forEach((enemy) => {
                if (this.world.character.isCollidingOnTop(enemy)) {
                    this.affectedWithJump(enemy);
                }
            });
        }, 1000 / 60);
    }


    /**
     * This function start the hurt animation from the enemy who was jumped on and
     * reduce the energy.
     * The character automatically jumps into the air.
     * @param {object} enemy is the current enemy.
     */
    affectedWithJump(enemy) {
        if (this.checkDeadIndex(enemy) == -1 && !enemy.isHurt(1)) {
            enemy.hit();
            enemy.flat();
            this.enemyIsDead(enemy);
            this.world.character.jump();
        }
    }


    /**
     * This function check if the character was hited by an enemy.
     * The character lose health points.
     */
    character() {
        setInterval(() => {
            this.world.level.enemies.forEach((enemy) => {
                if (this.world.character.isColliding(enemy)) {
                    if (this.checkDeadIndex(enemy) == -1 && !enemy.isHurt(1)) {
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