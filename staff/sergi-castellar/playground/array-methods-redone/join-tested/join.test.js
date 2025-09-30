require('./join.js')

console.info('TEST join')

console.info('CASE join without parameter')

{
    const characters = ['a', 'b', 'c']

    console.assert(characters.join() === 'a,b,c', 'characters.join() is a,b,c')
}

console.info('CASE join with parameter')

{
    const characters = ['a', 'b', 'c']

    console.assert(characters.join('; ') === 'a; b; c', 'characters.join() is a; b; c')
    console.assert(characters.join('  ') === 'a  b  c', 'characters.join() is a  b  c')
    console.assert(characters.join('') === 'abc', 'characters.join() is abc')
    console.assert(characters.join(' + ') === 'a + b + c', 'characters.join() is a + b + c')
}

console.info('CASE join with an empty array')

{
    console.assert([].join('; ') === '', 'characters.join() is an empty string')
}

console.info('CASE join with an only one element array')

{
    console.assert(['a'].join('; ') === 'a', 'characters.join() is a')
}

console.info('CASE join with arrays with undefined')

{
    console.assert(['a', 'b', , 'd'].join() === 'a,b,,d', '[a, b, , d].join() is a,b,,d')
    console.assert(['a', 'b', undefined, 'd'].join() === 'a,b,,d', '[a, b, undefined, d].join() is a,b,,d')
}

console.info('CASE join with arrays with null')

{
    console.assert(['a', 'b', null, 'd'].join() === 'a,b,,d', '[a, b, null, d].join().join() is a,b,,d')
    console.assert(['a', 'b', 'c', null].join() === 'a,b,c,', '[a, b, null, d].join().join() is a,b,,d')
}