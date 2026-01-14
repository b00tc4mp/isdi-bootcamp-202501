//   forEach

/*
El método forEach se utiliza para ejecutar una función sobre cada elemento de un arreglo.
Permite iterar sobre cada uno de los elementos sin tener que usar un bucle for.
No devuelve nada.
*/
const characters = ["a", "b", "c"]

characters.forEach((element) => console.log(element))

// Expected output: "a"
// Expected output: "b"
// Expected output: "c" 

//Sintaxis básica: 

array.forEach(function(element, index, array) {
    //escribir código a ejecutar
})

/*
-element: valor del elemento del arreglo que está procesando
-index (opcional): índice del elemento que está procesando
-array(opcional): el propio arreglo sobre el que está iterando
*/

//Ejemplo con índex:

const frutas = ['manzana', 'pera', 'plátano']

frutas.forEach(function(fruta, index) {
    console.log(index + ': ' + fruta)
})

//0: manzana
//1: pera
//2: plátano
