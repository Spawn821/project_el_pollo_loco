class Screen extends Draw {

    // Objects
    mainScreen = new MainScreen()
    loadingScreen = new LoadingScreen();

    // HTML elements
    canvas;
    ctx;

    /**
     * This function set all start conditions for the object.
     * @param {object} canvas is the canvas element.
     */
    constructor(canvas) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;

        this.draw();
    }


    /**
     * This function draw the main or the loading screen.
     */
    draw() {
        if (!startGame && !pause && !loading) {
            this.clearCanvas();
            this.addObjectToMap(this.mainScreen);
        } else if (loading) {
            this.clearCanvas();
            this.addObjectToMap(this.loadingScreen);
        }

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }
}