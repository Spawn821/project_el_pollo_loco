let level;
let levelLength = 1; // tow-steps starting with one (1, 3, 5...)

let numberChickenSmall = 0 * levelLength;
let numberChickenNormal = 0 * levelLength;
let numberChickenBoss = 1; // max 1

let IMAGES = {
    IMAGES_BACKGROUND: [
        'graphics/5_background/layers/3_third_layer/1.png',
        'graphics/5_background/layers/2_second_layer/1.png',
        'graphics/5_background/layers/1_first_layer/1.png',
        'graphics/5_background/layers/3_third_layer/2.png',
        'graphics/5_background/layers/2_second_layer/2.png',
        'graphics/5_background/layers/1_first_layer/2.png'
    ],

    IMAGES_CLOUD: [
        'graphics/5_background/layers/4_clouds/1.png',
        'graphics/5_background/layers/4_clouds/2.png'
    ],

    IMAGES_AIR: [
        'graphics/5_background/layers/air.png'
    ]
}


/**
 * This function create the level with the background and the enemies.
 */
function setLevel1() {
    level = new Level(levelLength, IMAGES, numberChickenSmall, numberChickenNormal, numberChickenBoss);
}