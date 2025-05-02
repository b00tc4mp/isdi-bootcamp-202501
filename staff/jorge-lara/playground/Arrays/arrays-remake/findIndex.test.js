require('./findIndex')

console.info('TEST findIndex')

console.info('CASE find index greater than 13')

{
    const array1 = [5, 12, 8, 130, 44];

    const isLargeNumber = (element) => element > 13;

    console.assert(array1.findIndex(isLargeNumber) === 3, '3 is the index of the number greater than 13');
}