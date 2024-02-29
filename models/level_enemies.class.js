class LevelEnemies {
    ENEMIES = [];
    chickenSmallAlreadySet = 0;
    chickenNormalAlreadySet = 0;
    chickenBossAlreadySet = 0;
    background;

    constructor(numberChickenSmall, numberChickenNormal, numberChickenBoss, background) {
        this.numberChickenSmall = numberChickenSmall;
        this.numberChickenNormal = numberChickenNormal;
        this.numberChickenBoss = numberChickenBoss;
        this.background = background;

        this.setEnemies();
    }


    setEnemies() {
        let index = 0;

        for (let section in this.background.sections) {
            let currentSection = this.background.sections[section];

            if (section != this.background.lastLevelSection) {
                this.addEnemie('small', this.chickenSmallAlreadySet, this.numberChickenSmall, currentSection + 350);
                this.addEnemie('normal', this.chickenNormalAlreadySet, this.numberChickenNormal, currentSection + 350);
            }

            if (this.endbossConditions(index)) {
                this.addEnemie('boss', this.chickenBossAlreadySet, this.numberChickenBoss, currentSection + 720);
            }

            index++;
        }
    }


    endbossConditions(index) {
        return this.background.levelLength * 2 - 1 == index;
    }


    addEnemie(size, alreadySet, number, section) {
        let index = 0;

        for (let i = alreadySet; i < number; i++) {
            this.enemieSelection(size, section, index)

            index++;
            if (index == 2) break;
        }
    }


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