function Span(text) {
  TextComponent.call(this, "span", text);
}

Span.prototype = Object.create(TextComponent.prototype);
Span.prototype.constructor = Span;
