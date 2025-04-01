var data = {
    products: [
        {
            id: 'fi-ci',
            brand: 'fiat',
            model: 'cinquecento',
            price: 10000
        },
        {
            id: 'sm-br',
            brand: 'smart',
            model: 'bravus',
            price: 25000
        },
        {
            id: 'op-co',
            brand: 'opel',
            model: 'corsa',
            price: 9000
        }
    ]
}


var logic = {

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

            var table = ''

            for (var i = 0; i < products.length; i++) {
                var product = products[i]

                table += product.id + '\t' + product.brand + '\t' + product.model + '\t' + product.price
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
        // TODO implement me
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