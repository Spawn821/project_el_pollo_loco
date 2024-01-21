class Statusbar {
    bottle = new Bottle();
    health = new Health();
    coin = new Coin();

    setCount() {

    }


    setHealth(currentEnergy) {
        this.health.numberText = currentEnergy;
    }
}