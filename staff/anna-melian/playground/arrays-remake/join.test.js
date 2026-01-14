require('./join')

console.info('TEST join')

console.info('CASE 1: Joining an array four different ways')

{
    const array = ["Wind", "Water", "Fire"]
    const a = array.join()
    console.assert(a === 'Wind,Water,Fire', 'array no separtors')
    const b = array.join("")
    console.assert(b === 'WindWaterFire', "array with separtors = ''")
    const c = array.join(" + ")
    console.assert(c === 'Wind + Water + Fire', "array with separtors = ' + '")
    const d = array.join(", ")
    console.assert(d === 'Wind, Water, Fire', "array with separtors = ', '")
}

console.info('CASE 2: array with undefined or null')

{
    const array = [1, undefined, 'empty slot', null, 2, 'empty slots']
    const withoutSeparator = array.join()
    const withSeparator = array.join(';')
    //console.log(withoutSeparator)
    console.assert(withoutSeparator === '1,,empty slot,,2,empty slots', 'array[1] and array[3] become empty slots, no separator')
    //console.log(withSeparator)
    console.assert(withSeparator === '1;;empty slot;;2;empty slots', 'array[1] and array[3] become empty slots, with separator')

}

console.info('CASE 3: Calling join() on non-array objects')

{
    const arrayLike = {
        length: 3,
        0: 2,
        1: 3,
        2: 4,
        3: 5, // ignored by join() since length is 3
    }
    const a = Array.prototype.join.call(arrayLike)
    const b = Array.prototype.join.call(arrayLike, ".")
    console.assert(a === '2,3,4', 'acced into the non-array object and use the elements with an index lower than the declarate lentgh, no separator ')
    console.assert(b === '2.3.4', 'acced into the non-array object and use the elements with an index lower than the declarate lentgh, with separator = "."')
}

console.info('CASE 4: Control the separator of the first level,deeper levels always use the comma')
{
    const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ]

    a = matrix.join()
    b = matrix.join(";")
    console.assert(a === '1,2,3,4,5,6,7,8,9', 'only changes first level separators, no separator enter')
    console.assert(b === '1,2,3;4,5,6;7,8,9', 'only changes first level separators, separator = ";"')
    /*
    Do join into an array in another array
    console.log(matrix[0].join('.'))
    */
}
