class LevelBackground {
    backgroundObjects = [];
    clouds = [];
    air;
    section1Xpos;
    section2Xpos;
    section1Num;
    section2Num;
    sections = {};

    constructor(IMAGES_BACKGROUND, IMAGES_CLOUD, air) {
        this.backgroundObjects = this.loadObjects(IMAGES_BACKGROUND, 'background');
        this.clouds = this.loadObjects(IMAGES_CLOUD, 'cloud');
        this.air = air;
    }


    /**
     * This function start the construction from the level.
     * only level section is assigned to the array objectList.
     * @param {array} IMAGES is a list from image paths.
     * @param {string} category distinguishes between 'background' or 'cloud' images.
     * @returns object list.
     */
    loadObjects(IMAGES, category) {
        [this.section1Xpos, this.section2Xpos, this.section1Num, this.section2Num] = [0, 720, 1, 2];
        this.sections = {};
        let objectList = [];

        for (let i = 0; i < 1; i++) {
            objectList = this.addObjects(objectList, IMAGES, category);

            this.setXCoordinates();
            this.setSections();
        }

        return objectList;
    }


    /**
     * This function set the x coordinates for only new section.
     */
    setXCoordinates() {
        this.section1Xpos = this.section2Xpos + 720;
        this.section2Xpos = this.section2Xpos + 720 * 2;
    }


    /**
     * This function set the value for numbering the sections.
     */
    setSections() {
        this.section1Num = this.section2Num + 1;
        this.section2Num = this.section2Num + 1 * 2;
    }


    /**
     * This function contols that the objects are assigned to the correct categroy.
     * @param {array} objectList is the list from the diffrent sections.
     * @param {array} IMAGES is a list from image paths.
     * @param {string} category distinguishes between 'background' or 'cloud' images.
     * @returns object list.
     */
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


    /**
     * This function add the x coordinates from the sections to the array.
     */
    addSectionsToArray() {
        this.sections[`section_${this.section1Num}_xPos`] = this.section1Xpos;
        this.sections[`section_${this.section2Num}_xPos`] = this.section2Xpos;
    }


    /**
     * This function add a background section to the array.
     * @param {string} image is the image path.
     * @param {array} objectList is the list from the diffrent sections.
     * @param {array} IMAGES is a list from image paths.
     * @param {index} j is the index number from the image array.
     */
    addBackgroundObjects(image, objectList, IMAGES, j) {
        if (j < IMAGES.length / 2) objectList.push(new BackgroundObject(image, this.section1Xpos));
        else objectList.push(new BackgroundObject(image, this.section2Xpos));
    }


    /**
     * This function add a cloud section to the array.
     * @param {string} image is the image path.
     * @param {array} objectList is the list from the diffrent sections.
     * @param {array} IMAGES is a list from image paths.
     * @param {index} j is the index number from the image array.
     */
    addCloudObjects(image, objectList, IMAGES, j) {
        if (j < IMAGES.length / 2) objectList.push(new Cloud(image, this.section1Xpos));
        else objectList.push(new Cloud(image, this.section2Xpos));
    }
}