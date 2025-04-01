var data = {
    rounds: [] // -1 player, 1 machine, 0 draw
}

var logic = {
    constant: {
        MAX_ROUNDS: 3
    },

    playFigure: function (figure) {
        if (typeof figure !== 'string') throw new TypeError('invalid figure type')
        if (figure !== 'r' && figure !== 'p' && figure !== 's') throw new SyntaxError('invalid figure syntax')

        var sum = 0

        for (var i = 0; i < data.rounds.length; i++)
            sum += data.rounds[i]

        if (data.rounds.length > 1 && (sum < -1 || sum > 1) || data.rounds.length > 2 && (sum < 0 || sum > 0)) throw new Error('game is over')

        var machine
        var random = Math.random()

        if (random < 1 / 3) machine = 'r'
        else if (random < 2 / 3) machine = 'p'
        else machine = 's'

        if (figure === 'r' && machine === 's' || figure === 's' && machine === 'p' || figure === 'p' && machine === 'r')
            data.rounds[data.rounds.length] = -1
        else if (figure === machine)
            data.rounds[data.rounds.length] = 0
        else
            data.rounds[data.rounds.length] = 1
    }
}

var interface = {
    tryFigure: function () {
        // TODO pedir al usuario la figura que quiere jugar y llamar a logica que procese la figura y actualice estado del juego

        try {
            var figure = prompt('figure? (r | p | s)')

            logic.playFigure(figure)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    },
    showStatus: function () {
        // TODO print players status
    },
    restart: function () {
        // TODO reset game state
    }
}