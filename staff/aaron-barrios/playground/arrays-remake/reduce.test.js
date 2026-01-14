require('./reduce')

console.info('TEST reduce')

console.info('Case 1 argument')

{
    // --- 1 ARG -> CALLBACK
    const testRay = [7, 2]

    const result = testRay.reduce(index => index * 2)

    console.assert(testRay.length === 2, 'testRay length is 2')
    console.assert(testRay[0] === 7, 'testRay[0] is 7')
    console.assert(testRay[1] === 2, 'testRay[1] is 2')

    console.assert(result === 14, 'result is 14')
    //expected output 14
}


console.info('Case 2 arguments')

{
    // --- 2 ARG -> CALLBACK + INITIAL VALUE -> EL ACCUMULATOR SIEMPRE VA A SER 0 Y EL CURRENT VALUE ES TU INDICE 0
    const testRay = [7, 2, 3, 4]

    const initialValue = 2
    const result = testRay.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
    )

    console.assert(testRay.length === 4, 'testRay length is 4')
    console.assert(testRay[0] === 7, 'testRay[0] is 7')
    console.assert(testRay[1] === 2, 'testRay[1] is 2')
    console.assert(testRay[2] === 3, 'testRay[2] is 3')
    console.assert(testRay[3] === 4, 'testRay[3] is 4')

    console.assert(result === 18, 'result is 18')
    // Expected output: 18
}





