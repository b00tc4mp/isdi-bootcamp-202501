// DATA
var apple = {
    id: 'app-fruit',
    name: 'Fuji apple, 1 kg',
    type: 'fruit',
    price: 2.5,
}
var tomato = {
    id: 'tom-veg',
    name: 'Roma tomato, 1 kg',
    type: 'vegetable',
    price: 2,
}
var carrot = {
    id: 'car-veg',
    name: 'Nantes carrot, 1 kg',
    type: 'vegetable',
    price: 1.8,
}
var banana = {
    id: 'ban-fruit',
    name: 'Canary banana, 1 kg',
    type: 'fruit',
    price: 1.7,
}
var lettuce = {
    id: 'let-veg',
    name: 'Iceberg lettuce, 1 unit',
    type: 'vegetable',
    price: 1.2,
}
var melon = {
    id: 'mel-fruit',
    name: 'Cantaloupe melon, 1 unit',
    type: 'fruit',
    price: 3,
}
var strawberries = {
    id: 'str-fruit',
    name: 'Huelva strawberries, 1 kg',
    type: 'fruit',
    price: 2.5,
}
var productsList = [apple,tomato,carrot,banana,lettuce,melon,strawberries] //lista de productos
var userChoice = 0 
var validNumber = true 
var validtext = true
var idWishProduct = ''
var isInTheList = false
var indexProduct
var cart = []
var totalPrice = 0
var principalMenu = ['0: VER PRODUCTOS','1: BUSCAR PRODUCTO','2: AÑADIR PRODUCTO AL CARRO ','3: AÑADIR PRODUCTO NUEVO','4: VER EL CARRO','5: GENERAR RECIBO','6: VER HISTORIAL DE COMPRA']
var alphabet = 'aàábcdeéèfghiïíjklmnóòopqrstuüúvwxyz-'
var generalNameNewProduct = ''
var nameNewProduct = ''
var typeNewProduct = ''
var priceNewProduct = 0
var idNewProduct = ''
var generalNameNewProduct = {}
var somethingInTheCart = false
var buyingHistory = []
var receiptGenerate = false

// LOGIC

function numberOptionValidation(numberToCheck) { //comprobar numero valido (numero del 1 al máximo de opciones)
    validNumber = false
    if (numberToCheck >= 0 && numberToCheck < 100) {
        validNumber = true
    }
    return validNumber
}

function textAnswerValidation(textToCheck) { //comprobar texto valido (dentro del alfabet)
    validtext = false
    for (var i = 0; i < textToCheck.length; i++) {
        for (var j = 0; j < alphabet.length; j++) {
            if (textToCheck[i] === alphabet[j]) {
                validtext = true
            }
        }
    }
    return validtext
}

function productExist() {//comprueba que el producto exsite en la lista
    isInTheList = false
    indexProduct
    for (var i = 0; i < productsList.length; i++ ) {
        if (idWishProduct === productsList[i].id) {
            isInTheList = true
            indexProduct = i
        }
    }
    return isInTheList
}



function showTheOptionChoose() { //muestra la opcion elegida
    if (userChoice === 0) { 
        seeTheProducts()
    } else if (userChoice === 1) {
        askForTheProductId()
        searchAProduct()
    } else if (userChoice === 2) {
        askForTheProductId()
        textAnswerValidation(idWishProduct)
        productExist()
        addAProductToCart()
    } else if (userChoice === 3) {
        askForNewProduct()
        addNewProduct()
    } else if (userChoice === 4) {
        seeTheCart()
    } else if (userChoice === 5) {
        generateReceipt()
    } else if (userChoice === 6) {
        showBuyingHistory()
    }
}



function addAProductToCart() { //añade un producto al carro
    if (isInTheList === true) {
        cart[cart.length] = productsList[indexProduct]
        receiptGenerate = false
        somethingInTheCart = true
        console.log('The product with the id: ' + idWishProduct + ', has been add to the cart.')
    }
    else {
        showMessageIsWrong()
    }
}

function totalPriceCalculation() { //calcula el precio base total del carro
    totalPrice = 0
    for (var i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price
    }
    return totalPrice
}

function addNewProduct() { // añade el nuevo producto al la lista
    generalNameNewProduct = generalNameNewProduct.toLowerCase()
    
    nameNewProduct = nameNewProduct.toLowerCase()
    
    typeNewProduct = typeNewProduct.toLowerCase()
    
    priceNewProduct = Number(priceNewProduct)

    idNewProduct = String(generalNameNewProduct[0] + generalNameNewProduct[1] + generalNameNewProduct[2] + '-' + nameNewProduct[0] + nameNewProduct[1] + nameNewProduct[2])

    generalNameNewProduct = {
        id : idNewProduct,
        name : nameNewProduct,
        type : typeNewProduct,
        price : priceNewProduct,
    }
    productsList = [...productsList, generalNameNewProduct]
   // console.log(productsList)
}

function searchAProduct() { //buscar un producto
    productExist()
    if (isInTheList === true) {
        showTheProductSearch()
    }
    else {
        showMessageIsWrong()
    }
}

//PRESENTATCION

function showPrincipalMenu() { //se muestra el menu principal
    console.log(principalMenu)
}

function askWhatToDo() { //preguntar a usuario que quiere hacer en el menu
    userChoice = 0
    userChoice = prompt('What do you want to do? Write the number of the option you want to choose.\n- 0: VER PRODUCTOS \n- 1: BUSCAR PRODUCTO \n- 2: AÑADIR PRODUCTO AL CARRO\n- 3: AÑADIR PRODUCTO NUEVO\n- 4: VER EL CARRO\n- 5: GENERAR RECIBO\n- 6: VER HISTORIAL DE COMPRA ')
    userChoice = Number(userChoice)
}

function askForTheProductId() { //pregunta usuario el ID del producto 
    idWishProduct = prompt('What is the ID product ?')
}

function askForNewProduct() { //pregunta usuario las propiedades del nuevo producto
    generalNameNewProduct = prompt("You choose adding a new product. \nWhat wil be the new object general name? ")
    textAnswerValidation(generalNameNewProduct)
    nameNewProduct = prompt("What's the new object concrete name and the quantity? ex. Fuji apple, 1 kg")
    textAnswerValidation(nameNewProduct)
    typeNewProduct = prompt("Which kind of food is?")
    textAnswerValidation(typeNewProduct)
    priceNewProduct = prompt("What's the new object price?")
    numberOptionValidation(priceNewProduct)
}

function seeTheProducts() { //ver productos de la lista
    console.table(productsList)
    //showPrincipalMenu()
}

function seeTheCart() { // ver los productos del carro y el precio base
    if (somethingInTheCart) {
        console.table(cart)
        totalPriceCalculation()
        console.log('Total price: ' + totalPrice + ' €')
    }
    else {
        console.log("You haven't add any product in the cart")
    }
    
}

function showMessageIsWrong() { //muestra el mensaje de error segun que esta mal
    if (validtext === false) {
        console.log('This answer is not correct')
    } else if (validNumber === false) {
        console.log('This option is not correct')
    } else if (isInTheList === false) {
        console.log('Product not found ')
    }
}
    

function showTheProductSearch() { //muestra el producto que se estaba buscando
    console.log(productsList[indexProduct])
}

function generateReceipt() {
    if (numReceipt != 0) {
        console.table(cart)
        console.log('Taxes: ' + totalPrice*0.21 + '€')
        console.log('Base price: ' + totalPrice*0.79 + '€')
        console.log('Total price: ' + totalPrice + ' €')
        receiptGenerate = true
        numReceipt++
        addToBuyingHistory()
        cart = []
        somethingInTheCart = false
    }
    else {
        console.log('No receipts generate')
    }
    
}


function showBuyingHistory() {
    if (receiptGenerate) {
        console.table(buyingHistory)
    }
    else {
        noProductsBuy()
    }
}

function noProductsBuy() {
    console.log('No products have been bought yet.')
}


var numReceipt = 0
function addToBuyingHistory() {
    if (receiptGenerate) {
        buyingHistory[buyingHistory.length] = 'Order num: ' + numReceipt
        for (var i = 0; i < cart.length; i++ ) {
            buyingHistory[buyingHistory.length] = cart[i].id + cart[i].name
        }
        buyingHistory[buyingHistory.length] = 'Total price ' + totalPrice + '€' 
        buyingHistory[buyingHistory.length] = '------------------------------'
    }
}


console.clear()
var stillInShop = true

function wantToKeepShooping() {
    var askKeepShoping = prompt('Do you want to keep shooping? yes or no ')
    askKeepShoping = askKeepShoping.toLowerCase()
    if (askKeepShoping === 'yes') {
        stillInShop = true
    }
    else if (askKeepShoping === 'no') {
        stillInShop = false
    }
    else {
        console.log('Invalid answer')
        wantToKeepShooping()
    }
}

console.log('...')
while (stillInShop === true) {
    askWhatToDo()
    showTheOptionChoose()
    wantToKeepShooping()
} 