class Input extends Component {
  constructor() {
    super("input");
  }
  //Este metodfo me permite obtenter el valor del input y guardarlo en el container
  getValue() {
    return this.container.value;
  }

  setType(type) {
    this.container.type = type;
  }

  setPlaceholder(placeholder) {
    this.container.placeholder = placeholder;
  }
}
