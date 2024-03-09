// ### PAUSE THE GAME ###
function showOrHidePlayPause() {
    buttonPause.classList.toggle('d-none');
}


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

function openOrCloseOptions() {
    let optionsArea = document.getElementById('options-area');

    optionsArea.classList.toggle('open-options');

    if (!optionsArea.classList.contains('open-options')) {
        selectedOption('option');
    }

    if (startGame && optionsArea.classList.contains('open-options')) changePauseStatus(false, true);
}

function selectedOption(currentOption) {
    optionButtonOne = document.getElementById('option-button-one');
    optionButtonTwo = document.getElementById('option-button-two');
    optionButtonThree = document.getElementById('option-button-three');

    optionIds.map((option) => {
        let optionWindow = document.getElementById(option);

        if (option == currentOption) {
            optionWindow.classList.add('open-info-window')
            addClassToOption(option, optionWindow);
        } else {
            optionWindow.classList.remove('open-info-window')
            removeClassFromOption(option, optionWindow);
        }
    });
}

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

function letTheTextShape() {
    buttonGameStatus.classList.add('button-game-status-animation');
    setTimeout(() => {
        buttonGameStatus.classList.remove('button-game-status-animation');
    }, 1000);
}


function changeGameStatus() {
    if (!startGame) {
        switchToGame();
    } else {
        clearAllIntervals();
        setTimeout(switchToMainScreen, 250);
    }
}


function switchToGame() {
    startGame = true;
    switchToLoadingScreen('Main screen');
    letTheTextShape();
    setLevel1();
    world = new World(canvas, keyboard);
    setTimeout(showOrHidePlayPause, 5000);
}


function switchToLoadingScreen(status) {
    // Loding active
    loading = true;
    buttonGameStatus.innerHTML = 'Loading';
    buttonGameStatus.classList.add('button-game-status-disabled');
    buttonPause.ponter

    // Loading deactivate
    setTimeout(() => {
        loading = false;
        buttonGameStatus.innerHTML = status;
        buttonGameStatus.classList.remove('button-game-status-disabled');
        letTheTextShape();
    }, 5000);
}


function switchToMainScreen() {
    changePauseStatus(true);
    showOrHidePlayPause();
    startGame = false;
    pause = false;
    switchToLoadingScreen('Start');
    letTheTextShape();
    setScreen();
}


function clearAllIntervals() {
    for (let i = 1; i < 999; i++) {
        window.clearInterval(i);
    }
}