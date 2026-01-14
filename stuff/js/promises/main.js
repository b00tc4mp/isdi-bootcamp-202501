Promise.resolve(10)
    .then(value => Promise.resolve(value + 10))
    .then(value => new Promise((resolve, reject) => reject(value + 10)))
    .catch(error => {
        console.error('E', error)

        return Promise.resolve(error + 10)
            .then(value => Promise.reject(value + 10))
            .then(value => new Promise((resolve, reject) => reject(value + 10)))
    })
    .then(value => Promise.resolve(value + 10)
        .then(value => Promise.resolve(value + 10))
        .then(value => new Promise((resolve, reject) => resolve(value + 10))))
    .catch(error => {
        console.error('E', error)

        return error + 10
    })
    .then(value => {
        console.log(value)

        return Promise.all([
            Promise.resolve(value + 10)
                .then(value => Promise.resolve(value + 10))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => Promise.resolve(value + 10))
                .then(value => {
                    console.log(value)

                    return Promise.resolve(value + 10)
                }),
            Promise.resolve(value + 10)
                .then(value => Promise.resolve(value + 10))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => Promise.resolve(value + 10))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => Promise.reject(value + 10))
        ])
            .then(([value1, value2]) => {
                console.log(value1, value2)

                return value1 + value2
            })
            .catch(error => {
                console.error('E', error)

                return Promise.resolve(error)
            })
    })
    .then(value => {
        return Promise.race([
            Promise.resolve(value + 10)
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => Promise.resolve(value + 10))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => Promise.resolve(value + 10))
                .then(value => {
                    console.log(value)

                    return Promise.resolve(value + 10)
                }),
            Promise.resolve(value + 10)
                .then(value => Promise.resolve(value + 10))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => Promise.resolve(value + 10))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => Promise.reject(value + 10)),
            Promise.resolve(value + 10)
                .then(value => Promise.resolve(value + 10))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => Promise.resolve(value + 10))
                .then(value => {
                    console.log(value)

                    return Promise.resolve(value + 10)
                }),
            Promise.resolve(value + 10)
                .then(value => Promise.resolve(value + 10))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => Promise.resolve(value + 10))
                .then(value => {
                    console.log(value)

                    return Promise.resolve(value + 10)
                }),
        ])
    })
    .then(value => console.log('L', value))
    .catch(error => console.error('E', error))