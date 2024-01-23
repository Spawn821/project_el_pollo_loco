class DrawableObject {
    // Coordinates for image position
    x;
    y = 375;
    offsetX = 0;
    offsetY = 0;

    // Values for canvas and images
    width = 720;
    height = 400;
    offsetWidth = 0;
    offsetHight = 0;

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


    setImgDimensions(width, percHeight) {
        this.width = width;              // Default width image
        this.height = this.width * percHeight; // Default height image
    }


    setCoordinates(x, y=this.y-this.height) {
        this.x = x; // Start value for img position
        this.y = y; // Start value for img position
    }


    setOffset(percWidth, percHeight) {
        // Offset dimensions
        this.offsetWidth = this.width * percWidth;
        this.offsetHight = this.height * percHeight;

        debugger; //########### Line 58 is individual depending on the figure ##################################
        // Offset coordinates
        this.offsetX = this.x + (this.width - this.offsetWidth) / 2;
        this.offsetY = this.y + this.width - this.offsetWidth;
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
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '2.5';
            ctx.strokeStyle = 'green';
            //ctx.rect(this.x, this.y, this.width, this.height);
            ctx.rect(this.offsetX, this.offsetY, this.offsetWidth, this.offsetHight);
            ctx.stroke();
        }
    }
}