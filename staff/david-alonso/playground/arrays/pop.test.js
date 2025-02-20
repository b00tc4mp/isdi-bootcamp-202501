// El método pop() elimina el último elemento de un array y lo devuelve. Este método cambia la longitud del array

delete Array.prototype.pop

Array.prototype.pop = function () {
    const result = this[this.length - 1]
    // Cogemos el ultimo elemento del Array
    this.length = this.length - 1
    // Reducimos la longitud del Array en -1
    return result
}   // return = 4

const numbers = [1, 2, 3, 4]
// Variable con un Array de numeros

const result = numbers.pop()
// Metodo para eliminar el ultimo elemento

console.log(numbers)
// [1, 2, 3]  Mustra como queda el Array despues del Pop
console.log(result)
// 4  Muestra el elemento que quita del final del Array

console.log(numbers.pop())
// 3  Muestra el elemento que quita

