// Version: 1.0

//USER - MAQUINA

/*
 Capa de datos que necesito
 variable de productos 
 variable donde agregar los productos al carrito
 variable donde agregar los productos al checkout
 variable donde me sume el total de los productos
*/
/*
Capa de interfaz
mostrar los productos
agregar al carrito
mostrar el carrito
mostrar el checkout
*/

//Las validasiones las hago con typeof para saber si es un string o un numero
//puedo crear helpers para la redundancia de codigo de logica/ si tengo mas de una operacion repetida dentro de ella puedo crear una funcion que me ayude a hacer esa operacion lo mismo con las validaciones
//si tengo un error en la logica de mi codigo puedo hacer un try catch para que me muestre un mensaje de error y no se rompa el programa
//si tengo un error en la interfaz puedo hacer un try catch para que me muestre un mensaje de error y no se rompa el programa

//CAPA DE DATOS
const products = [
  {
    precio: 299.99,
    nombre: "Pantalón",
    marca: "Nike",
    color: "Azul oscuro",
    stock: 22,
  },
  {
    precio: 159.99,
    nombre: "Camiseta",
    marca: "Adidas",
    color: "Rojo",
    stock: 13,
  },
  {
    precio: 199.99,
    nombre: "Zapatillas",
    marca: "Asics",
    color: "Gris claro",
    stock: 10,
  },
  {
    precio: 249.99,
    nombre: "Jacket",
    marca: "Specialized",
    color: "Naranja",
    stock: 5,
  },
  {
    precio: 179.99,
    nombre: "Bicicleta",
    marca: "Trek",
    color: "Verde",
    stock: 2,
  },
];
var total = 0;
var checkout = [];
var cart = [];
var productQuantity = 0;
var total = 0;


//HELPERS
// Helper para manejar errores
var handleError = function (error) {
  console.error("Ocurrió un error:", error);
  alert(
    "Lo siento, ocurrió un error. Por favor, inténtelo de nuevo más tarde."
  );
} 

// Helper para validar la entrada del usuario

var validationEntry = function (value) {
  if (value === null) {
    throw new Error("El usuario canceló la operación")

 
  }
  if (value.trim() === "") {
    throw new Error("El valor no puede estar vacío");
  }
}

// Helper para validar el tipo de la entrada
var validationType = function (value, type) {
  if (typeof value !== type) {
    throw new TypeError(`El valor debe ser de tipo ${type}`);
  }
};





// Capa de interfaz
// Función para mostrar el menú de la tienda
function menuStore() {
  try {
    const menuOptions = `
      Bienvenido a la tienda. ¿Qué desea hacer?
      1. Mostrar productos
      2. Mostrar un producto
      3. Agregar producto al carrito
      4. Ver carrito
      5. Agregar más productos al carrito
      6. Ver ticket
      7. Salir
    `;

    const userChoice = prompt(menuOptions);

    // Validar la entrada del usuario
    validationEntry(userChoice);

    switch (userChoice) {
      case "1":
        showProducts();
        break;
      case "2":
        showItem();
        break;
      case "3":
        addProductToCart();
        break;
      case "4":
        viewCart();
        break;
      case "5":
        addMoreProductToCart();
        break;
      case "6":
        viewTicket();
        break;
      case "7":
        alert("Gracias por su visita. Hasta luego.");
        break;
      default:
        alert("Opción no válida. Por favor, seleccione una opción válida.");
        break;
    }
  } catch (error) {
    handleError(error);
  }
}
//C.INTERFAZ
function showProducts() {
  try {
    alert(getProducts());
    
  } catch (error) {
      handleError(error);
  }
}
//C.INTERFAZ
function showItem() {
  try {
    alert(getProductById());
    
  } catch (error) {
      handleError(error);
  }
}
/*
  C.INTERFAZ
  Preguntar al usuario que producto quiere agregar al carrito y devolver el nombre del producto
  */
  function askUserChoice() {
    try {
      var userProductWant = prompt("Ingrese el numero de fila del producto deseado")
  
      // Validaciones
      validationEntry(userProductWant);
      validationType(userProductWant, "string");
  
      return userProductWant.toLowerCase();
    } catch (error) {
      handleError(error);
      return null;
    }
  }

/*
  C.L
  Funcion para mostrar los productos
  creo una variable que va a ser igual a un string vacio
  recorro el array de productos y mediante un for recorro el array de productos y le muestro al usuario los productos que tengo en la tienda
  ordeno los productos del 1 al 5
*/
function getProducts(){
  var productList = "Bienvenido a la tienda. Nuestros productos son:\n";
  for (let i = 0; i < products.length; i++) {
    
    productList += `${products[i].id}- ${products[i].nombre} - ${products[i].precio} - ${products[i].marca} - ${products[i].color}\n`;
  }
  return productList;
}
/*
  C.L
Genero un id con el metodo Date.now() y Math.floor(Math.random() * 1000) para que sea unico
Necesito esto para tratar a los productos como unicos por que mas adelante puedo tener productos con mismo nombre pero tendran distinto id
*/
function generateUniqueId() {
  return "id-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}
/*
 C.L
  Asignar IDs únicos a cada producto en el array de productos
  aqui mediante el for recorro el array y le asigno un id unico a cada producto
  producto en la psosicion i va a tener un id unico 
  creo y asigno la porop id a cada producto
  */
function assignUniqueIdsToProducts() {
  for (let i = 0; i < products.length; i++) {
    products[i].id = generateUniqueId();
  }
}




/*
  C.L
  Buscar un producto por su nombre y obtener el id de ese producto
  para ello creo una funcion y declaro en ella una variable{local}--> PRODUCT que va a ser igual a la funcion askUserChoice--> funcion que me devuelve el nombre del producto que el usuario quiere
  mediante un for recorro el array de productos y busco el nombre que ingreso el usuario

*/

function getProductById() {
  var product = askUserChoice();

  validationEntry(product);
  validationType(product, "string");
  
  for (var i = 0; i < products.length; i++) {
    //si el producto en la posicion i es igual al producto que el usuario quiere retorno el id de ese producto
    if (products[i].nombre.toLowerCase() === product) {
      return products[id];
    }
  }
}
/*
  C.L
  Agregar un producto al carrito
  creo una funcion que reciba un id como parametro
  recorro el array de productos y si el producto en la posicion i es igual al id que recibo como parametro
  agrego el producto al carrito como hago eso creo un if que me compare si el id del producto en la posicion i es igual al id que recibo como parametro
  luego agrego el producto al carrito haciendo cart y accedo a su longitud y le asigno un objeto con las propiedades id, nombre y precio
  porque accedo a su longuitud para que me agregue el producto al final del array digamos que hay 3 productos en el carrito y le agrego uno mas a la cuata y si no hay nada se me agrega en la posicion 0

  */

function addProductToCart(id) {
  for (var i = 0; i < products.length; i++) {
    if (id === products.id) {
      cart[cart.length] = {
        id: products[i].id,
        name: products[i].nombre,
        precio: products[i].precio,
      };
      total += products[i].precio;
    }
  }
}
/*
C.LOGICA
creo una funcion que me permita estando en el carrito agregar mas del mismo producto al carrito
creo una funcion que reciba un id como parametro
recorro el carrito y si el id del producto en la posicion i es igual al id que recibo como parametro
agrego mas del mismo producto al carrito mediante un for que lo recorre y comprueba el id del producto en la posicion i es igual al id que recibo como parametro
verifico si hay stock del producto que quiero agregar al carrito
si no hay stock del producto que quiero agregar al carrito le muestro un mensaje al usuario diciendo si quiere agregar mas de una unidad 
si el usuario quiere agregar mas de una unidad del producto que no tiene stock le muestro un mensaje diciendo que no hay stock del producto

*/
function addMoreProductToCart(id) {
  //recorro el carrito
  for (var i = 0; i < cart.lenght; i++) {
    //si el id del producto en la posicion i es igual al id que recibo como parametro del carrito
    if (id === cart[i].id) {
      //recorro los productos
      for (let j = 0; j < products.length; j++) {
        //si el id del producto en la posicion j es igual al id que recibo como parametro del carrito
        if (id === products[j].id) {
          //si el stock del producto es mayor a 0
          if (products[j].stock > 0) {
            //le pregunto al usuario si quiere agregar mas unidades del producto
            var moreProduct = prompt(
              "Ya agregó una unidad de este producto. ¿Desea agregar más unidades? (si/no)"
            ).toLowerCase();
            //si la respuesta del usuario es si
            if (moreProduct === "si") {
              //le pregunto al usuario cuantas unidades quiere agregar
              var quantity = parseInt(
                prompt("¿Cuántas unidades adicionales desea agregar?")
              );
              //si la cantidad es un numero y es mayor a 0
              if (!isNaN(quantity) && quantity > 0) {
                //si el stock del producto es mayor o igual a la cantidad que quiere agregar
                if (products[j].stock >= quantity) {
                  //agrego la cantidad de unidades del producto al carrito
                  cart[i].quantity += quantity;
                  //le resto la cantidad de unidades del producto al stock
                  products[j].stock -= quantity;
                  //le muestro un mensaje al usuario diciendo cuantas unidades del producto agrego al carrito
                  alert(
                    `Se han agregado ${quantity} unidades del producto al carrito.`
                  );
                } else {
                  //le muestro un mensaje al usuario diciendo que no hay suficiente stock del producto
                  alert(
                    `No hay suficiente stock disponible. Solo quedan ${products[j].stock} unidades.`
                  );
                }
              } else {
                //le muestro un mensaje al usuario diciendo que la cantidad no es válida
                alert("Cantidad no válida.");
              }
            } else {
              //le muestro un mensaje al usuario diciendo que no se agregaron más unidades del producto
              alert("No se agregaron más unidades del producto.");
            }
          } else {
            //le muestro un mensaje al usuario diciendo que no hay stock del producto
            alert("No hay stock del producto.");
          }
          return;
        }
      }
    }
  }
}

/*
C.LOGICA
Mostrar el carrito
creo una funcion que me muestre el carrito
creo una variable que va a ser igual a un string vacio
recorro el carrito Y mediante un alert muestro el carrito con sus propiedades quiero que me muestre el nombre y el precio de los productos que tengo en el carrito
*/
function showCart() {
  var cartList = "";
  for (var i = 0; i < cart.length; i++) {
    cartList += `${cart[i].name} - ${cart[i].precio}\n`;
  }
  return cartList;
}

/* C.INTERFAZ
  funcion que aplico para ver el carrito y no tener que interactuar con la logica de la funcion showCart
*/

function viewCart() {
  try {
    alert(showCart());
  } catch (error) {
    console.error("Ocurrió un error al mostrar el carrito:", error);
    alert(
      "Lo siento, ocurrió un error al mostrar el carrito. Por favor, inténtelo de nuevo más tarde."
    );
  }
}

/*
C.L
Creo una funcion que me permita agregar los productos de mi cart al checkout(ticket de compra)
creo una funcion que reciba un id como parametro
recorro el carrito y si el id del producto en la posicion i es igual al id que recibo como parametro agrego el producto al checkout
mediante un 'push' no es un push pero mediante un if con condicion si esta en el cart recorriendolo con un for veo si se encuentra sino lo agrego al producto al checkout

*/


/*
C.LOGICA
Mediante una funcion agrego mis productos del cart a mi checkout(ticket de compra)
Creo una funcion que reciba un id como parametro
Recorro el carrito y si el id del producto en la posicion i es igual al id que recibo como parametro
Recorro los productos y si el id del producto en la posicion j es igual al id que recibo como parametro
Agrego el producto al checkout mediante [checkot.lenght] esto me lo agrega al final del array
*/
function addProductToCheckout(id) {
  //recorro el carrito
  for (var i = 0; i < cart.length; i++) {
    //si el id del producto en la posicion i es igual al id que recibo como parametro
    if (id === cart[i].id) {
      //recorro los productos
      for (let j = 0; j < products.length; j++) {
        //si el id del producto en la posicion j es igual al id que recibo como parametro
        if (id === products[j].id) {
          //agrego el producto al checkout
          checkout[checkout.length]({
            id: products[j].id,
            name: products[j].nombre,
            precio: products[j].precio,
            quantity: cart[i].quantity,
          });
          return;
        }
      }
    }
  }
} 
/*
C.L
Mostrar el checkout
creo una funcion que me muestre el checkout
*/
function showCheckout(){
  for(i = 0 ; i < checkout.length; i++){
    console.log(checkout[i]);
  }
}

/*
C.I
funcion que aplico para ver el ticket de compra y no tener que interactuar con la logica de la funcion showCheckout
*/
function viewTicket() {
  try {
    alert(showCheckout());
  } catch (error) {
    console.error("Ocurrió un error al mostrar el ticket de compra:", error);
    alert(
      "Lo siento, ocurrió un error al mostrar el ticket de compra. Por favor, inténtelo de nuevo más tarde."
    );
  }
}


/*
Pruebas 


.menu option uno muestra bien los productos pero al aceptar cierra ventana y no puedo volver a abrirla crear un bucle para cuando termine el proceso vuelva a abrir la ventana de menuStore con una funcion que me permita volver a abrir la ventana de menuStore preguntando mediante un prompt si quiero volver a abrir la ventana de menuStore





*/
//Mejoras

// crear una funcion que pasado los ultimos 30 segundos despues de haber cancelado la primera vez que me pregunte si quiero volver a abrir la ventana de menuStore
