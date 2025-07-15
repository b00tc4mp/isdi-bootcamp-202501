require('./push.js')

console.info('TEST push')

console.info('CASE push an element to array')

{
    const characters = ['a']

    console.assert(characters.push('b') === 2, 'characters.push(b) is 2')
    console.assert(characters[0] === 'a', 'characters[0] is a')
    console.assert(characters[1] === 'b', 'characters[1] is b')
    console.assert(characters.length === 2, 'characters.length is 2')
}

console.info('CASE push multiple elements to array')

{
    const characters = ['a']

    console.assert(characters.push('b', 'c', 'd') === 4, 'characters.push(b, c, d) is 4')
    console.assert(characters[0] === 'a', 'characters[0] is a')
    console.assert(characters[1] === 'b', 'characters[1] is b')
    console.assert(characters[2] === 'c', 'characters[2] is c')
    console.assert(characters[3] === 'd', 'characters[3] is d')
    console.assert(characters.length === 4, 'characters.length is 2')
}

console.info('CASE push an element to empty array')

{
    const emptyArray = []

    console.assert(emptyArray.push('a') === 1, 'emptyArray.pop() is undefined')
    console.assert(emptyArray[0] === 'a', 'emptyArray[0] is a')
    console.assert(emptyArray.length === 1, 'emptyArray.length is 0')
}