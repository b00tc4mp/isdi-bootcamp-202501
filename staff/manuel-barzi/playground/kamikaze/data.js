const constant = {
    kamikaze: {
        WIDTH: 67,
        HEIGHT: 110
    },
    warship: {
        WIDTH: 194,
        HEIGHT: 199
    }
}

const data = {
    warship: {
        x: 500,
        y: 500,
        boxes: [
            {
                x: 60,
                y: 0,
                width: 50,
                height: 180
            },
            {
                x: 0,
                y: 110,
                width: 195,
                height: 80
            }
        ]
    },
    kamikazes: [
        // {
        //     x: 500,
        //     y: 0,
        //     width: constant.kamikaze.WIDTH,
        //     height: constant.kamikaze.HEIGHT
        // }, {
        //     x: 400,
        //     y: 300,
        //     width: constant.kamikaze.WIDTH,
        //     height: constant.kamikaze.HEIGHT
        // }, {
        //     x: 197,
        //     y: 199,
        //     width: constant.kamikaze.WIDTH,
        //     height: constant.kamikaze.HEIGHT
        // }
    ],
    lost: false,
    time: Date.now()
}