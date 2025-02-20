require('./includes')

console.info('TEST includes')

console.info('CASE 1: with fromIndex defined and undefined')
{
    const a = [1, 2, 3]
    console.assert(a.includes(2) === true, 'a has 2') // true
    console.assert(a.includes(4) === false, 'a has not 4') // false
    console.assert(a.includes(3, -1) === true, 'a has 3 from index 1') // true
}

console.info('CASE 2: find NaN and need to be strigtly equal ')
{
    const a = [1, 2, NaN, "1", "2", "3"]
    console.assert(a.includes(NaN) === true, 'a has NaN') // true
    console.assert(a.includes(3) === false, 'a has not 3') // false
}

console.info('CASE 3: fromindex > array.length return false')

{
    const a = [1, 2, 3]

    console.assert(a.includes(3, 3) === false, 'fromindex > a.length') // false

    const arr = ["a", "b", "c"]
    console.assert(arr.includes("c", 3) === false, 'fromindex > a.length')
    console.assert(arr.includes("c", 100) === false, 'fromindex > a.length')
}



console.info('CASE 4: fromindex <= 0 return true')

{
    const arr = ["a", "b", "c"];

    console.assert(arr.includes("b", -100) === true, '1') // true
    console.assert(arr.includes("c", -100) === true, '2') // true
    console.assert(arr.includes("a", -100) === true, '3') // true
    console.assert(arr.includes("a", -2) === false, '4') // false
}

console.info('CASE 5: search undefined')

{
    const a = [1, , 3]
    console.assert(a.includes(undefined) === true, 'empty slot is undefined');
    const b = [1, 2, 3]
    console.assert(b.includes(undefined) === false, 'empty slot is undefined, no empty slots in the array');
}

console.info('CASE 6: Calling includes() on non-array objects ')

{
    const arrayLike = {
        length: 3,
        0: 2,
        1: 3,
        2: 4,
        3: 1, // ignored by includes() since length is 3
    };
    console.assert(Array.prototype.includes.call(arrayLike, 2) === true, 'element found');
    console.assert(Array.prototype.includes.call(arrayLike, 1) === false, 'element  not found in the declared length');
}

