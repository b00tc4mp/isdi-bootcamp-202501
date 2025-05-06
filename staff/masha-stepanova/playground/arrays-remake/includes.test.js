require('./includes.js')

console.info('INFO includes')

console.info('CASE search for element in an array without index')

{
    const numbers = [1, 2, 3];

    console.assert(numbers.includes(2) === true, 'numbers.includes(2) is true')
    console.assert(numbers.includes(4) === false, 'numbers.includes(4) is false')
}

console.info('CASE search for element with positive index')

{
    const numbers = [1, 2, 3];

    console.assert(numbers.includes(2, 1) === true, 'numbers.includes(2, 1) is true')
    console.assert(numbers.includes(2, 2) === false, 'numbers.includes(2, 2) is false')
    console.assert(numbers.includes(3, 4) === false, 'numbers.includes(2, 2) is false')
}

console.info('CASE search for element with negative index')

{
    const numbers = [1, 2, 3];

    console.assert(numbers.includes(2, -1) === false, 'numbers.includes(2, -1) is false')
    console.assert(numbers.includes(2, -2) === true, 'numbers.includes(2, -2) is true')
    console.assert(numbers.includes(2, -10) === true, 'numbers.includes(2, 2) is true')
}

console.info('CASE search for an element string compared to number')

{
    const numbers = [1, 2, 3];

    console.assert(numbers.includes('1') === false, 'numbers.includes("1") is false')
    console.assert(numbers.includes('3') === false, 'numbers.includes("3") is false')
}

console.info('CASE search for an element NaN')
debugger
{
    const numbers = [NaN, 1, 2, 3];

    console.assert(numbers.includes(NaN) === true, 'numbers.includes(NaN) is true')
}