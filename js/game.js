let canvas;
let start;
let screen;
let world;
let keyboard = new Keyboard();
let startGame = false;
let pause = false;
let loading = false;

function init() {
    canvas = document.getElementById('canvas');
    screen = new Screen(canvas);
}


function changeGameStatus() {
    if (!startGame) {
        loading = true;
        startGame = true;
        setTimeout(() => {
            loading = false;
            changeStartOrMainScreen();
        }, 5000);
        setLevel();
        world = new World(canvas, keyboard);
    } else {
        loading = true;
        setTimeout(() => {
            loading = false;
            //changeStartOrMainScreen();
        }, 5000);
        startGame = false;
        pause = false;
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