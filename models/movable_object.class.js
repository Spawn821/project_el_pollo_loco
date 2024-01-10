class MovableObject {
    x;
    y = 375;
    width = 720;
    height = 400;
    img;
    imgCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image">
        this.img.src = path; // <img id="image" src="path">
    }


    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }


    moveRight() {
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60);
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}