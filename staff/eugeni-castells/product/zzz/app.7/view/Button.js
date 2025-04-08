function Button(text) {
  TextComponent.call(this, "button", text);
  this.textContent = text;
}

Button.prototype = Object.create(TextComponent.prototype);
Button.prototype.constructor = Button;

Button.prototype.setType = function (type) {
  this.container.type = type;
};
