// map por dentro:

/*
-Creamos variable newArray donde almacenaremos el array que crearemos.
-Iteramos sobre el array original
-creamos variable resultado y le pasamos el callback. La función callback
se aplica a cada valor del elemento, recibe el indice y el array original (sus tres parámetros).
-newArray.push(result): Cada resultado que se cree al pasar el callback por cada elemento, 
se almacenará en result y se sumará en el newArray.
-Return: devolverá el newArray.

*/

delete Array.prototype.map

Array.prototype.map = function (callback) {

    const newArray = []

    for (let i = 0; i < this.length; i++) {

        const result = callback(this[i], i, this)
        newArray.push(result)
    }
    return newArray
}

const numeros = [1, 2, 3, 4]

const callback = num => num * num

console.log(numeros.map(callback))