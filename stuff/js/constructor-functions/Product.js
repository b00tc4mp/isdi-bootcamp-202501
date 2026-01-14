function Product(code, brand, model, price) {
    this.code = code
    this.brand = brand
    this.model = model
    this.price = price
}

Product.prototype.toString = function () {
    return 'Product (' + this.code + ', ' + this.brand + ', ' + this.model + ', ' + this.price + ')'
}

var nikeAirMax = new Product('nike-123', 'nike', 'air max', 120)
var adidasNiza = new Product('adidas-456', 'adidas', 'niza', 70)

var products = [nikeAirMax, adidasNiza]

for (var i = 0; i < products.length; i++) {
    var product = products[i]

    console.log(product.toString())
}
// VM682:20 Product (nike-123, nike, air max, 120)
// VM682:20 Product (adidas-456, adidas, niza, 70)
