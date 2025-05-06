require('./indexOf')

console.info('TEST indexOf')

console.info('CASE search for element in an array')

{
    const numbers = [1, 2, 3];

    console.assert(numbers.indexOf(1) === 0, 'numbers.indexOf(1) is 0')
    console.assert(numbers.indexOf(3) === 2, 'numbers.indexOf(3) is 2')
    console.assert(numbers.indexOf(5) === -1, 'numbers.indexOf(5) is -1')
}

console.info('CASE search for an element and use positive index')

{
    const numbers = [1, 2, 3];

    console.assert(numbers.indexOf(1, 2) === -1, 'numbers.indexOf(1, 2) is -1')
    console.assert(numbers.indexOf(3, 2) === 2, 'numbers.indexOf(3, 2) is 2')
    console.assert(numbers.indexOf(2, 2) === -1, 'numbers.indexOf(2, 2) is -1')
}

console.info('CASE search for an element and use negative index')

{
    const numbers = [1, 2, 3];

    console.assert(numbers.indexOf(1, -1) === -1, 'numbers.indexOf(1, -1) is -1')
    console.assert(numbers.indexOf(3, -2) === 2, 'numbers.indexOf(3, -2) is 2')
    console.assert(numbers.indexOf(2, -2) === 1, 'numbers.indexOf(2, -2) is 1')
}

console.info('CASE search for an element string compared to number')

{
    const numbers = [1, 2, 3];

    console.assert(numbers.indexOf('1') === -1, 'numbers.indexOf("1") is -1')
    console.assert(numbers.indexOf('3') === -1, 'numbers.indexOf("3) is -1')
}

console.info('CASE search for an element NaN')

{
    const numbers = [NaN, 1, 2, 3];

    console.assert(numbers.indexOf(NaN) === -1, 'numbers.indexOf(NaN) is -1')
}

console.info('CASE search for an element undefined')

{
    const numbers = [1, , , 2, 3];

    console.assert(numbers.indexOf(undefined) === -1, 'numbers.indexOf(undefined) is -1')
}