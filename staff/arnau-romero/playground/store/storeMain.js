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
    // Main user interface.

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
    // Function to search a product in the store.
    var productToSearch = prompt('What product do you want to search? ')
    try {
        var productToShow = logic.doSearchProducts(productToSearch)
        alert('Yes we have ' + productToShow + 's')
    } catch (error) {
        alert(error.message)
    }
}

interface.wantCartSummary = function() {
    // Function to have a summary actual of the cart.
    try {
        logic.doCartSummary()
    } catch (error) {
        alert(error.message)
    }
}

interface.checkoutCartProducts = function() {
    // Function to calculate the total price of the cart.
    try {
        var totalPriceShow = logic.doCheckoutProducts()
        // Assigned the value of the function to show latter.
        alert('The total price of your cart is: ' + totalPriceShow + '€')

    } catch (error) {
        alert(error.message)
    }
}

interface.productToCart = function() {
    // Function to add a product an the quantity of this to your cart.
    var productCart = prompt('What product do you want to add at the cart? ')
    var productQuantity = prompt('How many ' + productCart + 's' + ' do you want to add to the cart? ')
    try {
        logic.addProductToCart(productCart, productQuantity)
    } catch (error) {
        alert(error.message)
    }
}

interface.shoppingHistory = function() {
    // The history of your shopping. (carts that you did checkout)
    try {
        logic.shoppingHistory()
    } catch (error) {
        alert(error.message)
    }
}

interface.autoMode = function() {
    // Shopping in automode.
    if (data.action === false) {
        try {
            alert('Welcome to our shop! :)')
            logic.autoMode()
        } catch (error) {
            alert(error)
        }
    } else
        alert('Thanks for shopping!')
}

// LOGIC
logic.autoMode = function() {
    // Shopping in automode.
    do {
        interface.selectOption()
    } while (data.action === false)interface.autoMode()
}

logic.shoppingHistory = function() {
    // The history of your shopping. (carts that you did checkout)
    console.log(data.cartHistory)
}

logic.doSearchProducts = function(searchProduct) {
    // Search a product of the list products.
    for (var i = 0; i < data.products.length; i++) {
        // Iterate for the products list.
        if (searchProduct.toLowerCase() === data.products[i]['name'].toLowerCase()) {
            // If the product exist.
            return data.products[i]['name']
            // We return that to the function.
        }
    }
    throw new Error('Product not found')
    // If the product does not exist we throw an error.
}

logic.doCheckoutProducts = function() {
    // Calculate the total price of your cart.
    var totalPrice = 0
    for (var i = 0; i < data.productsCart.length; i++) { // Iterate the cart.    
        totalPrice += (data.productsCart[i].price * data.productsCart[i].quantity)  // Add the price of the products multiplied by the quantity.
    }
        data.cartHistory.push(data.productsCart) // Add this cart to the history shopping.    
        data.productsCart = [] // Empty the value of the cart. 
         return totalPrice
}

logic.doCartSummary = function() {
    // A summary of your actually cart
    console.table(data.productsCart)
}

logic.selectOption = function(action) {
    // Select action you want to do.
    switch (action) {
    case '1':
        // Show list products
        interface.listProducts()
        break
    case '2':
        // Search a product.
        interface.searchProducts()
        break
    case '3':
        // Add a product to your cart.
        interface.productToCart()
        break
    case '4':
        // Show the current status of your cart.
        interface.wantCartSummary()
        break
    case '5':
        // Payment gateway.
        interface.checkoutCartProducts()
        break
    case '6':
        // Shopping history.
        interface.shoppingHistory()
        break
    case 'exit':
        // Go out of the shop.
        data.action = true
        break

    default:
        // If you put something not contemplated we throw error.
        throw new Error('Not valid action')
        break
    }
}

logic.addProductToCart = function(productName, productQuantity) {
    // Function to add a product an the quantity of this to your cart.
    for (var i = 0; i < data.products.length; i++) {
        // Iterate the array of products. 
        if (productName.toLowerCase() === data.products[i].name.toLowerCase()) {
            // If the product exist in the store.
            data.productsCart.push(data.products[i]);
            // We can add the product to the cart.
            data.productsCart[i].quantity = productQuantity
            // And we add the quantity too.
            return
        }
    }
    throw new Error("Sorry, we don't have this product.")
    // If the product does not exist whe throw an error.
}

interface.autoMode()
