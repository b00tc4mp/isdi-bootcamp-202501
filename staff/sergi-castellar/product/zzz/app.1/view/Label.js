function Label() {
    Component.call(this, "label");
}

Label.prototype = Object.create(Component.prototype);
Label.prototype.constructor = Label;

Label.prototype.setHtmlFor = function (htmlFor) {
    this.container.htmlFor = htmlFor;
};

Label.prototype.setText = function (text) {
    this.container.textContent = text;
};