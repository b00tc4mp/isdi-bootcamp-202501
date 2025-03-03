const logic = {
    constant: {
        STEP: 20
    },

    helper: {
        isIntersecting() {
            let intersecting = false

            const { player, fallingObjects } = data

            for (let i = 0; i < fallingObjects.lenght && !intersecting; i++) {
                const fallingObject = fallingObjects[i]

                const { x: o1x, y: o1y } = fallingObject

                const o2x = o1x + fallingObject.width
                const o2y = o1y + fallingObject.height

                const { x: p1x, y: p1y } = player

                const p2x = p1x + player.width
                const p2y = p1y + player.height

                if (
                    o2x >= p1x && o2y >= p1y && o2x <= p2x && o2y <= p2y
                    ||
                    o1x >= p1x && o1y >= p1y && o1x <= p2x && o1y <= p2y
                    ||
                    o1x >= p1x && o2y >= p1y && o1x <= p2x && o2y <= p2y
                    ||
                    o2x >= p1x && o1y >= p1y && o2x <= p2x && o1y <= p2y
                ) {
                    intersecting = true
                    catchedObjects++
                }
            }
            return intersecting
        }

    },

    getStatus() {
        const { player: { x, y }, fallingObjects, lost, catchedObjects, lives } = data

        const status = {
            player: { x, y },
            fallingObjects: fallingObjects.map(({ x, y }) => ({ x, y })),
            lost,
            catchedObjects,
            lives
        }
        return status
    },

    goRight() {
        data.player.x += logic.constant.STEP

        data.lost = logic.helper.isIntersecting()
    },

    goLeft() {
        data.player.x -= logic.constant.STEP

        data.lost = logic.helper.isIntersecting()
    },

    updateFallingObjects() {
        const now = Date.now()
        const before = data.time

        data.fallingObjects.forEach(fallingObject => {
            fallingObject.x += Math.round(10 * Math.random()) * (Math.random() < 0.5 ? -1 : 1)

            fallingObject.y += Math.round(20 * Math.random())
        })

        if (now - before > 5000) {
            const fallingObject = {
                x: Math.round(1000 * Math.random()),
                y: 0,
                width: constants.codeLines.WIDTH,
                height: constants.codeLines.HEIGHT
            }

            data.fallingObjects.push(fallingObject)

            data.time = now
        }
    }
}