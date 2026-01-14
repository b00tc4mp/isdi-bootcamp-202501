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
        width: constant.warship.WIDTH,
        height: constant.warship.HEIGHT
    },
    kamikazes: [],
    lost: false,
    time: Date.now()
}