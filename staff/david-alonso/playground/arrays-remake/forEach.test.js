require('./forEach.js')

console.info('TEST forEach')


console.info('CASE iterate using each element argument')
// Iterar usando cada argumento del elemento

{
    const characters = ['a', 'b', 'c']
    const charactersCopy = []
    // Guardamos los elementos en un nuevo array con el mismo orden
    characters.forEach(character => charactersCopy[charactersCopy.length] = character)

    console.assert(characters[0] === 'a', 'characters[0] is a')
    console.assert(characters[1] === 'b', 'characters[1] is b')
    console.assert(characters[2] === 'c', 'characters[2] is c')
    console.assert(characters.length === 3, 'characters.length is 3')

    console.assert(charactersCopy[0] === 'a', 'charactersCopy[0] is a')
    console.assert(charactersCopy[1] === 'b', 'charactersCopy[1] is b')
    console.assert(charactersCopy[2] === 'c', 'charactersCopy[2] is c')
    console.assert(charactersCopy.length === 3, 'charactersCopy.length is 3')
}

console.info('CASE iterate using each element and index argument')
// Iterar usando cada elemento y argumento de índice

{
    const characters = ['a', 'b', 'c']
    const charactersCopy = []
    // Guardamos los elementos en un nuevo array con el mismo orden, usando los indices
    characters.forEach((character, index) => charactersCopy[index] = character)

    console.assert(characters[0] === 'a', 'characters[0] is a')
    console.assert(characters[1] === 'b', 'characters[1] is b')
    console.assert(characters[2] === 'c', 'characters[2] is c')
    console.assert(characters.length === 3, 'characters.length is 3')

    console.assert(charactersCopy[0] === 'a', 'charactersCopy[0] is a')
    console.assert(charactersCopy[1] === 'b', 'charactersCopy[1] is b')
    console.assert(charactersCopy[2] === 'c', 'charactersCopy[2] is c')
    console.assert(charactersCopy.length === 3, 'charactersCopy.length is 3')
}

console.info('CASE iterate using each index and array argument')
// Iterar usando cada índice y argumento de matriz

{
    const characters = ['a', 'b', 'c']
    const charactersCopy = []
    // Iteramos concatenado las letras que hay en el array en cada paso
    characters.forEach((character, index, characters) => {
        let text = ''

        for (let i = index; i < characters.length; i++)
            text += characters[i]

        charactersCopy[index] = text
    })

    console.assert(characters[0] === 'a', 'characters[0] is a')
    console.assert(characters[1] === 'b', 'characters[1] is b')
    console.assert(characters[2] === 'c', 'characters[2] is c')
    console.assert(characters.length === 3, 'characters.length is 3')

    console.assert(charactersCopy[0] === 'abc', 'charactersCopy[0] is abc')
    console.assert(charactersCopy[1] === 'bc', 'charactersCopy[1] is bc')
    console.assert(charactersCopy[2] === 'c', 'charactersCopy[2] is c')
    console.assert(charactersCopy.length === 3, 'charactersCopy.length is 3')
}

console.info('CASE iterate using a context argument')
// Iterar usando un argumento de contexto

{
    const characters = ['a', 'b', 'c']
    const mappedCharacters = []

    // Combertimos a mayusculas
    characters.forEach(function (character) {
        this[character] = character.toUpperCase()
    }, mappedCharacters)

    console.assert(characters[0] === 'a', 'characters[0] is a')
    console.assert(characters[1] === 'b', 'characters[1] is b')
    console.assert(characters[2] === 'c', 'characters[2] is c')
    console.assert(characters.length === 3, 'characters.length is 3')

    console.assert(mappedCharacters['a'] === 'A', 'mappedCharacters[a] is A')
    console.assert(mappedCharacters['b'] === 'B', 'mappedCharacters[b] is B')
    console.assert(mappedCharacters['c'] === 'C', 'mappedCharacters[c] is C')
    const mappedCharactersKeys = Object.keys(mappedCharacters)
    console.assert(mappedCharactersKeys.length === 3, 'mappedCharacters.length is 3')
}