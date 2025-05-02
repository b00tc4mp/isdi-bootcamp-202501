require('./map.js');

console.info('TEST map ');

console.info('CASE: multiply each element of the array');

{
    const arr = [1,4,9,16];

    const arrayResult = arr.map((x) => x * 2);

    console.assert(JSON.stringify(arrayResult) === JSON.stringify([2,8,18,32]), 'array should be [2,8,18,32]');
}

