require('./reduce')

console.info('TEST reduce')

console.info('Case multiply something * 2')

{
    // --- 1 ARG -> CALLBACK
    const testRay = [7, 2]

    const result = testRay.reduce(index => index * 2)

    console.assert(testRay.length === 2, 'testRay length is 2')
    console.assert(testRay[0] === 7, 'testRay[0] is 7')
    console.assert(testRay[1] === 2, 'testRay[1] is 2')

    console.assert(result === 14, 'result is 14')

    console.log(result)
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

    // console.log(sumWithInitial)
    // Expected output: 18
}

{
    const numbers = [1, 2, 3, 4]
    const result = numbers.reduce((acumulador, num) => acumulador + num, 0)

    console.assert(numbers.length === 4, 'numbers.length === 4')
    console.assert(numbers[0] === 1, 'numbers[0] === 1')
    console.assert(numbers[1] === 2, 'numbers[1] === 2')
    console.assert(numbers[2] === 3, 'numbers[2] === 3')
    console.assert(numbers[3] === 4, 'numbers[3] === 4')

    console.assert(result === 10, `result === 10`)

}

console.info('CASE multplication of positive numbers')

{
    const numbers = [1, 2, 3, 4]
    const result = numbers.reduce((acumulador, num) => acumulador * num, 1)

    console.assert(numbers.length === 4, 'numbers.length === 4')
    console.assert(numbers[0] === 1, 'numbers[0] === 1')
    console.assert(numbers[1] === 2, 'numbers[1] === 2')
    console.assert(numbers[2] === 3, 'numbers[2] === 3')
    console.assert(numbers[3] === 4, 'numbers[3] === 4')

    console.assert(result === 24, 'result === 24')
}

console.info('CASE find the highest number')

{
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5]
    const result = numbers.reduce((acumulador, num) => num > acumulador ? num : acumulador, -Infinity)

    console.assert(numbers.length === 9, 'numbers.length === 9')
    console.assert(numbers[0] === 3, 'numbers[0] === 3')
    console.assert(numbers[1] === 1, 'numbers[1] === 1')
    console.assert(numbers[2] === 4, 'numbers[2] === 4')
    console.assert(numbers[3] === 1, 'numbers[3] === 1')
    console.assert(numbers[4] === 5, 'numbers[4] === 5')
    console.assert(numbers[5] === 9, 'numbers[5] === 9')
    console.assert(numbers[6] === 2, 'numbers[6] === 2')
    console.assert(numbers[7] === 6, 'numbers[7] === 6')
    console.assert(numbers[8] === 5, 'numbers[8] === 5')

    console.assert(result === 9, 'result === 9')
}

console.info('CASE ')

{
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5]
    const result = numbers.reduce((acumulador, num) => num > acumulador ? num : acumulador, -Infinity)

    console.assert(numbers.length === 9, 'numbers.length === 9')
    console.assert(numbers[0] === 3, 'numbers[0] === 3')
    console.assert(numbers[1] === 1, 'numbers[1] === 1')
    console.assert(numbers[2] === 4, 'numbers[2] === 4')
    console.assert(numbers[3] === 1, 'numbers[3] === 1')
    console.assert(numbers[4] === 5, 'numbers[4] === 5')
    console.assert(numbers[5] === 9, 'numbers[5] === 9')
    console.assert(numbers[6] === 2, 'numbers[6] === 2')
    console.assert(numbers[7] === 6, 'numbers[7] === 6')
    console.assert(numbers[8] === 5, 'numbers[8] === 5')

    console.assert(result === 9, 'result === 9')
}
