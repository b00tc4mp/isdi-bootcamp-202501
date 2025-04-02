var person = {
    __name__: null,

    set name(name) {
        person.__name__ = name.toUpperCase()
    },

    get name() {
        return person.__name__
    }
}

person.name = 'peter' // call setter

console.log(person.name) // call getter
// PETER