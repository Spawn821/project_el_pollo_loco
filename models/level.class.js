class Level {
    backgroundObjects = [];
    clouds = [];
    air;
    end_level;
    enemies;
    bottle;
    health;
    coin;

    constructor(IMAGES_BACKGROUND, IMAGES_CLOUD, air, enemies, bottle, health, coin) {
        this.backgroundObjects = this.loadObjects(IMAGES_BACKGROUND, 'background');
        this.clouds = this.loadObjects(IMAGES_CLOUD, 'cloud');
        this.air = air;
        this.enemies = enemies;
        this.bottle = bottle;
        this.health = health;
        this.coin = coin;
    }


    loadObjects(IMAGES, category) {
        let posX1 = 0;
        let posX2 = 720;
        let objectList = [];

        for (let i = 0; i < 3; i++) {

            objectList = this.addObjects(posX1, posX2, objectList, IMAGES, category);

            posX1 = posX2 + 720;
            posX2 = posX2 + 720 * 2;
        }

        return objectList;
    }


    addObjects(posX1, posX2, objectList, IMAGES, category) {
        for (let j = 0; j < IMAGES.length; j++) {
            let image = IMAGES[j];

            if (category == 'background') {
                this.addBackgroundObjects(image, posX1, posX2, objectList, IMAGES, j);
            } else {
                this.addCloudObjects(image, posX1, posX2, objectList, IMAGES, j);
            }
        }

        this.end_level = posX2;
        return objectList;
    }


    addBackgroundObjects(image, posX1, posX2, objectList, IMAGES, j) {
        if (j < IMAGES.length / 2) objectList.push(new BackgroundObject(image, posX1));
        else objectList.push(new BackgroundObject(image, posX2));
    }


    addCloudObjects(image, posX1, posX2, objectList, IMAGES, j) {
        if (j < IMAGES.length / 2) objectList.push(new Cloud(image, posX1));
        else objectList.push(new Cloud(image, posX2));
    }
}