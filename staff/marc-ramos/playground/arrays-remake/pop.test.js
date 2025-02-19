require('./pop.js')

console.info('TEST pop')

console.info('CASE empty array')

{
    const cars = []

    const empty = []

    empty = cars.pop()

    console.assert(empty === undefined)
    console.assert(cars.length === 0)
}

console.info('CASE remove last element')

{
    const cars = ['porche', 'renault', 'ferrari']

    const empty = cars.pop()
    
    console.assert(cars.length = cars.length - 1)
    console.assert (cars.pop())
}