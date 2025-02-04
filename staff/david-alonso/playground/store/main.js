// - crea una tienda con productos

// - catalogo de productos
var data = {  // creamos un objeto con los datos
    productos: [   // un array con el listado de productos

        {
            id: 'y-r1',
            marca: 'Yamaha',
            modelo: 'R1',
            precio: 23099,
            color: ['Azul   ', 'Negro   ']
        },

        {
            id: 'y-t7',
            marca: 'Yamaha',
            modelo: 'Tenere 700',
            precio: 13499,
            color: ['Rojo   ', 'Azul   ']
        },

        {
            id: 'y-tm',
            marca: 'Yamaha',
            modelo: 'Tmax 560',
            precio: 13999,
            color: ['Negro   ', 'Amarillo   ', 'Gris   ']
            // STOCK  ??
        },

        {
            id: 'y-07',
            marca: 'Yamaha',
            modelo: 'Mt-07',
            precio: 7100,
            color: ['Negro   ', 'Azul   ']
        },

        {
            id: 'y-x3',
            marca: 'Yamaha',
            modelo: 'Xmax 300',
            precio: 6500,
            color: ['Blanco   ', 'Azul   ', 'Negro   ']
        },

        {
            id: 'y-nm',
            marca: 'Yamaha',
            modelo: 'Nmax 125',
            precio: 3599,
            color: ['Azul   ', 'Rojo   ', 'Negro   ']
        }
    ]
}

var fecha = new Date()
const fechaFormateada = fecha.toLocaleDateString('es-ES')

// INICIO

// texto de bienvenida
var bienvenida = confirm('YAMAHA MOTORS')
if (bienvenida == null) {
    alert('HASTA PRONTO')
}

// MODELOS

var modelos = ''  //  creamos una variable donde almacenar la lista de modelos 

//  bucle que recorre los productos y los guarda en la variable modelos
for (i = 0; i < data.productos.length; i++) {
    var producto = data.productos[i]
    modelos += i + 1 + ' -  ' + producto.marca + ' . ' + producto.modelo + '\n'
}

// variable que guarda el modelo seleccionado por el usuario
var seleccion = prompt('SELECCIONA TU MODELO 🛵 \n' + '\n' + modelos)
if (seleccion == null) {
    alert('NO SELECCIONASTE NINGUN MODELO')
}
// **  crear variable con los numeros validos en el prompt **


// guarda el producto comprado 
var productoComprado = data.productos[seleccion - 1]
console.log(productoComprado)

// COLORES

// muestra al usuario los colore a escojer
var seleccionarColores = prompt('SELECCIONA TU COLOR = 1 , 2 o 3 \n' + productoComprado.color)
if (seleccionarColores == null) {
    alert('NO SELECCIONASTE NINGUN COLOR')
}
console.log('color' + productoComprado.color)
// **  crear variable con los numeros validos en el prompt **


// guarda el color seleccionado por el usuario
var colorEscojido = productoComprado.color[seleccionarColores - 1]


// CARRITO

// variable que guarda la confirmacion de compra
var añadirCarrito = confirm('QUIERES AÑADIR EL MODELO - ' + productoComprado.modelo + '\n' + 'DE COLOR - ' + colorEscojido + '\n' + 'AL CARRITO POR \n' + productoComprado.precio + ' €')

// avisa de que el producto se ha añadido al carrito
var confirmacion = alert('Producto añadido al carrito  ✅')
console.log(añadirCarrito)  // genera un valor booleano


// ** crear un carrito donde ver los productos comprados **

// muestra los articulos añadidos al carrito 
var carrito = confirm('CARRITO \n' + fechaFormateada + '\n' + '\n* ' + productoComprado.modelo + '\n' + '* ' + colorEscojido + '\n' + '* ' + productoComprado.precio + ' €')
console.log(carrito)


// USUARIO *

// *  1 - dar la bienvenida a la tienda
// *  2 - indice de seleccion de productos
// *  3 - seleccionar color del producto
// *  4 - agregar productos al carrito
// *  5 - ver estado del carrito
// 6 - comprar productos del carrito




// MAQUINA *


// - obtener el total del carrito + fecha + iva
// - enumerar pedidos
// - control de stock
// - alertar si el usuario quiere comprar mas cantidad de la que hay en el stock del producto **
// - mostrar historial de pedidos con fecha



