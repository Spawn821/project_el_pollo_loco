class BottlePositions {
    BOTTLES = [];
    level = level1;

    IMAGES = [
        '../graphics/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../graphics/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    constructor() {
        this.setLine();
    }

    /**
     * This function iterated through the level sections and
     * call the form in which the bottles should be arranged for each section.
     */
    setLine() {
        for (let section in this.level.sections) {
            let currentSection = this.level.sections[section];

            this.line(currentSection);
        }
    }


    /**
     * This function organize the collectable botlles in a line on the ground.
     * @param {number} section is the x coordinate for the secion.
     */
    line(section) {
        let currentImage = 0;

        for (let i = 0; i < 3; i++) {
            this.BOTTLES.push(new BottleToCollect(section, this.IMAGES[this.returnIndex(currentImage)]));

            currentImage++;
        }
    }


    /**
     * This function return index number for the diffrent bottle images.
     * @param {number} currentImage is the number for the image path.
     * @returns index.
     */
    returnIndex(currentImage) {
        return currentImage % this.IMAGES.length;
    }
}