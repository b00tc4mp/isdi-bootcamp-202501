require('./includes.js');
console.info('TEST includes');

console.info('CASE: Existing element without fromIndex');

{
    const arr = ['a', 'b', 'c'];

    console.assert(arr.includes('a') === true, 'arr.includes("a") should return true');
    console.assert(arr.includes('b') === true, 'arr.includes("b") should return true');
    console.assert(arr.includes('c') === true, 'arr.includes("c") should return true');
}

console.info('CASE: Non-existing element without fromIndex');

{
    const arr = ['a', 'b', 'c'];

    console.assert(arr.includes('d') === false, 'arr.includes("d") should return false');
}

console.info('CASE: Existing element with positive fromIndex');

{
    const arr = ['a', 'b', 'c', 'd'];

    // From index 2, 'c' is found, but 'b' is not
    console.assert(arr.includes('c', 2) === true, 'arr.includes("c", 2) should return true');
    console.assert(arr.includes('b', 2) === false, 'arr.includes("b", 2) should return false');
}

console.info('CASE: Existing element with negative fromIndex');

{
    const arr = ['a', 'b', 'c', 'd'];

    // Negative fromIndex: -1 starts from the last element
    console.assert(arr.includes('d', -1) === true, 'arr.includes("d", -1) should return true');
    console.assert(arr.includes('c', -1) === false, 'arr.includes("c", -1) should return false');
}

console.info('CASE: Empty array');

{
    const arr = [];

    console.assert(arr.includes('a') === false, 'Empty array should return false');
}

console.info('CASE: fromIndex equal to array length');

{
    const arr = [1, 2, 3];

    console.assert(arr.includes(1, 3) === false, 'arr.includes(1, 3) should return false');
}

console.info('CASE: fromIndex greater than array length');

{
    const arr = [1, 2, 3];

    console.assert(arr.includes(2, 5) === false, 'arr.includes(2, 5) should return false');
}

console.info('CASE: Undefined element');

{
    const arr = [undefined, 2, 3];

    console.assert(arr.includes(undefined) === true, 'arr.includes(undefined) should return true');
}
