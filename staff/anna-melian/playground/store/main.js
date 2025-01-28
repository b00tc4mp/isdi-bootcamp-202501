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
 
function showTheProducts() { //ver lista de productos
    console.table(productsList)
}

function askWhatToDo() { //preguntar a usuario que quiere hacer
    userChoice = 0
    userChoice = prompt('What do you want to do? Write the number of the option you want to choose. ')
    userChoice = Number(userChoice)
}

function numberOptionValidation() { //comprobar numero valido (numero del 1 al máximo de opciones)
    validNumber = false
    if (userChoice >= 0 && userChoice < 8) {
        validNumber = true
    }
    else {
        console.log('This option is not available')
        //askWhatToDo()
    }
    return validNumber
}

function textAnswerValidation() { //comprobar texto valido (dentro del alfabet)
    validtext = false
    for (var i = 0; i < idWishProduct.length; i++) {
        for (var j = 0; j < alphabet.length; j++) {
            if (idWishProduct[i] === alphabet[j]) {
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

function showPrincipalMenu() { //se muestra el menu
    console.log(principalMenu)
}

function showTheOptionChoose() { //muestra la opcion elegida
    if (userChoice === 0) { 
        seeTheProducts()
    } else if (userChoice === 1) {
        askForTheProductId()
        textAnswerValidation()
        searchAProduct()
    } else if (userChoice === 2) {
        addAProductToCart()
    }
}

function seeTheProducts() { //ver productos
    console.table(productsList)
    showPrincipalMenu()
}

function askForTheProductId() { //pregunta usuario el ID del producto 
    idWishProduct = prompt('What is the ID product you are looking for?')
}

function productExist() {
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

function addAProductToCart() {
    askForTheProductId()
    textAnswerValidation()
    productExist()
    if (isInTheList === true) {
        cart[cart.length] += productsList[indexProduct]
    }
    else {
        console.log('Product not found ')
    }
     
}



/*
-preguntar a usuario que quiere hacer:
-comprobar respuesta valida (numero del 1 al máximo de opciones)
se muestra el menu :
    menu:
        opciones:
            -1: VER LOS PRODUCTOS
                aparece la lista de productos
                se vuelve a imprimir el menu
                
*/

console.log('...')
//console.table(productsList)