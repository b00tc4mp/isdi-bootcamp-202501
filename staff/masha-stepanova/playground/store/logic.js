const logic = {

    helper: {

        getListToPrint: function (list) {
            return list
        },

    },

    prepareCartToPrint: function () {
        table = ''
        for (var i = 0; i < data.cart.length; i++) {
            product = data.cart[i]
            table += `${product.id}, ${product.name}, ${product.type}, ${product.price}, ${product.quantity}
            `
        }
    },

    prepareListToPrint: function () {
        table = ''
        for (var i = 0; i < data.cart.length; i++) {
            product = data.productsList[i]
            table += `${product.id}, ${product.name}, ${product.type}, ${product.price}, ${product.stock}
            `
        }
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

    // getDataToPrint(data.productsList)

    // getDataToPrint(data.cart) 

    generatereceipt: function () {
        data.receipt = []
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
