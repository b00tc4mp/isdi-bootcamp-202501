/*
Creo mi metodo POP a modo de conocimiento interno de su funcionalidad, en este caso remover el ultimo elemento/posicion de un array 
*/

// Extiendo el prototipo de Array para agregar mi propio método pop
Array.prototype.pop = function () {
  // Guardo el último elemento del array en una variable
  // esto serie con palabras simples igual la constante element a this que apunta al array q le paso y a [this.length - 1] esto ultimo me apunta a la longuitud del array menos 1, es decir el ultimo elemento
  const element = this[this.length - 1];
  
  // Reduzco la longitud del array en 1, eliminando el último elemento
  this.length = this.length - 1;
  
  // Devuelvo el elemento que fue eliminado
  return element;
};

// Ejemplo de uso del método pop
const numbers = [1, 2, 3, 4, 5];

// Llamo a mi método pop para eliminar el último elemento del array
numbers.pop();

// Imprimo el array modificado en la consola
console.log(numbers); // Output: [1, 2, 3, 4]