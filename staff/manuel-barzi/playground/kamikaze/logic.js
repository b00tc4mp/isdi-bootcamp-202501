const logic = {
    constant: {
        STEP: 20,
        INTERSECTION_OFFSET: 0
    },
    helper: {
        isIntersecting() {
            let intersecting = false

            const { warship, kamikazes } = data

            for (let i = 0; i < kamikazes.length && !intersecting; i++) {
                const kamikaze = kamikazes[i]

                for (let i = 0; i < kamikaze.boxes.length && !intersecting; i++) {
                    const kb = kamikaze.boxes[i]

                    const k1x = kamikaze.x + kb.x + logic.constant.INTERSECTION_OFFSET
                    const k1y = kamikaze.y + kb.y + logic.constant.INTERSECTION_OFFSET

                    const k2x = k1x + kb.width - logic.constant.INTERSECTION_OFFSET
                    const k2y = k1y + kb.height - logic.constant.INTERSECTION_OFFSET

                    for (let i = 0; i < warship.boxes.length && !intersecting; i++) {
                        const wb = warship.boxes[i]

                        const w1x = warship.x + wb.x + logic.constant.INTERSECTION_OFFSET
                        const w1y = warship.y + wb.y + logic.constant.INTERSECTION_OFFSET

                        const w2x = w1x + wb.width - logic.constant.INTERSECTION_OFFSET
                        const w2y = w1y + wb.height - logic.constant.INTERSECTION_OFFSET

                        console.log({ k1x, k1y, k2x, k2y }, { w1x, w1y, w2x, w2y })

                        if (
                            k2x >= w1x && k2y >= w1y && k2x <= w2x && k2y <= w2y
                            ||
                            k1x >= w1x && k1y >= w1y && k1x <= w2x && k1y <= w2y
                            ||
                            k1x >= w1x && k2y >= w1y && k1x <= w2x && k2y <= w2y
                            ||
                            k2x >= w1x && k1y >= w1y && k2x <= w2x && k1y <= w2y
                        )
                            intersecting = true
                    }
                }
            }

            return intersecting
        }
    },

    getStatus() {
        const { warship: { x, y, boxes }, kamikazes, lost } = data


        const status = {
            warship: {
                x,
                y,
                boxes
            },
            kamikazes: kamikazes.map(({ x, y, boxes }) => ({ x, y, boxes })),
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
                boxes: [
                    {
                        x: 30,
                        y: 0,
                        width: 40,
                        height: 100
                    },
                    {
                        x: 0,
                        y: 35,
                        width: 75,
                        height: 40
                    }
                ]
            }

            data.kamikazes.push(kamikaze)

            data.time = now
        }

        data.lost = logic.helper.isIntersecting()
    }
}