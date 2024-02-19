class LevelEnemies extends LevelObject {
    ENEMIES = [];
    levelBackground = level_1_background;
    chickenSmallAlreadySet = 0;
    chickenNormalAlreadySet = 0;
    chickenBossAlreadySet = 0;

    constructor(numberChickenSmall, numberChickenNormal, numberChickenBoss) {
        super();
        this.numberChickenSmall = numberChickenSmall;
        this.numberChickenNormal = numberChickenNormal;
        this.numberChickenBoss = numberChickenBoss;

        this.setEnemies();
    }


    setEnemies() {
        let index = 0;

        for (let section in this.levelBackground.sections) {
            let currentSection = this.levelBackground.sections[section];

            this.addEnemie('small', this.chickenSmallAlreadySet, this.numberChickenSmall, currentSection + 350);
            this.addEnemie('normal', this.chickenNormalAlreadySet, this.numberChickenNormal, currentSection + 350);

            if (this.endbossConditions(index)) {
                this.addEnemie('boss', this.chickenBossAlreadySet, this.numberChickenBoss, currentSection + 720);
            }

            index++;
        }
    }


    endbossConditions(index) {
        return  this.levelBackground.levelLength * 2 - 1 == index;
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

        switch(size) {
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