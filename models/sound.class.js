class Sound {

    // Character
    walking_sound = new Audio('audio/step_dirt.mp3');
    jumping_sound = new Audio('audio/jumping.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    broken_bottle_sound = new Audio('audio/broken_bottle.mp3');
    fart_sound = new Audio('audio/fart.mp3');
    collect_coin_sound = new Audio('audio/collect_coin.mp3');
    collect_bottle_sound = new Audio('audio/collect_bottle.mp3');

    // Enemies
    hit_the_chicken_small_sound = new Audio('audio/hit_the_chicken_small.mp3')
    hit_the_chicken_normal_sound = new Audio('audio/hit_the_chicken_normal.mp3')
    hit_the_boss_sound = new Audio('audio/hit_the_boss.mp3');
    boss_jumping_sound = new Audio('audio/boss_jumping.mp3');

    // Background
    win_sound = new Audio('audio/win.mp3');
    background_sound = new Audio('audio/background.mp3');
    final_boss_sound = new Audio('audio/final_boss.mp3');

    SOUNDS = [
        this.walking_sound,
        this.jumping_sound,
        this.hurt_sound,
        this.broken_bottle_sound,
        this.fart_sound,
        this.collect_coin_sound,
        this.collect_bottle_sound,
        this.hit_the_chicken_small_sound,
        this.hit_the_chicken_normal_sound,
        this.hit_the_boss_sound,
        this.boss_jumping_sound,
        this.win_sound,
        this.background_sound,
        this.final_boss_sound
    ]

    /**
     * This function set all start conditions for the object.
     */
    constructor() {
        this.volumeSound();
        this.onAir();
    }


    /**
     * This function set the sound on or off.
     */
    onAir() {
        document.addEventListener('click', () => {
            if (mute) this.muteSound();
            else this.volumeSound();
        }, false)        
    }


    /**
     * This functin set the volume for the diffrent sounds.
     */
    volumeSound() {
        this.walking_sound.volume = 0.5;
        this.jumping_sound.volume = 0.5;
        this.hurt_sound.volume = 1;
        this.broken_bottle_sound.volume = 0.5;
        this.fart_sound.volume = 0.35;
        this.collect_coin_sound.volume = 0.5;
        this.collect_bottle_sound.volume = 0.5;

        this.hit_the_chicken_small_sound.volume = 0.35;
        this.hit_the_chicken_normal_sound.volume = 0.35;
        this.hit_the_boss_sound.volume = 0.55;
        this.boss_jumping_sound.volume = 0.55;

        this.win_sound.volume = 0.25;
        this.background_sound.volume = 0.25;
        this.final_boss_sound.volume = 0.25;
    }


    /**
     * This fuction mute all sound.
     */
    muteSound() {
        this.SOUNDS.forEach((sound) => {
            sound.volume = 0;
        })
    }


    // ### SHORT SOUND ###

    /**
     * This function start the walking sound from the character.
     */
    walkingSound() {
        this.walking_sound.play();
    }


    /**
     * This function start the hurt sound from the character.
     */
    hurtSound() {
        this.hurt_sound.play();
    }


    /**
     * This function start the sound if broken a bottle.
     */
    brokenBottleSound() {
        this.startSound(this.broken_bottle_sound);
    }


    /**
     * This function start the fart sound from the character.
     */
    fartSound() {
        this.fart_sound.play();
    }


    /**
     * This function start the sound if collect a coin.
     */
    collectCoinSound() {
        this.collect_coin_sound.play();
    }


    /**
     * This function start the sound if collect a bottle.
     */
    collectBottleSound() {
        this.collect_bottle_sound.play();
    }


    /**
     * This function start the boss jumping sound.
     */
    bossJumpingSound() {
        this.boss_jumping_sound.play();
    }



    // ### SOUND THAT INTERRUPTED AND RESTARTED FROM BEGINNING ###

    /**
     * This function start the character jumping sound.
     */
    jumpingSound() {
        this.startSound(this.jumping_sound);
    }


    /**
     * This function start the sound if hit a small chicken.
     */
    hitTheChickenSmallSound() {
        this.startSound(this.hit_the_chicken_small_sound);
    }


    /**
     * This function start the sound if hit a normal chicken.
     */
    hitTheChickenNormalSound() {
        this.startSound(this.hit_the_chicken_normal_sound);
    }


    /**
     * This function start the sound if hit a boss.
     */
    hitTheBossSound() {
        this.startSound(this.hit_the_boss_sound);
    }



    // ### BACKGROUND SOUND ###

    /**
     * This function start the win sound.
     */
    winSound() {
        this.win_sound.play();
    }


    /**
     * This function start the level background sound.
     */
    backgroundSoundPlay() {
        this.background_sound.play();

        this.background_sound.addEventListener('ended', () => {
            this.background_sound.play();
        }, false)
    }


    /**
     * This function start the boss background sound.
     */
    finalBossSoundPlay() {
        this.final_boss_sound.play();

        this.final_boss_sound.addEventListener('ended', () => {
            this.final_boss_sound.play();
        }, false)
    }



    // ### PLAY AND PAUSE ###

    /**
     * This function start sound from the beginning.
     * @param {*} sound 
     */
    startSound(sound) {
        let playPromise = sound.play();

        if (playPromise != undefined) {
            playPromise
                .then(_ => {
                    sound.pause();
                    sound.currentTime = 0;
                    sound.play();
                })
                .catch(error => {
                    return;
                });
        }
    }


    /**
     * This function pausses all sounds.
     */
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