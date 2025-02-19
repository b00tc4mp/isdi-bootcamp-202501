require('./splice')

console.info('TEST SPLICE')

//RETURN VALUE -> NEW ARRAY (MUTATED) W/DELETED ELEMENTS
//MUTES ORIGINAL ARRAYS

console.info('CASE splice w/ INDEXFROM')

{
    const animals = ['tiger', 'giraffe', 'bee', 'rhino', 'monkey']

    const animals2 = animals.splice(2)

    console.assert(animals[0] === 'tiger', 'animals[0] is tiger')
    console.assert(animals[1] === 'giraffe', 'animals[1] is giraffe')
    console.assert(animals[2] === 'bee', 'animals[2] is bea')
    console.assert(animals.length === 3, 'animals.length is 3')

    const animalsKeys = Object.keys(animals)
    console.assert(animalsKeys.length === 3, 'animalsKeys.length is 3')

    console.assert(animals2[0] === 'bee', 'animals[0] is bea')
    console.assert(animals2.length === 1, 'animals2.length is 1')

    const animalsKeys2 = Object.keys(animals2)
    console.assert(animalsKeys2.length === 1, 'animalsKeys2.length is 1')

}