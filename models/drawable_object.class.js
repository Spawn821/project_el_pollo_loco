class DrawableObject {
    x;
    y = 375;
    width = 720;
    height = 400;
    textOffsetX;
    textOffsetY;
    img;
    imgCache = {};
    currentImage = 0;
    numberText;

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image">
        this.img.src = path; // <img id="image" src="path">
    }


    loadImages(arr) {
        for (let index in arr) {
            arr[index].forEach(path => {
                let img = new Image();
                img.src = path;
                this.imgCache[path] = img;
            });
        };
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawText(ctx) {
        if (this instanceof Bottle || this instanceof Health || this instanceof Coin) {
            ctx.font = '48px Boogaloo-Regular';
            ctx.fillStyle = 'white';
            ctx.fillText(this.numberText, this.x + 55, this.y + 55);
        }
    }


    drawRectBounding(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '2.5';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}