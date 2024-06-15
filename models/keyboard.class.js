class Keyboard {

    LEFT = false; // Go left
    RIGHT = false; // Go right
    SPACE = false; // Jump
    a = false; // Attack low distance
    s = false; // Attack middle distance
    d = false; // Attack high dinstance


    /**
     * This function reset all keys after a movie.
     */
    resetKeys() {
        this.LEFT = false;
        this.RIGHT = false;
        this.SPACE = false;
        this.a = false;
        this.s = false;
        this.d = false;
    }


    /**
     * This function set the right key for a movie.
     */
    holdKeyToGoRight() {
        this.RIGHT = true;
    }


    /**
     * This function set the space key for a movie.
     */
    tabKeyToJump() {
        this.SPACE = true;
    }
}