function Form() {
    Component.call(this, 'form');
}
Form.prototype = Object.create(Component.prototype);
Form.prototype.constructor = Form;

Form.prototype.setOrientation = function (type, orientation) {
    this.container.style.display = type;
    this.container.style.flexDirection = orientation
}