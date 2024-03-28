// HTML
let canvas;
let buttonGameStatus;
let buttonGameStatusMobile;
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

/**
 * This function initializes the start screen and
 * all start parameters.
 */
function init() {
    buttonGameStatus = document.getElementById('button-game-status');
    buttonGameStatusMobile = document.getElementById('button-game-status-mobile');
    buttonPause = document.getElementById('button-play-pause');
    canvas = document.getElementById('canvas');

    setScreen();
    rotateSmartphone();
}


/**
 * This function set the main/start screen.
 */
function setScreen() {
    screen = new Screen(canvas);
}


/**
 * This function starts an interval that rotates
 * the smarphone image in portrait mode.
 */
function rotateSmartphone() {
    let sizePortrait = window.matchMedia('(orientation: portrait)');
    let smartphone = document.getElementById('smartphone');

    setInterval(() => {
        if (sizePortrait.matches) smartphone.classList.toggle('smartphone-rotate');
    }, 1000);
}


/**
 * This function sets pressed buttons to true
 * that the character can move.
 */
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


/**
 * This function sets buttons to false
 * that the character can no longer move.
 */
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


/**
 * This function also sets the buttons to true
 * but ist responsible for touch operatioin.
 */
window.addEventListener('touchstart', (event) => {
    let key = document.getElementById(`${event.target.id}`);
    if (event.target.id.includes('key')) key.classList.add('scale');

    if (!startMovie) {
        if (event.target.id == 'arrow-left-key') {
            keyboard.LEFT = true;
        } else if (event.target.id == 'arrow-right-key') {
            keyboard.RIGHT = true;
        } else if (event.target.id == 'space-key') {
            keyboard.SPACE = true;
        } else if (event.target.id == 'a-key') {
            keyboard.a = true;
        } else if (event.target.id == 's-key') {
            keyboard.s = true;
        } else if (event.target.id == 'd-key') {
            keyboard.d = true;
        }
    }
});




/**
 * This function also sets the buttons to false
 * but ist responsible for touch operatioin.
 */
window.addEventListener('touchend', (event) => {
    let key = document.getElementById(`${event.target.id}`);
    if (event.target.id.includes('key')) key.classList.remove('scale');

    if (event.target.id == 'arrow-left-key') {
        keyboard.LEFT = false;
    } else if (event.target.id == 'arrow-right-key') {
        keyboard.RIGHT = false;
    } else if (event.target.id == 'space-key') {
        keyboard.SPACE = false;
    } else if (event.target.id == 'a-key') {
        keyboard.a = false;
    } else if (event.target.id == 's-key') {
        keyboard.s = false;
    } else if (event.target.id == 'd-key') {
        keyboard.d = false;
    }
});