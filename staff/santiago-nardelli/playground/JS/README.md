# JS Cheet Sheet

![JS LOGO](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSru2RctJoD4Y1IK5jATBO4yB3bpYsXPWp4jw&s)

## Anotaciones

- Si quiero que un dato de una funcion tenga un dato vacio uso null.
- Hoisting --> El hoisting es la capacidad de usar una variable o función antes de que sea declarada en el código fuente. Es como si JavaScript moviera las declaraciones al inicio del ámbito actual... esto funciona con funciones declaradas y con var
- Metodos Reduce, Map, Filter, Every
- Bucles For, While, Do while
- Condicionales
- Como trabaja JS en tipos de memoria
- entender la logica de la declracion de +=
- console.dir("un objeto")--> permite ver el objeto en formato arbol

## Tipos de Datos

- Undefined
- Null
- Boolean
- String
- Symbol
- Bigint
- Number
- Object

## Tipos de datos primitivos

Todo lo que no es un objeto es primitivo

- Undefined:
  Representa un valor desconocido o una variable no inicializada.
  Únicamente hay un valor de este tipo: undefined.
- Null:
  Tiene exactamente un valor: null.
  Usado para representar el valor nulo o ausente.
- Boolean:
  Puede tener dos valores: true(1) o false(0).
- Number:
  Incluye tanto números enteros como números de punto flotante.
  También incluye valores especiales como Infinity y -Infinity.
- String:
  Representa cadenas de caracteres.
  Las cadenas en JavaScript son inmutables.
- Symbol:
  Es un valor primitivo único e inmutable.
  Se utiliza principalmente como claves de propiedades de objetos.
- BigInt:
  Un tipo numérico introducido en ECMAScript 2020.
  Permite representar números enteros con precisión arbitraria.

## Tipos de datos no primitivos

- Object:
  Una colección de propiedades clave-valor.
  Incluye objetos literales y objetos creados con el constructor Object.
- Array:
  Un objeto especial que representa una lista ordenada de valores.
  Hereda de Object.prototype.
- Function:
  Representa una función JavaScript.
  También es un objeto, pero con algunas características adicionales.
- Date:
  Representa una fecha y hora específica.
- RegExp:
  Representa un patrón de búsqueda regular.
- Map y Set:
  Colecciones con claves arbitrarias (Map) o únicas (Set).
  Introducidos en ECMAScript 2015.
- WeakMap y WeakSet:
  Similar a Map y Set, pero las claves son objetos débiles.
  También introducidos en ECMAScript 2015.

## Formas de Acceder a un Array

- Acceso directo mediante índices:

```sh
const arr = ['a', 'b', 'c'];
console.log(arr[0]); // 'a'
```

- Método forEach():

```sh
const arr = ['a', 'b', 'c'];
arr.forEach(item => console.log(item));
```

- Iteración con bucle for...of:

```sh
const arr = ['a', 'b', 'c'];
for (const item of arr) {
  console.log(item);
}

```

- Iteracion con bucle for

```sh
const arr = ['a', 'b', 'c'];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}


```

## Formas de acceder a objetos

- Acceso directo mediante nombres de propiedades:

```sh
const persona = {
  nombre: "Juan",
  edad: 30,
  ciudad: "Madrid"
};

console.log(persona.nombre); // "Juan"
```

- Uso de la sintaxis de corchetes con claves dinámicas:

```sh
const persona = {
  nombre: "Juan",
  edad: 30,
  ciudad: "Madrid"
};

console.log(persona["nombre"]); // "Juan"

```

- Iteración sobre las propiedades del objeto:

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

- Uso del método Object.keys():

```sh
const persona = {
  nombre: "Juan",
  edad: 30,
  ciudad: "Madrid"
};

console.log(Object.keys(persona)); // ["nombre", "edad", "ciudad"]
```

- Acceso a propiedades anidadas:

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

- Uso del método Object.values():

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

- anotacion de clase:
  Las variables se guardan aqui

La memoria stack en JavaScript se utiliza principalmente para almacenar:

- Variables primitivas como números, strings, booleanos, etc.
- Contextos de ejecución de funciones locales
- Parámetros de funciones
- Almacena datos de tamaño fijo conocido en tiempo de compilación.
- Es más rápida de acceso que la memoria heap.
- Sigue el orden LIFO (último en entrar, primero en salir).
- Tiene un tamaño limitado por el navegador o sistema operativo.

## Memoria Heap

La memoria heap se utiliza para almacenar:

- Variables no primitivas como objetos y arrays
- Funciones
- Datos dinámicos de tamaño variable
- Permite asignación de memoria dinámica durante la ejecución del programa.
  Es más lenta que la pila pero ofrece mayor flexibilidad.
- Tiene un tamaño prácticamente ilimitado.

## Diferencias clave

- La stack almacena datos primitivos y referencia a objetos en la heap.
- Los objetos reales se almacenan en la heap, pero las referencias se guardan en la stack.
- La stack tiene un tamaño limitado, mientras que la heap es virtualmente ilimitada.

## Uso recomendado

- Para variables temporales pequeñas: Pila
- Para objetos grandes o persistentes: Montón

## Tabla

### Stack

| NAME | VALUE |
| ---- | ----- |
| A    | 3     |
| B    | 5     |
| C    | 7     |
| D    | 0x001 |
| E    | 0x002 |
| F    | 0x002 |

### Heap

| NAME  | VALUE    |
| ----- | -------- |
| 0x001 | Object{} |
| 0x001 | Array[]  |
| 0x001 |          |

# Operador AND (&&)

El operador AND se usa para combinar dos condiciones. Sólo será verdadero si ambas condiciones son verdaderas.

- Ejemplo:

```sh
x > 5 && y < 10
```

- Esta condición será verdadera solo si x es mayor que 5 y y es menor que 10.

# Operador OR (||)

- El operador OR se usa para combinar dos condiciones. Sólo será falso si ambas condiciones son falsas.

- Ejemplo:

```sh
x > 5 || y < 10
```

- Esta condición será verdadera si x es mayor que 5 o y es menor que 10 (o ambas cosas).

# Operador NOT (!)

- El operador NOT se usa para invertir una condición. Si una condición es verdadera, NOT la hará falsa, y viceversa.

- Ejemplo:

```sh
!(x == 5)
Esto será verdadero si x no es igual a 5.
```

```sh Puntos importantes a recordar:
Los operadores AND (&&) y OR (||) se usan para combinar condiciones.
NOT (!) se usa para invertir una condición individual.
Los operadores AND y OR tienen un comportamiento de "cortocircuito":
Si el primer operando de AND es falso, no se evalúa el segundo.
Si el primer operando de OR es verdadero, no se evalúa el segundo.
Estos operadores son muy útiles para escribir condiciones complejas en programación.
```

### Ciclos while y do

```sh
Considera un programa que muestra todos los números pares de 0 a 12. Una
forma de escribir esto es la siguiente:
console.log(0);
console.log(2);
console.log(4);
console.log(6);
console.log(8);
console.log(10);
console.log(12);
Eso funciona, pero la idea de escribir un programa es hacer de algo menos
trabajo, no más. Si necesitáramos todos los números pares menores a 1.000,
este enfoque sería poco práctico. Lo que necesitamos es una forma de ejecutar
una pieza de código multiples veces. Esta forma de flujo de control es llamada
un ciclo (o “loop”):

let numero = 0;
while (numero <= 12) {
console.log(numero);
numero = numero + 2;
}
// → 0
// → 2
// … etcetera
```

- La
  palabra while es seguida por una expresión en paréntesis y luego por una
  declaración, muy similar a if. El bucle sigue ingresando a esta declaración
  siempre que la expresión produzca un valor que dé true cuando sea convertida
  a Boolean.
- La vinculación numero demuestra la forma en que una vinculaciónpuede
  seguir el progreso de un programa. Cada vez que el ciclo se repite, numero
  obtiene un valor que es 2 más que su valor anterior
- Al comienzo de cada
  repetición, se compara con el número 12 para decidir si el trabajo del programa
  está terminado.

# DOM in JS

- El Modelo de Objetos del Documento (DOM) es una estructura que representa al documento HTML, y que podemos utilizar desde JavaScript para modificar la página actual.
- Todos los navegadores construyen el DOM de forma automática, estableciendo un objeto por cada etiqueta del HTML, así como una relación de jerarquía en función de la disposición de las etiquetas anidadas
- Cuando la página se carga en el navegador, se genera el DOM constituido por una jerarquía de objetos (comúnmente llamada jerarquía de nodos) que el programador/a puede emplear para explorar la estructura de la página web, realizar salidas y capturar entradas.

## En el Modelo de Objetos del Documento (DOM), cada etiqueta HTML es un objeto, al que podemos llamar nodo

## Las etiquetas anidadas son llamadas “nodos hijos” de la etiqueta “nodo padre” que las contiene.

# Acceso al DOM

### ¿CÓMO FUNCIONA?

- Todos estos objetos son accesibles empleando JavaScript mediante el objeto global document.

- Como desarrolladores/as front-end, empleamos el DOM para modificar la interfaz del usuario, controlando las acciones que realiza en la página web con la intención de obtener entradas, y en consecuencia efectuar salidas apropiadas. Para operar sobre el DOM en JavaScript, empleamos el objeto de acceso global document:

```sh
console.dir(document);

console.dir(document.head)

console.dir(document.body);

```

- Podemos emplear el método console.dir() para obtener un detalle por consola de las propiedades y métodos que componen dicho objeto. Mediante la propiedad head podemos acceder al nodo head del HTML, y mediante body al correspondiente nodo body. Esta última referencia será posible sólo si el script utilizado se encuentra referenciado en la página web antes de la cláusula de la etiqueta body, como observamos a continuación:

```sh
<body>
    <h2>Coder House</h2>
    <script src="js/main.js"></script>
</body>
```

#### Utilizaremos algunos métodos de document con la intención de obtener, y posiblemente modificar, los nodos y sus propiedades. Inicialmente, identificamos tres formas de acceso a los elementos del DOM:

- Por identificador único: acceder a un elemento de la página empleando el valor del atributo id, el cual se utiliza para especificar un identificador único asociado a una sola etiqueta del documento HTML.

- Por clase: acceder a uno o más elementos de la página empleando el valor del atributo class, utilizado para especificar un identificador asociado a un grupo de etiquetas del documento HTML.

- Por etiqueta: acceder a uno o más elementos de la página, usando el nombre de la etiqueta empleada (p, div, h2, etcétera).

# Crear y eliminar nodos

- Para ello, es necesario analizar un serie de pasos a realizar, que podemos abordar usando el siguiente ejemplo como referencia:

```sh

// Crear nodo de tipo Elemento, etiqueta p

let parrafo = document.createElement("p");

// Insertar HTML interno

parrafo.innerHTML = "<h2>¡Hola Mundo!</h2>";

// Añadir el nodo Element como hijo de body

document.body.append(parrafo);


```

- Crear un nodo nuevo con el método createElement: el cual nos permite crear un nuevo nodo, especificando por parámetro el nombre de la etiqueta deseada (en el ejemplo optamos por un párrafo p / p).
- Definir la estructura del nodo creado: ahora que tenemos un nuevo nodo, es necesario determinar cómo estará compuesto el interior del elemento. Esto podemos hacerlo empleando la propiedad innerHTML del nuevo elemento.
- Añadir el nodo al DOM: para agregar el elemento creado, es necesario introducirlo como hijo de un elemento existente en el DOM. En el ejemplo analizado, el nodo párrafo se introduce como hijo del nodo body, usando el método append. El método append inserta el nuevo elemento sobre el final del contenido del nodo padre seleccionado; si queremos insertarlo sobre el comienzo podemos utilizar el método prepend de forma similar.

# Query Selector

- Para muchos los métodos de selección de elementos vistos pueden ser incómodos y a veces confusos o imprecisos, ya que sólo podemos seleccionarlos por alguna característica específica. Por ello Javascript llegó a desarrollar el método querySelector(), que nos permite seleccionar nodos con la misma sintaxis que utilizamos en los selectores de CSS.

```sh
    //CODIGO HTML DE REFERENCIA

<div id=”contenedor”>
    <p class=”texto”></p>
</div>

//CODIGO JS

// puedo seleccionar la etiqueta <p> siguiendo la sintaxis de CSS para selectores:

let parrafo = document.querySelector("#contenedor p")

// o bien seleccionar sólo el contenedor por id con #

let contenedor = document.querySelector("#contenedor")

// o por clase:
parrafo = document.querySelector(".texto")

```

# Funciones Constructoras

- Es una funcion que me permite mediante la palabra reservada NEW seguida de la nomenclatura de eleccion en este ejemplo vamos a usar a Person(siempre primera letra en mayuscula), crear objetos y inclusive crar prototypes a partir de el.

## Definir la Función Constructora:

- Se define como una función normal, pero por convención, su nombre empieza con una letra mayúscula.
- Dentro de la función, usamos this para asignar propiedades y métodos al objeto que se va a crear.

## Crear un Objeto con new:

- Usamos la palabra clave new seguida del nombre de la función constructora para crear un nuevo objeto.

- New crea un nuevo objeto vacío, asigna this a ese objeto, y luego llama a la función constructora.

## Ejemplo: new Person

- Vamos a crear una función constructora llamada Person y luego usarla para crear un nuevo objeto.

### Paso 1: Definir la Función Constructora

```sh
function Person(name, age) {

  this.name = name; // Asigna el parámetro name a la propiedad name del objeto
  this.age = age;   // Asigna el parámetro age a la propiedad age del objeto

  // Método para mostrar información de la persona
  this.sayHello = function() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  };
}

```

### Paso 2: Crear un Objeto con new

- El NEW es lo cre crea la funcion constructora ej:

```sh
var 1 = []
var 1 = new Array[]
var 2 = {}
var 2 = new Object{}

// esto es lo que aplica en la constructora


```

```sh
var person1 = new Person('Alice', 30); // Crea un nuevo objeto Person con name 'Alice' y age 30
var person2 = new Person('Bob', 25);   // Crea un nuevo objeto Person con name 'Bob' y age 25
```

### Paso 3: Usar el Objeto

```sh
person1.sayHello(); // Output: Hello, my name is Alice and I am 30 years old.
person2.sayHello(); // Output: Hello, my name is Bob and I am 25 years old.
```

## Explicación Detallada

### Definir la Función Constructora:

- function Person(name, age) { ... }: Define la función constructora Person que toma dos parámetros: name y age.
  this.name = name;: Asigna el valor del parámetro name a la propiedad name del objeto que se está creando.
- this.age = age;: Asigna el valor del parámetro age a la propiedad age del objeto que se está creando.
- this.sayHello = function() { ... }: Define un método sayHello que muestra un mensaje con el nombre y la edad de la persona.

### Crear un Objeto con new:

#### var person1 = new Person('Alice', 30);: Crea un nuevo objeto Person con name 'Alice' y age 30. new hace lo siguiente:

- Crea un nuevo objeto vacío.
- Asigna this al nuevo objeto.
- Llama a la función Person con this apuntando al nuevo objeto.
- Devuelve el nuevo objeto.
- var person2 = new Person('Bob', 25);: Crea otro objeto Person con name 'Bob' y age 25.

### Usar el Objeto:

- person1.sayHello();: Llama al método sayHello del objeto person1, que muestra el mensaje: "Hello, my name is Alice and I am 30 years old."
- person2.sayHello();: Llama al método sayHello del objeto person2, que muestra el mensaje: "Hello, my name is Bob and I am 25 years old."

## Resumen

- Las funciones constructoras son una forma de crear múltiples objetos con las mismas propiedades y métodos en JavaScript. Usamos la palabra clave new para crear un nuevo objeto a partir de una función constructora. Esto nos permite reutilizar el código y crear objetos de manera eficiente.

## Utilizar prototype para crear metodos practicos para las funciones constructoras

- No crear los portotypes dentro de la constructora, crearlos fuera para poder reutelizar, se lo creo dentro por cada prodcuto que creo se me crea un nuevo metodo, OPTIMIZAR

```sh
function Producto(nombre, precio, stock) {
  this.nombre = nombre;
  this.precio = precio;
  this.stock = stock;
}

// Métodos básicos
Producto.prototype.mostrarInfo = function() {
  console.log(`Producto: ${this.nombre}`);
  console.log(`Precio: $${this.precio}`);
  console.log(`Stock: ${this.stock} unidades`);
};

// Método con cálculos
Producto.prototype.calcularDescuento = function(porcentaje) {
  const descuento = this.precio * (porcentaje / 100);
  return this.precio - descuento;
};

// Método que modifica el estado
Producto.prototype.actualizarStock = function(cantidad) {
  this.stock += cantidad;
  return this.stock;
};

// Crear productos
const laptop = new Producto('Laptop', 1200, 5);
const telefono = new Producto('Teléfono', 800, 10);

// Usar los métodos
laptop.mostrarInfo();
console.log(`Precio con 10% de descuento: $${laptop.calcularDescuento(10)}`);
console.log(`Nuevo stock: ${laptop.actualizarStock(3)} unidades`);
```

# Apply

- El método apply() es una función que permite invocar a otra función estableciendo su contexto (this) y pasando sus argumentos como un array. Su firma técnica es:

```sh
Function.prototype.apply(thisArg, argsArray)
Características técnicas principales:
```

- Contexto: El primer parámetro (thisArg) define el valor de this dentro de la función
- Argumentos: El segundo parámetro debe ser un array (argsArray) que contiene todos los argumentos
- Ejecución: La función se ejecuta inmediatamente después de ser llamada
- Retorno: Devuelve el resultado de la función invocada

# Call

- El método call() comparte la misma funcionalidad básica que apply(), pero difiere en la forma de pasar los argumentos. Su firma técnica es:

```sh
Function.prototype.call(thisArg, arg1, arg2, ...)
Características técnicas principales:
```

- Contexto: Similar a apply(), define el valor de this
- Argumentos: Recibe argumentos individuales en lugar de un array
- Ejecución: También se ejecuta inmediatamente
- Retorno: Devuelve el resultado de la función invocada

# Bind

- El método bind() es fundamentalmente diferente a los anteriores. \* Su firma técnica es:

```sh
Function.prototype.bind(thisArg, arg1, arg2, ...)
Características técnicas principales:
```

- Contexto: Fija permanentemente el valor de this
- Argumentos: Puede predefinir algunos argumentos
- Ejecución: Retorna una nueva función en lugar de ejecutar la original
- Retorno: Devuelve una función nueva con el contexto y argumentos predefinidos

## Diferencias técnicas clave

### Momento de ejecución:

- apply() y call(): Ejecución inmediata
- bind(): Crea una nueva función para usar después

### Forma de pasar argumentos:

- apply(): Array completo de argumentos
- call(): Argumentos individuales
- bind(): Argumentos individuales predefinidos

### Modificación del contexto:

- apply() y call(): Establecen temporalmente el contexto
- bind(): Fija permanentemente el contexto en la nueva función

### Casos de uso técnicos específicos

- Apply:
  Procesamiento de arrays de datos
  Integración con funciones que esperan arrays
  Uso con Math.max() y Math.min()
- Call:
  Herencia de prototipos
  Llamadas a funciones con parámetros individuales
  Modificación temporal del contexto
- Bind:
  Manejo de eventos
  Creación de funciones curry
  Configuración predefinida de funciones

## Destructuracion

- La desestructuración de arrays en JavaScript es una característica moderna que permite extraer valores de un array y asignarlos directamente a variables, esta sintaxis simplifica significativamente el código comparado con las formas tradicionales de acceso a elementos de arrays.

#### Sintaxis Básica

- La forma más simple de desestructurar un array es usando corchetes [] en ambos lados de la asignación:

```sh
const frutas = ['manzana', 'banana', 'naranja'];
const [primeraFruta, segundaFruta] = frutas;

console.log(primeraFruta);  // "manzana"
console.log(segundaFruta); // "banana"
```


#### Omitir Elementos

* Puedes omitir elementos específicos usando comas vacías

```sh 
const [primero,,tercero] = ['manzana', 'banana', 'naranja'];
console.log(primero);   // "manzana"
console.log(tercero);   // "naranja"
```

#### Operador Rest (...)

* El operador rest (...) te permite capturar el resto de los elementos en un nuevo array

```sh
const [primero,...resto] = ['manzana', 'banana', 'naranja', 'plátano'];
console.log(primero);      // "manzana"
console.log(resto);        // ["banana", "naranja", "plátano"]
```

#### Consideraciones Importantes

* El orden de las variables debe coincidir con el orden de los elementos en el array. No puedes usar una coma al final cuando usas el operador rest

```sh
  // ❌ Incorrecto
const [primero, ...resto,] = ['a', 'b', 'c'];

// ✅ Correcto
const [primero, ...resto] = ['a', 'b', 'c'];
```


* Las variables deben declararse antes de usarlas o declararlas junto con la desestructuración:

```sh
  // ✅ Correcto
let x, y;
[x, y] = [1, 2];

// ✅ También correcto
const [x, y] = [1, 2];
```