require('./pop.js')

console.info('TEST pop')

console.info('CASE pop the last element')

{
    const characters = ['a', 'b', 'c']

    console.assert(characters.pop() === 'c', 'characters.pop() is 2')
    console.assert(characters[0] === 'a', 'characters[0] is a')
    console.assert(characters[1] === 'b', 'characters[0] is b')
    console.assert(characters.length === 2, 'characters.length is 2')
}

console.info('CASE pop at empty array')

{
    const emptyArray = []

    console.assert(emptyArray.pop() === undefined, 'emptyArray.pop() is undefined')
    console.assert(emptyArray.length === 0, 'emptyArray.length is 0')
}
