require('./indexOf')

console.info('TEST indexOf')

console.info('CASE locate values in an array')

{
    const array = [2, 9, 9]
    console.assert(array.indexOf(2) === 0, 'element 2 is array[0]')
    console.assert(array.indexOf(7) === -1, 'element 7 is -1')
    console.assert(array.indexOf(9, 2) === 2, 'element 9 from array[2] is 2')
    console.assert(array.indexOf(9, 1) === '1,2', 'element 9 from array[1] is 1,2')
    console.assert(array.indexOf(2, -1) === -1, 'element 2 from array[array.length + (-1)] is -1, not found')
    console.assert(array.indexOf(2, -3) === 0, 'element 2 from array[0] is 0')

}

console.info('CASE cannot use it for search Nan')

{
    const array = [NaN]
    console.assert(array.indexOf(NaN) === -1, "element NaN can't be search")

}


console.info('CASE finding all the occurrences of an element')

{
    const array = ['a', 'b', 'a', 'c', 'a', 'd']
    console.assert(array.indexOf('a') === '0,2,4', 'element a is array[0],array[2]),array[4]')
    console.assert(array.indexOf('a', 1) === '2,4', 'element from array[1], a is array[2]),array[4]')
    console.assert(array.indexOf('a', -6) === '0,2,4', 'element from array[array.length + index = 3], a is array[4]')
}

console.info('CASE cannot use it for search empty slots')

{

    const array = [1, , 3]
    console.assert(array.indexOf(undefined) === -1, "element emty slot can't be search")

}


console.info('CASE on non-array objects')
{
    const arrayLike = {
        length: 3,
        0: 2,
        1: 3,
        2: 4,
        3: 5, //ignored by indexOf() since length is 3
    }
    console.assert(Array.prototype.indexOf.call(arrayLike, 2) === 0, 'in arraylike element 2 is in arraylike[0] ')
    console.assert(Array.prototype.indexOf.call(arrayLike, 5) === -1, 'in arraylike element 5 is  not found since length is 3')
}