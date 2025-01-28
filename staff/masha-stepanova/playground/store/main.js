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

function filterProducts() {
    var filter = prompt('What would you like to search now?').toLowerCase
    var searchResult = []
    var productIsFound = false
    for (var i = 0; i < productsList.length; i++) {
        for (var prop in productsList[i]) {
            if (productsList[i][prop] === filter) {
                productIsFound = true
                searchResult.push(productsList[i])           
            }
        }
    }
    if (!productIsFound) {
        return 'We couldn\'t find anything with this name'
    }
    console.table(searchResult)
}

var cart = []

function addToCart() {
    var askForItem = prompt('Please, introduce the item ID')
    var askForQuantity = prompt('Please, introduce desired quantity')
    var productIsAdded = false

    for (var i = 0; i < productsList.length; i++) {
        if (productsList[i]['id'] === askForItem) {
            if (productsList[i]['stock'] > 0) {
                productIsAdded = true
                productsList[i]['stock'] -= +askForQuantity
                cart[cart.length] = {...productsList[i]}
                delete cart[cart.length - 1]['stock']
                cart[cart.length - 1]['quantity'] = +askForQuantity
            } else {
            alert('There\'s not enough stock to add a product')
            }
        }
    }

    if (productIsAdded) {
        console.log(`The item '${cart[cart.length - 1]['name']}' is added to cart!`)
    } else {
        console.log('We don\'t have any product with this ID')
    }
}

function showList() {console.table(productsList)}

function showCart() {console.table(cart)}

var reciept = []
var hist = []

function generateReciept() {
    reciept = []
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
    
    for (var i = 0; i < reciept.length; i++) {
        hist.unshift(reciept[i])
    }

    cart = []
    console.table(reciept)
}

function shoppingHistory() {console.table(hist)}

function shopping() {
    var action = prompt(`Please, choose what you would like to do:
    1 - see all products
    2 - search for products
    3 - add product to the cart
    4 - see total of the cart
    5 - cart checkout
    6 - see shopping history`)

    switch(action) {
        case '1':
            showList()
            break
        case '2':
            filterProducts()
            break
        case '3':
            addToCart()
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

var continueShopping = true
    
while (continueShopping) {
shopping()
var askToContinue = prompt('Do you want to continue shopping?')
if (askToContinue === 'n' || askToContinue === 'no' || askToContinue === null) {
    continueShopping = false
}
}
