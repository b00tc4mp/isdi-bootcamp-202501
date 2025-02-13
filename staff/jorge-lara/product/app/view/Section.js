function Section() {
    Component.call(this, 'section');
}

Section.prototype = Object.create(Component.prototype);
Section.prototype.container = Section;

Section.prototype.setOrientation = function (type, orientation) {
    this.container.style.display = type;
    this.container.style.flexDirection = orientation
}