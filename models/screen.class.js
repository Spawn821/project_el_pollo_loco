class Screen {
    startScreen = new StartScreen()
    button = new Button('Start', '#FFFFFF', '#00FF00');
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;

        this.draw();
        this.mouseMove();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectToMap(this.startScreen);
        //this.button.drawButton(this.ctx);
        //this.button.drawPlayIcon(this.ctx);
        //this.button.drawPauseIcon(this.ctx);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }


    addObjectToMap(movableObject) {
        movableObject.draw(this.ctx);
        //movableObject.drawButton(this.ctx);
    }


    mouseMove() {
        this.ctx.style = 'cursor: pointer';
    }
}