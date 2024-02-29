class Level {
    background;
    enemies;

    constructor(levelLength, IMAGES, numberChickenSmall, numberChickenNormal, numberChickenBoss) {
        this.background = new LevelBackground(levelLength, IMAGES);
        this.enemies = new LevelEnemies(numberChickenSmall, numberChickenNormal, numberChickenBoss, this.background);
    }
}