var interface = {

    askUserStoreOption: function () {
        var action = prompt(`Please, choose what you would like to do:
            1 - see all products
            2 - search for products
            3 - add product to the cart
            4 - see total of the cart
            5 - place order
            6 - see shopping history`)

        try {
            this.validateChosenOption(action)
            // ejecutar lamada de la functión correspondiente

        } catch (error) {
            alert(error.message)
            console.log(error)
            interface.chooseShoppingOption()
        }
    },

    showProductList: function () {
        // alert de una funcion de la lógica que devuelve la tabla se los productos en formato string
    },

    filterProducts: function () {
        // alert de una función logica que devuelve productos encontrados con el filtro + descripcion
    },

    addProductsToCart: function () {
        // pedir id y cantidad
        // una funcion q comprueba el stock, añade producto al array, construye la tabla
        // imprimir 'producto añadido'
    },

    showCart: function () {
        // imprimir una funcion que construye la tabla del cart
    },

    showCheckoutStatus: function () {
        // funcion logica que genera una recibo, lo convierte en tabla
        // imprime la tabla y comentario 'pagado'
    },

    showShoppingHistory: function () {

    },

    automate: function () {

    }
}

var logic = {
    validateChosenOption: function (chosenNumber) {
        var validOptions = '123456'

        for (var i = 0; i < validOptions.length; i++)
            if (chosenNumber === validOptions[i])
                return true

        return false
    },


    proceedToCHosenOption: function () {

    },

    createProductListTable: function () {

    },

    returnFilteredList: function () {

    },

    addToCart: function () {

    },

    generateReceipt: function () {

    },

    generateGistory: function () {

    }
}