class Register extends Component {
  constructor() {
    super("div");
    this.setStyle(style.screenStyle);

    const logo = new Header("1", "Logo");
    this.add(logo);

    const form = new Form();
    form.setStyle(style.formStyle);

    form.addSubmitListener(
      function (event) {
        event.preventDefault();
        const registerInfo = {
          name: nameInput.getValue(),
          email: emailInput.getValue(),
          username: usernameInput.getValue(),
          password: passwordInput.getValue(),
        };
        try {
          logic.registerUser(registerInfo);
          form.clear();
          alert("user registered!");
          this.addSubmitListener();
        } catch (error) {
          console.log(error.message);
          alert(error.message);
        }
      }.bind(this)
    );

    this.add(form);

    //form namefield
    const nameField = new Div();
    nameField.setStyle(style.formFieldStyle);
    form.add(nameField);

    //nameInputRegister
    const nameLabel = new Label("Name");
    nameField.add(nameLabel);

    const nameInput = new Input("text");
    nameField.add(nameInput);

    //form emailField
    const emailField = new Div();

    emailField.setStyle(style.formFieldStyle);

    form.add(emailField);

    //emailInputRegister
    const emailLabel = new Label("E-mail");
    emailField.add(emailLabel);

    const emailInput = new Input("text");

    emailField.add(emailInput);

    const usernameField = new Div();
    usernameField.setStyle(style.formFieldStyle);
    form.add(usernameField);

    const usernameLabel = new Label("Username");
    usernameField.add(usernameLabel);

    const usernameInput = new Input("text");
    usernameField.add(usernameInput);

    const passwordField = new Div();
    passwordField.setStyle(style.formFieldStyle);
    form.add(passwordField);

    const passwordLabel = new Label("Password");
    passwordField.add(passwordLabel);

    const passwordInput = new Input("password");
    passwordField.add(passwordInput);

    const buttonWrapper = new Div();
    form.add(buttonWrapper);
    buttonWrapper.setStyle(style.buttonWrapperStyle);

    const loginButton = new Button("Login");
    loginButton.setType("button");
    loginButton.setStyle(style.secondaryButtonStyle);
    loginButton.addClickListener(
      function () {
        form.clear();
        this.loginClickListener();
      }.bind(this)
    );
    buttonWrapper.add(loginButton);

    const registerFormButton = new Button("Register");
    registerFormButton.type = "submit";
    registerFormButton.setStyle(style.mainButtonStyle);
    buttonWrapper.add(registerFormButton);
  }
  addLoginClickListener = function (listener) {
    this.loginClickListener = listener;
  };

  addRegisterSubmitListener = function (listener) {
    this.addSubmitListener = listener;
  };
}
