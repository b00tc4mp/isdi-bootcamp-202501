class Form extends Component {
  constructor() {
    super("form");
  }

  //Este método me permite recibir un elemento y agregarlo al formulario, en este caso al container
  addSubmitListener(listener) {
    this.container.addEventListener("submit", listener);
  }
  //Este metodo me limpia el formulario
  clear() {
    this.container.reset();
  }
}
