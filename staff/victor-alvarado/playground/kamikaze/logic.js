const logic = {
    constant: {
        STEP: 20
    },
    helper: {
        isIntersecting() {
            let intersecting = false

            const { player, obstacles } = data

            for (let i = 0; i < obstacles.length && !intersecting; i++) {
                const obstacle = obstacles[i]

                const { x: o1x, y: o1y } = obstacle

                const o2x = o1x + obstacle.width
                const o2y = o1y + obstacle.height

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
                )
                    intersecting = true
            }

            return intersecting
        }
    },

    getStatus() {
        const { player: { x, y }, obstacles, lost } = data


        const status = {
            player: {
                x,
                y
            },
            obstacles: obstacles.map(({ x, y }) => ({ x, y })),
            lost
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

    goDown() {
        data.player.y += logic.constant.STEP

        data.lost = logic.helper.isIntersecting()
    },

    goUp() {
        data.player.y -= logic.constant.STEP

        data.lost = logic.helper.isIntersecting()
    }
}