require('./forEach.js')

console.info('TEST forEach')

console.info('CASE iterate using each element')
{
  const characters = ["a", "b", "c"]

  const charactersCopy = []

  characters.forEach(character => charactersCopy[charactersCopy.length] = character)

  console.assert(characters[0] === 'a', 'characters[0] is a')
  console.assert(characters[1] === 'b', 'characters[1] is b')
  console.assert(characters[2] === 'c', 'characters[0] is c')
  console.assert(characters.length === 3, 'characters.length is 3')

  console.assert(charactersCopy[0] === 'a', 'charactersCopy[0] is a')
  console.assert(charactersCopy[1] === 'b', 'charactersCopy[1] is b')
  console.assert(charactersCopy[2] === 'c', 'charactersCopy[2] is c')
  console.assert(charactersCopy.length === 3, 'charactersCopy.length is 3')
}


console.info('CASE iterate using each element and index')

{
  const characters = ["a", "b", "c"]

  const charactersCopy = []

  characters.forEach((character, index) => charactersCopy[index] = character)

  console.assert(characters[0] === 'a', 'characters[0] is a')
  console.assert(characters[1] === 'b', 'characters[1] is b')
  console.assert(characters[2] === 'c', 'characters[0] is c')
  console.assert(characters.length === 3, 'characters.length is 3')

  console.assert(charactersCopy[0] === 'a', 'charactersCopy[0] is a')
  console.assert(charactersCopy[1] === 'b', 'charactersCopy[1] is b')
  console.assert(charactersCopy[2] === 'c', 'charactersCopy[2] is c')
  console.assert(charactersCopy.length === 3, 'charactersCopy.length is 3')
}


console.info('CASE iterate using each index and array')

{
  const characters = ["a", "b", "c"]

  const charactersCopy = []

  characters.forEach((character, index, characters) => {
      let text = ''

      for(let i = index; i < characters.length; i++)
        text += characters[i]

      charactersCopy[index] = text
  })
  //debemos comprobar que el array original no se modifica ni en los elementos ni en la longitud.
  console.assert(characters[0] === 'a', 'characters[0] is a')
  console.assert(characters[1] === 'b', 'characters[1] is b')
  console.assert(characters[2] === 'c', 'characters[0] is c')
  console.assert(characters.length === 3, 'characters.length is 3')

  console.assert(charactersCopy[0] === 'abc', 'charactersCopy[0] is abc')
  console.assert(charactersCopy[1] === 'bc', 'charactersCopy[1] is bc')
  console.assert(charactersCopy[2] === 'c', 'charactersCopy[2] is c')
  console.assert(charactersCopy.length === 3, 'charactersCopy.length is 3')
}


console.info('CASE iterate using a context argument')

{
  const characters = ["a", "b", "c"]

  const mappedCharacters = {}

  characters.forEach(function(character) {
      this[character] = character.toUpperCase()

  }, mappedCharacters)
  
  console.assert(characters[0] === 'a', 'characters[0] is a')
  console.assert(characters[1] === 'b', 'characters[1] is b')
  console.assert(characters[2] === 'c', 'characters[0] is c')
  console.assert(characters.length === 3, 'characters.length is 3')

  console.assert(mappedCharacters['a'] === 'A', 'mappedCharacters[a] is A')
  console.assert(mappedCharacters['b'] === 'B', 'mappedCharacters[b] is B')
  console.assert(mappedCharacters['c'] === 'C', 'mappedCharacters[c] is C')
  const mappedCharactersKeys = Object.keys(mappedCharacters) // asi comprobamos que no hay más que 3 propiedades en el objeto mappedCharacters
  console.assert(mappedCharactersKeys.length === 3, 'keys.length is 3')
}




