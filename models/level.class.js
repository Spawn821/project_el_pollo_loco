class Level {
    backgroundObjects = [];
    clouds = [];
    air;
    enemies;
    bottlesToCollect = [];
    section1Xpos;
    section2Xpos;
    section1Num = 1;
    section2Num = 2;
    sections = {};

    constructor(IMAGES_BACKGROUND, IMAGES_CLOUD, air, enemies, bottlesToCollect) {
        this.backgroundObjects = this.loadObjects(IMAGES_BACKGROUND, 'background');
        this.clouds = this.loadObjects(IMAGES_CLOUD, 'cloud');
        this.air = air;
        this.enemies = enemies;
        this.bottlesToCollect = bottlesToCollect;
    }


    loadObjects(IMAGES, category) {
        [this.section1Xpos, this.section2Xpos, this.section1Num, this.section2Num] = [0, 720, 1, 2];
        this.sections = [];
        let objectList = [];

        for (let i = 0; i < 5; i++) {
            objectList = this.addObjects(objectList, IMAGES, category);

            this.setXCoordinates();
            this.setSections();
        }

        return objectList;
    }


    setXCoordinates() {
        this.section1Xpos = this.section2Xpos + 720;
        this.section2Xpos = this.section2Xpos + 720 * 2;
    }


    setSections() {
        this.section1Num = this.section2Num + 1;
        this.section2Num = this.section2Num + 1 * 2;
    }


    addObjects(objectList, IMAGES, category) {
        for (let j = 0; j < IMAGES.length; j++) {
            let image = IMAGES[j];

            if (category == 'background') {
                this.addBackgroundObjects(image, objectList, IMAGES, j);
            } else {
                this.addCloudObjects(image, objectList, IMAGES, j);
            }
        }

        this.addSectionsToArray();

        return objectList;
    }


    addSectionsToArray() {
        this.sections[`section_${this.section1Num}_xPos`] = this.section1Xpos;
        this.sections[`section_${this.section2Num}_xPos`] = this.section2Xpos;
    }


    addBackgroundObjects(image, objectList, IMAGES, j) {
        if (j < IMAGES.length / 2) objectList.push(new BackgroundObject(image, this.section1Xpos));
        else objectList.push(new BackgroundObject(image, this.section2Xpos));
    }


    addCloudObjects(image, objectList, IMAGES, j) {
        if (j < IMAGES.length / 2) objectList.push(new Cloud(image, this.section1Xpos));
        else objectList.push(new Cloud(image, this.section2Xpos));
    }
}