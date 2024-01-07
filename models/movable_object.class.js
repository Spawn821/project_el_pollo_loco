class MovableObject {
    x;
    y;
    img;
    width;
    height;

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image">
        this.img.src = path; // <img id="image" src="path">
    }

    moveRight() {
        this.x += 5;
        console.log('Moving right');
    }

    moveLeft() {
        this.x -= 5;
        console.log('Moving left');
    }
}