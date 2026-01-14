var data = {}
var logic = {}
var interface = {}

data.greenApples = {
    id: 'gr-ap-1',
    name: 'Green apples "Golden", 1 kg',
    type: 'apples',
    price: 2.5,
    stock: 10
}

data.redApples = {
    id: 're-ap-1',
    name: 'Red apples "Fuji", 1 kg',
    type: 'apples',
    price: 3.5,
    stock: 10
}

data.bananas = {
    id: 'ca-ba-1',
    name: 'Canarian bananas, 1 kg',
    type: 'bananas',
    price: 3,
    stock: 10
}

data.oranges = {
    id: 'si-or-1',
    name: 'Sicilian oranges, 1 kg',
    type: 'oranges',
    price: 2.5,
    stock: 10
}

data.productNameawberries1 = {
    id: 'st-1',
    name: 'Strawberries, 1 kg',
    type: 'productNameawberries',
    price: 7,
    stock: 10
}

data.productNameawberries500 = {
    id: 'st-500',
    name: 'Strawberries, 500 gr',
    type: 'productNameawberries',
    price: 4,
    stock: 10
}

data.blueberries = {
    id: 'bl-300',
    name: 'Blueberies, 300 gr',
    type: 'blueberries',
    price: 3,
    stock: 10
}

data.kiwi = {
    id: 'ki-1',
    name: 'Kiwi, 1kg',
    type: 'productNameawberries',
    price: 5,
    stock: 10
}

data.potatoes = {
    id: 'po-5',
    name: 'Potatoes, 5kg',
    type: 'potatoes',
    price: 5.5,
    stock: 10
}

data.carrots = {
    id: 'ca-1',
    name: 'Carrots, 1kg',
    type: 'carrots',
    price: 1.5,
    stock: 10
}

data.tomatoes = {
    id: 'to-2',
    name: 'Tomatoes, 2kg',
    type: 'tomatoes',
    price: 3.5,
    stock: 10
}

data.cabbages = {
    id: 'cab-1',
    name: 'Cabbage, 1 item',
    type: 'cabbages',
    price: 2,
    stock: 10
}

data.eggplant = {
    id: 'egp-1',
    name: 'Eggplants, 2 items',
    type: 'eggplants',
    price: 4,
    stock: 10
}

data.onion = {
    id: 'on-3',
    name: 'Onions, 3kg',
    type: 'onions',
    price: 3,
    stock: 10
}

data.productsList = [data.greenApples, data.redApples, data.bananas, data.oranges, data.productNameawberries1, data.productNameawberries500, data.blueberries, data.kiwi, data.potatoes, data.carrots, data.tomatoes, data.cabbages, data.eggplant, data.onion]
data.cart = []
data.productQuantity
data.productId
data.continueShopping = true
data.receipt = []
data.generatedHistory = []

// PRESENTATION


interface.chooseShoppingOption = function () {
    var action = prompt(`Please, choose what you would like to do:
        1 - see all products
        2 - search for products
        3 - add product to the cart
        4 - see total of the cart
        5 - cart checkout
        6 - see shopping history`)

    try {
        logic.validateOption(action)
        logic.shopping(action)
    } catch (error) {
        alert(error.message)
        console.log(error)
        interface.chooseShoppingOption()
    }
}

interface.showProductsList = function () {
    try {
        console.table(logic.getProductsList())
    } catch (error) {
        alert(error.message)
        console.log(error)
    }
}

interface.showCart = function () {
    try {
        console.table(logic.getCart())
    } catch (error) {
        alert(error.message)
        console.log(error)
    }
}

interface.checkout = function () {
    try {
        console.table(logic.generatereceipt())
    } catch (error) {
        alert(error.message)
        console.log(error)
    }
}

interface.showShoppingHistory = function () {
    try {
        console.table(logic.generateHistory())
    } catch (error) {
        alert(error.message)
        console.log(error)
    }
}

interface.askForProduct = function () {
    data.productId = prompt('Please, introduce the item ID')
    data.productQuantity = prompt('Please, introduce desired quantity')
    var product = logic.checkProductStock(data.productId, data.productQuantity)

    try {
        logic.checkProductStock(data.productId, data.productQuantity)
        logic.addToCart(product, data.productQuantity)
        alert(`The item '${data.cart[data.cart.length - 1]['name']}' is added to cart!`)

    } catch (error) {
        alert(error.message)
        console.log(error)
        interface.askForProduct()
    }
}

interface.filterProducts = function () {
    var filter = prompt('What would you like to search now?')

    try {
        var foundProduct = logic.checkProductExistance(filter)
        console.table(logic.addFoundProduct(foundProduct))
    } catch (error) {
        alert(error.message)
        console.log(error)
    }
}

logic.validateOption = function (productName) {
    var validOptions = '123456'
    var isValid = false
    for (var i = 0; i < validOptions.length; i++) {
        if (productName === validOptions[i]) {
            return true
        }
    }
    if (!isValid)
        throw new Error('Invalid option')
}

interface.shopping = function (productName) {

    switch (productName) {
        case '1':
            interface.showProductsList()
            break
        case '2':
            interface.filterProducts()
            break
        case '3':
            interface.askForProduct()
            break
        case '4':
            interface.showCart()
            break
        case '5':
            interface.checkout()
            break
        case '6':
            interface.showShoppingHistory()
            break

    }
}

logic.getProductsList = function () {
    return data.productsList
}

logic.getCart = function () {
    return data.cart
}

logic.generatereceipt = function () {
    data.receipt = []
    var total = 0
    var tax = 0
    var basePrice = 0

    for (var i = 0; i < data.cart.length; i++) {
        data.receipt[data.receipt.length] = data.cart[i]
        total += data.cart[i]['price'] * data.cart[i]['quantity']
    }

    tax = total * 0.21
    basePrice = total * 0.79

    data.receipt[data.receipt.length] = `Base price: ${basePrice} €`
    data.receipt[data.receipt.length] = `Taxes: ${tax} €`
    data.receipt[data.receipt.length] = `Total: ${total} €`
    data.receipt[data.receipt.length] = Date()
    data.cart = []
    // logic.generateHistory(data.receipt)

    return data.receipt
}

logic.generateHistory = function () {

    for (var i = data.receipt.length - 1; i >= 0; i--) {
        data.generatedHistory[data.generatedHistory.length] = data.receipt[i]
    }

    return data.generatedHistory
}

logic.checkProductStock = function (id, quantity) {
    for (var i = 0; i < data.productsList.length; i++) {
        if (data.productsList[i]['id'] === id) {
            if (data.productsList[i]['stock'] >= quantity)
                return data.productsList[i]
        }
    }

    throw new Error('Not enough stock')
}

logic.addToCart = function (prod, quantity) {
    for (var i = 1; i > 0; i--) {
        prod['stock'] -= +quantity

        data.cart[data.cart.length] = { ...prod }

        delete data.cart[data.cart.length - 1]['stock']

        data.cart[data.cart.length - 1]['quantity'] = +quantity

        return data.cart
    }

    throw new Error('Couldn\'t add to cart')
}

logic.checkProductExistance = function (productName) {
    for (var i = 0; i < data.productsList.length; i++) {
        for (var prop in data.productsList[i]) {
            if (data.productsList[i][prop] === productName) {
                return data.productsList[i]
            }
        }
    }

    throw new Error('This product does not exist')
}

logic.addFoundProduct = function (productName) {
    var searchResult = []
    searchResult.push(productName)
    return searchResult
}

while (data.continueShopping) {
    interface.chooseShoppingOption()
    var askToContinue = prompt('Do you want to continue shopping?')
    if (askToContinue === 'n' || askToContinue === 'no' || askToContinue === null) {
        data.continueShopping = false
    }
}