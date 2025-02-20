// map

/*
-El método map permite crear un nuevo array aplicando una función de transformación a cada elemento de éste.
-No modifica el array original, sino que crea uno de nuevo con las condiciones que yo le especifico en una función.
-Sintaxis:
    let newArray = array.map(function callback(elemento, indice, array)) {
        return de newArray
    }

    -function se aplicará a cada elemento del array.
    -elemento actual que se procesa del array.
    -indice (opcional) actual.
    -array (opcional): el array original sobre el que se llama map.
*/

//Ejemplo: duplicar valores de un array:

const numeros = [1, 2, 3, 4]

const numDuplicados = numeros.map(num => num*2)
 
console.log(numDuplicados) // [1, 4, 6, 8]
 
//Ejemplo: extraer valores especificos en objetos:

const users = [
    { nombre: 'Juan', edad: 25},
    { nombre: 'Valeria', edad: 28},
    { nombre: 'Marc', edad: 22},
    { nombre: 'Julia', edad: 30},
]

const nombres = users.map(users => users.nombre)

console.log(nombres) // ['Juan', 'Valeria', 'Marc', 'Julia']


