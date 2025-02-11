function Anchor() {
    Component.call(this, 'a')
    this.container.style.textDecoration = 'underline'
    this.container.style.fontWeight = 'bold'
}

Anchor.prototype = Object.create(Component.prototype)
Anchor.prototype.constructor = Anchor

Anchor.prototype.setText = function (text) {
    this.container.textContent = text
}