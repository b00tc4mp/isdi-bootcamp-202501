function TextComponent(type, textContent) {
  Component.call(this, type);

  this.container.textContent = textContent;
}

TextComponent.prototype = Object.create(Component.prototype);
TextComponent.prototype.constructor = TextComponent;

TextComponent.prototype.setText = function (text) {
  this.container.textContent = text;
};
