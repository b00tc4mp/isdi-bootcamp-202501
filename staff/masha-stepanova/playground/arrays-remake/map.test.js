require('./map')

console.info('TEST map')

console.info('CASE ')

const numbers = [2, 4, 6, 8, 10]

// Pass a function to map
const mapDivide = numbers.map((x) => x / 2)
const mapMultiply = numbers.map((x) => x * 2)

console.log(mapDivide)
// Expected output: Array [1, 2, 3, 4, 5]

console.log(mapMultiply)
// Expected output: Array [4, 8, 12, 16, 20]

console.log(numbers)