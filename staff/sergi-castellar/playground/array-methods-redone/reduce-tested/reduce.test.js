require('./reduce')

console.info('REDUCE test')

console.info('CASE addition of positive numbers')

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