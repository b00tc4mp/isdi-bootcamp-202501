function Person(name, gender) {
    this.name = name
    this.gender = gender

    // WARN it creates a same function for each instance
    //this.salute = function(to) { return this.name + ': Hello, ' + to.name + '!' }
}

// GOOD
Person.prototype.salute = function (to) { return this.name + ': Hello, ' + to.name + '!' }
Person.prototype.toString = function () { return 'Person (' + this.name + ', ' + this.gender + ')' }


//var peter = new Person('Peter', 'xy')
//var wendy = new Person('Wendy', 'xx')

function XY(name) {
    Person.call(this, name, 'xy')
}

XY.prototype = Object.create(Person.prototype)
XY.prototype.constructor = XY
// overriding
XY.prototype.toString = function () { return 'XY (' + this.name + ')' }

function XX(name) {
    Person.call(this, name, 'xx')
}

XX.prototype = Object.create(Person.prototype)
XX.prototype.constructor = XX
// overriding
XX.prototype.toString = function () { return 'XX (' + this.name + ')' }

var peter = new XY('Peter')
var wendy = new XX('Wendy')

// peter.toString = function() { return 'Peter (' + this.name + ')' }

console.log(wendy.salute(peter))
console.log(peter.salute(wendy))
console.log(wendy.salute === peter.salute)
console.log(wendy.toString())
console.log(peter.toString())