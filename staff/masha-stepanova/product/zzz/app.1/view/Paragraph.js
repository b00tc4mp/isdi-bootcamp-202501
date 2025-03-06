function Paragraph() {
    Component.call(this, 'p')
}

Paragraph.prototype = Object.create(Component.prototype)
Paragraph.prototype.constructor = Paragraph

Paragraph.prototype.setText = function (description) {
    this.container.textContent = description
}