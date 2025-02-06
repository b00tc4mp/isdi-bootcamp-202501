function Person(name, dateOfBirth, weight) {
    this.name = name
    this.dateOfBirth = dateOfBirth
    this.weight = weight
}

Person.prototype.salute = function (to) {
    return this.name + ': Hello, ' + to.name + '!'
}

var pepito = new Person('Pepito Grillo', new Date(1900, 0, 1), 0.2)
var campa = new Person('Campa Nilla', new Date(1910, 5, 15), 0.15)

pepito.salute(campa) // Pepito: Hello, Campa!
'Pepito Grillo: Hello, Campa Nilla!'
pepito.salute(pepito)
'Pepito Grillo: Hello, Pepito Grillo!'
campa.salute(pepito)
'Campa Nilla: Hello, Pepito Grillo!'
campa.salute(campa)
'Campa Nilla: Hello, Campa Nilla!'

Person.prototype.salute = function (to) {
    return this.name + ': Hello, ' + to.name + '!!!'
}

campa.salute(campa)
'Campa Nilla: Hello, Campa Nilla!!!'

Person.prototype.eat = function (meal) {
    return this.name + ': eating ' + meal
}

pepito.eat('🍔')
'Pepito Grillo: eating 🍔'
campa.eat('🍫')
'Campa Nilla: eating 🍫'