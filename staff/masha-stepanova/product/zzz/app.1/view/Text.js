function Text() {
    Component.call(this, 'text')
}

Text.prototype = Object.create(Component.prototype)
Text.prototype.constructor = Text

Text.prototype.setText = function (description) {
    this.container.innerText = description
}