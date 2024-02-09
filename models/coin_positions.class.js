class CoinPositions {
    COINS = [];
    level = level1;

    constructor() {
        this.setForms();
    }


    /**
     * This function iterated through the level sections
     * and call the diffrent forms for the respective section.
     */
    setForms() {
        for (let section in this.level.sections) {
            this.assignSections(section);
            if (this.assignSections(section) == 1) {
                this.arch(this.level.sections[section] + 350);
            } else if (this.assignSections(section) == 2) {
                this.zigZagHorizontalLine(this.level.sections[section] - 10);
            } else if (this.assignSections(section) == 0) {
                this.verticalLine(this.level.sections[section] + 75);
            }
        };
    }


    /**
     * This function determines numbers from 0 to 3 to assign
     * the coin shapes to the level secions.
     * @param {object} section is the current section.
     * @returns 0 to 3.
     */
    assignSections(section) {
        let number = Number(section.split('_')[1]);
        return number % 3;
    }


    /**
     * This function orgenizes the coins in an arch form
     * and add this to the COIN array.
     * @param {number} section is the x coordinate from the level section.
     */
    arch(section) {
        let x = section; // Circle center x
        let y = 250; // Circle center y
        let radius = 100; // Radius from arch
        let startAngle = 90; // Start angle 
        let endAngle = -90; // End angle 
        let number = 5; // Number of coins
        let step = (startAngle - endAngle) / number; // Angle steps

        while (startAngle <= 270) {
            let xPos = (radius * Math.sin(startAngle * Math.PI / 180)) + x;
            let yPos = (radius * Math.cos(startAngle * Math.PI / 180)) + y;

            this.COINS.push(new Coin(xPos, yPos));

            startAngle += step;
        }
    }


    /**
     * This function organize the coins in an zig zag horizontal line
     * and add this to the COIN array.
     * @param {number} section is the x coordinate from the level section.
     */
    zigZagHorizontalLine(section) {
        let x = section; // Start from the first coin in x
        let y = 50; // Start from the first coin in y
        let length = 13; // Number of coins
        let incrementX = 50; // Increment step in x
        let incrementY = 50; // Increment step in y

        for (let i = 0; i < length; i++) {
            if (i % 2 != 0) {
                y += incrementY;
            }

            this.COINS.push(new Coin(x, y));

            x += incrementX;
            y = 50;
        }
    }


    /**
     * This function organize the coins in multiple vertical lines
     * and add this to the COIN arry.
     * @param {number} section is the x coordinate from the level section.
     */
    verticalLine(section) {
        let x = section; // Start from the first coin in x
        let y = 50; // Start from the frist coin in y
        let length = 3; // Number of coins in one strand
        let dinstace = 75; // Dinstance from strand to strand

        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < length; i++) {
                let yPos = y + dinstace * i;

                this.COINS.push(new Coin(x, yPos));
            }

            x += 200;
        }
    }
}