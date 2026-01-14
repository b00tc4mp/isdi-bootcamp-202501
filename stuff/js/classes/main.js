class Person {
    #name

    constructor(name) {
        this.#name = name.toUpperCase()
    }
}

var peter = new Person('peter')