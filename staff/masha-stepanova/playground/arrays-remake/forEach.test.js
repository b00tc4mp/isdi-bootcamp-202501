require('./forEach.js')

console.info('TEST forEach')

console.info('CASE iterate using each element argument')

{
    const characters = ['a', 'b', 'c']
    const charactersCopy = []

    characters.forEach(element => charactersCopy[charactersCopy.length] = element)

    console.assert(characters[0] === 'a', 'characters[0] is a')
    console.assert(characters[1] === 'b', 'characters[1] is b')
    console.assert(characters[2] === 'c', 'characters[2] is c')
    console.assert(characters.length == 3, 'characters length is 3')

    console.assert(charactersCopy[0] === 'a', 'charactersCopy[0] is a')
    console.assert(charactersCopy[1] === 'b', 'charactersCopy[1] is b')
    console.assert(charactersCopy[2] === 'c', 'charactersCopy[2] is c')
    console.assert(charactersCopy.length == 3, 'characters length is 3')
}

console.info('CASE iterate using each element and index agrument')

{
    const characters = ['a', 'b', 'c']
    const charactersCopy = []

    characters.forEach((element, index) => charactersCopy[index] = element)

    console.assert(characters[0] === 'a', 'characters[0] is a')
    console.assert(characters[1] === 'b', 'characters[1] is b')
    console.assert(characters[2] === 'c', 'characters[2] is c')
    console.assert(characters.length == 3, 'characters length is 3')

    console.assert(charactersCopy[0] === 'a', 'charactersCopy[0] is a')
    console.assert(charactersCopy[1] === 'b', 'charactersCopy[1] is b')
    console.assert(charactersCopy[2] === 'c', 'charactersCopy[2] is c')
    console.assert(charactersCopy.length === 3, 'charactersCopy length is 3')
}

console.info('CASE iterate using each index and array argument')

{
    const characters = ['a', 'b', 'c']
    const charactersCopy = []

    characters.forEach((element, index, characters) => {
        let text = ''

        for (let i = index; i < characters.length; i++)
            text += characters[i]

        charactersCopy[index] = text
    })

    console.assert(characters[0] === 'a', 'characters[0] is a')
    console.assert(characters[1] === 'b', 'characters[1] is b')
    console.assert(characters[2] === 'c', 'characters[2] is c')
    console.assert(characters.length == 3, 'characters length is 3')

    console.assert(charactersCopy[0] === 'abc', 'charactersCopy[0] is abc')
    console.assert(charactersCopy[1] === 'bc', 'charactersCopy[1] is bc')
    console.assert(charactersCopy[2] === 'c', 'charactersCopy[2] is c')
    console.assert(charactersCopy.length === 3, 'charactersCopy length is 3')
}

console.info('CASE iterate using a conext argument')

{
    const characters = ['a', 'b', 'c']
    const mappedCharacters = {}

    characters.forEach(function (element) {
        this[element] = element.toUpperCase()
    }, mappedCharacters)

    console.assert(characters[0] === 'a', 'characters[0] is a')
    console.assert(characters[1] === 'b', 'characters[1] is b')
    console.assert(characters[2] === 'c', 'characters[2] is c')
    console.assert(characters.length == 3, 'characters length is 3')

    console.assert(mappedCharacters['a'] === 'A', 'mappedCharacters[a] is A')
    console.assert(mappedCharacters['b'] === 'B', 'mappedCharacters[b] is B')
    console.assert(mappedCharacters['c'] === 'C', 'mappedCharacters[c] is C')
    const mappedCharactersKeys = Object.keys(mappedCharacters)
    console.assert(mappedCharactersKeys.length === 3, 'mappedCharactersKeys length is 3')
}