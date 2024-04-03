class YouWinScreen extends MovableObject {

    /**
     * This function set all start conditions for the object.
     */
    constructor() {
        super().loadImage('graphics/0_downloads/win_screen.png');
        this.setImgCoordinates(0, 0); // coordinates x, y calculate less height
    }
}