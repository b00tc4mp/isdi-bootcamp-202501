//SPAN
function Span() {
    Component.call(this, 'span')
}

Span.prototype = Object.create(Component.prototype)
Span.prototype.constructor = Span

Span.prototype.setText = function (text) {
    this.container.textContent = text
}