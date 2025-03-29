//   push

/*
El método push() añade uno o más elementos al final de un array y devuelve la nueva longitud del array.
Éste método depende de la propiedad length para decidir donde agregar los nuevos valores.
PUSH modifica el arreglo original.
*/

//Ejemplo básico:

let frutas = ['manzana', 'pera', 'plátano']

let newLength = frutas.push('naranja')

console.log(frutas) // ['manzana', 'pera', 'plátano', 'naranja]

console.log(newLength) // 4

/*Sintaxis: 

array.push(elemento1, elemento2, ..., elementoN);

*/