// Capa de datos
const products = [
  {
    precio: 299.99,
    name: "pantalon",
    marca: "Nike",
    color: "Azul oscuro",
    stock: 22,
    descripcion:
      "Pantalón deportivo de alta calidad, ideal para entrenamientos y actividades al aire libre.",
  },
  {
    precio: 159.99,
    name: "camiseta",
    marca: "Adidas",
    color: "Rojo",
    stock: 13,
    descripcion:
      "Camiseta cómoda y ligera, perfecta para cualquier tipo de ejercicio.",
  },
  {
    precio: 199.99,
    name: "zapatillas",
    marca: "Asics",
    color: "Gris claro",
    stock: 10,
    descripcion: "Zapatillas de running con excelente amortiguación y soporte.",
  },
  {
    precio: 249.99,
    name: "jacket",
    marca: "Specialized",
    color: "Naranja",
    stock: 5,
    descripcion:
      "Chaqueta resistente al agua y al viento, ideal para ciclismo y actividades al aire libre.",
  },
  {
    precio: 179.99,
    name: "bicicleta",
    marca: "Trek",
    color: "Verde",
    stock: 2,
    descripcion:
      "Bicicleta de montaña con marco ligero y duradero, perfecta para terrenos difíciles.",
  },
];
var total = 0;
var checkout = [];
var cart = [];
var productQuantity = 0;
var total = 0;

/*======================================================================================= 
HELPERS
*/

// Helper para manejar errores
var handleError = function (error) {
  console.error("Ocurrió un error:", error);
  alert(
    "Lo siento, ocurrió un error. Por favor, inténtelo de nuevo más tarde."
  );
};

// Helper para validar la entrada del usuario
var validationEntry = function (value) {
  if (value === null) {
    throw new Error("El usuario canceló la operación");
  }
  if (value.trim() === "") {
    throw new Error("El valor no puede estar vacío");
  }
};

// Helper para validar el tipo de la entrada
var validationType = function (value, type) {
  if (typeof value !== type) {
    throw new TypeError(`El valor debe ser de tipo ${type}`);
  }
};

/*======================================================================================= 
CAPA LOGICA
*/
// Generar un id único
function generateUniqueId() {
  return "id-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}

// Asignar IDs únicos a cada producto en el array de productos
function assignUniqueIdsToProducts() {
  for (let i = 0; i < products.length; i++) {
    products[i].id = generateUniqueId();
  }
}

// Buscar un producto por su nombre y obtener el id de ese producto
function getProductById() {
  var product = askUserChoice();

  validationEntry(product);
  validationType(product, "string");
  //recorrer el array de productos y comparar el nombre del producto con el producto ingresado por el usuario
  for (var i = 0; i < products.length; i++) {
    // Si se encuentra el producto, retornar el id del producto
    if (products[i].name.toLowerCase() === product) {
      return products[i].id;
    }
  }
  // Si no se encuentra el producto, lanzar un error o retornar null
  throw new Error("Producto no encontrado");
}

function getProductDescription() {
  var product = askUserChoice();

  validationEntry(product);
  validationType(product, "string");
  //recorrer el array de productos y comparar el nombre del producto con el producto ingresado por el usuario
  for (var i = 0; i < products.length; i++) {
    // Si se encuentra el producto, retornar el id del producto
    if (products[i].name.toLowerCase() === product) {
      return products[i].descripcion;
    }
  }
  // Si no se encuentra el producto, lanzar un error o retornar null
  throw new Error("Producto no encontrado");
}

// Agregar un producto al carrito
function addProductToCart() {
  var productId = getProductById();
  if (productId === null) throw new Error("Producto no encontrado");

  // declarar una variable para verificar si el producto ya está en el carrito y la inicializamos en false
  var productInCart = false;
  // Verificar si el producto ya está en el carrito
  // Si el producto ya está en el carrito, aumentar la cantidad
  // y le cambiamos el valor a la variable productInCart a true
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      cart[i].quantity++;
      productInCart = true;
    }
  }

  // Si el producto no está en el carrito, agregarlo
  // y le cambiamos el valor a la variable productInCart a true

  for (var i = 0; i < products.length && !productInCart; i++) {
    if (productId === products[i].id) {
      
      cart[cart.length] = {
        id: products[i].id,
        name: products[i].name,
        precio: products[i].precio,
        quantity: 1,
      };
      productInCart = true;
      alert(`Se ha agregado ${products[i].name} al carrito.`);
    }
  }

  // Reducir el stock del producto
  for (var k = 0; k < products.length; k++) {
    if (products[k].id === productId) {
      products[k].stock--;
    }
  }
  menuStore();
}

// Ver el carrito
function viewCart() {
  if (cart.length === 0) {
    alert("El carrito está vacío.");
    menuStore();
  }

  var cartList = "Carrito de compras:\n";

  for (let i = 0; i < cart.length; i++) {
    cartList += `${cart[i].name} - ${cart[i].quantity} - ${cart[i].precio}\n`;
  }
  alert(cartList);
  menuStore();
}

// Agregar más productos al carrito
function addMoreProductToCart() {
  var productId = getProductById();
  if (productId === null) return;

  for (var i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      var quantity = parseInt(prompt("¿Cuántas unidades desea agregar?"));
      if (!isNaN(quantity) && quantity > 0) {
        if (products[i].stock >= quantity) {
          cart[cart.lenght] = {
            id: products[i].id,
            nombre: products[i].name,
            precio: products[i].precio,
            cantidad: quantity,
          };
          products[i].stock -= quantity;
          alert(
            `Se han agregado ${quantity} unidades de ${products[i].name} al carrito.`
          );
        } else {
          alert(
            `No hay suficiente stock disponible. Solo quedan ${products[i].stock} unidades.`
          );
        }
      } else {
        alert("Cantidad no válida.");
      }
    }
  }
  menuStore();
}

// Ver el ticket
function viewTicket() {
  var ticket = "Ticket de compra:\n";
  var total = 0;
  for (let i = 0; i < cart.length; i++) {
    ticket += `${cart[i].name} - ${cart[i].precio} x ${
      cart[i].quantity || 1
    }\n`;
    total += cart[i].precio * (cart[i].quantity || 1);
  }
  ticket += `Total: ${total.toFixed(2)}`;
  alert(ticket);

}
// Función para mostrar los productos disponibles
function getProducts() {
  var productList = "Bienvenido a la tienda. Nuestros productos son:\n";

  for (let i = 0; i < products.length; i++) {
    productList += ` ${products[i].name} - ${products[i].precio} - ${products[i].marca} - ${products[i].color}\n`;
  }
  return productList;
}

/*======================================================================================= 
CAPA DE INTERFACE
*/

// Función para mostrar el menú de la tienda
function menuStore() {
  try {
    assignUniqueIdsToProducts();
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

// Función para mostrar los productos
function showProducts() {
  try {
    alert(getProducts());
    menuStore();
  } catch (error) {
    handleError(error);
  }
}

// Función para mostrar un producto
function showItem() {
  try {
    alert(getProductDescription());
    menuStore();
  } catch (error) {
    handleError(error);
  }
}

// Función para preguntar al usuario qué producto quiere agregar al carrito y devolver el nombre del producto
function askUserChoice() {
  try {
    var userProductWant = prompt("Ingrese el nombre del producto deseado");

    // Validaciones
    validationEntry(userProductWant);
    validationType(userProductWant, "string");

    return userProductWant.toLowerCase();
  } catch (error) {
    handleError(error);
    return null;
  }
}
console.clear();
menuStore();
