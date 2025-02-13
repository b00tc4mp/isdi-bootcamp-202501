function Section() {
    Component.call(this, 'time')
}

Section.prototype = Object.create(Component.prototype)
Section.prototype.constructor = Section