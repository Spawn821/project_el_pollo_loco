class CoinPositions {
    COINS = [];

    constructor() {
        let x = 250;
        let y = 350;
        let widthX = 50;
        let heightY = 150;
        let arcCourse = heightY / 4;

        for (let i = 0; i < 8; i++) {
            heightY -= arcCourse;
            this.COINS.push(new Coin(x += widthX, y -= heightY))
        }
    }
}