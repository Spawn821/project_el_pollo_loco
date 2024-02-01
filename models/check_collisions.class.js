class CheckCollisions {

    world;

    constructor() {
        //this.character();
        this.coins();
        this.chicken();
    }


    chicken() {
        setInterval(() => {
            this.world.level.enemies.forEach((enemy) => {
                if (this.world.character.isCollidingOnTheTop(enemy)) {
                    enemy.dead();
                }
            });
        }, 1000 / 60);
    }


    character() {
        setInterval(() => {
            this.world.level.enemies.forEach((enemy) => {
                if (this.world.character.isColliding(enemy)) {
                    this.world.character.hit();
                    this.world.statusbar.setHealth(this.world.character.energy);
                }
            });
        }, 1000 / 3);
    }


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