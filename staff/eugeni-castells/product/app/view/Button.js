class Button extends TextComponent {
  constructor(text) {
    super("button", text);
  }
  setType = function (type) {
    this.container.type = type;
  };
}
