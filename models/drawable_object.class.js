class DrawableObject extends Sound{
    // Coordinates for image position
    x;
    y = 375;
    offsetX = 0;
    offsetY = 0;
    startPosY = 0;

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

    /**
     * This function load the image in the image cache.
     * @param {string} path the current image path.
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image">
        this.img.src = path; // <img id="image" src="path">
    }


    /**
     * This function load multiple images in the image cach.
     * @param {array} arr list from image paths.
     */
    loadImages(arr) {
        for (let index in arr) {
            arr[index].forEach(path => {
                let img = new Image();
                img.src = path;
                this.imgCache[path] = img;
            });
        };
    }


    /**
     * This function set the width and height from an image.
     * @param {number} width is the width from the image.
     * @param {number} percDiffHeight is the height from the image.
     */
    setImgDimensions(width, percDiffHeight) {
        this.width = width;                        // Default width image
        this.height = this.width * percDiffHeight; // Default height image
    }


    /**
     * This function set the start coordinates for the image in the canvas.
     * @param {number} x coordinate for the image.
     * @param {number} y coordinate for the image.
     */
    setImgCoordinates(x, y = this.y - this.height) {
        this.x = x; // Start value for img position
        this.y = y; // Does the same
        this.startPosY = y;
    }


    /**
     * This function set the scale percent for the bounding box for the image.
     * @param {number} scalePercWidth the percent for the bounding box width.
     * @param {number} scalePercHeight the percent for the bounding box height.
     */
    setImgScalePercentage(scalePercWidth, scalePercHeight) {
        this.scaleWPercent = scalePercWidth; // Percent value to scale the image in width
        this.scaleHPercent = scalePercHeight; // Does the same only in height

        this.setOffsetCoordinates();
    }


    /**
     * This function calculate the offset point from the coordinates for the bounding box,
     * when using the scale percent.
     */
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


    /**
     * This function draw the image in the canvas.
     * @param {object} ctx is the image object.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * This function draw text in the canvas for the statusbar and the endboss healthbar.
     * @param {object} ctx is the image object.
     */
    drawText(ctx) {
        if (this instanceof Icon) {
            ctx.font = '48px Boogaloo-Regular';
            ctx.fillStyle = 'white';
            ctx.fillText(this.numberText, this.x + 55, this.y + 55);
        }
    }


    drawEnergyBar(ctx) {
        if (this instanceof Chicken) {
            ctx.beginPath()
            ctx.lineWidth = '3.5';
            ctx.strokeStyle = 'black';
            ctx.moveTo(this.x + this.width / 2, this.y + 20);
            ctx.lineTo(this.x + this.width / 2 + this.calculateEnergyBar(), this.y + 20);
            ctx.stroke();
        }
    }


    calculateEnergyBar() {
        return ((30) * (this.energy / 10)); // 30 is 100 procent from drawn energy.
    }


    // Delete if the project finished ##########
    drawRectBounding(ctx) {
        if (this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '2.5';
            ctx.strokeStyle = 'green';
            //ctx.rect(this.x, this.y, this.width, this.height);
            ctx.rect(this.x + this.offsetX, this.y + this.offsetY, this.width * this.scaleWPercent, this.height * this.scaleHPercent);
            ctx.stroke();
        }
    }


    // Delete if the project finished ##########
    drawRectBounding2(ctx) {
        if (this instanceof BackgroundObject) {
            ctx.beginPath();
            ctx.lineWidth = '2.5';
            ctx.strokeStyle = 'green';
            //ctx.rect(this.x, this.y, this.width, this.height);
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    } 
}