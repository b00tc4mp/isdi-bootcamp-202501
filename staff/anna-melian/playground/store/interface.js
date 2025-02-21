var interface = {}


interface.showTheProducts = function () {
    try {
        var products = logic.getProducts()
        var table = ''
        for (var i = 0; i < products.length; i++) {
            var product = products[i]
            table += 'ID: ' + product.id + '  NAME: ' + product.name + '  TYPE: ' + product.type + '  PRICE: ' + product.price + '\n'
        }
        alert(table)
    } catch (error) {
        alert(error.message)
    }
}

interface.askUser = function () {
    try {
        var answer = prompt('0: VER PRODUCTOS\n1: BUSCAR PRODUCTO\n2: AÑADIR PRODUCTO NUEVO\n3: AÑADIR PRODUCTO AL CARRO\n4: VER CARRO\n5: GENERAR RECIBO\n6: VER HISTORIAL DE COMPRA\nWhat do you want to do?')
        logic.helper.invalidMenuOption(answer)
        logic.WhatsUserElection(answer)

    } catch (error) {
        alert(error.message)
    }

}


interface.showTheMatch = function (id) {
    try {
        logic.helper.invalidText(id)
        logic.helper.idExist(id)
        var products = logic.getProducts()
        var matchProduct = ''
        for (var i = 0; i < products.length; i++) {
            if (id === products[i].id) {
                matchProduct = 'ID: ' + products[i].id + '  NAME: ' + products[i].name + '  TYPE: ' + products[i].type + '  PRICE: ' + products[i].price + '\n'
            }
        }
        alert(matchProduct)

    } catch (error) {
        alert(error.message)
    }

}

interface.askUserIdProductSearch = function () {
    try {
        var id = prompt("What's the product id you are looking for?")
        logic.helper.invalidText(id)
        logic.helper.idExist(id)
        interface.showTheMatch(id)

    } catch (error) {
        alert(error.message)
    }
}

interface.askUserNewProduct = function () {
    try {
        var generalNameProduct = prompt("What's the product general name ? ex. cookie, burger, sausage  ")
        logic.helper.invalidText(generalNameProduct)
        var nameProduct = prompt("What's the product name? ex. Oreo cookies, beef burger , chiken sausage ")
        logic.helper.invalidText(nameProduct)
        var typeProduct = prompt("What's the product type? ")
        logic.helper.invalidText(typeProduct)
        var priceProduct = prompt("What's the product price?")
        logic.helper.invalidNumber(priceProduct)
        logic.createNewObject(generalNameProduct, nameProduct, typeProduct, priceProduct)

    } catch (error) {
        alert(error.message)
    }


}

interface.askUserIdProductAddCart = function () {
    try {
        var id = prompt("What's the product id you want to add to the cart?")
        logic.helper.invalidText(id)
        logic.helper.idExist(id)
        logic.addProductToCart(id)
        logic.addToReceipt(id)


    } catch (error) {
        alert(error.message)
    }
}

interface.showTheCart = function () {
    try {
        var cart = logic.cartStatus()
        var table = ''
        var totalPrice = 0
        for (var i = 0; i < cart.length; i++) {
            var product = cart[i]
            table += 'ID: ' + product.id + '  NAME: ' + product.name + '  TYPE: ' + product.type + '  PRICE: ' + product.price + ' €' + '\n'
            totalPrice += Number(product.price)
        }
        alert(table + '\nTotal price: ' + totalPrice)
    } catch (error) {
        alert(error.message)
    }

}


interface.showToReceipt = function () {
    var cart = logic.receiptStatus()
    var table = ''
    var totalPrice = 0
    var taxes = 0
    var basePrice = 0
    for (var i = 0; i < cart.length; i++) {
        var product = cart[i]
        table += 'ID: ' + product.id + '  NAME: ' + product.name + '  PRICE: ' + product.price + ' €' + '\n'
        totalPrice += Number(product.price)
    }
    alert(table + '\n ' + totalPrice + ' €' + '\n--------------------------------')
    logic.resetCart()

}


interface.wantToKeepShooping = function () {
    var askKeepShoping = prompt('Do you want to keep shooping? yes or no ')
    askKeepShoping = askKeepShoping.toLowerCase()
    if (askKeepShoping === 'yes') {
        data.stillInShop = true
    }
    else if (askKeepShoping === 'no') {
        data.stillInShop = false
    }
    else {
        console.log('Invalid answer')
        interface.wantToKeepShooping()
    }
}

interface.StartShopping = function () {
    while (data.stillInShop === true) {
        interface.askUser()
        interface.wantToKeepShooping()
    }
}

console.log('...')
interface.StartShopping()

