class Register extends Component {
    constructor() {
        super("div");

        const logo = new Heading(1);
        logo.setText("Logo");
        this.add(logo);

        const inputForm = new Form();
        inputForm.setId("register-form");
        inputForm.addSubmitListener((event) => {
            event.preventDefault();

            const name = nameInput.getValue();
            const email = emailInput.getValue();
            const username = usernameInput.getValue();
            const password = passwordInput.getValue();

            try {
                logic.registerUser(name, email, username, password)

                inputForm.clear()

                alert('User created')

                this.registerSubmitListener()
            } catch (error) {
                logic.helper.handleError(error)
            }
        });
        inputForm.container.style.display = "flex";
        inputForm.container.style.flexDirection = "column";
        this.add(inputForm);

        const nameLabel = new Label();
        nameLabel.setHtmlFor("register-name");
        nameLabel.setText("Name");
        inputForm.add(nameLabel);

        const nameInput = new Input();
        nameInput.setType("text");
        nameInput.setId("register-name");
        nameInput.setPlaceholder('name')
        inputForm.add(nameInput);

        const emailLabel = new Label();
        emailLabel.setHtmlFor("register-email");
        emailLabel.setText("E-mail");
        inputForm.add(emailLabel);

        const emailInput = new Input();
        emailInput.setType("email");
        emailInput.setId("register-email");
        emailInput.setPlaceholder('e-mail')
        inputForm.add(emailInput);

        const usernameLabel = new Label();
        usernameLabel.setHtmlFor("register-username");
        usernameLabel.setText("Username");
        inputForm.add(usernameLabel);

        const usernameInput = new Input();
        usernameInput.setType("text");
        usernameInput.setId("register-username");
        usernameInput.setPlaceholder('username')
        inputForm.add(usernameInput);

        const passwordLabel = new Label();
        passwordLabel.setHtmlFor("register-password");
        passwordLabel.setText("Password");
        inputForm.add(passwordLabel);

        const passwordInput = new Input();
        passwordInput.setType("password");
        passwordInput.setId("register-password");
        passwordInput.setPlaceholder('********')
        inputForm.add(passwordInput);

        inputForm.container.querySelectorAll("input").forEach((child) => {
            child.style.width = "300px";
        })

        const loginAndRegister = new Div();
        loginAndRegister.container.style.width = '310px'
        loginAndRegister.container.style.marginTop = '15px'
        loginAndRegister.container.style.display = 'flex'
        loginAndRegister.container.style.justifyContent = 'space-between'
        inputForm.add(loginAndRegister);

        const loginAnchor = new Anchor();
        loginAnchor.setText("Login");
        loginAnchor.addClickListener(() => {
            inputForm.clear()

            this.loginClickListener()
        })
        loginAndRegister.add(loginAnchor);

        const registerButton = new Button();
        registerButton.setType("submit");
        registerButton.setForm("register-form");
        registerButton.setText("Register");
        loginAndRegister.add(registerButton);
    }

    addLoginClickListener(listener) {
        this.loginClickListener = listener
    }

    addRegisterSubmitListener(listener) {
        this.registerSubmitListener = listener
    }
}