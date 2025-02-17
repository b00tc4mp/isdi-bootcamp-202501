const testRay = [7, 2]
// --- 1 ARG -> CALLBACK
//repite la accion por el length - 1// si solo hay un argumento devuelve ese numero
const test = testRay.reduce(index => index * 2)

console.log(test)
// Expected output: 

const array1 = [7, 2, 3, 4]
// --- 2 ARG -> CALLBACK + INITIAL VALUE -> EL ACCUMULATOR SIEMPRE VA A SER 0
//ACCUMULATOR SIEMPRE VA A SER 0 Y EL CURRENT VALUE ES TU INDICE 0
const initialValue = 2
const sumWithInitial = array1.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
)

console.log(sumWithInitial)
// Expected output: 18
