function Paragraph() {
    Component.call(this, 'p');
}

Paragraph.prototype = Object.create(Component.prototype);
Paragraph.prototype.container = Paragraph;

Paragraph.prototype.setText = function (text) {
    this.container.textContent = text;
};