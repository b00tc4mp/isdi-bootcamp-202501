require('./push.js')

console.info('TEST push')

console.info('CASE add one argument')

{
    const characters = ['a', 'b']

    const length = characters.push('c')

    console.assert(characters[0] === 'a', 'characters[0] is a')
    console.assert(characters[1] === 'b', 'characters[1] is b')
    console.assert(characters[2] === 'c', 'characters[2] is c')
    console.assert(characters.length === 3, 'characters.length is 3')
    console.assert(length === 3, 'length is 3')
    const charactersKeys = Object.keys(characters)
    console.assert(charactersKeys.length === 3, 'charactersKeys.length is 3')
}

console.info('CASE add multiple arguments')

{
    const characters = ['a', 'b']

    const length = characters.push('c', 'd', 'e')

    console.assert(characters[0] === 'a', 'characters[0] is a')
    console.assert(characters[1] === 'b', 'characters[1] is b')
    console.assert(characters[2] === 'c', 'characters[2] is c')
    console.assert(characters[3] === 'd', 'characters[3] is d')
    console.assert(characters[4] === 'e', 'characters[4] is e')
    console.assert(characters.length === 5, 'characters.length is 5')
    console.assert(length === 5, 'length is 5')
    const charactersKeys = Object.keys(characters)
    console.assert(charactersKeys.length === 5, 'charactersKeys.length is 5')
}

console.info('CASE add no arguments')

{
    const characters = ['a', 'b']

    const length = characters.push()

    console.assert(characters[0] === 'a', 'characters[0] is a')
    console.assert(characters[1] === 'b', 'characters[1] is b')
    console.assert(characters.length === 2, 'characters.length is 2')
    console.assert(length === 2, 'length is 2')
    const charactersKeys = Object.keys(characters)
    console.assert(charactersKeys.length === 2, 'charactersKeys.length is 2')
}