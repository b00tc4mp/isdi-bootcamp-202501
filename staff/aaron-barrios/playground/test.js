console.clear()

var cart = []

var checkout = []
//generar array con su fecha y precio

var z900 = {
    id: 'nin-2R',
    brand: 'kawasaki',
    model: 'z-900',
    price: 10750,
    units: 1
}

var H2R = {
    id: 'z-9',
    brand: 'kawasaki',
    model: 'Ninja H2R',
    price: 55000,
    units: 1
}

var s1000 = {
    id: 's-1',
    brand: 'bmw',
    model: 'S1000 RR',
    price: 24000,
    units: 1
}

var r1250RS = {
    id: 'r-1250',
    brand: 'bmw',
    model: 'r 1250 RS',
    price: 18000,
    units: 1
}

var R1 = {
    id: 'R1',
    brand: 'yamaha',
    model: 'R1',
    price: 23000,
    units: 1
}

var mt_07 = {
    id: 'mt-07',
    brand: 'yamaha',
    model: 'MT-07',
    price: 8000,
    units: 1
}

var CBR650R = {
    id: 'cb-650R',
    brand: 'honda',
    model: 'CBR650R',
    price: 10500,
    units: 1
}

var CB1000R = {
    id: 'cb-1000',
    brand: 'honda',
    model: 'CB1000R',
    price: 15250,
    units: 1
}

var PANIGALE_V4 = {
    id: 'pan-v4',
    brand: 'ducati',
    model: 'PANIGALE V4',
    price: 32000,
    units: 1
}

var STREETFIGHTER_V2 = {
    id: 'str-V2',
    brand: 'ducati',
    model: 'STREETFIGHTER V2',
    price: 17000,
    units: 1
}

var products = [z900, H2R, s1000, r1250RS, R1, mt_07, CBR650R, CB1000R, PANIGALE_V4, STREETFIGHTER_V2]

function getStarted() {
    var operations = prompt(`What do you want to do?
                        1.List products
                        2. Add product to cart
                        3. Get cart total amount
                        4. Checkout cart
                        5. Search products
                        6. List orders
                        7. Flash Offer
                        8. Compare products
                        9. Filter Products`)

    if (isNaN(operations) ||
        operations > 9 ||
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
            case '7':
                flashOffer()
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
            foundProduct = cart[i];
            cart[i].units++
            console.log(products)
            console.log(cart);
            alert('Product added to cart');
            return interact()
        }
    }
    if (confirm(`Do you want to add ${foundProduct.model} to the cart?`)) {
        cart.push(foundProduct);
        foundProduct.date = new Date()
        console.log(products)
        console.log(cart);
        alert('Product added to cart');
        getStarted()
    } else {
        getStarted()
    }
}


function getCartAmount() {
    var amount = 0
    if (cart.length != 0) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].units !== 1) {
                amount = cart[i].units * cart[i].price
            }
            if (cart[i].units === 1) {
                amount += cart[i].price
            }
        }
        alert(`Amount: ${amount}`)
    }
    else {
        alert('You have not added any product at the cart')
        getStarted()
    }
}

function checkoutCart() {
    var currentProduct

    if (cart.length <= 0) {
        alert('You have not purchased anything')
        return getStarted()
    } else {
        for (let i = 0; i < cart.length; i++) {
            cart[i].finalPrice = cart[i].price * 1.21
            currentProduct = cart[i]
            if (confirm(`Do you want to purchase ${currentProduct.model}?`))
                checkout.push(currentProduct)
        }

        cart = []
        console.table(checkout)
        interact()
    }
}

function searchProducts() {
    console.table(products)
    var searchedProduct = prompt('Search product Id')
    var found = null

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === searchedProduct) {
            found = products[i]
            console.log(found)
            interact()
            break
        }
    }

    if (found === null) {
        alert('Product not found')
        return searchProducts()
    }
}

function listOrders() {
    console.table(checkout)
    interact()
}

//CAMBIAR INTERACTS POR CONFIRMS!!!!
function interact() {
    var cont = prompt('Do you want to keep interacting? (yes (y) or no (n)')

    if (cont === 'y') {
        getStarted()
    } else {
        alert('See you')
    }
}

function flashOffer() {
    var productwOffer
    productwOffer = products[Math.floor(products.length * Math.random())]
    productwOffer.price *= 0.8
    alert(`Today's product on offer is ${productwOffer.model} 
        with a 20% discount at ${productwOffer.price} price!!`)
}

function compareProducts() {

}

function filterProducts() {
    var foundProduct = prompt('Search product brand')
    var found = null
    for (let i = 0; i < products.length; i) {

    }
}

getStarted()