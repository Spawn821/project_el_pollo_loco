class LevelEnemies {

    // All future enemy objects
    ENEMIES = [];

    // Number of the diffrent enemies
    chickenSmallAlreadySet = 0;
    chickenNormalAlreadySet = 0;
    chickenBossAlreadySet = 0;
    background;

    /**
     * This function set all start conditions for the object.
     * @param {number} numberChickenSmall is the number.
     * @param {number} numberChickenNormal is the number.
     * @param {number} numberChickenBoss is the number.
     * @param {array} background is the level background.
     */
    constructor(numberChickenSmall, numberChickenNormal, numberChickenBoss, background) {
        this.numberChickenSmall = numberChickenSmall;
        this.numberChickenNormal = numberChickenNormal;
        this.numberChickenBoss = numberChickenBoss;
        this.background = background;

        this.setEnemies();
    }


    /**
     * This function coordinate the addition of opponents.
     */
    setEnemies() {
        let index = 0;

        for (let section in this.background.sections) {
            let currentSection = this.background.sections[section];

            if (section != this.background.lastLevelSection) {
                this.addEnemie('small', this.chickenSmallAlreadySet, this.numberChickenSmall, currentSection + 720 + 360);
                this.addEnemie('normal', this.chickenNormalAlreadySet, this.numberChickenNormal, currentSection + 720 + 360);
            }

            if (this.endbossConditions(index)) {
                this.addEnemie('boss', this.chickenBossAlreadySet, this.numberChickenBoss, currentSection + 720);
            }

            index++;
        }
    }


    /**
     * This function checks whether the last level section has been reached.
     * @param {number} index is the level section.
     * @returns true or false.
     */
    endbossConditions(index) {
        return this.background.levelLength * 2 - 1 == index;
    }


    /**
     * This function coordinate the adding the opponents toe the array.
     * @param {string} size is the size from the enemy.
     * @param {number} alreadySet is the opponents already set.
     * @param {number} number is the total number from the enemies.
     * @param {number} section is the x coordinate from the section.
     */
    addEnemie(size, alreadySet, number, section) {
        let index = 0;

        for (let i = alreadySet; i < number; i++) {
            this.enemieSelection(size, section, index)

            index++;
            if (index == 2) break;
        }
    }


    /**
     * This function add the enemy object to the array.
     * @param {string} size ist the size from the enemy.
     * @param {number} section is the x coordinate from the section.
     * @param {number} movementNumber is the number from the movement.
     */
    enemieSelection(size, section, movementNumber) {
        let enemie;

        switch (size) {
            case 'small':
                enemie = new ChickenSmall(section, movementNumber);
                this.chickenSmallAlreadySet++;
                break;
            case 'normal':
                enemie = new ChickenNormal(section, movementNumber);
                this.chickenNormalAlreadySet++;
                break;
            case 'boss':
                enemie = new ChickenBoss(section);
                this.chickenBossAlreadySet++;
                break;
        }

        this.ENEMIES.push(enemie);
    }
}