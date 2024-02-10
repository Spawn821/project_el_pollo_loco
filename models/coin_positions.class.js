class CoinPositions {
    COINS = [];
    level = level1;

    constructor() {
        this.setForms();
    }


    /**
     * This function iterated through the level sections and
     * call the diffrent forms for the respective section.
     */
    setForms() {
        let currentForm = 0;

        for (let section in this.level.sections) {
            let currentSection = this.level.sections[section];
            let number = currentForm % 3

            this.selectForm(number, currentSection);

            currentForm++;
        }
    }


    /**
     * This function call the diffrent coin forms for
     * the diffrent level sections.
     * @param {number} number is the coin form.
     * @param {number} section is the x coordinate for the section.
     */
    selectForm(number, section) {
        switch(number) {
            case 0:
                this.arch(section + 350);
                break;
            case 1:
                this.zigZagHorizontalLine(section - 10);
                break;
            case 2:
                this.verticalLine(section + 75);
                break;
        };
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