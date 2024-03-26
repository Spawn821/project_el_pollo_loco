class Sound {

    walking_sound = new Audio('audio/step_dirt.mp3');
    jumping_sound = new Audio('audio/jumping.mp3');
    collect_coin_sound = new Audio('audio/collect_coin.mp3');
    collect_bottle_sound = new Audio('audio/collect_bottle.mp3');
    hit_the_chicken_sound = new Audio('audio/hit_the_chicken.mp3')
    hit_the_boss_sound = new Audio('audio/hit_the_boss.mp3');
    win_sound = new Audio('audio/win.mp3');
    background_sound = new Audio('audio/background.mp3');
    final_boss_sound = new Audio('audio/final_boss.mp3');

    SOUNDS = [
        this.walking_sound,
        this.jumping_sound,
        this.collect_coin_sound,
        this.collect_bottle_sound,
        this.hit_the_chicken_sound,
        this.hit_the_boss_sound,
        this.win_sound,
        this.background_sound,
        this.final_boss_sound
    ]

    walkingSound() {
        this.walking_sound.play();
    }


    jumpingSound() {
        this.startSound(this.jumping_sound);
    }


    collectCoinSound() {
        this.startSound(this.collect_coin_sound);
    }


    collectBottleSound() {
        this.startSound(this.collect_bottle_sound);
    }


    hitTheChickenSound() {
        this.startSound(this.hit_the_chicken_sound);
    }


    hitTheBossSound() {
        this.startSound(this.hit_the_boss_sound);
    }


    winSound() {
        this.startSound(this.win_sound);
    }


    backgroundSoundPlay() {
        this.startSound(this.background_sound)

        this.background_sound.addEventListener('ended', () => {
            this.startSound(this.background_sound);
        }, false)
    }


    finalBossSoundPlay() {
        this.startSound(this.final_boss_sound);

        this.final_boss_sound.addEventListener('ended', () => {
            this.startSound(this.final_boss_sound);
        }, false)
    }


    startSound(sound) {
        let playPromise = sound.play();

        if (playPromise != undefined) {
            playPromise
                .then(_ => {
                    sound.play();
                })
                .catch(error => {
                    return;
                });
        }
    }

    pauseSound() {
        this.SOUNDS.forEach((sound) => {
            let playPromise = sound.play();

            if (playPromise != undefined) {
                playPromise
                    .then(_ => {
                        sound.pause();
                        sound.currentTime = 0;
                    })
                    .catch(error => {
                        return;
                    });
            }
        });
    }
}