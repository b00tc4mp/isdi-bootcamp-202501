var data = {
    products: [
        {
            id: 'nin-123',
            brand: 'kawasaki',
            model: 'z-900',
            price: 10750,
            engine: '4-stroke, 4 cylinder, 16 valves',
            cilinderCapacity: '948CC',
            stock: 2
        },
        {
            id: 'z90-123',
            brand: 'kawasaki',
            model: 'Ninja H2R',
            price: 55000,
            engine: '4-stroke, 4 cylinder, 16 valves',
            cilinderCapacity: '998CC',
            stock: 2
        },
        {
            id: 's1k-123',
            brand: 'bmw',
            model: 'S1000 RR',
            price: 24000,
            engine: '4-stroke, 4 cylinders, 4 valves',
            cilinderCapacity: '999CC',
            stock: 2
        },
        {
            id: 'r1k-123',
            brand: 'bmw',
            model: 'r 1250 RS',
            price: 18000,
            engine: '4-stroke, 4 cylinders, 4 valves',
            cilinderCapacity: '1254CC',
            stock: 2
        },
        {
            id: 'rr1-123',
            brand: 'yamaha',
            model: 'R1',
            price: 23000,
            engine: '4-stroke, 4 cylinders, 4 valves',
            cilinderCapacity: '998CC',
            stock: 2
        },
        {
            id: 'mt7-123',
            brand: 'yamaha',
            model: 'MT-07',
            price: 8000,
            engine: '4-stroke, 2 cylinders, 4 valves',
            cilinderCapacity: '689CC',
            stock: 2
        },
        {
            id: 'cb6-123',
            brand: 'honda',
            model: 'CBR650R',
            price: 10500,
            engine: '4-stroke, 4 cylinders, 16 valves',
            cilinderCapacity: '649CC',
            stock: 2
        },
        {
            id: 'cb1-123',
            brand: 'honda',
            model: 'CB1000R',
            price: 15250,
            engine: '4-stroke, 4 cylinders, 16 valves',
            cilinderCapacity: '998CC',
            stock: 2
        },
        {
            id: 'pv4-123',
            brand: 'ducati',
            model: 'PANIGALE V4',
            price: 32000,
            engine: '4-stroke, 4 cylinders, 4 valves',
            cilinderCapacity: '1103CC',
            stock: 2
        },
        {
            id: 'sv2-123',
            brand: 'ducati',
            model: 'STREETFIGHTER V2',
            price: 17000,
            engine: '4-stroke, 2 cylinders, 4 valves',
            cilinderCapacity: '890CC',
            stock: 2
        }
    ],
    cart: [],
    constants: {
        regex: /^[a-zA-Z0-9]{3}-\d{3}$/
    }
}

var logic = {
    helper: {
        validateProductId: function (productId) {
            if (typeof productId !== 'string' || !data.constants.regex.test(productId)) throw new TypeError('Invalid Product Id')
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

    showOptions: function () {
        var operations = prompt(`What do you want to do?
            1. List products
            2. Show Product 
            3. Filter product list
            4. Add product to cart
            5. Remove product from cart
            6. Show cart
            7. Checkout cart//placeOrder
            8. List orders
            9. Flash Offer
            10. Add product to store`)

        if (isNaN(operations) ||
            operations > 10 ||
            operations == null ||
            operations < 1
        ) {
            alert('Please write a valid number')
            //logic.showOptions()
        } else {
            switch (operations) {
                case '1':
                    interface.showProductList()
                    break;
                case '2':
                    interface.showProduct()
                    break;
                case '3':
                    interface.filterProductList()
                    break;
                case '4':
                    interface.addProductToCart()
                    break;
                case '5':
                    interface.removeProductFromCart()
                    break;
                case '6':
                    interface.showCart()
                    break;
                case '7':
                    interface.placeOrder()
                    break;
                case '8':
                    interface.showHistory()
                    break;
                case '9':
                    interface.flashOffer()
                    break;
                case '10':
                    interface.addNewProduct()
                    break;
            }
        }
    },

    getProducts: function () {
        return data.products
    },

    getProduct: function (productId) {
        logic.helper.validateProductId(productId)

        var product = logic.helper.getProductById(productId)

        if (product === null) throw new Error('Product not found')

        return product
    },

    addToCart: function (productId) {
        logic.helper.validateProductId(productId)

        var product = logic.helper.getProductById(productId)

        if (product === null) throw new Error('Product not found')

        data.cart[data.cart.length] = productId
    },

    getCartItems: function () {
        var items = []

        for (var i = 0; i < data.cart.length; i++) {
            var productId = data.cart[i]

            var productFound = logic.helper.getProductById(productId)

            if (productFound === null) throw new Error('Product not found')

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
        handleError: function (error) {
            console.error(error)

            alert(error.message)
        }
    },

    showMenu: function () {
        try {
            logic.showOptions()
        } catch (error) {
            interface.helper.handleError(error)
        }
    },

    showProductList: function () {
        try {
            var products = logic.getProducts()

            var table = 'Products \n'

            for (var i = 0; i < products.length; i++) {
                var product = products[i]

                table += product.id + ' ' + product.brand + ' ' + product.model + ' ' + product.price + '€\n'
            }

            alert(table)
        } catch (error) {
            interface.helper.handleError(error)
        }
    },

    showProduct: function () {
        try {
            var productId = prompt('Product id?')

            var product = logic.getProduct(productId)

            var line = 'Product\n' + product.id + ' ' + product.brand + ' ' + product.model + ' ' + product.price + '€\n' + product.engine + ' ' + product.cilinderCapacity

            alert(line)
        } catch (error) {
            interface.helper.handleError(error)
        }
    },

    filterProductList: function () {
        // try {

        // } catch (error) {
        //     interface.helper.handleError(error)
        // }
    },

    addProductToCart: function () {
        try {
            var productId = prompt('Product id?')

            logic.addToCart(productId)

            alert('product' + productId + ' added to cart')
        } catch (error) {
            interface.helper.handleError(error)
        }
    },

    removeProductFromCart: function () {
        // try {

        // } catch (error) {
        //     interface.helper.handleError(error)
        // }
    },

    showCart: function () {
        try {
            var cart = logic.getCartItems()

            var table = 'Cart\n'

            if (cart.length === 0)
                table += 'You have not added any items yet'
            else
                for (var i = 0; i < cart.length; i++) {
                    var item = cart[i]

                    table += item.id + ' ' + item.brand + ' ' + item.model + ' ' + item.price + '€' + ' (' + item.quantity + ')\n'
                }

            alert(table)
        } catch (error) {
            interface.helper.handleError(error)
        }
    },

    placeOrder: function () {
        // try {

        // } catch (error) {
        //     interface.helper.handleError(error)
        // }
    },

    showHistory: function () {
        // try {

        // } catch (error) {
        //     interface.helper.handleError(error)
        // }
    },

    flashOffer: function () {
        // try {

        // } catch (error) {
        //     interface.helper.handleError(error)
        // }
    },

    addNewProduct: function () {
        // try {

        // } catch (error) {
        //     interface.helper.handleError(error)
        // }
    }
}

interface.showMenu()
console.clear()