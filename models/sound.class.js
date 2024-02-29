class Sound {
    walking_sound = new Audio('../audio/step_dirt.mp3');
    jumping_sound = new Audio('../audio/jumping.mp3');
    collect_coin_sound = new Audio('../audio/collect_coin.mp3');
    jump_on_chicken_sound = new Audio('../audio/jump_on_chicken.mp3')
    background_sound = new Audio('../audio/background.mp3');

    walkingSound() {
        this.walking_sound.play();
    }


    jumpingSound() {
        //this.startSound(this.jumping_sound);
    }


    collectCoinSound() {
        //this.startSound(this.collect_coin_sound);
    }


    jumpOnChickenSound() {
        //this.startSound(this.jump_on_chicken_sound);
    }


    backgroundSound() {
        //this.startSound(this.background_sound);

     //   this.background_sound.addEventListener('ended', () => {
     //       this.startSound(this.background_sound);
     //   }, false)
    }


    startSound(sound) {
        sound.pause();
        sound.currentTime = 0;
        sound.play();
    }
}