// El método push() añade uno o más elementos al final de un array y devuelve la nueva longitud del array

delete Array.prototype.push
// El Push coge el Elemento "4" y lo añade añl final del Length del Array "Numbers"
Array.prototype.push = function (element) {
    this[this.length] = element
    // this = [1, 2, 3]  // element = 4
    return this.length
}  // return = [1, 2, 3, 4]


const numbers = [1, 2, 3]
// Variable con un Array de numeros

const result = numbers.push(4)
// Variable con el numero que queremos añadir al final

console.log(numbers)
// [1, 2, 3, 4]
console.log(result)
// 4
