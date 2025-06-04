function Anchor(text) {
  TextComponent.call(this, "a", text);
}

Anchor.prototype = Object.create(TextComponent.prototype);
Anchor.prototype.constructor = Anchor;
