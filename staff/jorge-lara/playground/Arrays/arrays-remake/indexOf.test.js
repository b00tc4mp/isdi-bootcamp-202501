require('./indexOf.js');

console.info('TEST indexOf');

console.info('CASE: Find an element index in an array');

{
    const arr = [2,9,9];

    console.assert(arr.indexOf(2) === 0, 'index should be 0');
    console.assert(arr.indexOf(7) === -1, 'index should be -1');
}

console.info('CASE: Find an element index with a start index');

{
    const arr = [2,9,9];

    console.assert(arr.indexOf(9,2) === 2, 'index should be 2');
    console.assert(arr.indexOf(2,-1) === -1, 'index should be -1')
}

console.info('CASE: find an element using a string instead of a number')
{
    const arr = [2,9,9];

    console.assert(arr.indexOf('f') === -1, 'index should be -1')
}