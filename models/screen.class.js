class Screen extends Draw {

    mainScreen = new MainScreen()
    loadingScreen = new LoadingScreen();
    canvas;
    ctx;

    constructor(canvas) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;

        this.draw();
    }


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