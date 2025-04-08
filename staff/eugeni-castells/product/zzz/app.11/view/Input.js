class Input extends Component {
  constructor(type) {
    super("input");
    this.container.type = type;
  }

  getValue = function () {
    return this.container.value;
  };

  setPlaceholder = function (placeholder) {
    this.container.placeholder = placeholder;
  };
}
