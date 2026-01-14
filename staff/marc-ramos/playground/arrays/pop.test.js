console.info('TEST splice')

console.info('CASE empty array')

{
    const cars = []
    const poppedArray = []

    poppedArray = cars.pop()

    console.assert(cars === undefined, 'cars is undefined')
    console.assert(poppedArray === undefined, 'poppedArray is undefined')
    console.assert(cars.length === 0, 'cars.length is 0')
}

console.info('CASE remove last element')

{
    const cars = ['porche', 'renault', 'ferrari']


    const poppedArray = cars.pop()
    
    console.assert(cars.length = cars.length - 1, 'cars.length is ')
    console.assert(poppedArray === cars[2], 'poppedArray[0] is cars[2]')
    console.assert (cars.pop())
}

/* const cars = ['porche', 'mercedes', 'seat', 'renault']

console.log(cars.pop())
// output: 'renault'

console.log(cars)
// Array ['porche', 'mercedes', 'seat']

cars.pop()

console.log(cars)
// Array ['porche', 'mercedes']

const empty = []

empty.pop()

console.log(empty)
// undefined
*/