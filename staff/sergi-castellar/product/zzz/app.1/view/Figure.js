function Figure() {
    Component.call(this, "figure");
}

Figure.prototype = Object.create(Component.prototype);
Figure.prototype.constructor = Figure;