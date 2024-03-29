class GameOverScreen extends MovableObject {

    /**
     * This function set all start conditions for the object.
     */
    constructor() {
        super().loadImage('graphics/9_intro_outro_screens/game_over/game over.png');
        this.setImgCoordinates(0, 0); // coordinates x, y calculate less height
    }
}