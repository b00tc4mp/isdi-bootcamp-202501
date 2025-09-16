/**
 * Sí, es posible acceder a una propiedad de un objeto usando condicionales. Veamos diferentes formas de hacerlo con ejemplos interactivos:
 */
// Ejemplo 1 : Array con condicional simple
const n = [10, 20, 30];
const value = 25;
n[value > 0 ? 1 : 2] = value;
console.log('Array después de asignación:', n);

// Ejemplo 2: Array con condicional anidado
const numeros = [1, 2, 3];
const condicion = true;
const valor = 10;
numeros[condicion ? (valor > 5 ? 1 : 0) : 2] = valor;
console.log('\nArray con condicional anidado:', numeros);

// Ejemplo 3: Array con condicional más complejo
const edades = [15, 18, 25];
const edad = 22;
const esMayor = edad >= 18;
edades[esMayor ? (edad > 20 ? 2 : 1) : 0] = edad;
console.log('\nArray con condicional complejo:', edades);

// Ejemplo 4: Objeto con condicional simple
const persona = { nombre: 'Juan', edad: 30 };
const esMayorDeEdad = persona.edad >= 18;
persona[esMayorDeEdad ? 'mayor' : 'menor'] = esMayorDeEdad;
console.log('\nObjeto con condicional simple:', persona);

// Ejemplo 5: Objeto con condicional anidado
const persona2 = { nombre: 'Ana', edad: 25 };
const esMayorDeEdad2 = persona2.edad >= 18;
const esMayorDe25 = persona2.edad > 25;
persona2[esMayorDeEdad2 ? (esMayorDe25 ? 'mayorDe25' : 'mayorDe18') : 'menor'] = esMayorDeEdad2;
console.log('\nObjeto con condicional anidado:', persona2);

// Ejemplo 6: Objeto con condicional más complejo
const persona3 = { nombre: 'Pedro', edad: 22 };
const esMayorDeEdad3 = persona3.edad >= 18;
const esMayorDe20 = persona3.edad > 20;
persona3[esMayorDeEdad3 ? (esMayorDe20 ? 'mayorDe20' : 'mayorDe18') : 'menor'] = esMayorDeEdad3;
console.log('\nObjeto con condicional complejo:', persona3);

// Ejemplo 7: Acceder a una propiedad de un objeto con condicional
const persona4 = { nombre: 'María', edad: 25 };
const esMayorDeEdad4 = persona4.edad >= 18;
const propiedad = esMayorDeEdad4 ? 'mayor' : 'menor';
console.log(`\nLa persona es ${persona4[propiedad]}`);

