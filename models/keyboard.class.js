class Keyboard {
    LEFT = false; // Go left
    RIGHT = false; // Go right
    SPACE = false; // Jump
    a = false; // Attack low distance
    s = false; // Attack middle distance
    d = false; // Attack high dinstance

    resetKeys() {
        this.LEFT = false;
        this.RIGHT = false;
        this.SPACE = false;
        this.a = false;
        this.s = false;
        this.d = false;
    }


    holdKeyToGoRight() {
        this.RIGHT = true;
    }


    tabKeyToJump() {
        this.SPACE = true;
    }
}