class DrawableObject extends Sound{
    // Coordinates for image position
    x;
    y = 375;
    offsetX = 0;
    offsetY = 0;

    // Values for canvas and images
    width = 720;
    height = 400;
    scaleWPercent = 0;
    scaleHPercent = 0;


    // Declaration for img objects
    img;
    imgCache = {};

    currentImage = 0; // For image animation
    numberText; // Numbers in Statusbar

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


    setImgDimensions(width, percDiffHeight) {
        this.width = width;                        // Default width image
        this.height = this.width * percDiffHeight; // Default height image
    }


    setImgCoordinates(x, y = this.y - this.height) {
        this.x = x; // Start value for img position
        this.y = y; // Does the same
    }


    setImgScalePercentage(scalePercWidth, scalePercHeight) {
        this.scaleWPercent = scalePercWidth; // Percent value to scale the image in width
        this.scaleHPercent = scalePercHeight; // Does the same only in height

        this.setOffsetCoordinates();
    }


    setOffsetCoordinates() {
        // Calculate the diffrenz between default and scale value
        let diffToWidht = this.width - (this.width * this.scaleWPercent);
        let diffToHeight = this.height - (this.height * this.scaleHPercent);

        this.offsetX = diffToWidht / 2;
        if (this instanceof Character || this instanceof Endboss) {
            this.offsetY = diffToHeight; // For the character image
        } else {
            this.offsetY = diffToHeight / 2; // For all other pictures
        }
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawText(ctx) {
        if (this instanceof Icon) {
            ctx.font = '48px Boogaloo-Regular';
            ctx.fillStyle = 'white';
            ctx.fillText(this.numberText, this.x + 55, this.y + 55);
        }
    }


    drawRectBounding(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '2.5';
            ctx.strokeStyle = 'green';
            //ctx.rect(this.x, this.y, this.width, this.height);
            ctx.rect(this.x + this.offsetX, this.y + this.offsetY, this.width * this.scaleWPercent, this.height * this.scaleHPercent);
            ctx.stroke();
        }
    }
}