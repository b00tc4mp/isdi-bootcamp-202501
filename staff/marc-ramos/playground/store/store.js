/*
- create products (objects) w/: id, name, type, price, stock.
- array products
- cart
- product quantity
- product id
- continue shopping?
*/

// funcion que te da a elegir entre 6 opciones

//DATA




var data = {
    productList: [
        {
            id: '001',
            brand: 'renault',
            model: 'clio',
            price: 10000
        },
        {
            id: '002',
            brand: 'audi',
            model: 'a5',
            price: 20000
        },
        {
            id: '003',
            brand: 'mercedes',
            model: 'cla',
            price: 30000
        },
        {
            id: '004',
            brand: 'skoda',
            model: 'fabia',
            price: 15000
        }
    ],
    cart = []

}

//LOGIC

var logic = {
    chooseOption: function (action) {
        if ()
    },

   
}

//INTERFACE 

var interface = {
    helper: {
        handlerError: function (error) {
            console.error(error)

            alert(error.message)
        }
    },

    showMenu: function () {
    var action = prompt (`What do you want to do?
        1. See all the products
        2. Search for products
        3. Add product to cart
        4. See total cart
        5. Cart checkout
        6. See shopping history`)
    },

    showList: function () {
        var products = logic.getProducts
    },
    
    searchProduct: function (){
        var productToSearch = prompt ('What product do you want?')
        try {

        } catch (error) {
            alert(error.message)
        }
    },

    filterList: function () {

    },

    showItem: function () {

    },

    addToCart: function (productId) {
        if (typeof productId !== 'string') throw new TypeError('invalid productId type')

        var found = false
        
        for (var i = 0; i < data.products.length && !found; i++) {
            var product = data.products[i]

            if (product.id === productId)
                found = true
        }

        if ()
    },

    showCart: function () {
    },

    getCart: function () {
    },

    showHistory: function () {
        // TODO implement me
    }

}

console.clear()