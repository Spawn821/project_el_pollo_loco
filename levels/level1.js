const level1 = new Level(
    [
        '../graphics/5_background/layers/3_third_layer/1.png',
        '../graphics/5_background/layers/2_second_layer/1.png',
        '../graphics/5_background/layers/1_first_layer/1.png',
        '../graphics/5_background/layers/3_third_layer/2.png',
        '../graphics/5_background/layers/2_second_layer/2.png',
        '../graphics/5_background/layers/1_first_layer/2.png'
    ],

    [
        '../graphics/5_background/layers/4_clouds/1.png',
        '../graphics/5_background/layers/4_clouds/2.png'
    ],

    new BackgroundObject('../graphics/5_background/layers/air.png', 0),

    [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ]
);