require('./indexOf.js')

console.info('TEST indexOf')

console.info('CASE search without fromIndex')

{
    const characters = ['a', 'b', 'c']
    console.assert(characters.indexOf('b') === 1, 'characters.indexOf(b) = 1')
    console.assert(characters.indexOf('d') === -1, 'characters.indexOf(d) = -1')
}

console.info('CASE search with positive fromIndex')

{
    const characters = ['a', 'b', 'c']
    console.assert(characters.indexOf('b', 1) === 1, 'characters.indexOf(b, 1) = 1')
    console.assert(characters.indexOf('a', 1) === -1, 'characters.indexOf(a, 1) = -1')
    console.assert(characters.indexOf('b', 4) === -1, 'characters.indexOf(b, 4) = -1')
}

console.info('CASE search with negative fromIndex')

{
    const characters = ['a', 'b', 'c']
    console.assert(characters.indexOf('b', -2) === 1, 'characters.indexOf(b, -2) = 1')
    console.assert(characters.indexOf('a', -1) === -1, 'characters.indexOf(a, -1) = -1')
    console.assert(characters.indexOf('c', -20) === 2, 'characters.indexOf(c, -20) = 2')
}

console.info('CASE search in a empty array')

{
    console.assert([].indexOf(1) === -1, '[].indexOf(1) = -1')
}

console.info('CASE search compare number with string')

{
    console.assert([1, '2', 3].indexOf(2) === -1, "[1, '2', 3].indexOf(2) = -1")
}

console.info('CASE search compare undefined')

{
    console.assert([0, 1, , 3].indexOf(undefined) === -1, "[0, 1, , 3].indexOf(undefined) = -1")
}

console.info('CASE search compare NaN')

{
    console.assert([NaN, 1, 2].indexOf(NaN) === -1, "[NaN, 1, 2].indexOf(NaN) = -1")
}