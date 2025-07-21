require('./unshift.js')

console.info('TEST unshift')

//el método unshift SÍ que modifica el array original

console.info('CASE add elements')

{
    const frutas = ['manzana', 'pera', 'plátano']

    const newLength = frutas.unshift('naranja', 'kiwi')

    console.assert(frutas[0] === 'naranja', 'frutas[0] is naranja')
    console.assert(frutas[1] === 'kiwi', 'frutas[1] is kiwi')
    console.assert(frutas[2] === 'manzana', 'frutas[2] is manzana')
    console.assert(frutas[3] === 'pera', 'frutas[3] is pera')
    console.assert(frutas[4] === 'plátano', 'frutas[4] is plátano')
    console.assert(frutas.length === 5, 'frutas.length is 5') 
    console.assert(newLength === 5, 'newLength is 5')
    const frutasKeys = Object.keys(frutas)
    console.assert(frutasKeys.length === 5), 'frutasKeys.length is 5'
}

console.info('CASE add an array inside an array')

{
    const frutas = ['manzana', 'pera', 'plátano']

    const newLength = frutas.unshift(["kiwi"])

    console.assert(frutas[0] === frutas[0], 'frutas[0] is ["kiwi"]') // PORQUÉ TENGO QUE PONERLO ASI
    console.assert(frutas[1] === 'manzana', 'frutas[1] is manzana')
    console.assert(frutas[2] === 'pera', 'frutas[2] is pera')
    console.assert(frutas[3] === 'plátano', 'frutas[3] is plátano')
    console.assert(frutas.length === 4, 'frutas.length is 4') 
    console.assert(newLength === 4, 'newLength is 4')
    const frutasKeys = Object.keys(frutas)
    console.assert(frutasKeys.length === 4), 'frutasKeys.length is 4'
}
