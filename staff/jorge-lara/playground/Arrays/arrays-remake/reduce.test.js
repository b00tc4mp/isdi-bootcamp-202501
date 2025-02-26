require('./reduce')

console.info('TEST reduce')

console.info('CASE sum all the array numbers')

{
    const array1 = [1, 2, 3, 4];

    
    const result = array1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    console.assert(result === 10, 'result must be 10');
}

console.info('CASE multiply something * 2')

{
    const array2 = [1, 2, 3, 4];

    const result = array2.reduce((accumulator, currentValue) => accumulator * currentValue)

    console.assert(result === 24, 'result is 24')

}