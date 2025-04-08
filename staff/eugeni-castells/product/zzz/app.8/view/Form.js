class Form extends Component {
  constructor() {
    super("form");
  }

  addSubmitListener = function (listener) {
    this.container.addEventListener("submit", listener);
  };

  clear = function () {
    this.container.reset();
  };
}
