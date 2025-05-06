const constants = {
    player: {
        WIDTH: 75,
        HEIGHT: 50
    },

    codeLines: {
        WIDTH: 50,
        HEIGHT: 50
    },

    bugs: {
        WIDTH: 50,
        HEIGHT: 50
    }
}

const data = {
    lives: 10,
    catchedObjects: 0,
    topSchore: 0,
    fallingObjects: [],
    lost: false,
    time: Date.now(),
    player: {
        x: 500,
        y: 500,
        width: constants.player.WIDTH,
        height: constants.player.HEIGHT
    }
}



