require('./push.js')

console.info('TEST push')

console.info('CASE add one argument')

const characters = ['a', 'b']

const length = characters.push('c')

console.assert(characters[0] === 'a', 'characters[0] is a')
console.assert(characters[1] === 'b', 'characters[0] is b')
console.assert(characters[2] === 'c', 'characters[0] is c')
console.assert(characters.length === 3, 'characters.length is 3')
console.assert(length === 3, 'length is 3')
const charactersKeys = Object.keys(characters)
console.assert(characterKeys.length === 3, 'charactersKeys.length is 3')

console.info('CASE add multiple arguments')

{
    const characters = ['a', 'b']

    const length = characters.push('c', 'd', 'e')

    console.assert(characters[0] === 'a', 'characters[0] is a')
    console.assert(characters[1] === 'b', 'characters[0] is b')
    console.assert(characters[2] === 'c', 'characters[0] is c')
    console.assert(characters[3] === 'd', 'characters[0] is d')
    console.assert(characters[4] === 'e', 'characters[0] is e')
    console.assert(characters.length === 5, 'characters.length is 5')
    console.assert(length === 5, 'length is 3')
    const charactersKeys = Object.keys(characters)
    console.assert(characterKeys.length === 5, 'charactersKeys.length is 3')
}