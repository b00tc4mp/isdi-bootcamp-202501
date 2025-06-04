class Login extends Component {
  constructor() {
    super("div");
    this.setStyle(style.screenStyle);

    const logo = new Header("1", "Logo");
    this.add(logo);

    const form = new Form();
    form.setStyle(style.formStyle);
    form.submitListener(
      function (event) {
        event.preventDefault();

        try {
          const username = nameInput.getValue();

          const password = passwordInput.getValue();

          logic.loginUser(username, password);

          form.clear();

          this.addSubmitListener();
        } catch (error) {
          alert(error.message);
        }
      }.bind(this)
    );
    this.add(form);

    const nameField = new Div();
    nameField.setStyle(style.formFieldStyle);
    form.add(nameField);

    const nameLabel = new Label("Username");
    nameField.add(nameLabel);

    const nameInput = new Input("text");
    nameField.add(nameInput);

    const passwordField = new Div();
    passwordField.setStyle(style.formFieldStyle);
    form.add(passwordField);

    const passwordLabel = new Label("Password");
    passwordField.add(passwordLabel);

    const passwordInput = new Input("password");
    passwordField.add(passwordInput);

    const buttonWrapper = new Div();
    buttonWrapper.setStyle(style.buttonWrapperStyle);
    form.add(buttonWrapper);

    const registerButton = new Button("Register");
    registerButton.setType("button");
    buttonWrapper.add(registerButton);
    registerButton.addClickListener(
      function () {
        form.clear();
        this.registerClickListener();
      }.bind(this)
    );

    const formButton = new Button("Login");
    formButton.setType("submit");
    buttonWrapper.add(formButton);
    formButton.setStyle(style.mainButtonStyle);
  }
  addRegisterClickListener = function (listener) {
    this.registerClickListener = listener;
  };

  addLoginSubmitListener = function (listener) {
    this.addSubmitListener = listener;
  };
}

Login.prototype.addRegisterClickListener = function (listener) {
  this.registerClickListener = listener;
};

Login.prototype.addLoginSubmitListener = function (listener) {
  this.addSubmitListener = listener;
};
