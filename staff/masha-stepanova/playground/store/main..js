var data = {

    productsList: {
        greenApples: {
            id: 'gr-ap-1',
            name: 'Green apples "Golden", 1 kg',
            type: 'apples',
            price: 2.5,
            stock: 10
        },

        redApples: {
            id: 're-ap-1',
            name: 'Red apples "Fuji", 1 kg',
            type: 'apples',
            price: 3.5,
            stock: 10
        },

        bananas: {
            id: 'ca-ba-1',
            name: 'Canarian bananas, 1 kg',
            type: 'bananas',
            price: 3,
            stock: 10
        },

        oranges: {
            id: 'si-or-1',
            name: 'Sicilian oranges, 1 kg',
            type: 'oranges',
            price: 2.5,
            stock: 10
        },

        strawberries1: {
            id: 'st-1',
            name: 'Strawberries, 1 kg',
            type: 'productNameawberries',
            price: 7,
            stock: 10
        },

        strawberries500: {
            id: 'st-500',
            name: 'Strawberries, 500 gr',
            type: 'productNameawberries',
            price: 4,
            stock: 10
        },

        blueberries: {
            id: 'bl-300',
            name: 'Blueberies, 300 gr',
            type: 'blueberries',
            price: 3,
            stock: 10
        },

        kiwi: {
            id: 'ki-1',
            name: 'Kiwi, 1kg',
            type: 'productNameawberries',
            price: 5,
            stock: 10
        },

        potatoes: {
            id: 'po-5',
            name: 'Potatoes, 5kg',
            type: 'potatoes',
            price: 5.5,
            stock: 10
        },

        carrots: {
            id: 'ca-1',
            name: 'Carrots, 1kg',
            type: 'carrots',
            price: 1.5,
            stock: 10
        },

        tomatoes: {
            id: 'to-2',
            name: 'Tomatoes, 2kg',
            type: 'tomatoes',
            price: 3.5,
            stock: 10
        },

        cabbages: {
            id: 'cab-1',
            name: 'Cabbage, 1 item',
            type: 'cabbages',
            price: 2,
            stock: 10
        },

        eggplant: {
            id: 'egp-1',
            name: 'Eggplants, 2 items',
            type: 'eggplants',
            price: 4,
            stock: 10
        },

        onion: {
            id: 'on-3',
            name: 'Onions, 3kg',
            type: 'onions',
            price: 3,
            stock: 10
        }
    }
}

var logic = {

    helper: {

        cart: [],
        receipt: [],
        productId: null,
        productQuantity: null

    },

    validateShoppingOption: function (productName) {
        var validOptions = '123456'

        for (var i = 0; i < validOptions.length; i++)
            if (productName === validOptions[i])
                return true

        return false
    },

    chooseShoppingOption: function (productName) {

        switch (productName) {
            case '1':
                interface.showProductsList()
                break
            case '2':
                interface.filterProducts()
                break
            case '3':
                interface.askForProduct()
                break
            case '4':
                interface.showCart()
                break
            case '5':
                interface.placeOrder()
                break
            case '6':
                interface.showShoppingHistory()
                break

        }
    },

    getProductsList: function () {
        return data.productsList
    },

    getCart: function () {
        return logic.helper.cart
    },

    generatereceipt: function () {
        logic.helper.receipt = []
        var total = 0
        var tax = 0
        var basePrice = 0

        for (var i = 0; i < logic.helper.cart.length; i++) {
            logic.helper.receipt[logic.helper.receipt.length] = logic.helper.cart[i]
            total += logic.helper.cart[i]['price'] * logic.helper.cart[i]['quantity']
        }

        tax = total * 0.21
        basePrice = total * 0.79

        logic.helper.receipt[logic.helper.receipt.length] = `Base price: ${basePrice} €`
        logic.helper.receipt[logic.helper.receipt.length] = `Taxes: ${tax} €`
        logic.helper.receipt[logic.helper.receipt.length] = `Total: ${total} €`
        logic.helper.receipt[logic.helper.receipt.length] = Date()
        logic.helper.cart = []

        return logic.helper.receipt
    },

    generateHistory: function () {
        for (var i = logic.helper.receipt.length - 1; i >= 0; i--) {
            data.generatedHistory[data.generatedHistory.length] = logic.helper.receipt[i]
        }

        return data.generatedHistory
    },

    checkProductStock: function (id, quantity) {
        for (var i = 0; i < data.length; i++) {
            if (data.productsList[i]['id'] === id) {
                if (data.productsList[i]['stock'] >= quantity)
                    return data.productsList[i]
            }
        }

        throw new Error('Not enough stock')
    },

    addToCart: function (prod, quantity) {
        for (var i = 1; i > 0; i--) {
            prod['stock'] -= +quantity

            logic.helper.cart[logic.helper.cart.length] = { ...prod }
            delete logic.helper.cart[logic.helper.cart.length - 1]['stock']

            logic.helper.cart[logic.helper.cart.length - 1]['quantity'] = +quantity
            return logic.helper.cart
        }

        throw new Error('Couldn\'t add to cart')
    },

    checkProductExistance: function (productName) {
        for (var i = 0; i < data.productsList.length; i++)

            for (var prop in data.productsList[i])

                if (data.productsList[i][prop] === productName)
                    return data.productsList[i]

        throw new Error('This product does not exist')
    },

    addFoundProduct: function (productName) {
        var searchResult = []

        searchResult[searchResult.length] = (productName)

        return searchResult
    }

}

var interface = {
    chooseShoppingOption: function () {
        var action = prompt(`Please, choose what you would like to do:
            1 - see all products
            2 - search for products
            3 - add product to the cart
            4 - see total of the cart
            5 - cart placeOrder
            6 - see shopping history`)

        try {
            logic.validateShoppingOption(action)
            logic.chooseShoppingOption(action)
        } catch (error) {
            alert(error.message)
            console.log(error)
            interface.chooseShoppingOption()
        }
    },

    showProductsList: function () {
        try {
            alert(logic.getProductsList())
        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    },

    showCart: function () {
        try {
            alert(logic.getCart())
        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    },

    placeOrder: function () {
        try {
            alert(logic.generatereceipt())
        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    },

    showShoppingHistory: function () {
        try {
            alert(logic.generateHistory())
        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    },

    askForProduct: function () {
        data.helper.productId = prompt('Please, introduce the item ID')
        data.helper.productQuantity = prompt('Please, introduce desired quantity')
        var product = logic.checkProductStock(data.helper.productId, data.helper.productQuantity)

        try {
            logic.checkProductStock(data.helper.productId, data.helper.productQuantity)
            logic.addToCart(product, data.helper.productQuantity)
            alert(`The item '${logic.helper.cart[logic.helper.cart.length - 1]['name']}' is added to cart!`)

        } catch (error) {
            alert(error.message)
            console.log(error)
            interface.askForProduct()
        }
    },

    filterProducts: function () {
        var filter = prompt('What would you like to search now?')

        try {
            var foundProduct = logic.checkProductExistance(filter)
            alert(logic.addFoundProduct(foundProduct))
        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    },

    automate: function () {
        try {
            var continueShopping = true
            while (continueShopping) {
                interface.chooseShoppingOption()
                var askToContinue = prompt('Do you want to continue shopping?')
                if (askToContinue === 'n' || askToContinue === 'no' || askToContinue === null) {
                    continueShopping = false
                }
            }
        } catch (error) {
            alert(error.message)
            console.log(error)
        }

    }
}



// data.productsList = [data.greenApples, data.redApples, data.bananas, data.oranges, data.productNameawberries1, data.productNameawberries500, data.blueberries, data.kiwi, data.potatoes, data.carrots, data.tomatoes, data.cabbages, data.eggplant, data.onion]
// logic.helper.cart = []
// data.helper.productQuantity
// data.helper.productId
// data.continueShopping = true
// logic.helper.receipt = []
// data.generatedHistory = []

// PRESENTATION





