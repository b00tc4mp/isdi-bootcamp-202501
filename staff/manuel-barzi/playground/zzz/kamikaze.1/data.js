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
    player: {
        x: 500,
        y: 500,
        width: constant.warship.WIDTH,
        height: constant.warship.HEIGHT
    },
    obstacles: [{
        x: 500,
        y: 0,
        width: constant.kamikaze.WIDTH,
        height: constant.kamikaze.HEIGHT
    }, {
        x: 400,
        y: 300,
        width: constant.kamikaze.WIDTH,
        height: constant.kamikaze.HEIGHT
    }, {
        x: 197,
        y: 199,
        width: constant.kamikaze.WIDTH,
        height: constant.kamikaze.HEIGHT
    }],
    lost: false
}