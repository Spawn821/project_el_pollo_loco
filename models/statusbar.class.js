class Statusbar {

    // Objects
    bottleIcon;
    healthIcon;
    coinIcon;
    endbossHealthIcon;
    world;


    /**
     * This function set all start conditions for the object.
     */
    constructor() {
        this.createCharacterStatus();
    }


    /**
     * This function create the diffrent icons for the character.
     */
    createCharacterStatus() {
        this.bottleIcon = new Icon('graphics/7_statusbars/3_icons/icon_salsa_bottle.png',
            10, 10, 75, 0.98, 10);
        this.healthIcon = new Icon('graphics/7_statusbars/3_icons/icon_health.png',
            140, 10, 65, 1.06, 100);
        this.coinIcon = new Icon('graphics/7_statusbars/3_icons/icon_coin.png',
            270, 10, 65, 1.06, 0);

    }


    /**
     * This function create the icons for the boss.
     */
    createChickenBossStatus() {
        this.endbossHealthIcon = new Icon('graphics/7_statusbars/3_icons/icon_health_endboss.png',
            500, 10, 80, 1.02, 30);
    }


    /**
     * This function increase the bottle counter.
     */
    increaseCounterBottle() {
        this.bottleIcon.numberText += 1;
        this.world.sound.collectBottleSound();
    }


    /**
     * This function decrease the bottle counter.
     */
    decreaseCounterBottle() {
        this.bottleIcon.numberText -= 1;
    }


    /**
     * This function set the current health from the character.
     * @param {number} currentEnergy is the current health.
     */
    setHealth(currentEnergy) {
        this.healthIcon.numberText = currentEnergy;
    }


    /**
     * This function increase the coin counter.
     */
    setCounterCoin() {
        this.coinIcon.numberText++;
        this.world.sound.collectCoinSound();
    }


    /**
     * This function set the current health from the boss.
     * @param {number} currentEnergy is the current health.
     */
    setChickenBossHealth(currentEnergy) {
        this.endbossHealthIcon.numberText = currentEnergy;
    }
}