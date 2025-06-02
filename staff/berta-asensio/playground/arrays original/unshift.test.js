//   unshift

/*
El método unshift() agrega uno o más elementos al inicio de un array y devuelva la nueva longitud del array.
UNSHIFT no devuelve un nuevo arreglo sino que modifica el arreglo original.
*/

//Ejemplo básico:

let frutas = ['manzana', 'pera', 'plátano']

let newLength = frutas.unshift('naranja')

console.log(frutas) // ['naranja', 'manzana', 'pera', 'plátano']

console.log(newLength) // 4

/*Sintaxis: 
array.unshift(elemento1, elemento2, ..., elementoN)
*/