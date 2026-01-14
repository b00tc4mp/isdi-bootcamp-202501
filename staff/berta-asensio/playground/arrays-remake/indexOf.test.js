// indexOf por dentro:

/*
-Le pasamos a la función los parámetros establecidos y expecificamos que indice es 0.
-Si el indice es menor que 0: empezamos a contar por la derecha y al llegar a 0 seguimos en orden normal
(por lo que si indice = -5 y la longitud del array es de 4: 4 - 5 = -1)
-Si el indice es mayor o igual que la longitud del array: devolvemos -1 ya  que no se encontrará el elemento.
-For: iteramos sobre el array, otorgandole a i el valor de indice establecido.
    -si el valor del elemento del array en la posición en la que estamos coincide con el elemento
    que estamos buscando, devolvemos i (el indice)
    -si no, devolvemos -1.

*/
delete Array.prototype.indexOf

Array.prototype.indexOf = function(elemento, indice = 0) {

    if (indice < 0) {
        indice = this.length + indice
    }
    if (indice >= this.length) {
        return -1
    }

    for (let i = indice; i < this.length; i ++) {
        if (this[i] === elemento ) {
            return i
        }
    }
    return -1
} 

const frutas = ['manzana', 'platano', 'uvas', 'melon']

console.log(frutas.indexOf('platano'))  // 1

console.log(frutas.indexOf('sandia')) // -1

console.log(frutas.indexOf('melon', 2)) // 3

console.log(frutas.indexOf('manzana', 2))  // -1

console.log(frutas.indexOf('manzana', -10)) // 0


