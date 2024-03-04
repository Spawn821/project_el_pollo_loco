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
            console.log('Start screen!   ' + loading);
        } else if (loading) {
            this.clearCanvas();
            this.addObjectToMap(this.loadingScreen);
            console.log('Loading!   ' + loading);
        }

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }
}