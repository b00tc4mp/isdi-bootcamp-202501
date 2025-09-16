/**
 * El método map() crea un nuevo array con los resultados de la llamada a la función indicada, aplicados a cada uno de sus elementos.
 * 
 * Sintaxis:
    arr=[]
    var nuevo_array = arr.map(function callback(currentValue, index, array) {
         Elemento devuelto de nuevo_array
    }[, thisArg])

    Parámetros:
    1- callback: Función que producirá un elemento del nuevo array, recibe tres argumentos:
    2- currentValue: El elemento actual que se está procesando en el array.
    3- index (Opcional): El índice del elemento actual que se está procesando en el array.
    4- array (Opcional): El array sobre el cual se llamó map.
    5- thisArg (Opcional): Objeto a usar como this cuando se ejecute callback.

    * Con sintaxis corta (solo recibe el valor)
        const doblesCorto = numeros.map(numero => numero * 2);
        console.log('Con sintaxis corta:', doblesCorto);

    Descripción:
    map() llama a la función callback en cada elemento de un array en orden y construye un nuevo array con los resultados.
    callback es invocada sólo para los índices del array que tienen asignado un valor; no es invocada para índices que han sido eliminados o a los que no se les ha asignado ningún valor.
    callback es invocada con tres argumentos: el valor del elemento, el índice del elemento y el objeto Array que se está recorriendo.
    Si se proporciona un parámetro thisArg a map(), se utilizará como this para cada invocación de callback.
    Si se omite thisArg o se pasa como null o undefined, se utilizará el valor por defecto global asociado al callback.

 */

// Ejemplo de uso del método map
// 1. El array base
const numeros = [1, 2, 3, 4, 5];

// 1. Usando solo el valor (sintaxis más simple)
const dobles = numeros.map(numero => numero * 2);
console.log('Solo valor:', dobles);

// 2. Usando valor e índice
const conIndices = numeros.map((valor, indice) => {
    console.log(`Procesando ${valor} en posición ${indice}`);
    return valor * indice;
});
console.log('Con índices:', conIndices);

// 3. Usando todos los parámetros
const conTodo = numeros.map((valor, indice, array) => {
    console.log(`Valor: ${valor}, Índice: ${indice}, Array: [${array}]`);
    return valor + indice;
});
console.log('Con todos los parámetros:', conTodo);


/**
 * EJEMPLO PRACTICO CON OBJETOS 
 */

// Array de objetos
const productos = [
    { nombre: "Laptop", precio: 1000 },
    { nombre: "Mouse", precio: 20 },
    { nombre: "Teclado", precio: 50 }
];

// Transformando objetos
const nombresYPrecios = productos.map(producto => ({
    nombre: producto.nombre.toUpperCase(),
    precioConIva: producto.precio * 1.21
}));

console.log('Productos transformados:', nombresYPrecios);