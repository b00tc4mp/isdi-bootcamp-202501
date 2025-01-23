# JS Cheet Sheet 
![JS LOGO](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSru2RctJoD4Y1IK5jATBO4yB3bpYsXPWp4jw&s)

## Anotaciones 
* Si quiero que un dato de una funcion tenga un dato vacio uso null.
* Hoisting --> El hoisting es la capacidad de usar una variable o función antes de que sea declarada en el código fuente. Es como si JavaScript moviera las declaraciones al inicio del ámbito actual... esto funciona con funciones declaradas y con var  
* Metodos Reduce, Map, Filter, Every
* Bucles For, While, Do while
* Condicionales 
* Como trabaja JS en tipos de memoria 
* entender la logica de la declracion de +=
* console.dir("un objeto")--> permite ver el objeto en formato arbol 

## Tipos de Datos

* Undefined
* Null
* Boolean
* String
* Symbol
* Bigint
* Number
* Object

## Tipos de datos primitivos
Todo lo que no es un objeto es primitivo 
* Undefined:
Representa un valor desconocido o una variable no inicializada.
Únicamente hay un valor de este tipo: undefined.
* Null:
Tiene exactamente un valor: null.
Usado para representar el valor nulo o ausente.
* Boolean:
Puede tener dos valores: true(1) o false(0).
* Number:
 Incluye tanto números enteros como números de punto flotante.
También incluye valores especiales como Infinity y -Infinity.
* String:
Representa cadenas de caracteres.
Las cadenas en JavaScript son inmutables.
* Symbol:
Es un valor primitivo único e inmutable.
Se utiliza principalmente como claves de propiedades de objetos.
* BigInt:
Un tipo numérico introducido en ECMAScript 2020.
Permite representar números enteros con precisión arbitraria.
## Tipos de datos no primitivos
* Object:
Una colección de propiedades clave-valor.
Incluye objetos literales y objetos creados con el constructor Object.
* Array:
Un objeto especial que representa una lista ordenada de valores.
Hereda de Object.prototype.
* Function:
Representa una función JavaScript.
También es un objeto, pero con algunas características adicionales.
* Date:
Representa una fecha y hora específica.
* RegExp:
Representa un patrón de búsqueda regular.
* Map y Set:
Colecciones con claves arbitrarias (Map) o únicas (Set).
Introducidos en ECMAScript 2015.
* WeakMap y WeakSet: 
Similar a Map y Set, pero las claves son objetos débiles.
También introducidos en ECMAScript 2015.

## Formas de Acceder a un Array 

* Acceso directo mediante índices:

```sh
const arr = ['a', 'b', 'c'];
console.log(arr[0]); // 'a'
```

* Método forEach():

```sh
const arr = ['a', 'b', 'c'];
arr.forEach(item => console.log(item));
```

* Iteración con bucle for...of:

```sh
const arr = ['a', 'b', 'c'];
for (const item of arr) {
  console.log(item);
}

```

* Iteracion con bucle for 

```sh
const arr = ['a', 'b', 'c'];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}


```

## Formas de acceder a objetos 

* Acceso directo mediante nombres de propiedades:

```sh
const persona = {
  nombre: "Juan",
  edad: 30,
  ciudad: "Madrid"
};

console.log(persona.nombre); // "Juan"
```


* Uso de la sintaxis de corchetes con claves dinámicas:


```sh
const persona = {
  nombre: "Juan",
  edad: 30,
  ciudad: "Madrid"
};

console.log(persona["nombre"]); // "Juan"

```
* Iteración sobre las propiedades del objeto:



```sh
const persona = {
  nombre: "Juan",
  edad: 30,
  ciudad: "Madrid"
};

for (let propiedad in persona) {
  console.log(`${propiedad}: ${persona[propiedad]}`);
}


```
* Uso del método Object.keys():

```sh
const persona = {
  nombre: "Juan",
  edad: 30,
  ciudad: "Madrid"
};

console.log(Object.keys(persona)); // ["nombre", "edad", "ciudad"]
```
* Acceso a propiedades anidadas:

```sh
const persona = {
  nombre: "Juan",
  detalles: {
    edad: 30,
    ciudad: "Madrid"
  }
};

console.log(persona.detalles.edad); // 30

```

* Uso del método Object.values():

```sh
const persona = {
  nombre: "Juan",
  edad: 30,
  ciudad: "Madrid"
};

console.log(Object.values(persona)); // ["Juan", 30, "Madrid"]

```
## Como acceder y crear una prop en un objeto que sucede por detras de JS 
```sh
var o= {}
o.name='santiago'
o['name']='santiago'
console.dir(o)

```
# Tipos de memoria donde se alojan las variables 
## Memoria Stack
* anotacion de clase:
Las variables se guardan aqui 

La memoria stack en JavaScript se utiliza principalmente para almacenar:
* Variables primitivas como números, strings, booleanos, etc.
* Contextos de ejecución de funciones locales
* Parámetros de funciones
* Almacena datos de tamaño fijo conocido en tiempo de compilación.
* Es más rápida de acceso que la memoria heap.
* Sigue el orden LIFO (último en entrar, primero en salir).
* Tiene un tamaño limitado por el navegador o sistema operativo.
## Memoria Heap
La memoria heap se utiliza para almacenar:
* Variables no primitivas como objetos y arrays
* Funciones
* Datos dinámicos de tamaño variable
* Permite asignación de memoria dinámica durante la ejecución del programa.
Es más lenta que la pila pero ofrece mayor flexibilidad.
* Tiene un tamaño prácticamente ilimitado.
## Diferencias clave
* La stack almacena datos primitivos y referencia a objetos en la heap.
* Los objetos reales se almacenan en la heap, pero las referencias se guardan en la stack.
* La stack tiene un tamaño limitado, mientras que la heap es virtualmente ilimitada.
## Uso recomendado
* Para variables temporales pequeñas: Pila
* Para objetos grandes o persistentes: Montón

## Tabla
### Stack
| NAME | VALUE   |
|-------|--------------|
|A      |3             |
|B      | 5            |
|C      | 7            |
|D      |0x001         |
|E      |0x002         |
|F      |0x002         |

### Heap
| NAME  | VALUE |  
|-------|--------------------|
|0x001  |Object{}            |
|0x001  |Array[]             |
|0x001  |                    |