let canvas;
let start;
let world;
let keyboard = new Keyboard();
let startGame = false;
let pause = true;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function changeGameStatus() {
    if (!startGame) {
        startGame = true;
    } else {
        startGame = false;
    }
}


function changePauseStatus() {
    if (pause) {
        pause = false;
    } else {
        pause = true;
    }
}


window.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    } else if (event.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    } else if (event.key == 'ArrowUp') {
        keyboard.UP = true;
    } else if (event.key == 'ArrowDown') {
        keyboard.DOWN = true;
    } else if (event.key == ' ') {
        keyboard.SPACE = true;
    } else if (event.key == 'a') {
        keyboard.a = true;
    } else if (event.key == 's') {
        keyboard.s = true;
    } else if (event.key == 'd') {
        keyboard.d = true;
    }
});


window.addEventListener('keyup', (event) => {
    if (event.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    } else if (event.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    } else if (event.key == 'ArrowUp') {
        keyboard.UP = false;
    } else if (event.key == 'ArrowDown') {
        keyboard.DOWN = false;
    } else if (event.key == ' ') {
        keyboard.SPACE = false;
    } else if (event.key == 'a') {
        keyboard.a = false;
    } else if (event.key == 's') {
        keyboard.s = false;
    } else if (event.key == 'd') {
        keyboard.d = false;
    }
});