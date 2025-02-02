var data = {}
var logic = {}
var interface = {}

data.apple = {
    id: 'app-fruit',
    name: 'Fuji apple, 1 kg',
    type: 'fruit',
    price: 2.5,
}
data.tomato = {
    id: 'tom-veg',
    name: 'Roma tomato, 1 kg',
    type: 'vegetable',
    price: 2,
}
data.carrot = {
    id: 'car-veg',
    name: 'Nantes carrot, 1 kg',
    type: 'vegetable',
    price: 1.8,
}
data.banana = {
    id: 'ban-fruit',
    name: 'Canary banana, 1 kg',
    type: 'fruit',
    price: 1.7,
}
data.lettuce = {
    id: 'let-veg',
    name: 'Iceberg lettuce, 1 unit',
    type: 'vegetable',
    price: 1.2,
}
data.melon = {
    id: 'mel-fruit',
    name: 'Cantaloupe melon, 1 unit',
    type: 'fruit',
    price: 3,
}
data.strawberries = {
    id: 'str-fruit',
    name: 'Huelva strawberries, 1 kg',
    type: 'fruit',
    price: 2.5,
}

data.products = [data.apple, data.tomato, data.carrot, data.banana, data.lettuce, data.melon, data.strawberries]
data.cart = []

logic.helper = {

    invalidMenuOption: function (answer) {
        var options = '0123456'
        var valid = false
        for (var i = 0; i < options.length; i++) {
            if (answer === options[i]) {
                valid = true
            }
        }
        if (!valid) {
            throw new Error('Invalid option')
        }
    },

    invalidIdOption: function (id) {
        var validCharacters = 'abcdefghijklmnopqrstuvxyz-'
        var valid = false
        for (var i = 0; i < validCharacters.length; i++) {
            for (var j = 0; j < id.length; j++) {
                if (id[j] === validCharacters[i]) {
                    valid = true
                }
            }

        }
        if (!valid) {
            throw new Error('Invalid option')
        }
    },

    invalidText: function (answer) {
        var validCharacters = 'abcdefghijklmnopqrstuvxyz-ABCDEFGHIJKLMNOPQRSTUVWXY'
        var valid = false
        for (var i = 0; i < validCharacters.length; i++) {
            for (var j = 0; j < answer.length; j++) {
                if (answer[j] === validCharacters[i]) {
                    valid = true
                }
            }

        }
        if (!valid) {
            throw new Error('Invalid option')
        }
    },

    invalidNumber: function (number) {
        var isANumber = false
        if (typeof number === 'string') {
            if (Number(number) <= 100 && Number(number) > 0) {
                isANumber = true
            }
        }
        if (!isANumber) {
            throw new Error('Invalid option')

        }
    },

    idExist: function (id) {
        var productExist = false
        for (var i = 0; i < data.products.length; i++) {
            if (id === data.products[i].id) {
                productExist = true
            }
        }
        if (!productExist) {
            throw new Error("This product doesn't exist")
        }

    },

}

logic.getProducts = function () {
    return data.products
}

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
        var matchProduct = ''
        for (var i = 0; i < data.products.length; i++) {
            if (id === data.products[i].id) {
                matchProduct = 'ID: ' + data.products[i].id + '  NAME: ' + data.products[i].name + '  TYPE: ' + data.products[i].type + '  PRICE: ' + data.products[i].price + '\n'
            }
        }
        alert(matchProduct)

    } catch (error) {
        alert(error.message)
    }

}

interface.askUserIdProductSearch = function () {
    try {
        var id = prompt("What's the product id?")
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

logic.createNewObject = function (object, objectName, objectType, objectPrice) {
    var object = {
        id: object[0] + object[1] + object[2] + '-' + objectName[0] + objectName[1] + object[2],
        name: objectName,
        type: objectType,
        price: objectPrice,
    }
    data.products[data.products.length] = object

}

interface.askUserIdProductAddCart = function () {
    try {
        var id = prompt("What's the product id you want to add to the cart?")
        logic.helper.invalidText(id)
        logic.helper.idExist(id)
        logic.addProductToCart(id)


    } catch (error) {
        alert(error.message)
    }
}

logic.addProductToCart = function (id) {
    var selectProduct = ''
    for (var i = 0; i < data.products.length; i++) {
        if (id === data.products[i].id) {
            data.cart[data.cart.length] = data.products[i]
        }
    }
}

logic.cartStatus = function () {
    if (data.cart.length === 0) {
        throw new Error('The cart is empty')
    }
    return data.cart
}

interface.showTheCart = function () {
    try {
        var cart = logic.cartStatus()
        var table = ''
        var totalPrice = 0
        for (var i = 0; i < cart.length; i++) {
            var product = cart[i]
            table += 'ID: ' + product.id + '  NAME: ' + product.name + '  TYPE: ' + product.type + '  PRICE: ' + product.price + '\n'
            totalPrice += Number(product.price)
        }
        alert(table + '\nTotal price: ' + totalPrice)
    } catch (error) {
        alert(error.message)
    }

}


logic.WhatsUserElection = function (num) {

    if (num == 0) {
        interface.showTheProducts()
    } else if (num == 1) {
        interface.askUserIdProductSearch()
    } else if (num == 2) {
        interface.askUserNewProduct()
    } else if (num == 3) {
        interface.askUserIdProductAddCart()
    } else if (num == 4) {
        interface.showTheCart()
    }

}


console.clear()
