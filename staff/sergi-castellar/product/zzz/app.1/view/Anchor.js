function Anchor() {
    Component.call(this, `a`);
}

Anchor.prototype = Object.create(Component.prototype);
Anchor.prototype.constructor = Anchor;

Anchor.prototype.setClass = function (aClass) {
    this.container.className = aClass;
};

Anchor.prototype.setText = function (text) {
    this.container.textContent = text;
};