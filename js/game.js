// HTML
let canvas;
let buttonGameStatus;
let buttonPause;

// Objects
let screen;
let world;
let keyboard = new Keyboard();

// Boolean
let startGame = false;
let pause = false;
let loading = false;
let gameEnd = false;
let startMovie = false

function init() {
    buttonGameStatus = document.getElementById('button-game-status');
    buttonPause = document.getElementById('button-play-pause');
    canvas = document.getElementById('canvas');
    setScreen();
}


function setScreen() {
    screen = new Screen(canvas);
}


window.addEventListener('keydown', (event) => {
    if (!startMovie) {
        if (event.key == 'ArrowLeft') {
            keyboard.LEFT = true;
        } else if (event.key == 'ArrowRight') {
            keyboard.RIGHT = true;
        } else if (event.key == ' ') {
            keyboard.SPACE = true;
        } else if (event.key == 'a') {
            keyboard.a = true;
        } else if (event.key == 's') {
            keyboard.s = true;
        } else if (event.key == 'd') {
            keyboard.d = true;
        }
    }
});


window.addEventListener('keyup', (event) => {
    if (event.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    } else if (event.key == 'ArrowRight') {
        keyboard.RIGHT = false;
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