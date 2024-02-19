class Collisions {

    world;
    isDead = [];
    thrownBottles = [];

    constructor() {
        this.throwChicken();
        this.jumpOnChicken();
        this.character();
        this.coins();
        this.bottles();
        this.endboss();
    }


    /**
     * This function start a dead animation and delete the enemy from the game.
     * @param {object} enemy is the current enemy.
     */
    enemyIsDead(enemy) {
        if (enemy.isDead()) {
            this.isDead.push(enemy);
            setTimeout(() => {
                this.world.levelEnemies.ENEMIES.splice(this.world.levelEnemies.ENEMIES.indexOf(enemy), 1);
            }, 1000);
        }
    }


    /**
     * This function remove the affected.
     * @param {*} bottle 
     */
    removeBottle(bottle) {
        setTimeout(() => {
            this.world.bottles.splice(this.world.bottles.indexOf(bottle), 1);
        }, 500);
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
            this.world.levelEnemies.ENEMIES.forEach((enemy) => {
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
            bottle.stopThrow();
            bottle.startY = enemy.startY;
            bottle.splash();
            this.removeBottle(bottle);
            enemy.hit();
            this.enemyIsDead(enemy);

            if (enemy instanceof ChickenBoss) {
                this.affectedChickenBossWithBottle(enemy);
            }
        }
    }


    affectedChickenBossWithBottle(enemy) {
        this.world.statusbar.setChickenBossHealth(enemy.energy);
    }


    /**
     * This function check if the character jumped on an enemy.
     */
    jumpOnChicken() {
        setInterval(() => {
            this.world.levelEnemies.ENEMIES.forEach((enemy) => {
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
            this.world.levelEnemies.ENEMIES.forEach((enemy) => {
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


    /**
     * This function check if the character collided with a bollte on the ground and
     * collect this in the statusbar form the character.
     */
    bottles() {
        setInterval(() => {
            this.world.bottlesToCollect.BOTTLES.forEach((bottle) => {
                if (this.world.character.isColliding(bottle)) {
                    this.world.bottlesToCollect.BOTTLES.splice(this.world.bottlesToCollect.BOTTLES.indexOf(bottle), 1);
                    this.world.statusbar.increaseCounterBottle();
                }
            })
        }, 1000 / 60);
    }


    endboss() {
        setInterval(() => {
            this.world.levelEnemies.ENEMIES.forEach((enemy) => {
                if (enemy instanceof ChickenBoss) {
                    if (enemy.isColliding(this.world.character)){
                        enemy.collisionWhitCharacter = !this.world.character.isHurt();
                    } else {
                        enemy.collisionWhitCharacter = this.world.character.isHurt();
                    }
                }
            });
        }, 1000 / 60);
    }
}