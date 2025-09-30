// Implement a store (with operations: 'list products', 'add product to cart', 'get cart total', 'checkout cart, 'search products', 'list orders')

/*Usuario
- Introducir que opción quiere ejecutar.
- Solicitar lista de productos con detalles.
- Añadir producto al carrito
- Obtener total carrito (nombre producto, cantidad, precio unitario) precio por producto/s y mostrar el total final.
- Confirmar compra en check out cart, mostrar producto/s cantidades y total, IVA.
- Buscar productos
- Historial de productos comprados anteriormente.
*/

// En el check out cart mostrar nombre de producto, precio, IVA 
console.clear()

//DATA
var data = {
    products: [{
        id: 'pala-1',
        model: 'Head Graphene 360+ Alpha Pro',
        brand: 'Head',
        color: 'Negro/Rojo',
        unitPrice: 250,
        stock: 5
    }, {
        id: 'pala-2',
        model: 'Bullpadel Vertex 03',
        brand: 'Bullpadel',
        color: 'Negro/Dorado',
        unitPrice: 220,
        stock: 8
    }, {
        id: 'pala-3',
        model: 'Nox ML10 Pro',
        brand: 'Nox',
        color: 'Negro/Azul',
        unitPrice: 230,
        stock: 3
    }, {
        id: 'pala-4',
        model: 'StarVie Metheora',
        brand: 'StarVie',
        color: 'Negro/Rojo',
        unitPrice: 210,
        stock: 10
    }, {
        id: 'pala-5',
        model: 'Adidas Adipower Soft 3.2',
        brand: 'Adidas',
        color: 'Blanco/Negro',
        unitPrice: 200,
        stock: 7
    }, {
        id: 'pala-6',
        model: 'Babolat Technical Viper',
        brand: 'Babolat',
        color: 'Negro/Amarillo',
        unitPrice: 240,
        stock: 4
    }, {
        id: 'pala-7',
        model: 'Siux Diablo',
        brand: 'Siux',
        color: 'Negro/Rojo',
        unitPrice: 190,
        stock: 12
    }, {
        id: 'pala-8',
        model: 'Varlion Avant Carbon 3',
        brand: 'Varlion',
        color: 'Negro/Carbono',
        unitPrice: 260,
        stock: 2
    }],
    cart: [],
    totalPrice: 0,
    getProductById: function(productId) {
        
    }
}

var interface = {}

//LOGIC

var logic = {
    helper: {
        validateProductId: function(productId) {
            if(typeof productId !== 'string') throw new TypeError('invalid product ID type')
        },
        validateOption: function() {
            
        }
    },
    chooseOption: function() {
        var option1 = interface.viewOptions()
        
        switch (option1) {
            case 1:
                interface.viewProductsList()
                break
            case 2:
                interface.addProductToCart()
                //modificarlo para obtener el resultado en el interface, antes llamaba a la logic
                break
            case 3:
                interface.viewProductsCart()
                break
            case 4:
                interface.viewCheckOutCart()
                break
            case 5:
                logic.searchProduct()
                break
            case 6:
                break
            default:
                throw new Error('Not valid option. Choose a number between 1 and 7')
        }
    },
    getProductsList: function() {
        return data.products
    },
    
    checkProductExistance: function() {},
    addProductToCart: function() {
        var productID = interface.askIdProductToCart()

        for (var i = 0; i < data.products.length; i++) {
            if (data.products[i]['id'] === productID) {
                if (productID === data.cart[i]['id']) {
                    data.cart[i]['units']++
                    break
                }
                var cartProduct = {}
                cartProduct['id'] = data.products[i]['id']

                cartProduct['model'] = data.products[i]['model']

                cartProduct['brand'] = data.products[i]['brand']

                cartProduct['unitPrice'] = data.products[i]['unitPrice']

                cartProduct['units'] = 1

                data.cart[data.cart.length] = cartProduct
            }
        }
        return data.cart
    },
    getCheckOutCart: function() {
        var date = new Date()
        var invoice = 'N123456'
        var name = prompt('Name or Company Name: ')
        var address = prompt('Address: ')
        var vatID = prompt('ID / VAT ID: ')

        var headerTable = `${date}\n ${invoice}\n ${name}\n ${address}\n ${vatID}\n`
        var table = `id\t \t model\t \t brand\t \t price\t \t \n`

        for (var i = 0; i < data.cart.length; i++) {
            table += `${data.cart[i]['id']}\t ${data.cart[i]['model']}\t ${data.cart[i]['brand']}\t ${data.cart[i]['unitPrice']}\t ${data.cart[i]['unit']}\t\n`
            totalPrice += data.cart[i]['unitPrice'] * data.cart[i]['units']
        }

        var completedOrder = [table, totalPrice]

        return completedOrder
    }
}


logic.searchProduct = function() {
    var productSearch = prompt('How do you prefer to search a product, by: \n 1. ID. \n 2. Model. \n 3. Brand.')

    if (productSearch === '1') {
        var idSearch = prompt('Input the ID product')

        for (var i = 0; i < data.products; i++) {
            if (data.products[i]['id'] === idSearch) {
                alert(data.products[i])
                break
            }
        }
    }
    if (productSearch === '2') {
        var modelSearch = prompt('Input the model name of your product')

        for (var i = 0; i < data.products; i++) {
            if (data.products[i]['model'] === modelSearch) {
                alert(data.products[i])
                break
            }
        }
    }
    if (productSearch === '3') {
        var brandSearch = prompt('Input the brand of your product')

        for (var i = 0; i < data.products; i++) {
            if (data.products[i]['brand'] === brandSearch) {
                alert(data.products[i])
            }
        }
    }
}

logic.removeProductFromCart = function {
    
}

// INTERFACE
//Hacer helper para validar cuando ponen valores diferentes a numeros en id, o en cantidad diferente a numero.

//Evitar el break en los for, poner en la validacion la variable found y pararlo cuando lo encuentra o no lo encuentra (e.g. && !found)

//En cada interfaz llamo a 1 sola logica

interface = {
    helper: {
        handlerError: function(error) {
            console.error(error)

            alert(error.message)
        },
    
    },
    viewOptions: function() {
        try {
            var option = Number(prompt('Choose an option (e.g. 1): \n 1. Products list. \n 2. Add product to cart. \n 3. Get cart total. \n 4. Check out cart. \n 5. Search products. \n 6. List orders.'))
            return option
        } catch {
            interface.helper.handlerError(error)
        }
    },
    addProductToCart: function() {
        try {
            var productID = prompt('Input the product ID: ')
            return productID
        } catch {
            interface.helper.handlerError(error)
        }
    }

}

//La interfaz no lanza errores.

logic.chooseOption = function() {
    
}

interface.viewProductsList = function() {
    try {
        var table = 'id\t \t model\t \t brand\t \t price\t \t \n'
        for (var i = 0; i < data.products.length; i++) {
            table += `${data.products[i]['id']}\t ${data.products[i]['model']}\t ${data.products[i]['brand']}\t ${data.products[i]['unitPrice']}\n`
        }
        alert(table)
        //console.table(logic.getProductsList())
    } catch (error) {
        alert(error.message)
    }
}


interface.viewProductsCart = function() {
    try {
        var table = 'id\t \t model\t \t brand\t \t price\t \t \n'
        var totalPrice = 0
        for (var i = 0; i < data.cart.length; i++) {
            table += `${data.cart[i]['id']}\t ${data.cart[i]['model']}\t ${data.cart[i]['brand']}\t ${data.cart[i]['unitPrice']}\t ${data.cart[i]['unit']}\t \n`
            totalPrice += data.cart[i]['unitPrice'] * data.cart[i]['units']
        }
        alert(`${table} \n Total Price ${totalPrice}`)
    } catch {
        alert(error.message)
    }
}

interface.viewCheckOutCart = function() {
    try {
        var [table,totalPrice] = getCheckOutCart()
        alert(`${table}\n ${totalPrice}`)
    } catch {
        alert(error.message)
    }
}

interface.viewPurchaseHistory = function() {}
