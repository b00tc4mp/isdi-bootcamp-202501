function Input() {
    Component.call(this, 'input')
}
Input.prototype = Object.create(Component.prototype);
Input.prototype.container = Input;

Input.prototype.getValue = function () {
    return this.container.value
}