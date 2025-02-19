//  join por dentro:

/*
-Le pasamos a la función de join el parámetro del símbolo.
-Definimos separador como una cadena vacía.
-Si no hay símbolo, el separador será una coma.
-Si hay simbolo, el separador será igual al símbolo.
-Bucle for: 
    -Recorremos el array.
    -Si la posición de la i no es igual a la ultima longitud del array, 
    resultado será igual al resultado en cada posición con la suma del separador.
    -Else, cuando sea la ultima posición, el resultado se sumará a la ultima posición.
    -Return el resultado total.

*/

delete Array.prototype.join

Array.prototype.join = function (simbolo) {

    let separador = ''

    if(!simbolo) {
        separador = ','

    } else {
        separador = simbolo
    }

    let resultado = ''

    for (let i = 0; i < this.length; i++) {

        if(i !== this.length - 1) {
            resultado += this[i] + separador

        } else {
            resultado += this[i]
        }
    }
    return resultado
} 



let frutas = ['manzana', 'pera', 'plátano']

console.log(frutas.join(' - '))

console.log(frutas.join())

