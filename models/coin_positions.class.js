class CoinPositions {
    COINS = [];
    level = level1;
    levelSectionOne = this.level.end_level / 5 * 1;
    levelSectionTwo = this.level.end_level / 5 * 2;
    levelSectionThree = this.level.end_level / 5 * 3;
    levelSectionFour = this.level.end_level / 5 * 3;

    constructor() {
        this.arch();
        this.horizontalLine();
        this.verticalLine();
    }


    arch() {
        let x = this.level.sections['section_1_xPos'] + 350; // Circle center x
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


    horizontalLine() {
        let x = this.level.sections['section_2_xPos'];
        let y = 50;
        let length = 4;
        let dinstace = 75;

        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < length; i++) {
                let xPos = x + dinstace * i;

                this.COINS.push(new Coin(xPos, y));
            }

            x += 200;
            y += 100;
        }
    }


    verticalLine() {
        let x = this.level.sections['section_3_xPos'];
        let y = 50;
        let length = 2;
        let dinstace = 75;

        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < length; i++) {
                let yPos = y + dinstace * i;

                this.COINS.push(new Coin(x, yPos));
            }

            x += 200;
        }
    }
}