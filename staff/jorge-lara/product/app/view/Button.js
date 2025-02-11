function Button() {
    Component.call(this, 'button');
}
Button.prototype = Object.create(Component.prototype)
Button.prototype.container = Button;

Button.prototype.setText = function (text) {
    this.container.textContent = text;
};

Button.prototype.setType = function (type){
    this.container.type = type
}