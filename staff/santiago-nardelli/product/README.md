# DOM in JS

* El Modelo de Objetos del Documento (DOM) es una estructura que representa al documento HTML, y que podemos utilizar desde JavaScript para modificar la página actual.
* Todos los navegadores construyen el DOM de forma automática, estableciendo un objeto por cada etiqueta del HTML, así como una relación de jerarquía en función de la disposición de las etiquetas anidadas
* Cuando la página se carga en el navegador, se genera el DOM constituido por una jerarquía de objetos (comúnmente llamada jerarquía de nodos) que el programador/a puede emplear para explorar la estructura de la página web, realizar salidas y capturar entradas.
## En el Modelo de Objetos del Documento (DOM), cada etiqueta HTML es un objeto, al que podemos llamar nodo

## Las etiquetas anidadas son llamadas “nodos hijos” de la etiqueta “nodo padre” que las contiene.





# Acceso al DOM

### ¿CÓMO FUNCIONA?

* Todos estos objetos son accesibles empleando JavaScript mediante el objeto global document. 


* Como desarrolladores/as front-end, empleamos el DOM para modificar la interfaz del usuario, controlando las acciones que realiza en la página web con la intención de obtener entradas, y en consecuencia efectuar salidas apropiadas. Para operar sobre el DOM en JavaScript, empleamos el objeto de acceso global document:

```sh
console.dir(document);

console.dir(document.head)

console.dir(document.body);

```
* Podemos emplear el método console.dir() para obtener un detalle por consola de las propiedades y métodos que componen dicho objeto. Mediante la propiedad head podemos acceder al nodo head del HTML, y mediante body al correspondiente nodo body. Esta última referencia será posible sólo si el script utilizado se encuentra referenciado en la página web antes de la cláusula de la etiqueta body, como observamos a continuación:

```sh
<body>
    <h2>Coder House</h2>
    <script src="js/main.js"></script>
</body>
```
#### Utilizaremos algunos métodos de document con la intención de obtener, y posiblemente modificar, los nodos y sus propiedades. Inicialmente, identificamos tres formas de acceso a los elementos del DOM:

* Por identificador único: acceder a un elemento de la página empleando el valor del atributo id, el cual  se utiliza para especificar un identificador único asociado a una sola  etiqueta del documento  HTML.

* Por clase: acceder a uno o más elementos de la página empleando el valor del  atributo class, utilizado para especificar un identificador asociado a un grupo de etiquetas del documento  HTML.

* Por etiqueta: acceder a uno o más elementos de la página, usando el nombre de la etiqueta empleada (p, div, h2, etcétera).



# Crear y eliminar nodos

* Para ello, es necesario analizar un serie de pasos a realizar, que podemos abordar usando el siguiente ejemplo como referencia:

```sh

// Crear nodo de tipo Elemento, etiqueta p

let parrafo = document.createElement("p");

// Insertar HTML interno

parrafo.innerHTML = "<h2>¡Hola Mundo!</h2>"; 

// Añadir el nodo Element como hijo de body

document.body.append(parrafo);


```

* Crear un nodo nuevo con el método createElement: el cual nos permite crear un nuevo nodo, especificando por parámetro el nombre de la etiqueta deseada (en el ejemplo optamos por un párrafo p / p).
* Definir la estructura del nodo creado: ahora que tenemos un nuevo nodo, es necesario determinar cómo estará compuesto el interior del elemento. Esto podemos hacerlo empleando la propiedad innerHTML del nuevo elemento. 
* Añadir el nodo al DOM: para agregar el elemento creado, es necesario introducirlo como hijo de un elemento existente en el DOM. En el ejemplo analizado, el nodo párrafo se introduce como hijo del nodo body, usando el método append. El método append inserta el nuevo elemento sobre el final del contenido del nodo padre seleccionado; si queremos insertarlo sobre el comienzo podemos utilizar el método prepend de forma similar.


# Query Selector

* Para muchos los métodos de selección de elementos vistos pueden ser incómodos y a veces confusos o imprecisos, ya que sólo podemos seleccionarlos por alguna característica específica. Por ello Javascript llegó a desarrollar el método querySelector(), que nos permite seleccionar nodos con la misma sintaxis que utilizamos en los selectores de CSS.

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

* Es una funcion que me permite mediante la palabra reservada NEW seguida de la nomenclatura de eleccion en este ejemplo vamos a usar a Person(siempre primera letra en mayuscula), crear objetos y inclusive crar prototypes a partir de el.

## Definir la Función Constructora:

* Se define como una función normal, pero por convención, su nombre empieza con una letra mayúscula.
* Dentro de la función, usamos this para asignar propiedades y métodos al objeto que se va a crear.

## Crear un Objeto con new:

* Usamos la palabra clave new seguida del nombre de la función constructora para crear un nuevo objeto.

* New crea un nuevo objeto vacío, asigna this a ese objeto, y luego llama a la función constructora.


## Ejemplo: new Person

* Vamos a crear una función constructora llamada Person y luego usarla para crear un nuevo objeto.

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

* El NEW es lo cre crea la funcion constructora ej:

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

* function Person(name, age) { ... }: Define la función constructora Person que toma dos parámetros: name y age.
this.name = name;: Asigna el valor del parámetro name a la propiedad name del objeto que se está creando.
* this.age = age;: Asigna el valor del parámetro age a la propiedad age del objeto que se está creando.
* this.sayHello = function() { ... }: Define un método sayHello que muestra un mensaje con el nombre y la edad de la persona.

### Crear un Objeto con new:

#### var person1 = new Person('Alice', 30);: Crea un nuevo objeto Person con name 'Alice' y age 30. new hace lo siguiente:
* Crea un nuevo objeto vacío.
* Asigna this al nuevo objeto.
* Llama a la función Person con this apuntando al nuevo objeto.
* Devuelve el nuevo objeto.
* var person2 = new Person('Bob', 25);: Crea otro objeto Person con name 'Bob' y age 25.
### Usar el Objeto:

* person1.sayHello();: Llama al método sayHello del objeto person1, que muestra el mensaje: "Hello, my name is Alice and I am 30 years old."
* person2.sayHello();: Llama al método sayHello del objeto person2, que muestra el mensaje: "Hello, my name is Bob and I am 25 years old."

## Resumen

* Las funciones constructoras son una forma de crear múltiples objetos con las mismas propiedades y métodos en JavaScript. Usamos la palabra clave new para crear un nuevo objeto a partir de una función constructora. Esto nos permite reutilizar el código y crear objetos de manera eficiente.


## Utilizar prototype para crear metodos practicos para las funciones constructoras 

* No crear los portotypes dentro de la constructora, crearlos fuera para poder reutelizar, se lo creo dentro por cada prodcuto que creo se me crea un nuevo metodo, OPTIMIZAR


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

### extencion de constructoras

*