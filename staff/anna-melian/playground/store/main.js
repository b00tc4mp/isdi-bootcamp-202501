
console.clear()

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
var productsList = [apple,tomato,carrot,banana,lettuce,melon,strawberries]
var userChoice = 0
var validNumber = false
var validtext = true
var idWishProduct = ''
var isInTheList = false
var indexProduct
var cart = []
var principalMenu = ['0: VER PRODUCTOS','1: BUSCAR PRODUCTO','2: AÑADIR PRODUCTO AL CARRO ','3: AÑADIR PRODUCTO NUEVO','4: VER EL CARRO','5: GENERAR RECIBO','6: VER HISTORIAL DE COMPRA']
var alphabet = 'aàábcdeéèfghiïíjklmnóòopqrstuüúvwxyz-'
 

function askWhatToDo() { //preguntar a usuario que quiere hacer en el menu
    userChoice = 0
    userChoice = prompt('What do you want to do? Write the number of the option you want to choose. ')
    userChoice = Number(userChoice)
}

function numberOptionValidation(numberToCheck) { //comprobar numero valido (numero del 1 al máximo de opciones)
    validNumber = false
    if (numberToCheck >= 0 && numberToCheck < 8) {
        validNumber = true
    }
    else {
        console.log('This option is not available')
        //askWhatToDo()
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
    if (validtext === false) {
        console.log('This answer is not available')
        //askForTheProductId()
    }
    return validtext
}

function showPrincipalMenu() { //se muestra el menu principal
    console.log(principalMenu)
}

function showTheOptionChoose() { //muestra la opcion elegida
    if (userChoice === 0) { 
        seeTheProducts()
    } else if (userChoice === 1) {
        askForTheProductId()
        textAnswerValidation(idWishProduct)
        searchAProduct()
    } else if (userChoice === 2) {
        addAProductToCart()
    } else if (userChoice === 3) {
        addNewProduct()
    }
}

function seeTheProducts() { //ver productos de la lista
    console.table(productsList)
    //showPrincipalMenu()
}

function askForTheProductId() { //pregunta usuario el ID del producto 
    idWishProduct = prompt('What is the ID product ?')
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

function searchAProduct() { //buscar un producto
    productExist()
    if (isInTheList === true) {
        console.log(productsList[indexProduct])
    }
    else {
        console.log('Product not found ')
    }
}

function addAProductToCart() { //añade un producto al carro
    askForTheProductId()
    textAnswerValidation(idWishProduct)
    productExist()
    if (isInTheList === true) {
        cart[cart.length] = productsList[indexProduct]
        //console.log(cart)
    }
    else {
        console.log('Product not found ')
    }
     
}



function addNewProduct() {
    var generalNameNewProduct = prompt("What's the new object general name? ")
    textAnswerValidation(generalNameNewProduct)
    generalNameNewProduct = generalNameNewProduct.toLowerCase()
    
    var nameNewProduct = prompt("What's the new object concrete name and the quantity? ex. Fuji apple, 1 kg")
    textAnswerValidation(nameNewProduct)
    nameNewProduct = nameNewProduct.toLowerCase()
    generalNameNewProduct.name = nameNewProduct
    
    var typeNewProduct = prompt("Which kind of food is?")
    textAnswerValidation(typeNewProduct)
    typeNewProduct = typeNewProduct.toLowerCase()
    generalNameNewProduct.type = typeNewProduct
    
    var priceNewProduct = prompt("What's the new object price?")
    numberOptionValidation(priceNewProduct)
    priceNewProduct = priceNewProduct.toLowerCase()
    generalNameNewProduct.price = priceNewProduct
    
    productsList[productsList.length] = generalNameNewProduct
    
}





console.log('...')
//console.table(productsList)