// delete Array.prototype.reduce

// Array.prototype.reduce = function (callback, context) {
// }

console.info('TESTING REDUCE METHOD')

console.info('CASE')

{

}


const resultado = nombres.reduce(function (acumulador, valorActual) {
    return acumulador + valorActual.length;
}, 10);

console.log(resultado);