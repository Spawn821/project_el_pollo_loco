let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}

window.addEventListener('keydown', (event) => {
    console.log(event);
});