function P () {
    Component.call(this, 'p')
}

P.prototype = Object.create(Component.prototype)
P.prototype.constructor = P