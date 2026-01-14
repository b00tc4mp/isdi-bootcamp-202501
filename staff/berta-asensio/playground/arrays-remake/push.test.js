require('./push.js')

console.info('TEST push')

console.info('CASE add one element')

//el método push SÍ que modifica el array original

{
  let frutas = ['manzana', 'pera', 'plátano']

  let newLength = frutas.push('naranja')
  
  console.assert(frutas[0] === 'manzana', 'frutas[0] is manzana')
  console.assert(frutas[1] === 'pera', 'frutas[1] is pera')
  console.assert(frutas[2] === 'plátano', 'frutas[2] is plátano')
  console.assert(frutas[3] === 'naranja', 'frutas[3] is naranja')
  console.assert(frutas.length === 4, 'frutas.length is 4') //aqui comprobamos que el array no me lo modifiquen
  console.assert(newLength === 4, 'newLength is 4')
  const frutasKeys = Object.keys(frutas)
  console.assert(frutasKeys.length === 4), 'frutasKeys.length is 4' // nos super aseguramos que la longitud es 3
}


console.info('CASE add multiple elements')

{
  const frutas = ['manzana', 'pera', 'plátano']

  const newLength = frutas.push('naranja', 'uva', 'mandarina')

  console.assert(frutas[0] === 'manzana', 'frutas[0] is manzana')
  console.assert(frutas[1] === 'pera', 'frutas[1] is pera')
  console.assert(frutas[2] === 'plátano', 'frutas[2] is plátano')
  console.assert(frutas[3] === 'naranja', 'frutas[3] is naranja')
  console.assert(frutas[4] === 'uva', 'frutas[4] is uva')
  console.assert(frutas[5] === 'mandarina', 'frutas[5] is mandarina')



  console.assert(frutas.length === 6, 'frutas.length is 6') //aqui comprobamos que el array no me lo modifiquen
  console.assert(newLength === 6, 'newLength is 6')
  const frutasKeys = Object.keys(frutas)
  console.assert(frutasKeys.length === 6), 'frutasKeys.length is 6' // nos super aseguramos que la longitud es 3
}

console.info('CASE add no elements')

{
  const frutas = ['manzana', 'pera', 'plátano']

  const newLength = frutas.push()

  console.assert(frutas[0] === 'manzana', 'frutas[0] is manzana')
  console.assert(frutas[1] === 'pera', 'frutas[1] is pera')
  console.assert(frutas[2] === 'plátano', 'frutas[2] is plátano')

  console.assert(frutas.length === 3, 'frutas.length is 3') //aqui comprobamos que el array no me lo modifiquen
  console.assert(newLength === 3, 'newLength is 3')
  const frutasKeys = Object.keys(frutas)
  console.assert(frutasKeys.length === 3), 'frutasKeys.length is 3' // nos super aseguramos que la longitud es 3
}