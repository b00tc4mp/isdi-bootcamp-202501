var data = {
    products: [
        {
            id: '123-abc',
            brand: 'fiat',
            model: 'cinquecento',
            price: 10000
        },
        {
            id: '456-def',
            brand: 'smart',
            model: 'bravus',
            price: 25000
        },
        {
            id: '789-ghi',
            brand: 'opel',
            model: 'corsa',
            price: 9000
        }
    ]
}


var logic = {
    getProducts: function () {
        return data.products
    },

    getProduct: function (productId) {
        if (typeof productId !== 'string') throw new TypeError('invalid productId type')

        for (var i = 0; i < data.products.length; i++) {
            var product = data.products[i]

            if (product.id === productId)
                return product
        }

        throw new Error('product not found')
    }
}

var interface = {
    helper: {
        handlerError: function (error) {
            console.error(error)

            alert(error.message)
        }
    },

    showMenu: function () {
        // TODO implement me
    },

    showList: function () {
        try {
            var products = logic.getProducts()

            var table = 'Products\n'

            for (var i = 0; i < products.length; i++) {
                var product = products[i]

                table += product.id + ' ' + product.brand + ' ' + product.model + ' ' + product.price + '\n'
            }

            alert(table)
        } catch (error) {
            interface.helper.handlerError(error)
        }
    },

    filterList: function () {
        // TODO implement me
    },

    showItem: function () {
        try {
            var productId = prompt('Product id?')

            var product = logic.getProduct(productId)

            var line = 'Product\n' + product.id + ' ' + product.brand + ' ' + product.model + ' ' + product.price

            alert(line)
        } catch (error) {
            interface.helper.handlerError(error)
        }
    },

    addToCart: function () {
        // TODO implement me
    },

    showCart: function () {
        // TODO implement me
    },

    placeOrder: function () {
        // TODO implement me
    },

    showHistory: function () {
        // TODO implement me
    }
}

console.clear()