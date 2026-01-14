require('./slice.js')

console.info('TEST SLICE')

//RETURN VALUE -> NEW ARRAY 

console.info('CASE slice w/START INDEX POSITIVE')

{
    const animals = ['tiger', 'giraffe', 'bea']

    const animals2 = animals.slice(2)

    console.assert(animals[0] === 'tiger', 'animals[0] is tiger')
    console.assert(animals[1] === 'giraffe', 'animals[1] is giraffe')
    console.assert(animals[2] === 'bea', 'animals[2] is bea')
    console.assert(animals.length === 3, 'animals.length is 3')

    const animalsKeys = Object.keys(animals)
    console.assert(animalsKeys.length === 3, 'animalsKeys.length is 3')

    console.assert(animals2[0] === 'bea', 'animals[0] is bea')
    console.assert(animals2.length === 1, 'animals2.length is 1')

    const animalsKeys2 = Object.keys(animals2)
    console.assert(animalsKeys2.length === 1, 'animalsKeys2.length is 1')

}

console.info('CASE slice w/START INDEX NEGATIVE')

{
    const animals = ['tiger', 'giraffe', 'bea']

    const animals2 = animals.slice(-2)

    console.assert(animals[0] === 'tiger', 'animals[0] is tiger')
    console.assert(animals[1] === 'giraffe', 'animals[1] is giraffe')
    console.assert(animals[2] === 'bea', 'animals[2] is bea')
    console.assert(animals.length === 3, 'animals.length is 3')

    const animalsKeys = Object.keys(animals)
    console.assert(animalsKeys.length === 3, 'animalsKeys.length is 3')

    console.assert(animals2[0] === 'giraffe', 'animals[0] is bea')
    console.assert(animals2[1] === 'bea', 'animals[1] is giraffe')
    console.assert(animals2.length === 2, 'animals2.length is 2')

    const animalsKeys2 = Object.keys(animals2)
    console.assert(animalsKeys2.length === 2, 'animalsKeys2.length is 2')

}

console.info('CASE slice w/START INDEX && END INDEX // BOTH POSITIVE ')

{
    const animals = ['tiger', 'giraffe', 'bea', 'camel', 'duck']

    const animals2 = animals.slice(2, 4)

    //--- ORIGINAL ARRAY --- 
    console.assert(animals[0] === 'tiger', 'animals[0] is tiger')
    console.assert(animals[1] === 'giraffe', 'animals[1] is giraffe')
    console.assert(animals[2] === 'bea', 'animals[2] is bea')
    console.assert(animals[3] === 'camel', 'animals[3] is camel')
    console.assert(animals[4] === 'duck', 'animals[4] is duck')
    console.assert(animals.length === 5, 'animals.length is 5')

    const animalsKeys = Object.keys(animals)
    console.assert(animalsKeys.length === 5, 'animalsKeys.length is 5')

    // --- RETURNED ARRAY --- 
    console.assert(animals2[0] === 'bea', 'animals[0] is bea')
    console.assert(animals2[1] === 'camel', 'animals[1] is camel')
    console.assert(animals2.length === 2, 'animals2.length is 2')

    const animalsKeys2 = Object.keys(animals2)
    console.assert(animalsKeys2.length === 2, 'animalsKeys2.length is 2')

}

console.info('CASE slice w/START INDEX && END INDEX // START INDEX NEGATIVE ')

{
    const animals = ['tiger', 'giraffe', 'bea', 'camel', 'duck']

    const animals2 = animals.slice(-4, 4)

    //--- ORIGINAL ARRAY --- 
    console.assert(animals[0] === 'tiger', 'animals[0] is tiger')
    console.assert(animals[1] === 'giraffe', 'animals[1] is giraffe')
    console.assert(animals[2] === 'bea', 'animals[2] is bea')
    console.assert(animals[3] === 'camel', 'animals[3] is camel')
    console.assert(animals[4] === 'duck', 'animals[4] is duck')
    console.assert(animals.length === 5, 'animals.length is 5')

    const animalsKeys = Object.keys(animals)
    console.assert(animalsKeys.length === 5, 'animalsKeys.length is 5')

    // --- RETURNED ARRAY --- 
    console.assert(animals2[0] === 'giraffe', 'animals[0] is giraffe')
    console.assert(animals2[1] === 'bea', 'animals[1] is bea')
    console.assert(animals2[2] === 'camel', 'animals[2] is camel')
    console.assert(animals2.length === 3, 'animals2.length is 3')

    const animalsKeys2 = Object.keys(animals2)
    console.assert(animalsKeys2.length === 3, 'animalsKeys2.length is 3')
}

console.info('CASE slice w/START INDEX && END INDEX // END INDEX NEGATIVE ')

{
    const animals = ['tiger', 'giraffe', 'bea', 'camel', 'duck']

    const animals2 = animals.slice(2, -2)

    //--- ORIGINAL ARRAY --- 
    console.assert(animals[0] === 'tiger', 'animals[0] is tiger')
    console.assert(animals[1] === 'giraffe', 'animals[1] is giraffe')
    console.assert(animals[2] === 'bea', 'animals[2] is bea')
    console.assert(animals[3] === 'camel', 'animals[3] is camel')
    console.assert(animals[4] === 'duck', 'animals[4] is duck')
    console.assert(animals.length === 5, 'animals.length is 5')

    const animalsKeys = Object.keys(animals)
    console.assert(animalsKeys.length === 5, 'animalsKeys.length is 5')

    // --- RETURNED ARRAY --- 
    console.assert(animals2[0] === 'bea', 'animals[0] is bea')
    console.assert(animals2.length === 1, 'animals2.length is 1')

    const animalsKeys2 = Object.keys(animals2)
    console.assert(animalsKeys2.length === 1, 'animalsKeys2.length is 1')
}

console.info('CASE slice w/START INDEX && END INDEX // BOTH NEGATIVE ')

{
    const animals = ['tiger', 'giraffe', 'bea', 'camel', 'duck']

    const animals2 = animals.slice(-4, -1)

    //--- ORIGINAL ARRAY --- 
    console.assert(animals[0] === 'tiger', 'animals[0] is tiger')
    console.assert(animals[1] === 'giraffe', 'animals[1] is giraffe')
    console.assert(animals[2] === 'bea', 'animals[2] is bea')
    console.assert(animals[3] === 'camel', 'animals[3] is camel')
    console.assert(animals[4] === 'duck', 'animals[4] is duck')
    console.assert(animals.length === 5, 'animals.length is 5')

    const animalsKeys = Object.keys(animals)
    console.assert(animalsKeys.length === 5, 'animalsKeys.length is 5')

    // --- RETURNED ARRAY --- 
    console.assert(animals2[0] === 'giraffe', 'animals[0] is bea')
    console.assert(animals2[1] === 'bea', 'animals[1] is bea')
    console.assert(animals2[2] === 'camel', 'animals[2] is bea')
    console.assert(animals2.length === 3, 'animals2.length is 3')

    const animalsKeys2 = Object.keys(animals2)
    console.assert(animalsKeys2.length === 3, 'animalsKeys2.length is 3')
}