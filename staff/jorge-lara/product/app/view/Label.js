function Label() {
    Component.call(this, 'label');
}

Label.prototype = Object.create(Component.prototype);
Label.prototype.container = Label;

Label.prototype.setText = function (text) {
    this.container.textContent = text;
};