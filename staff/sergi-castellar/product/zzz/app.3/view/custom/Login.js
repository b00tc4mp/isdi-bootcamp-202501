class Login extends Component {
    constructor() {
        super("div")

        const logo = new Heading(1)
        logo.setText("Logo")
        this.add(logo)

        const inputForm = new Form()
        inputForm.setId("login-form")
        inputForm.addSubmitListener((event) => {
            event.preventDefault()

            const username = usernameInput.getValue()
            const password = passwordInput.getValue()

            try {
                logic.loginUser(username, password)

                inputForm.clear()

                alert(`Welcome again, ${username}`)

                this.loginSubmitListener()
            } catch (error) {
                logic.helper.handleError(error)
            }
        })
        inputForm.container.style.display = 'flex'
        inputForm.container.style.flexDirection = 'column'
        this.add(inputForm)

        const usernameLabel = new Label()
        usernameLabel.setHtmlFor("login-username")
        usernameLabel.setText("Username")
        inputForm.add(usernameLabel)

        const usernameInput = new Input()
        usernameInput.setType("text")
        usernameInput.setId("login-username")
        usernameInput.setPlaceholder('username')
        inputForm.add(usernameInput)

        const passwordLabel = new Label()
        passwordLabel.setHtmlFor("login-password")
        passwordLabel.setText("Password")
        inputForm.add(passwordLabel)

        const passwordInput = new Input()
        passwordInput.setType("password")
        passwordInput.setId("login-password")
        passwordInput.setPlaceholder('********')
        inputForm.add(passwordInput)

        inputForm.container.querySelectorAll("input").forEach((child) => {
            child.style.width = "300px"
        })

        const registerAndLogin = new Div()
        registerAndLogin.container.style.width = '310px'
        registerAndLogin.container.style.marginTop = '15px'
        registerAndLogin.container.style.display = 'flex'
        registerAndLogin.container.style.justifyContent = 'space-between'
        inputForm.add(registerAndLogin)

        const registerAnchor = new Anchor()
        registerAnchor.setText("Register")
        registerAnchor.addClickListener(() => {
            inputForm.clear()

            this.registerClickListener()
        })
        registerAndLogin.add(registerAnchor)

        const loginButton = new Button()
        loginButton.setType("submit")
        loginButton.setForm("login-form")
        loginButton.setText("Login")
        this.loginButton = loginButton
        registerAndLogin.add(loginButton)
    }

    addRegisterClickListener(listener) {
        this.registerClickListener = listener
    }

    addLoginSubmitListener(listener) {
        this.loginSubmitListener = listener
    }
}
