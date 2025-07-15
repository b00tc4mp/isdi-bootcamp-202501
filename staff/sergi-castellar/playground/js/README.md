# JAVASCRIPT CHEAT SHEET 
![markdown logo](https://static.vecteezy.com/system/resources/previews/051/336/397/non_2x/javascript-transparent-logo-free-png.png)

---
# MÉTODOS DE ARRAYS PRINCIPALES

## filter
Crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
```
var newArray = arr.filter(callback(currentValue[, index[, array]])[, thisArg])
```
```sh
const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter((word) => word.length > 6);

console.log(result);
→ Expected output: Array ["exuberant", "destruction", "present"]
```

## push
El método push() se utiliza para agregar uno o más elementos al final de un array. Este método modifica el array original y devuelve la nueva longitud del array.
```sh
array.push(elemento1, elemento2, ..., elementoN);
Ejemplo:
```
```sh
let frutas = ['manzana', 'banana'];
let nuevaLongitud = frutas.push('naranja');  // ["manzana", "banana", "naranja"]
console.log(nuevaLongitud);  // 3
```

## pop
Elimina el último elemento de un array y lo devuelve. Este método modifica el array original y reduce su longitud.
```sh
array.pop();
```
```sh
let frutas = ['manzana', 'banana', 'naranja'];
let eliminado = frutas.pop();  // "naranja"
console.log(frutas);  // ["manzana", "banana"]
console.log(eliminado);  // "naranja"
```
## shift
Elimina el primer elemento de un array y lo devuelve. Este método modifica el array original y reduce su longitud.
```sh
array.shift();
```
```sh
let frutas = ['manzana', 'banana', 'naranja'];
let eliminado = frutas.shift();  // "manzana"
console.log(frutas);  // ["banana", "naranja"]
console.log(eliminado);  // "manzana"
```
## unshift
Sirve para agregar uno o más elementos al principio de un array. Este método modifica el array original y devuelve la nueva longitud del array.
```sh
array.unshift(elemento1, elemento2, ..., elementoN);
```
```sh
let frutas = ['banana', 'naranja'];
let nuevaLongitud = frutas.unshift('manzana');  // ["manzana", "banana", "naranja"]
console.log(nuevaLongitud);  // 3
```


