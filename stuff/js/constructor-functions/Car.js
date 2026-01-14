var o = new Object()

o.toString()
'[object Object]'

Object.prototype.toString = function () {
    return 'Object: Hello, World!'
}

o.toString()
'Object: Hello, World!'

function Car(brand, model) {
    this.brand = brand
    this.model = model
}

var cinque = new Car('Fiat', 'Cinquecento')
var ferra = new Car('Ferrari', '350')
var lambo = new Car('Lamborghini', 'Diablo')

cinque.toString()
'Object: Hello, World!'
ferra.toString()
'Object: Hello, World!'
lambo.toString()
'Object: Hello, World!'

// method overriding
Car.prototype.toString = function () {
    return 'Car (' + this.brand + ', ' + this.model + ')'
}

cinque.toString()
'Car (Fiat, Cinquecento)'
ferra.toString()
'Car (Ferrari, 350)'
lambo.toString()
'Car (Lamborghini, Diablo)'
