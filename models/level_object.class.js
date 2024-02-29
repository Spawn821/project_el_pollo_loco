class LevelObject {
    levelBackground = level_1_background;
    levelLength;
    IMAGES;
    numberChickenNormal;
    numberChickenSmall;
    numberChickenBoss;

    lastSection() {
        let lastSection;
        for (let section in this.levelBackground.sections) {
            lastSection = section;
        }

        return lastSection;
    }
}