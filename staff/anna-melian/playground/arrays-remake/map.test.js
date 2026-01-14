require('./map')

console.info('TEST map')

console.info('CASE 1: Mapping an array to a function')
{
    const array1 = [1, 4, 9]
    const map1 = array1.map((x) => x * 2)
    console.assert(map1[0] === 2, 'map1[0] is 2')
    console.assert(map1[1] === 8, 'map1[1] is 8')
    console.assert(map1[2] === 18, 'map1[2] is 18')

    // Expected output: Array [2, 8, 18, 32]
}

console.info('CASE 2: Mapping an array of numbers to an array of square roots')
{
    const numbers = [1, 4, 9]
    const roots = numbers.map((num) => Math.sqrt(num))
    console.assert(roots[0] === 1, 'roots[0] = 1 ')
    console.assert(roots[1] === 2, 'roots[1] = 2 ')
    console.assert(roots[2] === 3, 'roots[2] = 3 ')
    console.assert(typeof roots === 'object')
}


console.info('CASE 3: Using map to reformat objects in an array')

{
    const kvArray = [
        { key: 1, value: 10 },
        { key: 2, value: 20 },
        { key: 3, value: 30 },
    ]

    const reformattedArray = kvArray.map(({ key, value }) => ({ [key]: value }))

    console.assert(reformattedArray[0][1] === 10, 'reformattedArray[0][1] is 10')
    console.assert(reformattedArray[1][2] === 20, 'reformattedArray[1][2] is 20')
    console.assert(reformattedArray[2][3] === 30, 'reformattedArray[2][3] is 30')
}


console.info('CASE 4: using the Number function')
{
    const array = ["1", "2", "3"]
    const numberArray = array.map(Number)
    const rareArray = ["1.1", "2.2e2", "3e300"]
    const newRareArray = rareArray.map(Number)
    // Number() will also return a float or (resolved) exponential notation
    console.assert(numberArray[0] === 1, '(numberArray[0] is 1')
    console.assert(numberArray[1] === 2, '(numberArray[1] is 2')
    console.assert(numberArray[2] === 3, '(numberArray[2] is 3')
    console.assert(newRareArray[0] === 1.1, 'newRareArray[0] is 1.1')
    console.assert(newRareArray[1] === 220, 'newRareArray[1] is 220')
    console.assert(newRareArray[2] === 3e+300, 'newRareArray[2] is 3e+300')

}


console.info('CASE 5: Side-effectful mapping')
{
    const cart = [5, 15, 25]
    let total = 0
    const withTax = cart.map((cost) => {
        total += cost
        return cost * 1.2
    })
    console.assert(withTax[0] === 6, 'withTax[0] is 6')
    console.assert(withTax[1] === 18, 'withTax[1] is 18')
    console.assert(withTax[2] === 30, 'withTax[2] is 30')
    console.assert(total === 45, 'total is 45') // 45

}


console.info('CASE 6: Mapped array contains undefined')
{
    const numbers = [1, 2, 3]
    const filteredNumbers = numbers.map((num, index) => {
        if (index < 2) {
            return num
        }
    })
    console.assert(filteredNumbers[0] === 1, 'filteredNumbers[0] is 1')
    console.assert(filteredNumbers[1] === 2, 'filteredNumbers[1] is 2')
    console.assert(filteredNumbers[2] === undefined, 'filteredNumbers[0] is undefined')

}


console.info('CASE 7: Calling map() on non-array objects')
{
    const arrayLike = {
        length: 3,
        0: 2,
        1: 3,
        2: 4,
        3: 5, // ignored by map() since length is 3
    };
    mapArray = Array.prototype.map.call(arrayLike, (x) => x ** 2)
    // [ 4, 9, 16 ]
    console.assert(mapArray[0] === 4, 'mapArray[0] is 4')
    console.assert(mapArray[1] === 9, 'mapArray[1] is 9')
    console.assert(mapArray[2] === 16, 'mapArray[2] is 16')
    console.assert(mapArray.length === 3, 'mapArray.length is 3')
}