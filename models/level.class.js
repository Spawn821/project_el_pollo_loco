class Level {

    // The container for the object list
    background;
    enemies;

    /**
     * This function set all start conditions for the object.
     * @param {number} levelLength is the array length.
     * @param {array} IMAGES is the image path list.
     * @param {number} numberChickenSmall is the number.
     * @param {*} numberChickenNormal is the number.
     * @param {*} numberChickenBoss is the number.
     */
    constructor(levelLength, IMAGES, numberChickenSmall, numberChickenNormal, numberChickenBoss) {
        this.background = new LevelBackground(levelLength, IMAGES);
        this.enemies = new LevelEnemies(numberChickenSmall, numberChickenNormal, numberChickenBoss, this.background);
    }
}