function Login() {
    Component.call(this, "div");

    var logo = new Heading(1);
    logo.setText("Logo");
    this.add(logo);

    var inputForm = new Form();
    inputForm.setId("login-form");
    inputForm.addSubmitListener(
        function (event) {
            event.preventDefault();

            var username = usernameInput.container.value;
            var password = passwordInput.container.value;

            try {
                logic.loginUser(username, password)

                inputForm.clear()

                alert(`Welcome again, ${username}`)

                this.loginSubmitListener()
            } catch (error) {
                console.error(error)
                alert(error.message)
            }
        }.bind(this)
    );
    inputForm.container.style.display = 'flex'
    inputForm.container.style.flexDirection = 'column'
    this.add(inputForm);

    var usernameLabel = new Label();
    usernameLabel.setHtmlFor("login-username");
    usernameLabel.setText("Username");
    inputForm.add(usernameLabel);

    var usernameInput = new Input();
    usernameInput.setType("text");
    usernameInput.setId("login-username");
    usernameInput.setPlaceholder('username');
    inputForm.add(usernameInput);

    var passwordLabel = new Label();
    passwordLabel.setHtmlFor("login-password");
    passwordLabel.setText("Password");
    inputForm.add(passwordLabel);

    var passwordInput = new Input();
    passwordInput.setType("password");
    passwordInput.setId("login-password");
    passwordInput.setPlaceholder('********')
    inputForm.add(passwordInput);

    inputForm.container.querySelectorAll("input").forEach(function (child) {
        child.style.width = "300px";
    })

    var registerAndLogin = new Div();
    registerAndLogin.container.style.width = '310px'
    registerAndLogin.container.style.marginTop = '15px'
    registerAndLogin.container.style.display = 'flex'
    registerAndLogin.container.style.justifyContent = 'space-between'
    inputForm.add(registerAndLogin);

    var registerAnchor = new Anchor();
    registerAnchor.setText("Register");
    registerAnchor.addClickListener(function () {
        inputForm.clear()

        this.registerClickListener()
    }.bind(this))
    registerAndLogin.add(registerAnchor);

    var loginButton = new Button();
    loginButton.setType("submit");
    loginButton.setForm("login-form");
    loginButton.setText("Login");
    this.loginButton = loginButton;
    registerAndLogin.add(loginButton);
}

Login.prototype = Object.create(Component.prototype);
Login.prototype.constructor = Login;

Login.prototype.addRegisterClickListener = function (listener) {
    this.registerClickListener = listener
}

Login.prototype.addLoginSubmitListener = function (listener) {
    this.loginSubmitListener = listener
}
