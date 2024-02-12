class Statusbar {
    bottleIcon = new Icon('../graphics/7_statusbars/3_icons/icon_salsa_bottle.png',
                            10, 10, 75, 0.98, 10);
    healthIcon = new Icon('../graphics/7_statusbars/3_icons/icon_health.png',
                            140, 10, 65, 1.06, 100);
    coinIcon = new Icon('../graphics/7_statusbars/3_icons/icon_coin.png',
                            270, 10, 65, 1.06, 0);
    endbossHealthIcon = new Icon('../graphics/7_statusbars/3_icons/icon_health_endboss.png',
                            565, 10, 80, 1.02, 30);

    increaseCounterBottle() {
        this.bottleIcon.numberText += 1;
    }

    decreaseCounterBottle() {
        this.bottleIcon.numberText -= 1;
    }


    setHealth(currentEnergy) {
        this.healthIcon.numberText = currentEnergy;
    }
    

    setCounterCoin() {
        this.coinIcon.numberText++;
        this.coinIcon.collect_coin_sound.muted = false;
        this.coinIcon.collect_coin_sound.play();
    }


    setEndbossHealth(currentEnergy) {
        this.endbossHealthIcon.numberText = currentEnergy;
    }
}