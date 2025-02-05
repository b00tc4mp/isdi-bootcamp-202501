console.clear()

var data = {
    products: [
        {
            id: 'fi-ci',
            brand: 'fiat',
            model: 'cinquecento',
            price: 10000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'sm-br',
            brand: 'smart',
            model: 'brabus',
            price: 25000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'op-co',
            brand: 'opel',
            model: 'corsa',
            price: 9000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'se-ib',
            brand: 'seat',
            model: 'ibiza',
            price: 15000,
            fuel: 'diesel',
            doors: 3
        },
        {
            id: 'fo-fi',
            brand: 'ford',
            model: 'fiesta',
            price: 12000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'to-co',
            brand: 'toyota',
            model: 'corolla',
            price: 18000,
            fuel: 'hybrid',
            doors: 3
        },
        {
            id: 'vw-go',
            brand: 'volkswagen',
            model: 'golf',
            price: 22000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'bm-3s',
            brand: 'bmw',
            model: '3 series',
            price: 35000,
            fuel: 'diesel',
            doors: 3
        },
        {
            id: 'au-a3',
            brand: 'audi',
            model: 'a3',
            price: 28000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'mb-cc',
            brand: 'mercedes-benz',
            model: 'c-class',
            price: 40000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'ni-ju',
            brand: 'nissan',
            model: 'juke',
            price: 15000,
            fuel: 'gasoline',
            doors: 5
        }/*,
        {
            id: 'pe-20',
            brand: 'peugeot',
            model: '208',
            price: 13000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 're-cl',
            brand: 'renault',
            model: 'clio',
            price: 11000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'ki-ce',
            brand: 'kia',
            model: 'ceed',
            price: 17000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'ho-ci',
            brand: 'honda',
            model: 'civic',
            price: 20000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'hy-tu',
            brand: 'hyundai',
            model: 'tucson',
            price: 23000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'ma-cx',
            brand: 'mazda',
            model: 'cx-5',
            price: 27000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'vo-xc',
            brand: 'volvo',
            model: 'xc60',
            price: 45000,
            fuel: 'hybrid',
            doors: 5
        },
        {
            id: 'su-ou',
            brand: 'subaru',
            model: 'outback',
            price: 32000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'je-re',
            brand: 'jeep',
            model: 'renegade',
            price: 28000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'mi-ou',
            brand: 'mini',
            model: 'cooper',
            price: 22000,
            fuel: 'gasoline',
            doors: 3
        }/*,
        {
            id: 'la-ra',
            brand: 'land rover',
            model: 'range rover',
            price: 80000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'po-20',
            brand: 'porsche',
            model: '911',
            price: 120000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'te-mo',
            brand: 'tesla',
            model: 'model s',
            price: 90000,
            fuel: 'electric',
            doors: 5
        },
        {
            id: 'ch-ca',
            brand: 'chevrolet',
            model: 'camaro',
            price: 50000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'do-ch',
            brand: 'dodge',
            model: 'challenger',
            price: 55000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'fi-ty',
            brand: 'fiat',
            model: 'tipo',
            price: 14000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'ci-gi',
            brand: 'citroen',
            model: 'grand c4',
            price: 19000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'sk-oc',
            brand: 'skoda',
            model: 'octavia',
            price: 21000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'da-da',
            brand: 'dacia',
            model: 'duster',
            price: 16000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'al-gu',
            brand: 'alfa romeo',
            model: 'giulia',
            price: 40000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'ja-xf',
            brand: 'jaguar',
            model: 'xf',
            price: 60000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'in-qx',
            brand: 'infiniti',
            model: 'qx50',
            price: 55000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'le-nx',
            brand: 'lexus',
            model: 'nx',
            price: 48000,
            fuel: 'hybrid',
            doors: 5
        },
        {
            id: 'mi-cx',
            brand: 'mitsubishi',
            model: 'asx',
            price: 25000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'ss-ko',
            brand: 'ssangyong',
            model: 'korando',
            price: 22000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'ta-hi',
            brand: 'tata',
            model: 'harrier',
            price: 18000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'ge-ac',
            brand: 'genesis',
            model: 'g70',
            price: 45000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'lu-de',
            brand: 'lancia',
            model: 'delta',
            price: 20000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'sa-9-',
            brand: 'saab',
            model: '9-3',
            price: 15000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'da-sa',
            brand: 'daihatsu',
            model: 'sirion',
            price: 10000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'pr-ay',
            brand: 'proton',
            model: 'arya',
            price: 12000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'mo-co',
            brand: 'morris',
            model: 'minor',
            price: 8000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'ro-ph',
            brand: 'rover',
            model: 'phoenix',
            price: 9000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'tr-sp',
            brand: 'triumph',
            model: 'spitfire',
            price: 15000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'lo-el',
            brand: 'lotus',
            model: 'elise',
            price: 60000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'as-to',
            brand: 'aston martin',
            model: 'vantage',
            price: 150000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'bu-en',
            brand: 'bugatti',
            model: 'veyron',
            price: 2000000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'ko-ag',
            brand: 'koenigsegg',
            model: 'agera',
            price: 2500000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'pa-hu',
            brand: 'pagani',
            model: 'huayra',
            price: 3000000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'mc-72',
            brand: 'mclaren',
            model: '720s',
            price: 280000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'fe-ff',
            brand: 'ferrari',
            model: 'f8 tributo',
            price: 350000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'la-hu',
            brand: 'lamborghini',
            model: 'huracan',
            price: 300000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'ma-gt',
            brand: 'maserati',
            model: 'granturismo',
            price: 150000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'ro-wr',
            brand: 'rolls-royce',
            model: 'wraith',
            price: 400000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'be-co',
            brand: 'bentley',
            model: 'continental',
            price: 250000,
            fuel: 'gasoline',
            doors: 3
        },
        {
            id: 'ca-es',
            brand: 'cadillac',
            model: 'escalade',
            price: 100000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'li-na',
            brand: 'lincoln',
            model: 'navigator',
            price: 90000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'hu-h2',
            brand: 'hummer',
            model: 'h2',
            price: 80000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'go-sa',
            brand: 'gmc',
            model: 'sierra',
            price: 60000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'ra-4r',
            brand: 'ram',
            model: '1500',
            price: 50000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'fo-ra',
            brand: 'ford',
            model: 'ranger',
            price: 35000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'to-ta',
            brand: 'toyota',
            model: 'tacoma',
            price: 40000,
            fuel: 'gasoline',
            doors: 5
        },
        {
            id: 'ni-ti',
            brand: 'nissan',
            model: 'titan',
            price: 45000,
            fuel: 'diesel',
            doors: 5
        },
        {
            id: 'ch-si',
            brand: 'chevrolet',
            model: 'silverado',
            price: 55000,
            fuel: 'diesel',
            doors: 5
        }*/
    ],
    cart: []
}

var logic = {
    helpers: {
        validateIsAnId: function(input) {
            var regex = /^[+]?\d*\.?\d+$/
            if (!regex.test(input)) throw new TypeError('invalid ID format')
        }
    },
    getProductsArray: function() {
        return data.products
    },

    searchProductById: function(productId) { // 3 buscar 1 producto
        logic.helpers.validateIsAnId(productId)

        for (var i = 0; i < data.products.length; i++) {
            var product = data.products[i]
            if (product.id === productId) {
                return product
            }
        }
        throw new Error('no item found')
    },

    addIdToCartArray: function(product) {
        var productId = product.id
        data.cart[cart.length] = productId
    }
}

var interface = {
    helper: {
        handlerError: function (error) { // catch error
            console.error(error)

            alert(error.message)
        }
    },

    showMenu: function() {
        // TODO implement me
    },

    showProductList: function() { // 1 lista productos
        try {
            var products = logic.getProductsArray()
            var list = 'Products:\n'
    
            for (var i = 0; i < products.length; i++) {
                var product = products[i]
                list += `${product.id}: ${product.brand} ${product.model}, ${product.price}€\n`
            }
    
            alert(list)
        } catch(error) {
            interface.helper.handlerError()
        }
    },

    filterList: function() { // 2 filtrar productos
        prompt('propiety?')
        prompt()
    },

    showProductById: function() { // 3 buscar 1 producto
        try {
            var id = prompt('id?')
            var product = logic.searchProductById(id)

            var sentence = `${product.id}: ${product.brand} ${product.model}, ${product.price}€`

            alert(sentence)
        } catch(error) {
            interface.helper.handlerError()
        }
    },

    addToCart: function() { // 4 añadir carrito
        // try {
        //     var id = prompt('id?')
        //     logic.helpers.validateIsString(id)
        //     var product = logic.searchProductById(id)
        //     logic.addIdToCartArray(product)

        // } catch(error) {

        // }
    },

    showCart: function() { // 5 ver carrito
        // TODO implement me
    },

    placeOrder: function() { // 6 hacer checkout
        // TODO implement me
    },

    showHistory: function() { // 7 historial de pedidos
        // TODO implement me
    }
}