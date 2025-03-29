require('./map.js')

console.info('TEST map')

console.info('CASE create new array multiplying by two')

{
    const numeros = [1, 2, 3, 4]

    const newArray = numeros.map(num => num * 2)  //!!

    console.assert(numeros[0] === 1, 'numeros[0] is 1')
    console.assert(numeros[1] === 2, 'numeros[1] is 2')
    console.assert(numeros[2] === 3, 'numeros[2] is 3')
    console.assert(numeros[3] === 4, 'numeros[3] is 4')
    console.assert(numeros.length === 4, 'numeros.length is 4')

    console.assert(newArray[0] === 2, 'newArray[0] is 2')
    console.assert(newArray[1] === 4, 'newArray[1] is 4')
    console.assert(newArray[2] === 6, 'newArray[2] is 6')
    console.assert(newArray[3] === 8, 'newArray[3] is 8')
    console.assert(newArray.length === 4, 'newArray.length is 4')
}

console.info('CASE convert elements to string')

{
    const numeros = [1, 2, 3, 4]

    const numerosToString = numeros.map(num => num.toString())  //!!

    console.assert(numeros[0] === 1, 'numeros[0] is 1')
    console.assert(numeros[1] === 2, 'numeros[1] is 2')
    console.assert(numeros[2] === 3, 'numeros[2] is 3')
    console.assert(numeros[3] === 4, 'numeros[3] is 4')
    console.assert(numeros.length === 4, 'numeros.length is 4')

    console.assert(numerosToString[0] === "1", 'numerosToString[0] is "2"')
    console.assert(numerosToString[1] === "2", 'numerosToString[1] is "4"')
    console.assert(numerosToString[2] === "3", 'numerosToString[2] is "6"')
    console.assert(numerosToString[3] === "4", 'numerosToString[3] is "8"')
    console.assert(numerosToString.length === 4, 'numerosToString.length is 4')
}













