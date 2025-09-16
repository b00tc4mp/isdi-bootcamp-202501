/*
-El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
-Tiene un propósito específico: crear un nuevo array que contiene solo los elementos que cumplen una condición determinada

-Sintaxis:
    let newArray = arr.filter(callback(element[, index[, array]])[, thisArg])


-Parametros:
    callback--> Función que comprueba cada elemento del array para ver si cumple la condición (también llamada predicado). Retorna true si el elemento la cumple o en caso contrario retornará false. Acepta tres parámetros:
    --> element--> El elemento actual que se está procesando en el array.
    --> index (Opcional)--> El índice del elemento actual que se está procesando en el array.
    --> array (Opcional)--> El array sobre el cual se llamó filter.
    thisArg (Opcional)--> Objeto a utilizar como this cuando se ejecute la función callback.

-Valor de retorno:
    Un nuevo array con los elementos que cumplen la condición dada. Si no se encuentra ningún elemento, se retornará un array vacío.
*/

// Array de ejemplo
const numeros = [1, 2, 3, 4, 5, 6];

// Ejemplo básico de filter
const numerosPares = numeros.filter((numero) => numero % 2 === 0);
console.log("Números pares:", numerosPares);

// Mostrar que el array original no cambia
console.log("Array original:", numeros);

// Ejemplo de uso de filter con un array de objetos

console.log("==================================================");

// Ejemplo más complejo con objetos
const productos = [
  { nombre: "Laptop", precio: 1500 },
  { nombre: "Mouse", precio: 25 },
  { nombre: "Teclado", precio: 75 },
];

// Filtrar productos por precio
const productosBaratos = productos.filter((producto) => producto.precio < 100);
console.log("\nProductos baratos:", productosBaratos);

// Filtrar y transformar en una operación
const doblesPares = numeros
  .filter((n) => n % 2 === 0) // Primero filtramos los pares
  .map((n) => n * 2); // Luego multiplicamos por 2

console.log("Números pares duplicados:", doblesPares);

// Ejemplo con múltiples condiciones
const usuarios = [
  { nombre: "Ana", edad: 25, activo: true },
  { nombre: "Carlos", edad: 17, activo: false },
  { nombre: "María", edad: 22, activo: true },
];

// Filtrar por múltiples condiciones
const usuariosValidos = usuarios.filter(
  (usuario) =>
    usuario.activo && // Debe estar activo
    usuario.edad >= 18 && // Debe ser mayor de edad
    usuario.nombre.startsWith("M") // Nombre debe comenzar con M
);

console.log("\nUsuarios válidos:", usuariosValidos);
