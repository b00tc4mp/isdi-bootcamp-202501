var data = {
    products: [
        {
            id: '123-abc',
            brand: 'fiat',
            model: 'cinquecento',
            price: 10000,
            description: 'este coche te va a cambiar la vida, porque es chachi, y a todo el mundo le gusta (la estética)'
        },
        {
            id: '456-def',
            brand: 'smart',
            model: 'bravus',
            price: 25000,
            description: 'este más o menos, está guai, pero sobre todo es su velocidad, y tamaño extra pequeño (lo aparcas en cualquier parte)'
        },
        {
            id: '789-ghi',
            brand: 'opel',
            model: 'corsa',
            price: 9000,
            description: 'el coche de mi abuela, no falla'
        }
    ],
    cart: []
}


var logic = {
    helper: {
        validateProductId: function (productId) {
            if (typeof productId !== 'string') throw new TypeError('invalid productId type')
        },

        getProductById: function (productId) {
            for (var i = 0; i < data.products.length; i++) {
                var product = data.products[i]

                if (product.id === productId)
                    return product
            }

            return null
        }
    },

    getProducts: function () {
        return data.products
    },

    getProduct: function (productId) {
        logic.helper.validateProductId(productId)

        var product = logic.helper.getProductById(productId)

        if (product === null) throw new Error('product not found')

        return product
    },

    addToCart: function (productId) {
        logic.helper.validateProductId(productId)

        var product = logic.helper.getProductById(productId)

        if (product === null) throw new Error('product not found')

        data.cart[data.cart.length] = productId
    },

    getCartItems: function () {
        var items = []

        for (var i = 0; i < data.cart.length; i++) {
            var productId = data.cart[i]

            var productFound = logic.helper.getProductById(productId)

            if (productFound === null) throw new Error('product not found')

            var itemFound = undefined

            for (var j = 0; j < items.length && itemFound === undefined; j++) {
                var item = items[j]

                if (item.id === productId)
                    itemFound = item
            }

            if (itemFound === undefined) {
                var item = {
                    id: productFound.id,
                    brand: productFound.brand,
                    model: productFound.model,
                    price: productFound.price,
                    quantity: 1
                }

                items[items.length] = item
            } else item.quantity++
        }

        return items
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

    showProductList: function () {
        try {
            var products = logic.getProducts()

            var table = 'Products\n'

            for (var i = 0; i < products.length; i++) {
                var product = products[i]

                table += product.id + ' ' + product.brand + ' ' + product.model + ' ' + product.price + '€\n'
            }

            alert(table)
        } catch (error) {
            interface.helper.handlerError(error)
        }
    },

    filterProductList: function () {
        // TODO implement me
    },

    showProduct: function () {
        try {
            var productId = prompt('Product id?')

            var product = logic.getProduct(productId)

            var line = 'Product\n' + product.id + ' ' + product.brand + ' ' + product.model + ' ' + product.price + '€\n' + product.description

            alert(line)
        } catch (error) {
            interface.helper.handlerError(error)
        }
    },

    addProductToCart: function () {
        try {
            var productId = prompt('Product id?')

            logic.addToCart(productId)

            alert('product ' + productId + ' added to cart')
        } catch (error) {
            interface.helper.handlerError(error)
        }
    },

    removeProductFromCart: function () {
        // implement me
    },

    showCart: function () {
        try {
            var cart = logic.getCartItems()

            var table = 'Cart\n'

            if (cart.length === 0)
                table += 'not items'
            else
                for (var i = 0; i < cart.length; i++) {
                    var item = cart[i]

                    table += item.id + ' ' + item.brand + ' ' + item.model + ' ' + item.price + '€' + ' (' + item.quantity + ')\n'
                }

            alert(table)
        } catch (error) {
            interface.helper.handlerError(error)
        }
    },

    placeOrder: function () {
        // TODO implement me
    },

    showHistory: function () {
        // TODO implement me
    }
}

console.clear()