console.clear()

var cart = []

var compras = []
//generar array con su fecha y precio

var z900 = {
    id: 'nin-2R',
    brand: 'kawasaki',
    model: 'z-900',
    price: 10750,
}

var H2R = {
    id: 'z-9',
    brand: 'kawasaki',
    model: 'Ninja H2R',
    price: 55000,
}

var s1000 = {
    id: 's-1',
    brand: 'bmw',
    model: 'S1000 RR',
    price: 24000,
}

var r1250RS = {
    id: 'r-1250',
    brand: 'bmw',
    model: 'r 1250 RS',
    price: 18000,
}

var R1 = {
    id: 'R1',
    brand: 'yamaha',
    model: 'R1',
    price: 23000,
}

var mt_07 = {
    id: 'mt-07',
    brand: 'yamaha',
    model: 'MT-07',
    price: 8000,
}

var CBR650R = {
    id: 'cb-650R',
    brand: 'honda',
    model: 'CBR650R',
    price: 10500,
}

var CB1000R = {
    id: 'cb-1000',
    brand: 'honda',
    model: 'CB1000R',
    price: 15250,
}

var PANIGALE_V4 = {
    id: 'pan-v4',
    brand: 'ducati',
    model: 'PANIGALE V4',
    price: 32000,
}

var STREETFIGHTER_V2 = {
    id: 'str-V2',
    brand: 'ducati',
    model: 'STREETFIGHTER V2',
    price: 17000,
}

var products = [z900, H2R, s1000, r1250RS, R1, mt_07, CBR650R, CB1000R, PANIGALE_V4, STREETFIGHTER_V2]

function getStarted() {
    var operations = prompt(`What do you want to do?
                        1.List products
                        2. Add product to cart
                        3. Get cart total amount
                        4. Checkout cart
                        5. Search products
                        6. List orders`)

    if (isNaN(operations) ||
        operations > 6 ||
        operations == null ||
        operations < 1
    ) {
        alert('Please write a valid number')
        getStarted()
    } else {
        switch (operations) {
            case '1':
                listProducts()
                break;
            case '2':
                addProductToCart()
                break;
            case '3':
                getCartAmount()
                break;
            case '4':
                checkoutCart()
                break;
            case '5':
                searchProducts()
                break;
            case '6':
                listOrders()
                break;
        }
    }
}

function listProducts() {
    console.table(products)
    interact()
}


function addProductToCart() {
    console.table(products);
    var productId = prompt('Select product Id');
    var foundProduct = null;

    // Buscar el producto en la lista con un for
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            foundProduct = products[i];
            break;
        }
    }

    if (foundProduct === null) {
        alert('Please select a correct Id');
        return addProductToCart();
    }

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            alert('Product already added to cart');
            return addProductToCart();
        }
    }

    cart.push(foundProduct);
    console.log(cart);
    alert('Product added to cart');

    interact()
}


function getCartAmount() {
    var amount = 0
    if (cart.length != 0) {
        for (let i = 0; i < cart.length; i++) {
            amount += cart[i].price
        }
        alert(`Amount: ${amount}`)
    }
    else {
        alert('You have not added any product at the cart')
        getStarted()
    }
}

function checkoutCart() {

}

function searchProducts() {

}

function listOrders() {

}

function interact() {
    var cont = prompt('Do you want to keep interacting? (yes (y) or no (n)')

    if (cont === 'y') {
        getStarted()
    }
    else {
        alert('See you')
    }
}
//console.table(products)

getStarted()