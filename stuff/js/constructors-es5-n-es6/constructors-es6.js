class Person {
    constructor(name, gender) {
        this.name = name
        this.gender = gender

        // WARN it creates a same function for each instance
        //this.salute = function(to) { return this.name + ': Hello, ' + to.name + '!' }
    }

    // GOOD
    salute(to) { return this.name + ': Hello, ' + to.name + '!' }

    toString() { return 'Person (' + this.name + ', ' + this.gender + ')' }
}


//var peter = new Person('Peter', 'xy')
//var wendy = new Person('Wendy', 'xx')

class XY extends Person {
    constructor(name) {
        super(name, 'xy')
    }

    // overriding
    toString() { return 'XY (' + this.name + ')' }
}

class XX extends Person {
    constructor(name) {
        super(name, 'xx')
    }

    // overriding
    toString() { return 'XX (' + this.name + ')' }
}

var peter = new XY('Peter')
var wendy = new XX('Wendy')

// peter.toString = function() { return 'Peter (' + this.name + ')' }

console.log(wendy.salute(peter))
console.log(peter.salute(wendy))
console.log(wendy.salute === peter.salute)
console.log(wendy.toString())
console.log(peter.toString())