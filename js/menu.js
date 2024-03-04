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
    let button = document.getElementById('button-play-pause');

    if (text.innerHTML == 'Start') {
        text.innerHTML = 'Loading';
    } else if (text.innerHTML == 'Loading') {
        text.innerHTML = 'Main screen';
        setLevel();
    } else {
        text.innerHTML = 'Start';
        button.classList.remove('pause');
        //clearAllIntervals();
        //screen = new Screen(canvas);
    }

    text.classList.add('start-main-screen');
    setTimeout(() => {
        text.classList.remove('start-main-screen');
    }, 1000);
}


function clearAllIntervals() {
    for (let i = 1; i < 999; i++) {
        window.clearInterval(i);
        console.log(i);
    }
}


function isolateFromOderEvents(e) {
    e.stopPropagation();
}