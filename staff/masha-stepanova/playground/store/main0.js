// DATA

var greenApples = {
    id: 'gr-ap-1',
    name: 'Green apples "Golden", 1 kg',
    type: 'apples',
    price: 2.5,
    stock: 10
}

var redApples = {
    id: 're-ap-1',
    name: 'Red apples "Fuji", 1 kg',
    type: 'apples',
    price: 3.5,
    stock: 10
}

var bananas = {
    id: 'ca-ba-1',
    name: 'Canarian bananas, 1 kg',
    type: 'bananas',
    price: 3,
    stock: 10
}

var oranges = {
    id: 'si-or-1',
    name: 'Sicilian oranges, 1 kg',
    type: 'oranges',
    price: 2.5,
    stock: 10
}

var strawberries1 = {
    id: 'st-1',
    name: 'Strawberries, 1 kg',
    type: 'strawberries',
    price: 7,
    stock: 10
}

var strawberries500 = {
    id: 'st-500',
    name: 'Strawberries, 500 gr',
    type: 'strawberries',
    price: 4,
    stock: 10
}

var blueberries = {
    id: 'bl-300',
    name: 'Blueberies, 300 gr',
    type: 'blueberries',
    price: 3,
    stock: 10
}

var kiwi = {
    id: 'ki-1',
    name: 'Kiwi, 1kg',
    type: 'strawberries',
    price: 5,
    stock: 10
}

var potatoes = {
    id: 'po-5',
    name: 'Potatoes, 5kg',
    type: 'potatoes',
    price: 5.5,
    stock: 10
}

var carrots = {
    id: 'ca-1',
    name: 'Carrots, 1kg',
    type: 'carrots',
    price: 1.5,
    stock: 10
}

var tomatoes = {
    id: 'to-2',
    name: 'Tomatoes, 2kg',
    type: 'tomatoes',
    price: 3.5,
    stock: 10
}

var cabbages = {
    id: 'cab-1',
    name: 'Cabbage, 1 item',
    type: 'cabbages',
    price: 2,
    stock: 10
}

var eggplant = {
    id: 'egp-1',
    name: 'Eggplants, 2 items',
    type: 'eggplants',
    price: 4,
    stock: 10
}

var onion = {
    id: 'on-3',
    name: 'Onions, 3kg',
    type: 'onions',
    price: 3,
    stock: 10
}

var productsList = [greenApples, redApples, bananas, oranges, strawberries1, strawberries500, blueberries, kiwi, potatoes, carrots, tomatoes, cabbages, eggplant, onion]
var cart = []
var productQuantity
var productId
var continueShopping = true

// PRESENTATION


function chooseShoppingOption() {
    var action = prompt(`Please, choose what you would like to do:
        1 - see all products
        2 - search for products
        3 - add product to the cart
        4 - see total of the cart
        5 - cart checkout
        6 - see shopping history`)
    
    try {
        validateOption(action) 
        shopping(action)
    } catch (error) {
        alert(error.message) 
        console.log(error)
        chooseShoppingOption()
    }
}

function showProductsList() {
    try {
        console.table(getProductsList())
    } catch(error) {
        alert(error.message)
        console.log(error)
    }
}

function showCart() {
    try {
        console.table(getCart())
    } catch(error) {
        alert(error.message)
        console.log(error)
    }
}

function checkout() {
    try {
        console.table(generateReciept())
    } catch(error) {
        alert(error.message)
        console.log(error)
    }
}

function showShoppingHistory() {
    try {
        console.table(generateHistory())
    } catch(error) {
        alert(error.message)
        console.log(error)
    }
}

function askForProduct() {
    var productId = prompt('Please, introduce the item ID')
    var productQuantity = prompt('Please, introduce desired quantity')
    var product = checkProductStock(productId, productQuantity) 
    
    try {
        checkProductStock(productId, productQuantity) 
        addToCart(product, productQuantity)
        alert(`The item '${cart[cart.length - 1]['name']}' is added to cart!`)

    } catch(error) {
        alert(error.message)
        console.log(error)
        askForProduct()
    }
}

function filterProducts() {
    var filter = prompt('What would you like to search now?')
    
    try {
        var foundProduct = checkProductExistance(filter)
        console.table(addFoundProduct(foundProduct))
    } catch(error) {
        alert(error.message)
        console.log(error)
    }
}


// LOGIC

function validateOption(option) {
    var validOptions = '123456'
    var isValid = false
    for (var i = 0; i < validOptions.length; i++) {
        if (option === validOptions[i]) {
            return true
    }
    }
    if (!isValid)
    throw new Error('Invalid option')
}

function shopping(action) {

    switch(action) {
        case '1':
            showProductsList()
            break
        case '2':
            filterProducts()
            break
        case '3':
            askForProduct()
            break
        case '4':
            showCart()
            break
        case '5':
            generateReciept()
            break
        case '6':
            shoppingHistory()
            break
            
    }
}

function getProductsList() {
    return productsList
}

function getCart() {
    return cart
}

function generateReciept() {
    var reciept = []
    var total = 0
    var tax = 0
    var basePrice = 0

    for (var i = 0; i < cart.length; i++) {
        reciept[reciept.length] = cart[i]
        total += cart[i]['price'] * cart[i]['quantity']
    }

    tax = total * 0.21
    basePrice = total * 0.79
    
    reciept.push(`Base price: ${basePrice} €`)
    reciept.push(`Taxes: ${tax} €`)
    reciept.push(`Total: ${total} €`)
    reciept.push(Date())
    cart = []

    return reciept
}

function generateHistory() {
    var generatedHistory = []

    for (var i = 0; i < reciept.length; i++) {
        hist.unshift(reciept[i])
    }

    return generatedHistory
}

function checkProductStock(productId, productQuantity) {
    for (var i = 0; i < productsList.length; i++) {
        if (productsList[i]['id'] === productId) {
            if (productsList[i]['stock'] >= productQuantity) 
                return productsList[i]
        }
    }
}

function addToCart(product, productQuantity) {
    product['stock'] -= +productQuantity
    cart[cart.length] = {...product}
    delete cart[cart.length - 1]['stock']
    cart[cart.length - 1]['quantity'] = +productQuantity
    
}

function checkProductExistance(filter) {
    for (var i = 0; i < productsList.length; i++) {
        for (var prop in productsList[i]) {
            if (productsList[i][prop] === filter) {
                return productsList[i]
            }
        }
    }
    throw new Error('This product does not exist')
}

function addFoundProduct(foundProduct) {
    var searchResult = []
    searchResult.push(foundProduct)   
    return searchResult
}

while (continueShopping) {
    chooseShoppingOption()
    var askToContinue = prompt('Do you want to continue shopping?')
    if (askToContinue === 'n' || askToContinue === 'no' || askToContinue === null) {
        continueShopping = false
    }
}