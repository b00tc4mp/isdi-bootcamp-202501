const logic = {
    constant: {
        STEP: 20
    },
    helper: {
        isIntersecting() {
            let intersecting = false

            const { boy, pizzas } = data

            for (let i = 0; i < pizzas.length && !intersecting; i++) {
                const pizza = pizzas[i]

                const { x: o1x, y: o1y } = pizza

                const o2x = o1x + pizza.width
                const o2y = o1y + pizza.height

                const { x: p1x, y: p1y } = boy

                const p2x = p1x + boy.width
                const p2y = p1y + boy.height

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

    // Obtener estado
    getStatus() {
        const { boy: { x, y }, pizzas, lost } = data


        const status = {
            boy: {
                x,
                y
            },
            pizzas: pizzas.map(({ x, y }) => ({ x, y })),
            lost
        }

        return status
    },

    goRight() {
        data.boy.x += logic.constant.STEP

        data.lost = logic.helper.isIntersecting()
    },

    goLeft() {
        data.boy.x -= logic.constant.STEP

        data.lost = logic.helper.isIntersecting()
    },

    // goDown() {
    //     data.boy.y += logic.constant.STEP

    //     data.lost = logic.helper.isIntersecting()
    // },

    // goUp() {
    //     data.boy.y -= logic.constant.STEP

    //     data.lost = logic.helper.isIntersecting()
    // },

    // Actualiza estado PIZZAS
    updatePizzas() {
        const now = Date.now()
        const before = data.time

        data.pizzas.forEach(pizza => {
            pizza.x += Math.round(10 * Math.random()) * (Math.random() < .5 ? -1 : 1)
            pizza.y += Math.round(20 * Math.random())
        })

        if (now - before > 5000) {
            const pizza = {
                x: Math.round(1000 * Math.random()),
                y: 0,
                width: constant.pizza.WIDTH,
                height: constant.pizza.HEIGHT
            }

            data.pizzas.push(pizza)

            data.time = now
        }
    }
}