
new Promise((resolve, reject) => {
    //resolve('1')
    reject('1')
})
    .then(value => value + '-2')
    .catch(error => console.error('catch', 1, error))
    .finally(value => console.log('finally', 1, value))
    .then(value => {
        console.log('then', 2, value)

        throw value + '-3'
    })
    .then(value => {
        console.log('then', 3, value)
    })
    .finally(value => {
        console.log('finally', 2, value)

        //return 'whatever'
        throw 'whatever'
    })
    .catch(error => {
        console.error('catch', 2, error);

        return error + '-4'
    })
    .finally(value => console.log('finally', 3, value))
    .then(value => value + '-5')
    .catch(error => console.error('catch', 3, error))
    .then(value => {
        console.log('then', 5, value)

        throw value + '-6'
    })
    .catch(error => {
        console.error('catch', 4, error)

        throw error + '-7'
    })
    .then(value => {
        console.log('then', 6, value)

        throw value + '-8'
    })
    .catch(error => {
        console.error('catch', 5, error)

        return error + '-9'
    })
    .then(value => {
        console.log('then', 7, value)
    })

