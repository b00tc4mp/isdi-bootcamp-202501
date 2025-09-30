require('./includes.js')

console.info('TEST includes')

console.info('CASE search without fromIndex')

{
    const characters = ['a', 'b', 'c']
    console.assert(characters.includes('b') === true, 'characters.includes(b) is true')
    console.assert(characters.includes('d') === false, 'characters.includes(d) is false')
}

console.info('CASE search with positive fromIndex')

{
    const characters = ['a', 'b', 'c']
    console.assert(characters.includes('b', 1) === true, 'characters.includes(b, 1) is true')
    console.assert(characters.includes('a', 1) === false, 'characters.includes(a, 1) is false')
    console.assert(characters.includes('b', 4) === false, 'characters.includes(b, 4) is false')
}

console.info('CASE search with negative fromIndex')

{
    const characters = ['a', 'b', 'c']
    console.assert(characters.includes('b', -2) === true, 'characters.includes(b, -2) is true')
    console.assert(characters.includes('a', -1) === false, 'characters.includes(a, -1) is false')
    console.assert(characters.includes('c', -20) === true, 'characters.includes(c, -20) is true')
}

console.info('CASE search in a empty array')

{
    console.assert([].includes(1) === false, '[].includes(1) is false')
}

console.info('CASE search compare number with string')

{
    console.assert([1, '2', 3].includes(2) === false, "[1, '2', 3].includes(2) is false")
}

console.info('CASE search compare undefined')

{
    console.assert([0, 1, , 3].includes(undefined) === true, "[0, 1, , 3].indexOf(undefined) is true")
}

console.info('CASE search compare NaN')

{
    console.assert([NaN, 1, 2].includes(NaN) === true, "[NaN, 1, 2].includes(NaN) is true")
}