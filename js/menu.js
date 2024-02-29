function showOrHidePlayPause() {
    let button = document.getElementById('button-play-pause');

    button.classList.toggle('d-none');
}


function changePlayOrPause() {
    let button = document.getElementById('button-play-pause');

    button.classList.toggle('pause');
}


function openOrCloseControlInfo() {
    let info = document.getElementById('control-info');

    info.classList.toggle('d-none');
}


function changeStartOrMainScreen() {
    let text = document.getElementById('start-main-screen');

    if (text.innerHTML == 'Start') {
        text.innerHTML = 'Main screen';
    } else {
        text.innerHTML = 'Start';
    }

    text.classList.add('start-main-screen');
    setTimeout(() => {
        text.classList.remove('start-main-screen');
    }, 1000);
}


function isolateFromOderEvents(e) {
    e.stopPropagation();
}