function Section() {
    Component.call(this, 'section')
}

Section.prototype = Object.create(Component.prototype)
Section.prototype.constructor = Section

Section.prototype.clear = function () {
    this.container.innerHTML = ''
}