require('./forEach.js')

console.info('TEST forEach')

console.info('CASE copy characters')

{
    const characters = ['a', 'b', 'c']
    const charactersCopy = []
    characters.forEach(character => charactersCopy[charactersCopy.length] = character)

    console.assert(charactersCopy[0] === 'a', 'charactersCopy[0] is a')
    console.assert(charactersCopy[1] === 'b', 'charactersCopy[1] is b')
    console.assert(charactersCopy[2] === 'c', 'charactersCopy[2] is c')
}

console.info('CASE copy characters using index')

{
    const characters = ['a', 'b', 'c']
    const charactersCopy = []
    characters.forEach((character, index) => charactersCopy[index] = character)

    console.assert(charactersCopy[0] === 'a', 'charactersCopy[0] is a')
    console.assert(charactersCopy[1] === 'b', 'charactersCopy[1] is b')
    console.assert(charactersCopy[2] === 'c', 'charactersCopy[2] is c')
}