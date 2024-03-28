class Movie {

    // The whole class 'character'
    character;

    // Boolean
    bossFightStarted = false;

    /**
     * This function set all start conditions for the object.
     */
    constructor() {
        this.movieWin();
    }

    
    /**
     * This function start the win movie and
     * set all conditioins to end the game.
     */
    movieWin() {
        let runMovie

        setInterval(() => {
            if (this.character.world.levelEnemies.ENEMIES.length == 0) {
                startMovie = true;
                setTimeout(() => {
                    if (!runMovie) runMovie = this.movieJumping();
                    if (!gameEnd) this.movieWalking();
                    if (this.character.x >= this.character.walkingLimitRight) {
                        this.character.world.keyboard.resetKeys();
                        gameEnd = true;
                    }
                }, 1000);
            }
        }, 1000 / 10);
    }


    /**
     * This function let the character jump automatically.
     * @returns true.
     */
    movieJumping() {
        startMovie = true;
        this.character.world.keyboard.tabKeyToJump();
        setTimeout(() =>{
            this.character.world.keyboard.resetKeys()
        }, 250);
        this.character.world.sound.pauseSound();
        if (this.character.world.levelEnemies.ENEMIES.length == 0) setTimeout(() => this.character.world.sound.winSound(), 150);
        return true;
    }


    /**
     * This function let the character walk automatically.
     */
    movieWalking() {
        this.character.walkingLimitRight = this.character.lastLevelSection + 720;
        setTimeout(() => {
            this.character.world.keyboard.holdKeyToGoRight()
        }, 1000);
    }


    /**
     * This function let the character walk automatically to the boss
     * and set all conditions to start the bossfight.
     */
    moveCharacterToTheBoss() {
        this.character.speed = 1;

        if (this.character.world.camera_x > -this.character.end_camera + 250) {
            startMovie = true;
            this.character.world.keyboard.holdKeyToGoRight();
            this.clearNormalAndSmallEnemies();
        } else {
            startMovie = false;
            this.character.world.keyboard.resetKeys();
            this.character.speed = this.character.saveSpeed;
            this.startTheBossFight();
        }
    }
    


    // ### ENEMIES ###

    /**
     * This function removes all enemies expected the boss.
     */
    clearNormalAndSmallEnemies() {
        this.character.world.levelEnemies.ENEMIES.forEach((enemy) => {
            if (!(enemy instanceof ChickenBoss)) {
                this.character.world.levelEnemies.ENEMIES.splice(this.character.world.levelEnemies.ENEMIES.indexOf(enemy), 1);
            }
        });
    }


    /**
     * This function starts all conditions for the boss fight.
     */
    startTheBossFight() {
        if (!this.bossFightStarted) {
            this.character.world.levelEnemies.ENEMIES[this.character.world.levelEnemies.ENEMIES.length - 1].startTheEngine();
            this.character.world.statusbar.createChickenBossStatus();
            this.bossFightStarted = true;
            this.character.world.sound.pauseSound();
            setTimeout(() => this.character.world.sound.finalBossSoundPlay(), 150);
        }
    }
}