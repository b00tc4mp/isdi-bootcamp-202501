/*
* Array.prototype.push()

* Sintaxis
  arr.push(element1, ..., elementN)

* Parámetros: 
  elementN
    Los elementos que se añadirán al final del array.

* Valor devuelto:

    Un entero que representa la nueva longitud de la matriz a la que se le añadieron los nuevos elementos.

* Descripción:

    El método push() añade uno o más elementos al final de un array y devuelve la nueva longitud del array.

* push es genérico intencionadamente. Este método puede ser call() o apply() a objetos que representen arrays. El método push depende de la propiedad length para decidir donde empezar a insertar los valores dados. Si el valor de la propiedad length no puede ser convertido en numérico, el índice 0 es usado. Esto permite la posibilidad de que la propiedad length sea inexistente, y en este caso length será creado.

* Tambien tengo la posibilidade de unir dos arrays con el metodo push, por ejemplo: con el apply() puedo unir dos arrays, el primer array es el que quiero modificar y el segundo array es el que quiero unir al primero.--> array1.push.apply(array1, array2); 


 */

var sports = ["soccer", "baseball"];
var moreSports = ["rugby", "tennis"];
var total = sports.push("football", "swimming");
var allSports = sports.push.apply(sports, moreSports);

console.info(sports); // ['soccer', 'baseball', 'football', 'swimming']
console.log(`----------------------------------------`);
console.info(total); // 4
console.log(`----------------------------------------`);
console.info(allSports); // 6
console.log(`----------------------------------------`);
console.info(sports); // ['soccer', 'baseball', 'football', 'swimming', 'rugby', 'tennis']
