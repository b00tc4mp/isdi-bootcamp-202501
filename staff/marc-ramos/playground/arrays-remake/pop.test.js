require('./pop.js')

console.info('TEST splice')

console.info('CASE remove last element')

{
    const cars = ['porche', 'renault', 'ferrari','skoda']
    
    console.assert(cars.pop() === 'skoda', 'cars.pop() is skoda')
    console.assert(cars[0] === 'porche', 'cars[0] is porche')
    console.assert(cars[1] === 'renault', 'cars[1] is renault')
    console.assert(cars[2] === 'ferrari', 'cars[2] is ferrari')
}

/*
console.info('CASE empty array')

{
    const cars = ['marc']
    const poppedArray = []

    poppedArray = cars.pop()

    console.assert(cars === undefined, 'cars is undefined')
    console.assert(poppedArray == ['marc'], 'poppedArray is undefined')
    console.assert(cars.length === 0, 'cars.length is 0')
}
*/