/**
 * El método forEach es una herramienta fundamental en JavaScript que nos permite iterar sobre los elementos de un array de manera elegante y funcional.
 
 * Sintaxis Básica
    La sintaxis básica de forEach es la siguiente:
    array.forEach(callback);
    Donde el callback puede tener hasta tres parámetros:
    array.forEach(function(elemento, indice, arrayOriginal) {
    // código a ejecutar
});

    El propósito principal de forEach es ejecutar una operación sobre cada elemento del array sin crear nada nuevo
    forEach no devuelve nada, es decir, no modifica el array original ni crea uno nuevo, simplemente itera sobre cada elemento del array y ejecuta la función callback que le pasamos como argumento.
    La función callback que le pasamos a forEach puede recibir hasta tres parámetros:
    1-El elemento actual del array.
    2-El índice del elemento actual.
    3-El array original.


    No hay retorno: forEach siempre retorna undefined y no puede ser encadenado con otros métodos de array.
    Mutabilidad: Puede modificar el array original directamente, como vimos en el ejemplo con los usuarios.
    Secuencia garantizada: Itera los elementos en orden secuencial.
 */

// Ejemplo de uso del método forEach
// Array de ejemplo
const frutas = ['manzana', 'banana', 'naranja'];

// Ejemplo completo con todos los parámetros
frutas.forEach((fruta, indice, array) => {
    console.log(`
        Fruta actual: ${fruta}
        Índice: ${indice}
        Array completo: ${array}
    `);
});

// Ejemplo simple con solo el elemento
console.log('\n--- Solo elementos ---');
frutas.forEach(fruta => {
    console.log(`Fruta: ${fruta}`);
});


// Ejemplo de uso del método forEach
// Ejemplo 1: Modificación de elementos externos
const numeros = [1, 2, 3];
let suma = 0;

numeros.forEach(numero => {
    suma += numero;
});
console.log('Suma total:', suma);

// Ejemplo 2: Manipulación de objetos
const usuarios = [
    {nombre: 'Ana', edad: 25},
    {nombre: 'Carlos', edad: 30}
];

usuarios.forEach(usuario => {
    usuario.edad++;
});

console.log('Usuarios modificados:', usuarios);