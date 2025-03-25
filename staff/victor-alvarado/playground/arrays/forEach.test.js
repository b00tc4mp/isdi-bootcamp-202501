require('./arrays-remake/forEach.js')

console.info('TEST forEach')

console.info('CASE iterar usando cada elemento')

{
    const characters = ['a', 'b', 'c']
    const charactersCopy = []
    characters.forEach(character => charactersCopy[charactersCopy.length] = character)

  console.assert(characters[0] === 'a', 'characters[0] i a')
  console.assert(characters[1] === 'b', 'characters[1] i b')
  console.assert(characters[2] === 'c', 'characters [2] i c')
  console.assert(characters.length === 3, 'characters.length is 3')

  console.assert(charactersCopy[0] === 'a', 'characters[0] is a')
  console.assert(charactersCopy[1] === 'b', 'characters[1] is b')
  console.assert(charactersCopy[2] === 'c', 'characters[2] is c')
  console.assert(charactersCopy.length === 3, 'charactersCopy.length is 3')


}

console.info('Casse iterar usando elementos e index como argumentos')

{


characters.forEach((character, index) => charactersCopy[index] = character)

console.assert(characters[0] === 'a', 'characters[0] i a')
console.assert(characters[1] === 'b', 'characters[1] i b')
console.assert(characters[2] === 'c', 'characters[2] i c')
console.assert(characters.length === 3, 'characters.length is 3') 

}

console.info('Case itera sobre caracter (letra) index(0) y array')

{
const characters = ['a', 'b', 'c']
const charactersCopy = []
characters.forEach((character, index, characters) => {
   let text = ''

   for (let i = index; i < characters.length; i ++)
    text += characters[i]
   
    charactersCopy[index] = text
})

console.assert(characters[0] === 'a', 'characters[0] i a')
console.assert(characters[1] === 'b', 'characters[1] i b')
console.assert(characters[2] === 'c', 'characters[2] i c')
console.assert(characters.length === 3, 'characters.length is 3')

console.assert(charactersCopy[0] === 'abc', 'charactersCopy is abc')
console.assert(charactersCopy[1] === 'bc', 'charactersCopy[1] is bc')
console.assert(charactersCopy[2] === 'c', 'characterCopy[2] is c')
console.assert(characters.length === 3, 'characters.length is 3')

}

console.info('Case iterausando contexto como argumento')

{
 const characters = ['a', 'b', 'c']
 const mappedCharacters = {}

 characters.forEach(function (chracter) {
  this[character] = chracter.toUpperCase()
 }, mappedCharacters)

 console.assert(characters[0] === 'a', 'characters[0] i a')
 console.assert(characters[1] === 'b', 'characters[1] i b')
 console.assert(characters[2] === 'c', 'characters [2] i c')
 console.assert(characters.length === 3, 'characters.length is 3')
 console.assert(mappedCharacters['a'] === 'A', 'mappedCharacters[a] is A')
    
    console.assert(mappedCharacters['b'] === 'B', 'mappedCharacters[b] is B')
    console.assert(mappedCharacters['c'] === 'C', 'mappedCharacters[c] is C')
    const mappedCharactersKeys = Object.keys(mappedCharacters)
    console.assert(mappedCharactersKeys.length === 3, 'mappedCharactersKeys.length is 3')


}