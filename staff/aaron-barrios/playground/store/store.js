console.clear()

var cart = []

var checkout = []

var admin = 'sisoy'
var attempts = 3

var z900 = {
    id: 'nin-2R',
    brand: 'kawasaki',
    model: 'z-900',
    price: 10750,
    engine: '4-stroke, 4 cylinder, 16 valves',
    cilinderCapacity: '948CC',
    stock: 2
}

var H2R = {
    id: 'z-9',
    brand: 'kawasaki',
    model: 'Ninja H2R',
    price: 55000,
    engine: '4-stroke, 4 cylinder, 16 valves',
    cilinderCapacity: '998CC',
    stock: 2
}

var s1000 = {
    id: 's-1',
    brand: 'bmw',
    model: 'S1000 RR',
    price: 24000,
    engine: '4-stroke, 4 cylinders, 4 valves',
    cilinderCapacity: '999CC',
    stock: 2
}

var r1250RS = {
    id: 'r-1250',
    brand: 'bmw',
    model: 'r 1250 RS',
    price: 18000,
    engine: '4-stroke, 4 cylinders, 4 valves',
    cilinderCapacity: '1254CC',
    stock: 2
}

var R1 = {
    id: 'R1',
    brand: 'yamaha',
    model: 'R1',
    price: 23000,
    engine: '4-stroke, 4 cylinders, 4 valves',
    cilinderCapacity: '998CC',
    stock: 2
}

var mt_07 = {
    id: 'mt-07',
    brand: 'yamaha',
    model: 'MT-07',
    price: 8000,
    engine: '4-stroke, 2 cylinders, 4 valves',
    cilinderCapacity: '689CC',
    stock: 2
}

var CBR650R = {
    id: 'cb-650R',
    brand: 'honda',
    model: 'CBR650R',
    price: 10500,
    engine: '4-stroke, 4 cylinders, 16 valves',
    cilinderCapacity: '649CC',
    stock: 2
}

var CB1000R = {
    id: 'cb-1000',
    brand: 'honda',
    model: 'CB1000R',
    price: 15250,
    engine: '4-stroke, 4 cylinders, 16 valves',
    cilinderCapacity: '998CC',
    stock: 2
}

var PANIGALE_V4 = {
    id: 'pan-v4',
    brand: 'ducati',
    model: 'PANIGALE V4',
    price: 32000,
    engine: '4-stroke, 4 cylinders, 4 valves',
    cilinderCapacity: '1103CC',
    stock: 2
}

var STREETFIGHTER_V2 = {
    id: 'str-V2',
    brand: 'ducati',
    model: 'STREETFIGHTER V2',
    price: 17000,
    engine: '4-stroke, 2 cylinders, 4 valves',
    cilinderCapacity: '890CC',
    stock: 2
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
                        8. Add product
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
            case '8':
                checkAdmin()
                break;
            case '9':
                filterProducts()
                break;
        }
    }
}

function listProducts() {
    console.table(products)
    interact()
}

function findProductById(id, arr) {
    var product = {}

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            product = arr[i]
            return product
        }
    }
}

function addProductToCart() {
    console.table(products);
    var productId = prompt('Select product Id');
    var foundProduct

    var units = 0

    foundProduct = findProductById(productId, products, foundProduct)


    if (foundProduct === null) {
        alert('Please select a correct Id');
        return addProductToCart();
    }

    units = prompt('How many units do you want to add??')

    while (units > foundProduct.stock) {
        alert(`There's just ${foundProduct.stock} ${foundProduct.model} in stock currently.`)
        units = prompt('How many units do you want to add??')
    }

    if (units <= foundProduct.stock && units > 1) {
        foundProduct.units = units
        if (confirm(`Do you want to add ${foundProduct.model} to the cart?`)) {
            cart[cart.length] = foundProduct //push
            foundProduct.stock -= units
            foundProduct.date = new Date()
            console.table(products)
            console.table(cart);
            alert('Product added to cart');
            interact()
        } else {
            interact()
        }
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
        interact()
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
    var found

    found = findProductById(searchedProduct, products, found)
    console.log(found)
    interact()

    if (found === null) {
        alert('Product not found')
        return searchProducts()
    }
}

function listOrders() {
    console.table(checkout)
    interact()
}

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

function addProduct() {
    var newProduct = {
        id: '',
        brand: '',
        model: '',
        price: 0,
        engine: '',
        cilinderCapacity: '',
        stock: 0
    }

    var id = prompt('Please could you send the new product id?')
    newProduct.id = id

    var brand = prompt('Please could you send the new product brand?')
    newProduct.brand = brand

    var model = prompt('Please could you send the new product model?')
    newProduct.model = model

    var price = Number(prompt('Please could you send the new product price?'))
    newProduct.price = price

    var engine = prompt('Please could you send the new product engine?')
    newProduct.engine = engine

    var cilinderCapacity = prompt('Please could you send the new product cilinderCapacity?')
    newProduct.cilinderCapacity = cilinderCapacity

    var stock = Number(prompt('Please could you send the new product stock?'))
    newProduct.stock = stock

    products[products.length] = newProduct
    console.table(products)
    interact()
}

function checkAdmin() {
    var password = prompt('Hey admin, LOG IN')

    if (attempts > 0) {
        if (password === admin) {
            return addProduct()
        } else {
            attempts--
            if (attempts > 0) {
                alert(`Dafuck. Are you not the admin? You have ${attempts} attempts left.`)
                checkAdmin()
            } else {
                alert('Fuck u hacker')
                interact()
            }
        }
    }
}


function filterProducts() {
    console.table(products)
    var searchedProduct = prompt('Search product brand')
    var foundProductBrand = []
    var found = null

    for (let i = 0; i < products.length; i++) {
        if (products[i].brand === searchedProduct) {
            found = products[i]
            foundProductBrand.push(found)
        }
    }

    console.table(foundProductBrand)

    searchedProduct = prompt('Select product model')
    for (let j = 0; j < foundProductBrand.length; j++) {
        if (foundProductBrand[j].brand === searchedProduct) {
            found = foundProductBrand[j]
            break
        }
    }

    console.table(found)

    if (found === null) {
        alert('Product not found')
        return filterProducts()
    }
}

getStarted()