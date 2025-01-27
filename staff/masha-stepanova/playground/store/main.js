var greenApples = {
    id: 'gr-ap-1kg',
    name: 'Green apples "Golden", 1 kg',
    type: 'fruits',
    price: 2.5,
}

var redApples = {
    id: 're-ap-1kg',
    name: 'Red apples "Fuji", 1 kg',
    type: 'fruits',
    price: 3.5
}

var bananas = {
    id: 'ca-ba-1kg',
    name: 'Canarian bananas, 1 kg',
    type: 'fruits',
    price: 3
}

var oranges = {
    id: 'si-or-1kg',
    name: 'Sicilian oranges, 1 kg',
    type: 'fruits',
    price: 2.5
}

var strawberries1 = {
    id: 'straw-1kg',
    name: 'Strawberries, 1 kg',
    type: 'fruits',
    price: 7
}

var strawberries500 = {
    id: 'straw-500gr',
    name: 'Strawberries, 500 gr',
    type: 'fruits',
    price: 4
}

var productsList = [greenApples, redApples, bananas, oranges, strawberries1, strawberries500]

function filterProducts() {
    var filter = prompt('What would you like to search now?')
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

    while (askForQuantity > 0) {
    for (var i = 0; i < productsList.length; i++) {
            if (productsList[i]['id'] === askForItem) {
                productIsAdded = true
                cart[cart.length] = productsList[i]
                // cart[cart.length - 1]['quantity'] = askForQuantity
                askForQuantity--
            }
    }
    }
    if (productIsAdded) {
        console.log(`The item is added to cart!`)
    } else {
        console.log('We don\'t have any product with this ID')
    }
}

function showList() {console.table(productsList)}

function showCart() {console.table(cart)}

var reciept = []
var total = 0
var tax = 0
var basePrice = 0
var hist = []

function generateReciept() {
    reciept = []
    for (var i = 0; i < cart.length; i++) {
        reciept[reciept.length] = cart[i]
        total += cart[i]['price']
    }

    tax = total * 0.21
    basePrice = total * 0.79
    
    reciept.push(`Base price: ${basePrice} €`)
    reciept.push(`Taxes: ${tax} €`)
    reciept.push(`Total: ${total} €`)
    reciept.push(Date())
    hist.push(cart)
    cart = []
    console.table(reciept)
    
}


function shoppingHistory() {
    console.table(hist)
}

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
