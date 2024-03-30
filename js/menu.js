// ### PAUSE THE GAME ###

/**
 * This function show or hide the play-pause button.
 */
function showOrHidePlayPause() {
    buttonPause.classList.toggle('d-none');
}


/**
 * This function change the status from the play-puse button.
 * @param {boolean} reset remove the pause status.
 * @param {boolean} options set the pause status.
 */
function changePauseStatus(reset = false, options = false) {
    if ((pause || reset) && !options) {
        pause = false;
        buttonPause.classList.remove('pause');
    } else {
        pause = true;
        buttonPause.classList.add('pause');
    }
}




// ### MENU LEFT AREA ###

let optionIds = [
    'control-info',
    'privacy_policy_html',
    'impressum_html'
]

let optionButtonOne, optionButtonTwo, optionButtonThree;

/**
 * This function open or close the option menu.
 * If the options are opened during the game,
 * the game is paused.
 */
function openOrCloseOptions() {
    optionsArea.classList.toggle('open-options');
    optionsAreaMobile.classList.toggle('open-options-mobile');

    if (!optionsArea.classList.contains('open-options')) {
        selectedOption('option');
    }

    changePauseStatusWithOptions(optionsArea, optionsAreaMobile);
}


/**
 * This function change the play and pause status if options open or close.
 * @param {object} optionsArea is options menu desktop.
 * @param {object} optionsAreaMobile is options menu mobile.
 */
function changePauseStatusWithOptions(optionsArea, optionsAreaMobile) {
    if (startGame && optionsArea.classList.contains('open-options')
        && optionsAreaMobile.classList.contains('open-options-mobile')) {
        changePauseStatus(false, true);
    } else {
        changePauseStatus(true, false);
    }
}


/**
 * This function open or close the diffrent options in the options menu.
 * @param {string} currentOption is the id from the current options element.
 */
function selectedOption(currentOption) {
    optionButtonOne = document.getElementById('option-button-one');
    optionButtonTwo = document.getElementById('option-button-two');
    optionButtonThree = document.getElementById('option-button-three');

    optionIds.map((option) => {
        let optionWindow = document.getElementById(option);

        if (option == currentOption && !optionWindow.className.includes('open')) {
            addClassToOption(option, optionWindow);
        } else {
            removeClassFromOption(option, optionWindow);
        }
    });
}


/**
 * This function open an option from the options menu.
 * @param {string} option is the id from the option.
 * @param {object} optionWindow is the html element from the option.
 */
function addClassToOption(option, optionWindow) {
    switch (option) {
        case 'control-info':
            optionWindow.classList.add('open-control-info');
            optionButtonOne.classList.add('option-button-background');
            break;
        case 'privacy_policy_html':
            optionWindow.classList.add('open-privacy_policy-impressum');
            optionButtonTwo.classList.add('option-button-background');
            break;
        case 'impressum_html':
            optionWindow.classList.add('open-privacy_policy-impressum');
            optionButtonThree.classList.add('option-button-background');
            break;
    }
}


/**
 * This function close an option from the options menu.
 * @param {string} option is the id from the option.
 * @param {object} optionWindow is the html element from the option.
 */
function removeClassFromOption(option, optionWindow) {
    switch (option) {
        case 'control-info':
            optionWindow.classList.remove('open-control-info');
            optionButtonOne.classList.remove('option-button-background');
            break;
        case 'privacy_policy_html':
            optionWindow.classList.remove('open-privacy_policy-impressum');
            optionButtonTwo.classList.remove('option-button-background');
            break;
        case 'impressum_html':
            optionWindow.classList.remove('open-privacy_policy-impressum');
            optionButtonThree.classList.remove('option-button-background');
            break;
    }
}


/**
 * This function includes HTML templates into a document.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    let file;

    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute('w3-include-html');
        let resp = await fetch(file);

        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found.';
        };
    }
}




// ### MENU RIGHT AREA ###

/**
 * This function add and remove a class,
 * that shapes the text on the right side.
 */
function letTheTextShape() {
    buttonGameStatus.classList.add('button-game-status-animation');
    buttonGameStatusMobile.classList.add('button-game-status-animation-mobile')

    setTimeout(() => {
        buttonGameStatus.classList.remove('button-game-status-animation');
        buttonGameStatusMobile.classList.remove('button-game-status-animation-mobile')
    }, 1000);
}


/**
 * This function start or end the game.
 */
function changeGameStatus() {
    if (!startGame) {
        switchToGame();
    } else {
        clearAllIntervals();
        switchToMainScreen();
    }
}


/**
 * This function start the game.
 */
function switchToGame() {
    startGame = true;
    startLoadingScreen('Main screen');
    letTheTextShape();
    setLevel1();
    world = new World(canvas, keyboard);
    setTimeout(() => showOrHidePlayPause(), 7500);
}


/**
 * This function set the loading screen to start or end the game.
 * @param {string} status is the 'Start' or 'Main screen'.
 */
function startLoadingScreen(status) {
    if (optionsArea.classList.contains('open-options')) openOrCloseOptions();
    loading = true;

    buttonGameStatus.innerHTML = 'Loading';
    buttonGameStatusMobile.querySelector('span').innerHTML = 'Loading';

    buttonDisabled();

    setTimeout(() => {
        endLoadingScreen(status);
    }, 7500);
}


/**
 * This function disabled buttons with the assignment of classes.
 */
function buttonDisabled() {
    buttonGameStatus.classList.add('button-game-status-disabled');
    buttonGameStatusMobile.classList.add('button-game-status-disabled');
    optionsArea.classList.add('button-game-status-disabled');
    optionsAreaMobile.classList.add('button-game-status-disabled');
}


/**
 * This function close the loading screen.
 * @param {string} status is the 'Start' or 'Main screen'.
 */
function endLoadingScreen(status) {
    loading = false;

    buttonGameStatus.innerHTML = status;
    buttonGameStatusMobile.querySelector('span').innerHTML = status;

    buttonEnabled();
    letTheTextShape();
}


/**
 * This function enabled buttons.
 */
function buttonEnabled() {
    buttonGameStatus.classList.remove('button-game-status-disabled');
    buttonGameStatusMobile.classList.remove('button-game-status-disabled');
    optionsArea.classList.remove('button-game-status-disabled');
    optionsAreaMobile.classList.remove('button-game-status-disabled');
}


/**
 * This function let the game end and switch to the main screen.
 */
function switchToMainScreen() {
    changePauseStatus(true);

    if (!gameEnd) world.sound.pauseSound();
    if (!buttonPause.classList.contains('d-none')) showOrHidePlayPause();

    startGame = false, pause = false ,gameEnd = false, startMovie = false;

    startLoadingScreen('Start');
    letTheTextShape();
    setScreen();
    rotateSmartphone();
}


/**
 * This function clear all intervals.
 */
function clearAllIntervals() {
    for (let i = 1; i < 999; i++) {
        window.clearInterval(i);
    }
}


/**
 * This function remove the focus on the button who starts the game.
 * @param {*} button 
 */
function removeFocus(button) {
    button.blur()
}