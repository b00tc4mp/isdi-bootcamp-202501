Array.prototype.map = function(){

    // Guardo el array original
    let originalArray = this;

    // Creo un nuevo array para guardar los nuevos valores
    let newArray = [];

    // Recorro el array original
    for(let i = 0; i < originalArray.length; i++){
        // Guardo el valor actual
        let currentValue = originalArray[i];
        // Guardo el indice actual
        let currentIndex = i;
        // Guardo el array original
        let currentArray = originalArray;

        // Llamo a la función callback y guardo el resultado
        let result = callback(currentValue, currentIndex, currentArray);

        // Guardo el resultado en el nuevo array
        newArray[newArray.length] = result;
    }

    // Devuelvo el nuevo array
    return newArray;



}

// Ejemplo de uso del método map
// 1. El array base
const numeros = [1, 2, 3, 4, 5];

// 1. Usando solo el valor (sintaxis más simple)
const dobles = numeros.map(numero => numero * 2);
console.info('Solo valor:', dobles);
console.log('=====================================');
// 2. Usando valor e índice
const conIndices = numeros.map((valor, indice) => {
    console.info(`Procesando ${valor} en posición ${indice}`);
    return valor * indice;
});
console.info('Con índices:', conIndices);
console.log('=====================================');

// 3. Usando todos los parámetros
const conTodo = numeros.map((valor, indice, array) => {
    console.info(`Valor: ${valor}, Índice: ${indice}, Array: [${array}]`);
    return valor + indice;
});
console.info('Con todos los parámetros:', conTodo);
console.log('=====================================');