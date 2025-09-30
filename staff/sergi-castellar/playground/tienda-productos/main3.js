console.clear()
/// tienda de algun producto, descripcion, atributos, id, caracteristicas, precio... listar el producto, listar todas las de x caracteristica: ej filtrar por marca
// añadimos buscar el producto como añadido. añadir al carrito el producto... calcular el total del carrito. (tener en cuenta subtotal de 2 productos iguales, x ej)
//añadir productos → checkout → obtener factura → historial de pedidos
var products = [
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
    },
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
    },
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
    }
]

var cart = [{
    id: 'fi-ci',
    brand: 'fiat',
    model: 'cinquecento',
    price: 10000,
    fuel: 'gasoline',
    doors: 3,
    quantity: 1
}] // el carrito actual
var orders = [] // los pedidos anteriores

function listProducts() { //*
    // console.table?
    // recorrer el array products y mostrar todos los productos. Concatenar string tipo: id: xx-xx | Brand: x ... model and price
    // permitir volver al menu principal
    console.table(products)
    alert(arrayToString(products))

}

function addToCart() {
    // pedir id del producto
    // validar que exista un producto con ese id
    // pedir la cantidad deseada a añadir
    // añadir el producto al array de cart añadiendole la propiedad quantity : n
    // mostrar confirmacon de que se ha añadido
    // añadir otro o checkout con dos confirms
    var idProduct = prompt(`Insert the product ID shown in the product table`)
    var productSelected = findProductById(idProduct)
    if (productSelected != undefined) {
        var indexInCart = findIndexProduct(idProduct) // el indice en el array
        var productUnits = parseInt(prompt(`How many units of ${productSelected.brand} ${productSelected.model} do you want to add?`))
        if (indexInCart != undefined) {
            cart[indexInCart]['quantity'] += productUnits
        } else {
            productSelected['quantity'] = productUnits
            cart[cart.length] = productSelected
        }
    }

}

function viewCart() {
    // console.table?
    // recorre el array de cart y muestra cada uno del carrito. formato como en listproducts. subtotal de cada producto y total de todos
    // permite hacer checkout o menu principal
}

function doCheckout() {
    // calcula el iva del total
    // mostrar fra simplificada con los datos como en el cart pero con el iva y algun dato mas
    // guardar el array de cart en el de orders y reiniciar el cart
}

function filterProducts() {
    // pedir por prompt la propiedad a filtrar y luego el valor para filtrar
    // filtrar el array segun criterio y añadirlo a otro array
    // mostrar los datos stringueados en alert
    // volver al menu principal
    // formato: id, marca, modelo, precio (añadir propiedad a filtrar? na)
}

function viewOrders() {
    // recorre orders y muestra cada pedido con un alert
    // formato: order n: 1 | total: x | fecha y hora?
    // volver al menu
}

function selectFunctionMenu() {
    // aceptar un numero como input
    var functionSelected = parseInt(prompt('Select what you want to do:\n1. View products\n2. Add product to cart\n3. View cart\n4. Checkout\n5. Search products\n6. Filter products\n7. View order history\n8. Exit'))
    chooseFunctionMenu(functionSelected)
}

function chooseFunctionMenu(functionSelected) {
    switch (functionSelected){
        case 1:
            listProducts()
            selectFunctionMenu()
            break
        case 2:
            addToCart() // añadir producto
            confirm(`Do you want to add another product?`) ? chooseFunctionMenu(2) : confirm(`Do you want to checkout now?`) ? chooseFunctionMenu(4) : promptMenu()
            break
        case 3: 
            proceedToCheckout()
            break
        case 4:
            howToFilter()
            break
        case 5:
            listPastOrders()
            break
    }
}

// ----------------- funciones cosas concretas

function findProductById(idProduct) { 
    var productSelected = {}
    for (var i = 0; i < products.length; i++) {
        var productToCompare = products[i]
        if (productToCompare['id'] === idProduct) {
            productSelected = productToCompare
            return productSelected
        }
    }
}
function findIndexProduct(idProduct) { 
    for (var i = 0; i < cart.length; i++) {
        if (cart[i]['id'] === idProduct) {
            return i
        }
    }
}

// ----------------- stringuear array

function arrayToString(array) { // id, brand, model, price
    var arrayString = ''
    for (var i = 0; i < array.length; i++) {
        arrayString += `ID: ${array[i].id} | Brand: ${array[i].brand} | Model: ${array[i].model} | Price: ${array[i].price}€\n`
    }
    return arrayString
}

function tableProducts() {
    console.table(products)
}

function tableCart() {
    console.table(cart)
}

//selectFunctionMenu()