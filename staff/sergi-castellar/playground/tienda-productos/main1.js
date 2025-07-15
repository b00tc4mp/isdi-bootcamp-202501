console.clear()
/// tienda de algun producto, descripcion, atributos, id, caracteristicas, precio... listar el producto, listar todas las de x caracteristica: ej filtrar por marca
// añadimos buscar el producto como añadido. añadir al carrito el producto... calcular el total del carrito. (tener en cuenta subtotal de 2 productos iguales, x ej)
//añadir productos → checkout → obtener factura → historial de pedidos
var fiatCinquecento = {
    id: 'fi-ci',
    brand: 'fiat',
    model: 'cinquecento',
    price: 10000,
    fuel: 'gasoline',
    doors: 3
}

var smartBrabus = {
    id: 'sm-br',
    brand: 'smart',
    model: 'brabus',
    price: 25000,
    fuel: 'gasoline',
    doors: 3
}

var opelCorsa = {
    id: 'op-co',
    brand: 'opel',
    model: 'corsa',
    price: 9000,
    fuel: 'diesel',
    doors: 5
}

var seatIbiza = {
    id: 'se-ib',
    brand: 'seat',
    model: 'ibiza',
    price: 15000,
    fuel: 'diesel',
    doors: 3
}
var fordFiesta = {
    id: 'fo-fi',
    brand: 'ford',
    model: 'fiesta',
    price: 12000,
    fuel: 'gasoline',
    doors: 5
}

var toyotaCorolla = {
    id: 'to-co',
    brand: 'toyota',
    model: 'corolla',
    price: 18000,
    fuel: 'hybrid',
    doors: 3
}

var volkswagenGolf = {
    id: 'vw-go',
    brand: 'volkswagen',
    model: 'golf',
    price: 22000,
    fuel: 'gasoline',
    doors: 5
}

var bmw3Series = {
    id: 'bm-3s',
    brand: 'bmw',
    model: '3 series',
    price: 35000,
    fuel: 'diesel',
    doors: 3
}

var audiA3 = {
    id: 'au-a3',
    brand: 'audi',
    model: 'a3',
    price: 28000,
    fuel: 'gasoline',
    doors: 5
}

var mercedesBenzCClass = {
    id: 'mb-cc',
    brand: 'mercedes-benz',
    model: 'c-class',
    price: 40000,
    fuel: 'diesel',
    doors: 5
}

var nissanJuke = {
    id: 'ni-ju',
    brand: 'nissan',
    model: 'juke',
    price: 15000,
    fuel: 'gasoline',
    doors: 5
}

var peugeot208 = {
    id: 'pe-20',
    brand: 'peugeot',
    model: '208',
    price: 13000,
    fuel: 'diesel',
    doors: 5
}

var renaultClio = {
    id: 're-cl',
    brand: 'renault',
    model: 'clio',
    price: 11000,
    fuel: 'gasoline',
    doors: 5
}

var kiaCeed = {
    id: 'ki-ce',
    brand: 'kia',
    model: 'ceed',
    price: 17000,
    fuel: 'diesel',
    doors: 5
}

var hondaCivic = {
    id: 'ho-ci',
    brand: 'honda',
    model: 'civic',
    price: 20000,
    fuel: 'gasoline',
    doors: 3
}

var products = [
    fiatCinquecento,
    smartBrabus,
    opelCorsa,
    seatIbiza,
    fordFiesta,
    toyotaCorolla,
    volkswagenGolf,
    bmw3Series,
    audiA3,
    mercedesBenzCClass,
    nissanJuke,
    peugeot208,
    renaultClio,
    kiaCeed,
    hondaCivic
]

//var productsCart = []
var productsCart = [kiaCeed, hondaCivic]

function functionMenu() {
    var functionSelected = parseInt(prompt('Select what you want to do:\n1. List products\n2. Add products to cart\n3. Get total cart\n4. Checkout cart\n5. Search products\n6. List orders'))
    switch (functionSelected){
        case 1:
            listProducts()
            break
            case 2:
                addToCart()
                break
                case 3:
            getTotalCart()
            break
        case 4: 
        proceedToCheckout()
        break
        case 5:
            searchProducts()
            break
            case 6:
                listPastOrders()
                break
            }
        }
        
        function listProducts() {
            console.table(products)
            alert(`The available cars are: ${arrayToStringText(products)}`)
            functionMenu()
        }
        
function addToCart() {
    console.table(products)
    var productSelected = {}
    var idProduct = prompt(`Insert the product ID shown in the product table`)
    var productFound = false
    for (var i = 0; i < products.length; i++) {
        if (products[i]['id'] === idProduct) {
            productSelected = products[i]
            productsCart[productsCart.length] = products[i]
            productFound = true
        }
    }
    if (productFound) {
        confirm(`Nice! ${productSelected.brand} ${productSelected.model} added to cart.\nDo you want to add another product?`) ? addToCart() : confirm(`Do you want to checkout now?`) ? proceedToCheckout() : functionMenu()
    } else {
        alert('Product not found, insert a valid id')
        addToCart()
    }
}

function getTotalCart() {
    confirm(`Your current cart includes ${productsCart.length} products and has a total cost of ${calculateTotalCart()}€\nDo you want to go to checkout now?`) ? proceedToCheckout() : functionMenu()
}

function calculateTotalCart() {
    var totalCartCost = 0
    for (var i = 0; i < productsCart.length; i++) {
        totalCartCost += productsCart[i].price
    }
    return totalCartCost
}

function proceedToCheckout() {
    confirm(`YOUR CURRENT CART:\n${arrayToStringList(productsCart)}\nTotal Cost: ${calculateTotalCart()}€\nDo you want proceed to the payment?`) ? generateInvoice() : functionMenu()
}

function generateInvoice() {
    confirm(`ISDI AUTOMOTIVE, SL\n`)////eliminar esto y hacer el iva en el checkout?
}

function calculateVat(product) {
    var vatPercent = 0.21
    var vatValue = product['price'] * vatPercent
    return vatValue
}

/*function searchProducts() {
    for (var i = 0; i < array.length; i++) {
        
    }
    }*/
   
   function printInvoice(array) {
       
       for (var i = 0; i < array.length; i++) {
        arrayToStringList(array[i])
        
    }
}

function listProductsByPropierty(propierty, value) { // comparar igualdad de valor de una propiedad dada
    var propierty = propierty
    for (var i = 0; i < products.length; i++) {
        if (products[i][propierty] === value) {
            filteredArray[filteredArray.length] = products[i]
        }
    }
    return filteredArray
}

function arrayToStringListWithVat(array) { // stringea un array con comas y punto final
    var arrayString = ''
    for (var i = 0; i < array.length; i++) {
        arrayString += `${(array[i].brand).toUpperCase()} ${(array[i].model).toUpperCase()}, ${array[i].price}€\n`
    }
    return arrayString
}

function arrayToStringList(array) { // stringea un array con comas y punto final
    var arrayString = ''
    for (var i = 0; i < array.length; i++) {
        arrayString += `${(array[i].brand).toUpperCase()} ${(array[i].model).toUpperCase()}, ${array[i].price}€\n`
    }
    return arrayString
}

function arrayToStringText(array) { // stringea un array con comas y punto final
    var arrayString = ''
    for (var i = 0; i < array.length; i++) {
        i < array.length - 2 ? arrayString += `${array[i].brand} ${array[i].model}, ` : i < array.length - 1 ? arrayString += `${array[i].brand} ${array[i].model} and ` : arrayString += `${array[i].brand} ${array[i].model}.`
    }
    return arrayString
}

function table() {
    console.table(products)
}

//functionMenu() 




