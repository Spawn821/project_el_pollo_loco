class Level extends LevelObject {

    constructor(levelLength, IMAGES, numberChickenSmall, numberChickenNormal, numberBossChicken) {
        super();
        this.levelLength = levelLength;
        this.IMAGES = IMAGES;
        this.numberChickenSmall = numberChickenSmall;
        this.numberChickenNormal = numberChickenNormal;
        this.numberBossChicken = numberBossChicken;

        //this.background = new LevelBackground();
        this.enemeies = new LevelEnemies();
    }


    setLevel() {
        this.background.level = this;
        this.enemeies.level = this;
    }
}