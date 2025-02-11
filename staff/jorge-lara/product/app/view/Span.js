function Span() {
    Component.call(this, 'span');
}

Span.prototype = Object.create(Component.prototype);
Span.prototype.container = Span;