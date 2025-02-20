// implementación MAP

// CASE 1

Array.prototype.map = function (callback) {

    const newArray = []

    for (let i = 0; i < this.length; i++) {

        const result = callback(this[i], i, this)
        newArray.push(result)
    }
    return newArray
}


/*
-Creamos variable newArray donde almacenaremos el array que crearemos.
-Iteramos sobre el array original
-creamos variable resultado y le pasamos el callback. La función callback
se aplica a cada valor del elemento, recibe el indice y el array original (sus tres parámetros).
-newArray.push(result): Cada resultado que se cree al pasar el callback por cada elemento, 
se almacenará en result y se sumará en el newArray.
-Return: devolverá el newArray.

*/