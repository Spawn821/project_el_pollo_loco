let canvas;
let world;
let characterImgIndex = 1;
let enemyImgIndex = 0;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}

document.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowRight') {
        world.character.moveRight()
        world.character.loadImage(world.character.walk[characterImgIndex]);
        characterImgIndex++;
        if (characterImgIndex > world.character.walk.length - 1) characterImgIndex = 0;
    };
    if (e.key == 'ArrowLeft') {
        world.character.moveLeft()
        world.character.loadImage(world.character.walk[characterImgIndex]);
        if (characterImgIndex == 0) characterImgIndex = world.character.walk.length;
        characterImgIndex--;
    };
})