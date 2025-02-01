/*implement a store 
(with operations: 'list products', 'add product to cart', 'get cart total', 'checkout cart, 'search products', 'list orders')
1- List products: list of products that the store have to buy it. [m1]
2- Add a product to your cart. [u1]
3- Get the summary of your cart, the list final of the product that you selected. [m2]
4- The total sum of the products in your cart €€€. [m3]
5- A function to search a product in the list products of the store. [m4]
6- A history of the checkout orders that you have done. [m5]
*/
//DATA
var data = {}
var logic = {}
var interface = {}
data.action = false
data.productsCart = []
data.cartHistory = []
data.products = [{
    id: "ap",
    name: "apple",
    color: "green",
    price: 2,

}, {
    id: "st",
    name: "strawberry",
    color: "red",
    price: 1,
}, {
    id: "pi",
    name: "pinneaple",
    color: "yellow",
    price: 5,
}, ];

//INTERFACE

interface.listProducts = function() {
    //Show list products interface [m1]
    console.table(data.products)
}

interface.selectOption = function() {

    var selectionUsuari = prompt(`Please, choose what you would like to do:
        1 - See the list products
        2 - Search one product
        3 - Add product to the cart
        4 - Summary of your cart
        5 - Cart checkout
        6 - See shopping history
        *write exit to go out`)

    try {
        logic.selectOption(selectionUsuari)
    } catch (error) {  
        alert(error.message)
    }
}

interface.searchProducts = function() {
    var productToSearch = prompt('What product do you want to search? ')
    try {
        var productToShow = logic.doSearchProducts(productToSearch)
        alert('Yes we have ' + productToShow +'s')
    } catch (error) {
        alert(error.message)
    }
}

interface.wantCartSummary = function() {
    try {
        logic.doCartSummary()
    } catch (error) {
        alert(error.message)
    }
}

interface.checkoutCartProducts = function() {
    try {
          var totalPriceShow = logic.doCheckoutProducts()
            alert(totalPriceShow + '€')
        
    } catch (error) {
        alert(error.message)
    }
}

interface.productToCart = function() {
    var productCart = prompt('What product do you want to add at the cart? ')
    var productQuantity = prompt('How many ' + productCart +'s' + ' do you want to add to the cart? ')
    try {
        logic.addProductToCart(productCart,productQuantity)
    } catch (error) {
        alert(error.message)
    }
}

interface.shoppingHistory = function(){
     try {
        logic.shoppingHistory()
    } catch (error) {
        alert(error.message)
    }
}

interface.autoMode = function(){
   if(data.action === false){
    try{
        alert('Welcome to our shop! :)')
        logic.autoMode()
    }catch(error){
        alert(error)
    }
   }else alert('Thanks for shopping!')
}

// LOGIC
logic.autoMode = function(){
    do{
        interface.selectOption()
    }while(data.action === false)
    interface.autoMode()
}


logic.shoppingHistory = function(){
    console.log(data.cartHistory)
}

logic.doSearchProducts = function(searchProduct) {
    // Search a product of the list products.
    for (var i = 0; i < data.products.length; i++) {
        if (searchProduct.toLowerCase() === data.products[i]['name'].toLowerCase()) {
            return data.products[i]['name']
        }
    }
    throw new Error('Product not found')
}

logic.doCheckoutProducts = function() {// Calculate the total price of your cart.
     var totalPrice = 0
    for (var i = 0; i < data.productsCart.length; i++) {
        totalPrice += (data.productsCart[i].price * data.productsCart[i].quantity) // Sumo al precio total el precio del producto x la cantidad
        } 
    data.cartHistory.push(data.productsCart) // Añado este carrito al historial de compras
    data.productsCart = [] // Vuelvo a dejar el carrrito vacio  
    return totalPrice
}

logic.doCartSummary = function() {// A summary of your actually cart
 console.table(data.productsCart)
}

logic.selectOption = function(action) {
    //select action you want to do.

    switch (action) {
    case '1': // Show list products
        interface.listProducts()
        break
    case '2': // Search a product
        interface.searchProducts()
        break
    case '3': // Añadir producto a carrito
        interface.productToCart()
        break
    case '4': // Mostrar el estado de tu carrito
        interface.wantCartSummary()
        break
    case '5': // Pasarela de pago
        interface.checkoutCartProducts()
        break
    case '6': // Historial de compras
        interface.shoppingHistory()
        break
    case 'exit':
        data.action = true
        break
      
    default :
        throw new Error('Not valid action')
        break
    }
   

}
    

logic.addProductToCart = function(productName,productQuantity) {
    // Add product to your cart.
    // if the product is in the list products, you can add to your cart.

    for (var i = 0; i < data.products.length; i++) {
        // Recorrer el array products
        if (productName.toLowerCase() === data.products[i].name.toLowerCase()) {
            // Si el producto existe en el array
            data.productsCart.push(data.products[i]);
            data.productsCart[i].quantity = productQuantity
            // Lo añadimos al carrito
            return
        } 
        
    } throw new Error("Sorry, we don't have this product.")
            // Si no existe lanzamos nuevo error.
}

interface.autoMode()