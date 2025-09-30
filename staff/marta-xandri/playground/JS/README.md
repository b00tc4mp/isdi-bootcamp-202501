# Declarar variables
var =1
Var s=
definir valores primitivos:

true se define con valor númerico de 1
false 0

## var

## let
let (valor que puede cambiar) 
let mensaje = "Hola, mundo!";
console.log(mensaje); 
// Salida: Hola, mundo!

## const
const (valor que no cambia)
const saludo = "Hola, mundo!";
console.log(saludo); 
// Salida: Hola, mundo!


# Tipos de datos básicos
let numero = 5;
console.log(numero); 
// Salida: 5

let texto = "Hola, mundo!";
console.log(texto); 
// Salida: Hola, mundo!

let esVerdad = true;
console.log(esVerdad); 
// Salida: true

let esFalso = false;
console.log(esFalso); 
// Salida: false

let miVariable;
console.log(miVariable); 
// Salida: undefined

let variable = null;
console.log(variable); 
// Salida: null

# Operadores aritméticos
## aritméticos (+, -, *, /, %)
let a = 5;
let b = 3;
let suma = a + b;
console.log(suma); 
// Salida: 8

let a = 10;
let b = 3;
let resta = a - b;
console.log(resta); 
// Salida: 7

let a = 5;
let b = 3;
let multiplicacion = a * b;
console.log(multiplicacion); 
// Salida: 15

let a = 10;
let b = 2;
let division = a / b;
console.log(division); 
// Salida: 5

let a = 10;
let b = 3;
let residuo = a % b;
console.log(residuo); 
// Salida: 1 (10 dividido entre 3 da 3 con residuo 1)





























heap= memoria más amplia y menos esturcturada, almacena datos dinámicos y objetos. mayor capacidad, mas lento que el stack objetos y funciones 
const persona = { 
  nombre: "Juan", // Se almacena en el heap
  edad: 30        // También en el heap
};

const otraPersona = persona; // Referencia al mismo objeto en el heap



stack= memoria limitada, tamaño fijo, no sirve para almacenar grandes cantidades de datos. alamacena números, cadenas y valores booleanos 

alamacena números, cadenas y valores booleanos 
function sumar(a, b) {
  return a + b;
}

function calcular() {
  const x = 10; // Se guarda en el stack
  const y = 20; // Se guarda en el stack
  return sumar(x, y); // Llamada a función: se agrega al stack
}

calcular(); // La ejecución y los datos se manejan en el stack