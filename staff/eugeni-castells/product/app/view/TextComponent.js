class TextComponent extends Component {
  constructor(tag, text) {
    super(tag);
    this.container.textContent = text;
  }
  setText(text) {
    this.container.textContent = text;
  }
}
