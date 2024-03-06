function showOrHidePlayPause() {
    buttonPause.classList.toggle('d-none');
}


function changePauseStatus(reset = false) {
    if (pause || reset) {
        pause = false;
        buttonPause.classList.remove('pause');
    } else {
        pause = true;
        buttonPause.classList.add('pause');
    }
}


function openOrCloseControlInfo() {
    let info = document.getElementById('control-info');

    info.classList.toggle('d-none');
}


function letTheTextShape() {
    buttonGameStatus.classList.add('button-game-status-animation');
    setTimeout(() => {
        buttonGameStatus.classList.remove('button-game-status-animation');
    }, 1000);
}


function clearAllIntervals() {
    for (let i = 1; i < 999; i++) {
        window.clearInterval(i);
    }
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