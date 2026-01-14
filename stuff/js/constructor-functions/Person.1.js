function Person(name, dateOfBirth, weight) {
    this.name = name
    this.dateOfBirth = dateOfBirth
    this.weight = weight
}

var pepito = new Person('Pepito Grillo', new Date(1900, 0, 1), 0.2)
var campa = new Person('Campa Nilla', new Date(1910, 5, 15), 0.15)
// undefined
pepito
// Person {name: 'Pepito Grillo', dateOfBirth: Mon Jan 01 1900 00:00:00 GMT-0014 (Central European Standard Time), weight: 0.2}dateOfBirth: Mon Jan 01 1900 00:00:00 GMT-0014 (Central European Standard Time) {}name: "Pepito Grillo"weight: 0.2[[Prototype]]: Object
campa
// Person {name: 'Campa Nilla', dateOfBirth: Wed Jun 15 1910 00:00:00 GMT+0000 (Central European Summer Time), weight: 0.15}dateOfBirth: Wed Jun 15 1910 00:00:00 GMT+0000 (Central European Summer Time) {}name: "Campa Nilla"weight: 0.15[[Prototype]]: Object
pepito instanceof Array
// false
pepito instanceof Object
// true
pepito instanceof Date
// false
pepito instanceof Person
// true