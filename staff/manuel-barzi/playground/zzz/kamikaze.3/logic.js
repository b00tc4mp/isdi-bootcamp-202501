const logic = {
    constant: {
        STEP: 20,
        INTERSECTION_OFFSET: 30
    },
    helper: {
        isIntersecting() {
            let intersecting = false

            const { warship, kamikazes } = data

            for (let i = 0; i < kamikazes.length && !intersecting; i++) {
                const kamikaze = kamikazes[i]

                const o1x = kamikaze.x + logic.constant.INTERSECTION_OFFSET
                const o1y = kamikaze.y + logic.constant.INTERSECTION_OFFSET

                const o2x = o1x + kamikaze.width - logic.constant.INTERSECTION_OFFSET
                const o2y = o1y + kamikaze.height - logic.constant.INTERSECTION_OFFSET

                const p1x = warship.x + logic.constant.INTERSECTION_OFFSET
                const p1y = warship.y + logic.constant.INTERSECTION_OFFSET

                const p2x = p1x + warship.width - logic.constant.INTERSECTION_OFFSET
                const p2y = p1y + warship.height - logic.constant.INTERSECTION_OFFSET

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
        const { warship: { x, y }, kamikazes, lost } = data


        const status = {
            warship: {
                x,
                y
            },
            kamikazes: kamikazes.map(({ x, y }) => ({ x, y })),
            lost
        }

        return status
    },

    goRight() {
        if (data.lost) throw new Error('game over')

        data.warship.x += logic.constant.STEP

        data.lost = logic.helper.isIntersecting()
    },

    goLeft() {
        if (data.lost) throw new Error('game over')

        data.warship.x -= logic.constant.STEP

        data.lost = logic.helper.isIntersecting()
    },

    goDown() {
        if (data.lost) throw new Error('game over')

        data.warship.y += logic.constant.STEP

        data.lost = logic.helper.isIntersecting()
    },

    goUp() {
        if (data.lost) throw new Error('game over')

        data.warship.y -= logic.constant.STEP

        data.lost = logic.helper.isIntersecting()
    },

    updateKamikazes() {
        if (data.lost) throw new Error('game over')

        const now = Date.now()
        const before = data.time

        data.kamikazes.forEach(kamikaze => {
            kamikaze.x += Math.round(10 * Math.random()) * (Math.random() < .5 ? -1 : 1)
            kamikaze.y += Math.round(20 * Math.random())
        })

        if (now - before > 5000) {
            const kamikaze = {
                x: Math.round(1000 * Math.random()),
                y: 0,
                width: constant.kamikaze.WIDTH,
                height: constant.kamikaze.HEIGHT
            }

            data.kamikazes.push(kamikaze)

            data.time = now
        }

        data.lost = logic.helper.isIntersecting()
    }
}