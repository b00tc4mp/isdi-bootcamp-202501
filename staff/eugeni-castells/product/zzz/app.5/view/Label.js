function Label(text) {
  TextComponent.call(this, "label", text);
}

Label.prototype = Object.create(TextComponent.prototype);
Label.prototype.constructor = Label;
