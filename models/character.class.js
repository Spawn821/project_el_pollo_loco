class Character extends MovableObject {
    walk = [
        '../graphics/2_character_pepe/2_walk/W-21.png',
        '../graphics/2_character_pepe/2_walk/W-22.png',
        '../graphics/2_character_pepe/2_walk/W-23.png',
        '../graphics/2_character_pepe/2_walk/W-24.png',
        '../graphics/2_character_pepe/2_walk/W-25.png',
        '../graphics/2_character_pepe/2_walk/W-26.png'
    ];

    constructor() {
        super().loadImage('../graphics/2_character_pepe/2_walk/W-21.png');
        this.width = 100;
        this.height = 197;
        this.x = 50;
        this.y = 375 - this.height;
    }

    jump() {

    }
}