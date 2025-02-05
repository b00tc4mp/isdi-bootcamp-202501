# DOM in JS

* El Modelo de Objetos del Documento (DOM) es una estructura que representa al documento HTML, y que podemos utilizar desde JavaScript para modificar la página actual.
* Todos los navegadores construyen el DOM de forma automática, estableciendo un objeto por cada etiqueta del HTML, así como una relación de jerarquía en función de la disposición de las etiquetas anidadas
* Cuando la página se carga en el navegador, se genera el DOM constituido por una jerarquía de objetos (comúnmente llamada jerarquía de nodos) que el programador/a puede emplear para explorar la estructura de la página web, realizar salidas y capturar entradas.
# Acceso al DOM

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